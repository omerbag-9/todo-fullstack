import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function Home() {
  const [startDate, setStartDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false); // State to toggle calendar visibility
  const queryClient = useQueryClient();

  // Function to toggle calendar visibility
  function toggleCalendar() {
    setShowCalendar(!showCalendar);
  }

  // Function to get tasks
  function getTasks() {
    return axios.get('http://localhost:5000/task', {
      headers: {
        token: localStorage.getItem('userToken')
      }
    });
  }


  // Function to delete task
  async function deleteTask(id) {
    await axios.delete(`http://localhost:5000/task/${id}`, {
      headers: {
        token: localStorage.getItem('userToken')
      }
    }).then((res) => res).catch((err) => err)
  }


  // Fetch tasks using react-query
  const { isLoading, isError, data } = useQuery('allTasks', getTasks);


  // Function to add a new task
  // Function to add a new task
async function addTask(values) {
  try {
    await axios.post('http://localhost:5000/task', values, {
      headers: {
        token: localStorage.getItem('userToken')
      }
    });
  } catch (err) {
    console.log(err.response?.data?.message || err.message);
  }
}
  // Formik for adding new tasks
  let formik = useFormik({
    initialValues: {
      task: '',
      completed: false,
      dueDate: startDate
    },
    onSubmit: addTask
  });


  // Mutation to update task status
  const mutation = useMutation(
    ({ id, completed }) => axios.put(`http://localhost:5000/task/${id}`, { completed }, {
      headers: {
        token: localStorage.getItem('userToken')
      }
    }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('allTasks');
      },
      onError: (error) => {
        console.error('Error updating task:', error.response?.data || error.message);
      },
    }
  );

  // Function to handle checkbox change
  function handleCheckboxChange(taskId, currentStatus) {
    if (!taskId) {
      console.error('Invalid task ID');
      return;
    }

    // Convert taskId to string
    const taskIdStr = String(taskId);

    mutation.mutate({
      id: taskIdStr, // Ensure id is a string
      completed: !currentStatus
    });
  }

  return (
    <>
      <div className="mx-auto my-5 rounded p-3 bg-light">
        <h2 className='text-center py-3'>Task Manager</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Add new task"
              aria-label="Task name"
              value={formik.values.task}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="task"
            />
            <div className="input-group-append">
              {/* Button that toggles the calendar dropdown */}
              <button
                className="btn btn-outline-primary dropdown-toggle py-3"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                onClick={toggleCalendar}
              >
                <i className="fas fa-calendar-alt"></i> {/* FontAwesome calendar icon */}
              </button>

              {/* Dropdown container for the calendar */}
              <ul
                className={`dropdown-menu p-0 ${showCalendar ? 'show' : ''}`}
                aria-labelledby="dropdownMenuButton"
                style={{ width: '25%' }}
              >
                <li>
                  <div className="p-2">
                    <Calendar
                      onChange={(date) => {
                        setStartDate(date); // Update the selected date
                        formik.setFieldValue('dueDate', date); // Update Formik's dueDate value
                        toggleCalendar(); // Close the calendar after selecting a date
                      }}
                      value={startDate}
                    />
                  </div>
                </li>
              </ul>
            </div>
            <div className="input-group-append">
              <button className="btn btn-outline-secondary py-3 bg-primary text-white" type="submit">
                Add Task
              </button>
            </div>
          </div>
        </form>

        <hr className='my-4' />

        {data?.data.data.map((task) => (
          <div key={task._id} className='py-3'>
            <div class="btn-group" role="group" aria-label="Basic checkbox toggle button group">
              <input type="checkbox" checked={task.completed} class="btn-check" id={task._id} onChange={() => handleCheckboxChange(task._id, task.completed)} autocomplete="off" />
              <label class="btn btn-outline-success p-1" for={task._id}>completed</label>
            </div>
            <button onClick={() => deleteTask(task._id)} className='btn btn-danger float-end clear-fix' type='submit'>Delete</button>
            <span className='mx-2 fs-5'>{task.task}</span>
            <span className='mx-2 py-2 bg-warning float-end rounded px-2'>
              {`deadline ` + new Date(task.dueDate).toLocaleDateString()}
            </span>
          </div>

        ))}
      </div>
    </>
  );
}

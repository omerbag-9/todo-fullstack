import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Loading from '../Loading/Loading';

export default function Home() {
  // Correcting the useState declaration
  const [data, setData] = useState([]);
  let [errMsg, setErrMsg] = useState('')
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false); // State to toggle calendar visibility

  // Function to toggle calendar visibility
  function toggleCalendar() {
    setShowCalendar(!showCalendar);
  }

  // Function to get tasks
  async function getTasks() {
    try {
      setLoading(true); // Start loading
      let { data } = await axios.get('https://todo-list-b-fullstack.vercel.app/task', {
        headers: {
          token: localStorage.getItem('userToken'),
        },
      });
      setData(data.data); // Update the data state
      setLoading(false); // Stop loading after data is set
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setLoading(false); // Stop loading in case of error
    }
  }

  useEffect(() => {
    getTasks();
  }, []);

  // Function to delete task
  async function deleteTask(id) {
    try {
      await axios.delete(`https://todo-list-b-fullstack.vercel.app/task/${id}`, {
        headers: {
          token: localStorage.getItem('userToken'),
        },
      });
      getTasks(); // Refresh tasks after deletion
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  }

  // Function to add a new task
  async function addTask(values) {
    try {
      setLoading(true);
      await axios.post('https://todo-list-b-fullstack.vercel.app/task', values, {
        headers: {
          token: localStorage.getItem('userToken'),
        },

      });
      setErrMsg('');
      getTasks();
    } catch (err) {
      setErrMsg(err.response?.data?.message);
    }
    // set input fields to empty
    formik.resetForm();
    setLoading(false);
  }

  // Formik for adding new tasks
  const formik = useFormik({
    initialValues: {
      task: '',
      completed: false,
      dueDate: startDate,
    },
    onSubmit: addTask,
  });

  // Function to update task completion status
  async function handleCheckboxChange(id, completed) {
    try {
      await axios.put(
        `https://todo-list-b-fullstack.vercel.app/task/${id}`,
        { completed: !completed },
        {
          headers: {
            token: localStorage.getItem('userToken'),
          },
        }
      );
      getTasks(); // Refresh tasks after status change
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : <>
        <div className="mx-auto my-5 rounded p-3 bg-dark text-white">
          <h2 className="text-center py-3">add Task</h2>
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
                  <i className="fas fa-calendar-alt"></i>
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
                <button
                  className="btn btn-outline-secondary py-3 bg-primary text-white"
                  type="submit"
                >
                  Add Task
                </button>
              </div>
            </div>
          </form>
          {errMsg !== '' ? <div className='alert text-danger p-0 m-0'>{errMsg}</div> : ''}

          <hr className="my-4" />

          {data?.map((task) => (<>
            <div key={task._id} className="py-3 d-flex justify-content-between w-100">
              <div className="col-6">
                <div
                  className="btn-group"
                  role="group"
                  aria-label="Basic checkbox toggle button group"
                >
                  <input
                    type="checkbox"
                    checked={task.completed}
                    className="form-check-input mb-2"
                    id={task._id}
                    onChange={() => handleCheckboxChange(task._id, task.completed)}
                    autoComplete="off"
                  />
                </div>
                <span className="mx-2 fs-5 text-break">{task.task}</span>
              </div>
              <div className="col-6 align-content-center">
                <button
                  onClick={() => deleteTask(task._id)}
                  className="btn btn-danger float-end"
                  type="submit"
                >
                  Delete
                </button>
                <span className=" py-2 text-warning float-end rounded px-2">
                  {`deadline ` + new Date(task.dueDate).toLocaleDateString()}
                </span>
              </div>
            </div>
            <hr className='bg-primary text-primary' />
            </>))}
        </div>
      </>}
    </>
  );
}

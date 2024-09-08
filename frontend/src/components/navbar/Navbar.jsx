import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'

export default function Navbar() {
  let naviagte = useNavigate();
  let { userToken, setUserToken } = useContext(UserContext)
  function logout() {
    localStorage.removeItem('userToken')
    setUserToken(null)
  }
  useEffect(() => {
    if (!userToken) {
      naviagte('/login')
    }
  }, [userToken, naviagte])

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <a className="navbar-brand" href="#">Navbar</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
          </div>
        </div>
        <ul className="navbar-nav d-flex ms-auto mb-2 mb-lg-0">
          {userToken ? <><li className="nav-item">
            <Link onClick={() => logout()} className="nav-link active" aria-current="page">logout</Link>
          </li></> : <><li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/signup">signup</Link>
          </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/login">login</Link>
            </li>
          </>}

        </ul>
      </nav>
    </>
  )
}

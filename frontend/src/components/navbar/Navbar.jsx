import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
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
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/signup">signup</Link>
        </li>
        <li className="nav-item">
        <Link className="nav-link active" aria-current="page" to="/login">login</Link>
        </li>
        <li className="nav-item">
        <Link className="nav-link active" aria-current="page">logout</Link>
        </li>
        </ul>
      </nav>
    </>
  )
}

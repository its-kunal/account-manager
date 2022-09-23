import React from 'react'
import { NavLink } from 'react-router-dom'

export default function AsideNavbar() {
    return (
        <div className="container mt-1 ms-5" style={{
            width: '200px',
        }}>
            <ul className="nav nav-pills flex-column">
                <li className="nav-item">
                    <NavLink className="nav-link" to="/account">
                        <i className="bi bi-person-circle"></i> &nbsp;Account</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/savings">
                        <i className="bi bi-piggy-bank"></i> &nbsp;Savings</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/expenses">
                        <i className="bi bi-cash"></i> &nbsp;Expenses</NavLink>
                </li>
            </ul>
        </div>
    )
}

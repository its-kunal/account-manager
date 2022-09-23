import React from 'react'
import { Link } from 'react-router-dom'
import AccountManagerLogo from "../assets/idea.png"

export default function Navbar() {
    return (
        <nav className="navbar bg-light">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <img src={AccountManagerLogo} alt="" height={"50px"} />
                    <span className="fw-bold ms-4">
                        Account Manager
                    </span>
                </Link>
            </div>
        </nav>
    )
}

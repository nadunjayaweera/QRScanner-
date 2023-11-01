import React from 'react'
import "./sidebar.scss"
import PersonIcon from '@mui/icons-material/Person';

import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <div className="top">
            <Link to="/" style={{textDecoration : "none"}}>
            <span className='logo'>SCAN ME</span>

            </Link>
        </div>
        <hr/>
        <div className="center">
            <ul>
            <p className='title'>MAIN OPTIONS</p>
              

                <Link to="/users" style={{textDecoration : "none"}}>
                    <li>
                        <PersonIcon className="icon"/>
                        <span >PRODUCTS</span>
                    </li>
                </Link>

                <li>
                    < LogoutIcon className="icon"/>
                    <span>LOGOUT</span>
                </li>

            </ul>
        </div>

       
    </div>
  )
}

export default Sidebar

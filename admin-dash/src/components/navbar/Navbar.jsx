import React from 'react'
import "./navbar.scss";
import SearchIcon from '@mui/icons-material/Search';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';

const Navbar = () => {
  return (
    <div className='navbar'>
        <div className="wrapper">
            <div className="search">
                <input type="text" placeholder='Search....' />
                <SearchIcon/>
            </div>

            <div className="items">
                <div className="item">
                    <RecordVoiceOverIcon className='icon' />
                    English
                </div>

                <div className="item">
                    <DarkModeIcon className='icon'/>
                </div>

                <div className="item">
                    <NotificationsActiveIcon className='icon'/>
                    <div className="counter">1</div>
                </div>

                <div className="item">
                    <ChatBubbleIcon className='icon'/>
                    <div className="counter">2</div>
                </div>

                <div className="item">
                    <ChecklistRtlIcon className='icon'/>
                </div>

                <div className="item">
                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D" className='avatar'  alt='avatar'/>
                </div>

                
            </div>
        </div>
    </div>
  )
}

export default Navbar
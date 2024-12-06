import React, { useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const items = [
    // {title: "Dashboard", url: "/home-dash"},
    {title: "Students", url: "/student-dash"},
    {title: "Rooms", url: "/room"}
]

const HeaderSideNav = ({setNavToggle}) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const handleClick = (index) => {
        setActiveIndex(index);
    }
  return (
    <aside>
        <div className="--flex-end --sidebar-close">
            <IoCloseOutline className='sidebar-toggle-icon' onClick={() => setNavToggle(false)}/>
        </div>

        <div className="left">
            {items.map(({title, url}, index) => {
                // {console.log(title)}
                // {console.log(url)}
                // {console.log(index)}
                <div className='--flex-center dir-column' key={index}>
                    <Link to={url} className={index === activeIndex ? 'active-link' : ''} onClick={() => handleClick(index)}>{title}</Link>
                </div>
            })}

            <div className='--flex-start --flex-center'>
                <button className='btn-primary'>New</button>
            </div>
        </div>
    </aside>
  )
}

export default HeaderSideNav
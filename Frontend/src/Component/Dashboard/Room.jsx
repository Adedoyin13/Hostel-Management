import React, { useEffect, useState } from 'react';
import './Dashboard.css'
import SideBar from './SideBar';
import { IoCloseOutline, IoMenu } from "react-icons/io5";
import RoomTable from './RoomTable';
import { confirmAlert } from 'react-confirm-alert';

const roomsData = [
    {
        _id: 1,
        roomNumber: 10,
        roomCapacity: 5,
        roomOccupancy: ['Ade', 'Mubarak', 'Chapo', 'Rodiyat'],
        roomLocation: 'No 5, Ado Odo',
        roomStatus: 'Available'
    },
    {
        _id: 2,
        roomNumber: 20,
        roomCapacity: 4,
        roomOccupancy: ['Shola', 'Adigun', 'Tunubu', 'Sakariyau'],
        roomLocation: 'No 2, Ikeshi',
        roomStatus: 'Unavailable'
    },
    {
        _id: 3,
        roomNumber: 30,
        roomCapacity: 6,
        roomOccupancy: ['Shade', 'John'],
        roomLocation: 'No 3, Obasanjo',
        roomStatus: 'Available'
    }
]

const Room = () => {
    const [roomData, setRoomData] = useState(roomsData);
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [isSideBarToggle, setIsSideBarToggle] = useState(false);
    
    useEffect(() => {
        const filteredRooms = roomData.filter((res) => {
            const roomLocation = res.roomLocation?.toLowerCase() || '';
            const roomStatus = res.roomStatus?.toLowerCase() || '';
            const roomNumber = res.roomNumber || '';
            return (
                roomLocation.includes(search.toLowerCase()) || roomStatus.includes(search.toLowerCase())
            )
        })
        setSearchResult(filteredRooms)
    }, [roomData, search]);

    const handleAddRoom = (newRoomData) => {
        setRoomData((prevData) => [...prevData, newRoomData])
    }

    const handleUpdateRoom = (updatedRoomData) => {
        setRoomData((prevData) => prevData.map((room) => room._id === updatedRoomData._id ? updatedRoomData : room))
    }

    const removeRoom = async (id) => {
        try {
            setRoomData((prevData) => prevData.filter((room) => room._id !== id))
        } catch (error) {
            console.error('Failed to delete room', error);
        }
    }

    const confirmDelete = (_id) => {
        confirmAlert({
          title: "Delete This Room",
          message: "You really wanna delete this Room? 🤔",
          buttons: [
            { label: "Delete", onClick: () => removeRoom(_id) },
            { label: "Cancel", onClick: () => alert("Deletion Cancelled") }
          ]
        });
      };

  return (
    <div>
        <div>{isSideBarToggle && (<div className='mobile-side-nav'><SideBar/></div>)}
        <div className='--flex-justify-between'>
            <div className="desktop-side-nav"><SideBar/></div>
            <div className='--flex-dir-column --overflow-y-auto --flex-One --overflow-x-hidden'>
                <main className='--flex-justify-center w-full '>
                    <div className="right dash-main">
                        <div className='--flex-justify-between'>
                            <h1>Hostel Room Listing</h1>
                            {isSideBarToggle ? (<IoCloseOutline className='sidebar-toggle-icon' onClick={() => setIsSideBarToggle(false)}/>)
                            : (<IoMenu className='sidebar-toggle-icon' onClick={() => setIsSideBarToggle(true)}/>)}
                        </div>
                        <input type="text" placeholder='Search by room number, status or location' className='search' value={search} onChange={(e) => setSearch(e.target.value)}/>
                        <RoomTable rooms={searchResult} onAddRoom={handleAddRoom} onDeleteRoom={confirmDelete} onUpdateRoom={handleUpdateRoom}/>
                    </div>
                </main>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Room
import React, { useEffect, useState } from 'react';
import './Dashboard.css'
import SideBar from './SideBar';
import { IoCloseOutline, IoMenu } from "react-icons/io5";
import RoomTable from './RoomTable';
import { confirmAlert } from 'react-confirm-alert';
import axios from 'axios';
import { toast } from 'react-toastify';
import {ClipLoader} from 'react-spinners';

const override = {
    display: 'block',
    margin: '100px auto',
}

const Room = () => {
    const [roomData, setRoomData] = useState([]);
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [isSideBarToggle, setIsSideBarToggle] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const fetchRooms = async () => {
            try {
                const response = await axios.get('http://localhost:5000/room/',{ withCredentials: true});
                const data = response.data;
                // console.log({data})
                setRoomData(data)
            } catch (error) {
                console.log(error)
                if(error.response && error.response.status === 400) {
                    toast.error(error.response.message)
                }
            } finally {
                setIsLoading(false)
            }
        }
        fetchRooms();
    }, []);
    
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

    const handleAddRoom = async (newRoomData) => {
        try {
            await axios.post(`http://localhost:5000/room/create-room`, newRoomData, {withCredentials: true});           
            setRoomData((prevData) => [...prevData, newRoomData])
            toast.success('Room Added Successfully')
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message)
        }
    }

    const handleUpdateRoom = async (updatedRoomData) => {
        try {
            await axios.patch(`http://localhost:5000/room/update-room/${updatedRoomData._id}`, {roomStatus: updatedRoomData.roomStatus}, {withCredentials: true});
            setRoomData((prevData) => prevData.map((room) => room._id === updatedRoomData._id ? updatedRoomData : room));
            toast.success('Room Updated Successfully')
        } catch (error) {
            toast.error('Could not update room')
        }
    }

    const removeRoom = async (id) => {
        try {
            console.log({id})
            await axios.delete(`http://localhost:5000/room/${id}`, {withCredentials: true});
            setRoomData((prevData) => prevData.filter((room) => room._id !== id))
            toast.success('Room Deleted Successfully')
        } catch (error) {
            toast.error('Failed to delete room');
            console.log(error)
        }
    }

    const confirmDelete = (_id) => {
        confirmAlert({
          title: "Delete This Room",
          message: "You really wanna delete this Room? 🤔",
          buttons: [
            { label: "Delete", onClick: () => removeRoom(_id) },
            { label: "Cancel", onClick: () => toast.success("Deletion Cancelled") }
          ]
        });
    };

  return (
    <>
    {isLoading ? ( <ClipLoader color='1a80e5' cssOverride={override} isLoading={isLoading}/>) : (
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
    )}
    </>
  )
}

export default Room
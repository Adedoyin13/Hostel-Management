import React, { useContext, useEffect, useState } from 'react';
import './HomeDash.css';
import { Link } from 'react-router-dom';
import { ClipLoader } from "react-spinners";
import { UserContext } from '../../context/UserContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import {formatDistanceToNow} from 'date-fns';

const override = {
    display: 'block',
    margin: '100px auto',
}

const formatName = (name) => {
    const firstName = name.split(' ')[0];
    return firstName;
}

const BASE_URL = import.meta.env.VITE_BASE_URL;

const HomeDash = () => {
    const {user} = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
    const [students, setStudents] = useState([])
    const [checkedInCount, setCheckedInCount] = useState(0)
    const [checkedOutCount, setCheckedOutCount] = useState(0)
    const [checkedInStudents, setCheckedInStudents] = useState(0)
    const [checkedOutStudents, setCheckedOutStudents] = useState(0)

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/student`, { withCredentials: true});
                const data = response.data;
                console.log({data})
                setStudents(data)
                const checkedInStds = data.filter((student) => student.checkedIn)
                setCheckedInCount(checkedInStds.length);
                setCheckedInStudents(checkedInStds)

                const checkedOutStds = data.filter((student) => !student.checkedIn)
                setCheckedOutCount(checkedOutStds.length)
                setCheckedOutStudents(checkedOutStds)
                toast.success(response?.data?.message)
            } catch (error) {
                console.log(error)
                toast.error(error?.response?.data?.message)
            } finally {
                setIsLoading(false)
            }
        }
        fetchStudents();
    }, []);

    if(isLoading) return <ClipLoader color='1a80e5' cssOverride={override} isLoading={isLoading}/>

  return (
    <div className='--flex-center __homeDashCon'>
        <div className="__paraCon">
            <h1 className='__paraHeader'>Welcome Back, {formatName(user.fullname)}</h1>
        </div>
        <div className="__secondCon">
            <h3 className="__quickTitle">Quick Stats</h3>
            <div className="__flex __boards">
                <div className="__board">
                    <p className="__boardHead">{students.length}</p>
                    <p className="__boardDetails">Total Students</p>
                </div>
                <div className="__board">
                    <p className="__boardHead">{checkedInCount}</p>
                    <p className="__boardDetails">Active Students</p>
                </div>
                <div className="__board">
                    <p className="__boardHead">{checkedOutCount}</p>
                    <p className="__boardDetails">Inactive Students</p>
                </div>
            </div>
        </div>
        <div className="--flex-center __firstCon">
            <h4 className="__title">Recent Activities</h4>
                    <div className="__users">
                        <table className="home_table">
                            <tbody>
                                {checkedInStudents.length > 0 ? (
                                    checkedInStudents.map((student) => {
                                        const {name, checkedInTime, _id} = student;
                                        return (
                                            <tr className='table_data' key={_id}>
                                                <td className='table_data'>{name} <p>{formatName(name)} has checked In</p></td>
                                                <td>{formatDistanceToNow(checkedInTime, {addSuffix:  true})}</td>
                                            </tr>
                                        )
                                    })
                                ) : (
                                    <tr><td colSpan={2}>No recent checkIns</td></tr>)}
                            </tbody>
                        </table>
                    </div>

                    <div className="__users">
                        <table className="home_table">
                            <tbody>
                                {checkedOutStudents.length > 0 ? (
                                    checkedOutStudents.map((student) => {
                                        const {name, checkedOutTime, _id} = student;
                                        return (
                                            <tr className='table_data' key={_id}>
                                                <td className='table_data'>{name} <p>{formatName(name)} has checked Out</p></td>
                                                <td>{formatDistanceToNow(checkedOutTime, {addSuffix:  true})}</td>
                                            </tr>
                                        )
                                    })
                                ) : (
                                    <tr><td colSpan={2}>No recent checkOut</td></tr>)}
                            </tbody>
                        </table>
                    </div>
        </div>

        <div className="__lastCon">
            <h3 className="__lastTitle">Quick Actions</h3>
            <div>
                <button className="__addBtn">
                    <Link style={{color: 'white'}} to='/studentreg'>Add student</Link>
                </button>
                <button className="__attendBtn">
                    <Link to='/room'>Add Room</Link>
                </button>
            </div>
        </div>
    </div>
  )
}

export default HomeDash;
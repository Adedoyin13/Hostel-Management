import React, { useContext } from 'react'
import { UserContext } from './UserContext'
import { Navigate, Outlet } from 'react-router-dom';

const RequireAuth = () => {
    const {user} = useContext(UserContext);
    const content = user? (<Outlet/>) : (<Navigate to={'/login'} replace/>)
    return content;
}

export default RequireAuth
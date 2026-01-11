import React from 'react';
import useAuth from '../Hooks/useAuth';

import { Navigate, useLocation } from 'react-router';
import Loading from '../Component/Loading/Loading';

const PrivateRoutes = ({children}) => {
    const{loading, user} = useAuth()
    const location = useLocation()
    // console.log('....', location)

    if(loading){
        return <Loading/>
    }

    if(!user){
        return <Navigate to='/auth/login' state={location.pathname}></Navigate>
    }
    return children
};

export default PrivateRoutes;
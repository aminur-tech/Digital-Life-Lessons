import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../../Component/Header/Navbar';
import Footer from '../../Component/Footer/Footer';

const HomeLayouts = () => {
    return (
        <div className='w-full p-1'>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default HomeLayouts;
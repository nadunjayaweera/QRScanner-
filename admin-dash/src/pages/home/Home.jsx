import React from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import "./home.scss";
import Navbar from '../../components/navbar/Navbar';
import 'react-circular-progressbar/dist/styles.css';
import Table from '../../components/table/Table';

const Home = () => {
  return (
    <div className='home'>
        <Sidebar/>
        <div className="homeContainer">
          <Navbar/>
          
          <div className="listContainer">
            <div className="listTitle">Available Products</div>
            <Table/>
          </div>
        </div>
    </div>
  )
}

export default Home
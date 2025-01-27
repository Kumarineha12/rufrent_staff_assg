import React from "react";
import {  FaUsers, FaTable, FaChartLine, FaBuilding, FaTasks, FaCity, FaUser, FaFileAlt } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="min-h-screen flex">
    <div className="w-64 bg-gray-800 border-gray-700 h-full">
      <div className="text-blue-500 text-2xl font-bold mb-2 flex items-center justify-center m-6">LOGO</div>  
      <hr className="border-t-2 border-white mb-5 block w-full" />
      <ul className="mt-5">
        <li className="flex items-center px-6 py-3 space-x-2 hover:cursor-pointer text-gray-300 hover:bg-gray-700 hover:text-white hover:w-full">
          <FaChartLine className="text-sm font-medium" />
          <span>Dashboard</span>
        </li>
        <li className="flex items-center px-6 py-3 space-x-2 hover:cursor-pointer text-gray-300 hover:bg-gray-700 hover:text-white">
          <FaBuilding className="text-sm font-medium" />
          <span>Property Listings</span>
        </li>
        <li className="flex items-center px-6 py-3 space-x-2 hover:cursor-pointer text-gray-300 hover:bg-gray-700 hover:text-white">
          <FaTasks className="text-sm font-medium" />
          <span>Requests</span>
        </li>
        <li className="flex items-center px-6 py-3 space-x-2 hover:cursor-pointer text-gray-300 hover:bg-gray-700 hover:text-white">
          <FaUsers className="text-sm font-medium" />
          <span>Staff Assignment</span>
        </li>
        <li className="flex items-center px-6 py-3 space-x-2 hover:cursor-pointer text-gray-300 hover:bg-gray-700 hover:text-white">
          <FaCity className="text-sm font-medium" />
          <span>Communities</span>
        </li>
        <li className="flex items- px-6 py-3 space-x-2 hover:cursor-pointer text-gray-300 hover:bg-gray-700 hover:text-white">
          <FaUser className="text-sm font-medium" />
          <span>User Management</span>
        </li>
        <li className="flex items-center px-6 py-3 space-x-2 hover:cursor-pointer text-gray-300 hover:bg-gray-700 hover:text-white">
          <FaTable className="text-sm font-medium" />
          <span>DB Tables</span>
        </li>
        <li className="flex items-center px-6 py-3 space-x-2 hover:cursor-pointer text-gray-300 hover:bg-gray-700 hover:text-white">
          <FaFileAlt className="text-sm font-medium" />
          <span>Reports</span>
        </li>
      </ul>
    </div>
    </div>
  );
};

export default Sidebar;
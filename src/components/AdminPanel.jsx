import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faUserCircle, faMoon, faL } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./Sidebar";
import axios from "axios";
const apiUrl = "http://localhost:5000/api";

import {
  fetchid,
  fetchCommunities,
  fetchRMs,
  fetchFMs,
} from "../services/newApiServices";

const AdminPanel = ({ rmfm, setRmfm }) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [communities, setCommunities] = useState([]);
  const [rms, setRms] = useState([]);
  const [fms, setFms] = useState([]);
  const [ids, setIds] = useState([]); 
  useEffect(() => {
    const getIds = async () => {
      try {
        const iddata = await fetchid(); 
        setIds(iddata); // Store them in state
        console.log("id",iddata)
      } catch (error) {
        console.error("Error fetching IDs:", error);
      }
    };
    getIds();
  }, []); 
  
  // Fetch initial data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const communitiesData = await fetchCommunities();
        setCommunities(communitiesData);
        const rmsData = await fetchRMs();
        setRms(rmsData);
        const fmsData = await fetchFMs();
        setFms(fmsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleRowEdit = (index) => {
    setEditingIndex(editingIndex === index ? null : index);
  };
  

  const handleAddRow = () => {
    const maxId = Math.max(...ids.map((row) => row.id ? row.id : 0));  
    const newId = maxId + 1;    
    const newRow = {
      id: newId,
      community_id: "",  
      rm_id: "",         
      fm_id: "",         
    };
    setIds([...ids, newRow]);
    setRmfm([...rmfm, newRow]);
  };

  const handleRowDelete = async (index) => {
    try {
    const rowId = ids[index]?.id;
      console.log("Current Row:", rowId);
      if (!rowId) {
        alert("Invalid row ID. Cannot delete.");
        return;
      }
      const confirmed = window.confirm("Are you sure you want to delete this row?");
      if (!confirmed) return;
      await axios.delete("http://localhost:5000/api/deleteRecord", {
        data: {
          tableName: "dy_rm_fm_com_map",
          whereCondition: `id=${rowId}`,
        },
      });
      // Update UI after successful deletion
      const updatedRmfm = rmfm.filter((_, i) => i !== index);
      setRmfm(updatedRmfm);
      const updatedIds = ids.filter((_, i) => i !== index);
      setIds(updatedIds);
      setEditingIndex(null);
      alert("Row deleted successfully.");
    } catch (error) {
      console.error("Error deleting row:", error);
      alert("Failed to delete the row. Please try again.");
    }
  };
 
  const handleSave = async(index) =>{
    const newRmfm = [...rmfm];
    const tableIndex = ids[index]?.id;
    try{
      const response = await axios.get(
        `http://localhost:5000/api/getRecords?tableName=dy_rm_fm_com_map&fieldNames=id`
      );
        const arrIndex = response.data.result;
        const arrayInd=[];
        for (let user of arrIndex) {
          arrayInd.push(user.id);
        }
        let chk= false;
        for (let ind of arrayInd) {
          if(ind == tableIndex){
            chk=true;
            break;
          }
        }       
       const communityid=newRmfm[index].community_id;
       const fmid=newRmfm[index].fm_id;
       const rmid=newRmfm[index].rm_id;
       const obj=[tableIndex,communityid,fmid,rmid];
        if(chk==true){
          await axios.put("http://localhost:5000/api/updateRecord", {
            tableName: "dy_rm_fm_com_map",
            fieldValuePairs: {
              "community_id":communityid,
              "fm_id":fmid,
              "rm_id ":rmid
            },
            whereCondition: `id=${tableIndex}`,
          });
          location.reload();
        }else{
          const response = await axios.post("http://localhost:5000/api/addNewRecord", {
            tableName: "dy_rm_fm_com_map",
            fieldNames: "id,community_id,fm_id,rm_id",
            fieldValues:  obj.join(','),
          });
          location.reload();
        }
        setEditingIndex(null);
        alert("Save data successful!");
    }
    catch{
      console.log("error");
    }
  }

  const handleSelectCommunity = async (e, index) => {
    const newRmfm = [...rmfm];
    newRmfm[index].community_id = e.target.value;
    setRmfm(newRmfm);
  };

  const handleSelectRM = async (e, index) => {
    const newRmfm = [...rmfm];
    newRmfm[index].rm_id = e.target.value;
    setRmfm(newRmfm);
  };

  const handleSelectFM = async (e, index) => {
    const newRmfm = [...rmfm];
    newRmfm[index].fm_id = e.target.value;
    setRmfm(newRmfm);
  };

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1">
        <header className="bg-white h-16 border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between px-10 py-4">
            <h1 className="text-xl font-semibold text-gray-800 ml-60">Admin Panel</h1>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <FontAwesomeIcon icon={faBell} />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <FontAwesomeIcon icon={faMoon} />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <FontAwesomeIcon icon={faUserCircle} />
              </button>
            </div>
          </div>
        </header>

        <div className="flex-1 p-4 w-full">
          <div className="bg-white p-2 rounded-lg shadow">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Manager Allocation</h2>
              <input
                type="text"
                placeholder="Search community..."
                className="border border-gray-300 px-4 py-2 rounded w-1/3"
                disabled
              />
              <div className="flex space-x-4">
                <button onClick={handleAddRow} className="bg-blue-500 text-white px-3 py-2 rounded">
                  Add
                </button>
                <button
                  className="bg-green-500 text-white px-3 py-2 rounded"
                  onClick={()=>handleSave(editingIndex)}
                >
                  Save
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-2 rounded"
                  onClick={() => handleRowDelete(editingIndex)}
                >
                  Delete
                </button>
              </div>
            </div>

            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2">Select</th>
                  <th className="border border-gray-300 px-4 py-2">ID</th>
                  <th className="border border-gray-300 px-4 py-2">Community</th>
                  <th className="border border-gray-300 px-4 py-2">RM</th>
                  <th className="border border-gray-300 px-4 py-2">FM</th>
                </tr>
              </thead>
              <tbody>
                {rmfm.map((item, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <input
                        type="checkbox"
                        checked={editingIndex === index}
                        onChange={() => handleRowEdit(index)}
                      />
                    </td>

                    <td className="border border-gray-300 px-4 py-2">
                     { ids[index]?.id }
                    </td>

                    <td className="border border-gray-300 px-4 py-2">
                      {editingIndex === index ? (
                        <select
                          className="border border-gray-300 px-4 py-2 rounded"
                          value={item.community_id}
                          onChange={(e) => handleSelectCommunity(e, index)}
                        >
                      <option value="">Select Community</option>
                          {communities.map((community) => (
                            <option key={community.id} value={community.id}>
                              {community.name}
                            </option>
                          ))}
                        </select>
                      ) : (
                        item.community_name || "Community Name"
                      )}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {editingIndex === index ? (
                        <select
                          className="border border-gray-300 px-4 py-2 rounded"
                          value={item.rm_id}
                          onChange={(e) => handleSelectRM(e, index)}
                        >
                      <option value="">Select RM</option>
                          {rms.map((rm) => (
                            <option key={rm.rm_id} value={rm.rm_id}>
                              {rm.rm_name}
                            </option>
                          ))}
                        </select>
                      ) : (
                        item.rm_name || "RM Name"
                      )}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {editingIndex === index ? (
                        <select
                          className="border border-gray-300 px-4 py-2 rounded"
                          value={item.fm_id}
                          onChange={(e) => handleSelectFM(e, index)}
                        >
                    <option value="">Select FM</option>
                          {fms.map((fm) => (
                            <option key={fm.fm_id} value={fm.fm_id}>
                              {fm.fm_name}
                            </option>
                          ))}
                        </select>
                      ) : (
                        item.fm_name || "FM Name"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-end mt-4 space-x-4">
              <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">
                Previous
              </button>
              <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;



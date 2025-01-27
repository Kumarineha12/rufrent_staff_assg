import React, { useState, useEffect } from "react";
import AdminPanel from "./AdminPanel";
import { fetchRmFms } from "../services/newApiServices";

function Admin() {
  const [rmfm, setRmfm] = useState([]);

  useEffect(() => {
    const fetchrmfm = async () => {
      try {
        const response = await fetchRmFms();
        setRmfm(response.data.result);
      } catch (error) {
        console.error("Error fetching RM/FM:", error);
      }
    };
    fetchrmfm();
  }, []);
  return (
    <div className="bg-gray-100 min-h-screen">
      <AdminPanel rmfm={rmfm} setRmfm={setRmfm} />
    </div>
  );
}

export default Admin;


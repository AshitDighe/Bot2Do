import React, { useEffect, useState } from "react";
import axios from 'axios';
import "./Table.css";


const getStatusClass = (status) => {
  if (status === "Completed") {
    return "status-approved";
  } else if (status === "Paused") {
    return "status-pending";
  } else {
    return "status-delivered";
  }
};

export default function BasicTable() {
  const [tests, setTests] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3002/getTests')
      .then(response => setTests(response.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="table-container">
      <h3 className="table-title">Recent Tests</h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Test Details</th>
            <th>Status</th>
            <th>Virtual Users</th>
            <th>Duration</th>
            <th>Start Time</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tests.map((test) => (
            <tr key={test._id}>
              <td>{test.testdetails}</td>
              <td>
                <li className={`status ${getStatusClass(test.status)}`}>
                  {test.status}
                </li>
              </td>
              <td>{test.virtualusers}</td>
              <td>{test.duration}</td>
              <td>{test.starttime}</td>
              <td><i className='bi bi-three-dots-vertical'></i></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

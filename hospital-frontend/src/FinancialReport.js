import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./FinancialReport.css"; 

const FinancialReport = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/patients');
        setPatients(response.data);
        setFilteredPatients(response.data);
        
        
        const deptList = [...new Set(response.data.flatMap(patient => patient.departments))];
        setDepartments(deptList);
      } catch (err) {
        console.error('Error fetching patients:', err);
      }
    };

    fetchPatients();
  }, []);

  const handleFilterChange = (event) => {
    setSelectedDepartment(event.target.value);

    if (event.target.value === '') {
      setFilteredPatients(patients);
    } else {
      const filtered = patients.filter(patient =>
        patient.departments.includes(event.target.value)
      );
      setFilteredPatients(filtered);
    }
  };

  return (
    <div>
      
      
      {/* Department Filter */}
      <div>
        <label htmlFor="department">Filter by Department: </label>
        <select id="department" onChange={handleFilterChange} value={selectedDepartment}>
          <option value="">All Departments</option>
          {departments.map(department => (
            <option key={department} value={department}>
              {department}
            </option>
          ))}
        </select>
      </div>

      {/* Financial Report Table */}
      {filteredPatients.length > 0 ? (
        <table border="1" style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Department</th>
              <th>Amount Paid</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((patient) => (
              <tr key={patient._id}>
                <td>{patient.name}</td>
                <td>{patient.age}</td>
                <td>{patient.departments.join(', ')}</td>
                <td>{patient.amountPaid}</td>
                <td>{patient.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No patients found.</p> // Show a message if no patients match the filter
      )}
    </div>
  );
};

export default FinancialReport;

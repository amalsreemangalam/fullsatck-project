import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./PatientList.css";

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [isDataVisible, setIsDataVisible] = useState(false); // To control visibility of the patient data

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/patients');
        setPatients(response.data);
        setFilteredPatients(response.data); 

      
        const deptList = [
          ...new Set(response.data.flatMap(patient => patient.departments))
        ];
        setDepartments(deptList);
      } catch (err) {
        console.error('Error fetching patients:', err);
      }
    };

    fetchPatients();
  }, []);

  const handleDepartmentChange = (e) => {
    const selectedDept = e.target.value;
    setSelectedDepartment(selectedDept);

    if (selectedDept === '') {
      setIsDataVisible(false); 
    } else if (selectedDept === 'All') {
      setFilteredPatients(patients); 
      setIsDataVisible(true);
    } else {
      const filtered = patients.filter(patient =>
        patient.departments.includes(selectedDept)
      );
      setFilteredPatients(filtered);
      setIsDataVisible(true); 
    }
  };

  return (
    <div className="patient-list-container">
    

      {/* Department Filter */}
      <div className="filter-container">
        <select
          id="departmentFilter"
          value={selectedDepartment}
          onChange={handleDepartmentChange}
        >
          <option value="">Select Department</option>
          <option value="All">All Departments</option>
          {departments.map(department => (
            <option key={department} value={department}>
              {department}
            </option>
          ))}
        </select>
      </div>

      {/* Patient Table - Only show if data is visible */}
      {isDataVisible && filteredPatients.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Departments</th>
              <th>Amount Paid</th>
              <th>Balance</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map(patient => (
              <tr key={patient._id}>
                <td>{patient.name}</td>
                <td>{patient.email}</td>
                <td>{patient.departments.join(', ')}</td>
                <td>{patient.amountPaid}</td>
                <td>{patient.balance}</td>
                <td>{new Date(patient.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        isDataVisible && <p>No patients found.</p> // Show message if no data is found after selecting a department
      )}
    </div>
  );
};

export default PatientList;

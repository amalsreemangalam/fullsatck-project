import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Landingpage';

const LandingPage = () => {
  const [patients, setPatients] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [filteredPatients, setFilteredPatients] = useState([]);

  useEffect(() => {
    // Fetch patients data
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/patients');
        setPatients(response.data);
        setFilteredPatients(response.data);

        // Extract unique departments
        const deptList = [
          ...new Set(response.data.flatMap((patient) => patient.departments)),
        ];
        setDepartments(deptList);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchPatients();
  }, []);

  // Filter data by department
  const handleDepartmentFilter = (e) => {
    const selectedDept = e.target.value;
    setSelectedDepartment(selectedDept);

    if (selectedDept === '') {
      setFilteredPatients(patients);
    } else {
      const filtered = patients.filter((patient) =>
        patient.departments.includes(selectedDept)
      );
      setFilteredPatients(filtered);
    }
  };

  return (
    <div className="landing-page">
  
      
      {/* Department Filter */}
      <div className="filter-container">
        <select
          id="department"
          value={selectedDepartment}
          onChange={handleDepartmentFilter}
        >
          <option value="">All Departments</option>
          {departments.map((department) => (
            <option key={department} value={department}>
              {department}
            </option>
          ))}
        </select>
      </div>

      {/* Display filtered patients */}
      <div>
        {filteredPatients.length > 0 ? (
          <ul>
            {filteredPatients.map((patient) => (
              <li key={patient._id}>{patient.name} - {patient.departments.join(', ')}</li>
            ))}
          </ul>
        ) : (
          <p>No patients found.</p>
        )}
      </div>
    </div>
  );
};

export default LandingPage;

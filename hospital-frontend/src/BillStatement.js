import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BillStatement.css';

const BillStatement = () => {
  const [billData, setBillData] = useState([]);
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [amountFilter, setAmountFilter] = useState(''); // State for the amount filter

 
  useEffect(() => {
    const fetchBillData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/bills');
        setBillData(response.data); 
      } catch (err) {
        console.error('Error fetching bill data:', err);
      }
    };

    fetchBillData();
  }, []);


  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/patients');
        setPatients(response.data);
        setFilteredPatients(response.data);
      } catch (err) {
        console.error('Error fetching patients:', err);
      }
    };

    fetchPatients();
  }, []);

  const handleAmountFilterChange = (event) => {
    const value = event.target.value;
    setAmountFilter(value);

    if (value === '') {
      setFilteredPatients(patients); 
    } else {
      const range = value.split('-'); 
      const minAmount = parseFloat(range[0]);
      const maxAmount = parseFloat(range[1]);

      const filtered = patients.filter(patient =>
        patient.amountPaid >= minAmount && patient.amountPaid <= maxAmount
      );
      setFilteredPatients(filtered);
    }
  };

 
  const downloadCSV = (type) => {
    let csv = '';
    let headers = [];
    let rows = [];

    if (type === 'bills') {
      headers = ['Patient Name', 'Amount Paid', 'Date'];
      rows = billData.map(bill => [
        bill.patientName,
        bill.amountPaid,
        bill.date ? new Date(bill.date).toLocaleDateString() : 'N/A'
      ]);
    } else if (type === 'patients') {
      headers = ['Name', 'Age', 'Amount Paid', 'Balance'];
      rows = filteredPatients.map(patient => [
        patient.name,
        patient.age,
        patient.amountPaid,
        patient.balance
      ]);
    }

   
    csv += headers.join(',') + '\n';
    rows.forEach(row => {
      csv += row.join(',') + '\n';
    });

    
    const link = document.createElement('a');
    link.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    link.target = '_blank';
    link.download = type === 'bills' ? 'bill_statement.csv' : 'financial_report.csv';
    link.click();
  };

  return (
    <div className="bill-statement-container">
     

      <div className="download-button-container">
        <button onClick={() => downloadCSV('bills')} className="download-button">
          Download Bill Statement CSV
        </button>
      </div>

      {/* Bill Statement Table */}
      <table border="1">
        
        <tbody>
          {billData.map(bill => (
            <tr key={bill._id}>
              <td>{bill.patientName}</td>
              <td>{bill.amountPaid}</td>
              <td>{bill.date ? new Date(bill.date).toLocaleDateString() : 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Amount Filter for Financial Report */}
      <div>
        <label htmlFor="amount">Filter by Amount Paid: </label>
        <select id="amount" onChange={handleAmountFilterChange} value={amountFilter}>
          <option value="">All Amounts</option>
          <option value="0-1000">0 - 1000</option>
          <option value="1001-5000">1001 - 5000</option>
          <option value="5001-10000">5001 - 10000</option>
          <option value="10001-20000">10001 - 20000</option>
          <option value="20001-50000">20001 - 50000</option>
        </select>
      </div>

      {/* Financial Report Table */}
      {filteredPatients.length > 0 ? (
        <table border="1" style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Amount Paid</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((patient) => (
              <tr key={patient._id}>
                <td>{patient.name}</td>
                <td>{patient.age}</td>
                <td>{patient.amountPaid}</td>
                <td>{patient.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No patients found.</p>
      )}
    </div>
  );
};

export default BillStatement;

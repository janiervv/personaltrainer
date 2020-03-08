import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css'

export default function Customerlist() {

    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(response => setCustomers(response.content));
    }, []
    );



    const columns = [
        {
            Header: 'Name',
            accessor: 'firstname',
            width: 300
        },

        {
            Header: 'Last name',
            accessor: 'lastname',
            width: 300
        },

        {
            Header: 'Email',
            accessor: 'email',
            width: 300
        }

    ];


    
  return (
    <div className="table">
            <ReactTable filterable={true} data={customers} columns={columns}/>
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css'
import Button from '@material-ui/core/Button';
import AddCustomer from './AddCustomer';
import Editcustomer from './EditCustomer';

export default function Customerlist() {

    const [customers, setCustomers] = useState([]);

    useEffect(() => getData(), []);


    const getData = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(response => setCustomers(response.content));
    }

    const addCustomer = (newcustomer) => {
        fetch ('https://customerrest.herokuapp.com/api/customers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newcustomer)
    })
    .then(res => getData())
    .catch(err => console.log(err))
        }

    const deleteCustomer = (link) => {
            if (window.confirm('Are you sure?')){
            fetch(link, {method: 'DELETE'})
            .then(res => getData())
            .catch(err => console.error(err));
        }
        }

    const updateCustomer = (customer, link) => {
        
        fetch(link, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(customer)
    })
        .then(res => getData())
        .catch(err => console.error(err));
    }




    const columns = [

        {
            accessor: 'links[0].href',
            //Alla luodaan URL, joka ohjaa sivulle customertainings. URLiin liitetään asiakkaan ID (ID haetaan accessorina olevasta href-linkistä)
            Cell: row => <Button variant="outlined" onClick={event =>  window.location.href='customertrainings/' + (row.value.substring(row.value.lastIndexOf('/') + 1))}>See trainings</Button>,
            sortable: false,
            filterable: false,
            width: 220
        },

        {
            Header: 'Name',
            accessor: 'firstname',
            width: 150
        },

        {
            Header: 'Last name',
            accessor: 'lastname',
            width: 140
        },

        {
            Header: 'Email',
            accessor: 'email',
            width: 200
        },

        {
            Cell: row => <Editcustomer updateCustomer={updateCustomer} customers={row.original} />,
            sortable: false,
            filterable: false,
            width: 100
        },

        {
            accessor: 'links[0].href',
            Cell: row => <Button size="small" variant="contained" color="secondary" onClick={() => deleteCustomer(row.value)}>Delete</Button>,
            sortable: false,
            filterable: false,
            width: 100
        }

    ];


    
  return (
    <div className="table">
            <div><AddCustomer addCustomer={addCustomer}/></div>
            <ReactTable filterable={true} data={customers} columns={columns}/>
    </div>
  );
}
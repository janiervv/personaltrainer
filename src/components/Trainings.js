import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import * as moment from 'moment';
import Button from '@material-ui/core/Button';


export default function TrainingsList() {

    useEffect(() => getData(), []);

    const [trainings, setTrainings] = useState([]);

    const getData = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(response => setTrainings(response));
    };

    const deleteTraining = (id) => {
        if (window.confirm('Are you sure?')){
        fetch(`https://customerrest.herokuapp.com/api/trainings/${id}`, 
        {method: 'DELETE'})
        .then(res => getData())
        .catch(err => console.error(err));
    }
    }

    

    const columns = [
        {
            Header: 'Time',
            id: 'date',
            accessor: row => moment(row.date).format('DD-MM-YYYY hh:mm'),
            width: 250
        },

        {
            Header: 'Duration',
            accessor: 'duration',
            width: 150
        },

        {
            Header: 'Activity',
            accessor: 'activity',
            width: 250
        },

        {
            Header: 'Customer',
            accessor: 'customer.firstname',
            width: 100
        },

        {
            Header: 'Customer',
            accessor: 'customer.lastname',
            width: 100
        },

        {
            accessor: 'id',
            Cell: row => <Button size="small" variant="contained" color="secondary" onClick={() => deleteTraining(row.value)}>Delete</Button>,
            sortable: false,
            filterable: false,
            width: 100
        }

    ];


    
  return (
    <div className="table">

            <ReactTable filterable={true} data={trainings} columns={columns}/>

    </div>
  );
}
import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import * as moment from 'moment';


export default function TrainingsList() {

    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then(response => response.json())
        .then(response => setTrainings(response.content));
    }, []
    );



    const columns = [
        {
            Header: 'Time',
            id: 'date',
            accessor: row => moment(row.date).format('DD-MM-YYYY hh:mm'),
            width: 300
        },

        {
            Header: 'Duration',
            accessor: 'duration',
            width: 300
        },

        {
            Header: 'Activity',
            accessor: 'activity',
            width: 300
        }

    ];


    
  return (
    <div class="table">
        <table>
        <tbody>
            <ReactTable filterable={true} data={trainings} columns={columns}/>
        </tbody>
        </table>
    </div>
  );
}
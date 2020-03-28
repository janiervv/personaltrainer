import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import * as moment from 'moment';
import Button from '@material-ui/core/Button';
import Addtraining from './AddTraining';


export default function Customertrainings(props) {


    useEffect(() => getData(), []);

    {/*Otetaan asiakkaan ID vastaan propsina, ja syötetään se alempana fetch-lauseeseen */}

    const [trainings, setTrainings] = useState([]);
    const [customer, setCustomer] = useState([]);
    var id = props.id
    var url = `https://customerrest.herokuapp.com/api/customers/${id}`;
    console.log(id)

    const getData = () => {
        fetch(`https://customerrest.herokuapp.com/api/customers/${id}/trainings`)
        .then(response => response.json())
        .then(response => setTrainings(response.content));

        fetch(`https://customerrest.herokuapp.com/api/customers/${id}`)
        .then(response => response.json())
        .then(response => setCustomer(response));
    };

 

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
        },
        

    ];


  return (
    <div className="table">
        <div className="info">
            <div>
            <p>{customer.firstname} {customer.lastname}</p>
            <p>{customer.streetaddress} {customer.postcode} {customer.city}</p>
            <p>{customer.email}</p>
            </div>
            <div>
            <Button style={{height: 65}} onClick={event =>  window.location.href='/customers'}>Back to front page</Button>
            <Addtraining url={url} getData={getData}/>
            </div>
            </div>
            <ReactTable filterable={true} data={trainings} columns={columns}/>

    </div>
  );
}
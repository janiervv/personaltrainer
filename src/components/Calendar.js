import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useState, useEffect } from 'react';




export default function Trainingcalendar(){

    const [timings, setTimings] = useState([]);
    const localizer = momentLocalizer(moment);
    const [events, setEvents] = useState([]);
    const events_temporaty = [];



    // Ensin haetaan tiedot kaikista harjoituksista ja tallennetaan ne setTimingsiin

    useEffect(() => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(response => setTimings(response))

    },[])




    // Kun setTimings päivittyy, päivitetään "events_temporaty"-muuttuja
    // events_temporaty-muuttujaan tuodaan kaikkien harjoituksien tiedot

    useEffect(() => {


        for (var i = 0; i < timings.length; i++) {
            events_temporaty.push(
        {
            title: timings[i].activity + ", " + timings[i].customer.firstname + " " + timings[i].customer.lastname,
            start: moment(timings[i].date).toDate(),
            end: moment(timings[i].date).add(timings[i].duration, 'm').toDate()
        })
    } setEvents(events_temporaty)
    }, [timings]) // Tämä siis tehdään kun fetch on haettu, eli kun "timings" on päivittynyt




    return (
        <div>

          <div style={{ height: '480pt'}}>
            <Calendar 
                events={events}
                startAccessor="start"
                endAccessor="end"
                localizer={localizer}
                defaultDate={moment().toDate()}
                defaultView='week'
                step={60}
                showMultiDayTimes
            />
          </div>
        </div>
      );
}
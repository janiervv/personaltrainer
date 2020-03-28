import React from 'react';
import Customertrainings from './CustomerTrainings';
import {useParams} from "react-router"



export default function Customerpage(){

    {/*Customerpage vastaanottaa asiakkaan ID.n URLista, ja tekee siitä muuttujan "id" */}

    const {id} = useParams();

    return(
    <div>

            {/*Renderöidään sivulle komponentti Customertrainings, ja syötetään sille
             parametrinä asiakkaan ID. Täten saamme sivulle asiakkaan omat harjoitukset. */}

            <Customertrainings id={id}/>
    </div>
    )
}
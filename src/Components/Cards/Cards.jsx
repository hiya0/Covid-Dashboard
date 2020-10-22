import React from 'react';
import { Grid} from '@material-ui/core';

import SingleCard from './Card/SingleCard';
import styles from './Cards.module.css';

const Cards = ({data: { confirmed, recovered, deaths, lastUpdate } }) => {
    if(!confirmed)
        return "Loading...";

    return(
        <div className={styles.container}>
            <Grid container spacing={3} justify="center">
                <SingleCard className={styles.infected} cardTitle="Infected" value={confirmed.value} 
                    lastUpdate={lastUpdate} cardSubtitle="Number of active cases of COVID-19"/>

                <SingleCard className={styles.recovered} cardTitle="Recovered" value={recovered.value} 
                    lastUpdate={lastUpdate} cardSubtitle="Number of recoveries from COVID-19"/>

                <SingleCard className={styles.deaths} cardTitle="Deaths" value={deaths.value} 
                    lastUpdate={lastUpdate} cardSubtitle="Number of deaths caused by COVID-19"/>   
            </Grid>
        </div>
    );
}

export default Cards;
import React from 'react';
import { Card,CardContent,Typography,Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import CountUp from 'react-countup';
import cx from 'classnames';

import styles from './SingleCard.module.css';

const useStyles= makeStyles({
    title:{
        color: "rgba(241, 167, 7, 0.938)",
        fontSize:"25px"
    },
    date:{
        fontSize:"13px"
    },
    subtitle:{
        marginTop:"3px",
        fontSize:"15px"
    }
})

const SingleCard=({className,cardTitle,value,lastUpdate,cardSubtitle})=> {
    const classes=useStyles();
    return(
        <Grid item component={Card} xs={12} md={3} className={cx(styles.card,className)}>
            <CardContent>
                <Typography className={classes.title} gutterBottom>{cardTitle}</Typography>
                <Typography variant="h5" color="primary"><CountUp start={0} end={value} duration={1.0} separator=","/></Typography>
                <Typography color="textSecondary" className={classes.date}>{new Date(lastUpdate).toDateString()}</Typography>
                <Typography variant="body2" className={classes.subtitle}>{cardSubtitle}</Typography>
            </CardContent>
        </Grid>
    );
}

export default SingleCard;
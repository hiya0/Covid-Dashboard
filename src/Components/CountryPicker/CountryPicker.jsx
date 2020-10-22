import React,{useState,useEffect} from 'react';
import {NativeSelect,FormControl} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import { countries } from '../../api';


const useStyles=makeStyles({
    base:{
        marginTop: '20px',
        marginBottom:'25px',
        paddingLeft:'5px'
    }
})

const CountryPicker = ({handleCountryChange}) => {
    const [country,setCountry]=useState();

    useEffect(()=>{
        const fetchCountries=async()=>{
            setCountry(await countries());
        }
        fetchCountries();
    },[]);

    const classes=useStyles();

    return(
       <FormControl>
           <NativeSelect className={classes.base} defaultValue="" onChange={(e)=>handleCountryChange(e.target.value)}>
               <option value="">Global</option>
               {country?country.map((c,index)=><option key={index} value={c}>{c}</option>)
               :""}
           </NativeSelect>
       </FormControl>
    );
}

export default CountryPicker;
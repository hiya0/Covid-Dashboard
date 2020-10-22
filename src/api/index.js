import axios from 'axios';

const url='https://covid19.mathdro.id/api';

export const fetchData= async(country) =>{
    let modurl=url;
    if(country)
        modurl=`${url}/countries/${country}`;
    try{
        const {data:{ confirmed,recovered,deaths,lastUpdate}}= await axios.get(modurl);
        const modifiedData = {confirmed,recovered,deaths,lastUpdate};
        

        return modifiedData;

    } catch(error) {
        console.log(error);
    }
}

export const fetchDailyData= async() => {
    try{
        const {data}= await axios.get('https://api.covidtracking.com/v1/us/daily.json')
        const modifiedData=data.map(({positive,recovered,death,dateChecked: date})=>({
            confirmed:positive,
            recovered,
            deaths:death,
            date
        }));
        return modifiedData;
    } catch(error)
    {
        console.log(error)
    }
}

export const countries = async() => {
    try{
        const {data:{countries}}=await axios.get(`${url}/countries`);
        
        return countries.map((country)=>country.name)
    }catch(error)
    {
        console.log(error)
    }
}
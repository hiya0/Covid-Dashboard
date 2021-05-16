import axios from 'axios';

export const fetchDailyData= async() => {
    try{
        const {data}= await axios.get('https://api.apify.com/v2/key-value-stores/tVaYRsPHLjNdNBu7S/records/LATEST?disableRedirect=true')
        const modifiedData=data.map(({infected,recovered,deceased,lastUpdatedApify: date})=>({
            confirmed:infected,
            recovered,
            deaths:deceased,
            date
        }));
        return modifiedData;
    } catch(error)
    {
        console.log(error)
    }
}

//api for map
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



export const countries = async() => {
    try{
        const {data:{countries}}=await axios.get(`${url}/countries`);
        
        return countries.map((country)=>country.name)
    }catch(error)
    {
        console.log(error)
    }
}
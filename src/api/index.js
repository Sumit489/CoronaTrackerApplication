import Axios from 'axios'
import _ from 'lodash';
const url ='https://covid19.mathdro.id/api';

export const fetchData=async (country)=>{
    let changeableur = url;
    if(country){
        changeableur =`${url}/countries/${country}`
    }
    try {
        const {data:{confirmed,recovered,deaths,lastUpdate}} = await Axios.get(changeableur);
        
        const modifiedData={
            confirmed,
            recovered,
            deaths,
            lastUpdate
        }
        return modifiedData
        
    } catch (error) {
        console.log(error)
    }

}

export const fetchDailyData =async()=>{
    try {
        const {data} = await Axios.get(`${url}/daily`)

        const modifiedData = data.map((dailyData)=>({
            confirmed:dailyData.confirmed.total,
            deaths:dailyData.deaths.total,
            date:dailyData.reportDate
        })) 
        
        return modifiedData
        
    } catch (error) {
        console.log(error)
    }
}

export const fetchCountries =async ()=>{
    try {
        const {data:{countries}} = await Axios.get(`${url}/countries`);
        
        return countries.map((country)=>country.name)
        
    } catch (error) {
        console.log(error)
    }
}

export const fetchGujarat = async() =>{
    try {
        
        const {data:{states_daily}} =  await Axios.get('https://api.covid19india.org/states_daily.json')
        const modifiedData = states_daily.map((data)=>({
            date:data.date,
            status:data.status,
            count:data.gj
            
        }))
        const Confirmedfilter  = _.filter(modifiedData,function(o){return o.status==="Confirmed"})
        const recoveredfilter = _.filter(modifiedData,function(o){return o.status==="Recovered"})
        const deceased =  _.filter(modifiedData,function(o){return o.status==="Deceased"})
        
         return [Confirmedfilter,recoveredfilter,deceased]
        
    } catch (error) {
        console.log(error)
    }
}

export const gujaratcount = async()=>{
    try {
        const {data:{statewise}} =  await Axios.get('https://api.covid19india.org/data.json')
        const modifiedData = _.filter(statewise,function(o){return o.statecode==="GJ"})
         return modifiedData[0]
    } catch (error) {
        console.log(error)
    }
}
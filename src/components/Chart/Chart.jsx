import React,{useState,useEffect} from 'react'
import { fetchDailyData, fetchGujarat, gujaratcount } from '../../api'
import {Line,Bar} from 'react-chartjs-2'
import styles from './Chart.module.css'
import {Typography} from '@material-ui/core'
import { GujaratCards } from '..'

const  Chart = ({data:{confirmed,recovered,deaths},country}) =>{
    const [dailyData,setDailyData] = useState([])
    const [stateData,setStateData] = useState([])
    const [gj,setGj] = useState({})
    useEffect(()=>{
        const fetchAPI =async ()=>{
            setDailyData(await fetchDailyData());
        
        }

        const fetchgj = async()=>{
            setStateData(await fetchGujarat());
            
        }

        const fetchguj = async ()=>{
            setGj(await gujaratcount())
        }
        
        fetchAPI();
        fetchgj();
        fetchguj();
    },[])

    const lineChart=(
        dailyData.length ?
        (<Line 
        data={{
            labels:dailyData.map(({date})=>date),
            datasets:[{
                data:dailyData.map(({confirmed})=>confirmed),
                label:'Infected',
                borderColor:'#3333ff',
                fill:true,
            },{
                data:dailyData.map(({deaths})=>deaths),
                label:'Death',
                borderColor:'red',
                backgroundColor:'rgba(255,0,0,0.5)',
                fill:true,

            }],

        }}
        />) :null

    )

    const lineCharts=(
        stateData.length ?
        (<Line 
        data={{
            labels:stateData[0].map(({date})=>date),
            
            datasets:[{
                data:stateData[0].map(({count})=>count),
                label:'Confirmed',
                borderColor:'red',
                backgroundColor:'rgba(255,0,0,0.5)',
                fill:true,
            },{
                data:stateData[1].map(({count})=>count),
                label:'Recovored',
                borderColor:'blue',
                backgroundColor:'#3333ff',
                fill:true,

            },
        ],
        

        }}
        />) :null

    )
    
    const barChart =(
        confirmed?(
            <Bar 
            data={{
                labels:['Infected','Recovered','Death'],
                datasets:[{
                    label:'people',
                    backgroundColor:['rgba(0,0,255,0.5)','rgba(0,255,0,0.5)','rgba(255,0,0,0.5)'],
                    data:[confirmed.value,recovered.value,deaths.value]
                }]
            }}
            options={{
                legend:{display:false},
                title:{display:true,text:`Current State in ${country}`},
            }}
                />
        ):null
    )
    
    return(
        <div className={styles.container}>
            {country ? barChart : lineChart}
            <br/>
            <br/>
            <Typography variant="h4" color="primary" >
                            GUJARAT DAILY
            </Typography> 
            <br/>
            <GujaratCards data={gj} />
            {lineCharts}
            
        </div>
        
    )
}

export default Chart
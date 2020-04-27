import React from 'react'
// import Cards from './components/Cards/Cards'
// import Chart from './components/Chart/Chart'
// import CountryPicker from './components/CountryPicker/CountryPicker'
import styles from './App.module.css'
import { Cards,Chart,CountryPicker} from './components'
import { fetchData } from './api'
import coronaimage from '../src/images/image.png'
class App extends React.Component{
    state={
        data:{},
        country:''
    }

    handleCountryChange = async(country)=>{
        const fetcheddata = await fetchData(country);
        this.setState({data:fetcheddata,country:country})

    }
   async  componentDidMount(){
        const fetcheddata = await fetchData();
        this.setState({data:fetcheddata})
    }
    render(){
        const {data,country} = this.state
        return(
            <div className={styles.container}>
                <img className={styles.image} src={coronaimage} alt="Covid-19"/>
                <Cards data={data} />
                <CountryPicker handleCountryChange={this.handleCountryChange}/>
                <Chart data={data} country={country} />
                
            </div>
        )
    }
}
export default App
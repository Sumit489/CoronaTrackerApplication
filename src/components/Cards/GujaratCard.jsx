import React from 'react'
import {Card,CardContent,Typography,Grid} from '@material-ui/core'
import styles from './Cards.module.css'
import CountUp from 'react-countup'
import cx from 'classnames'

const  GujaratCard = (data) =>{
    if(!data.data.confirmed){
        return 'Loading....'
    }
    return(
        <div className={styles.container}>
            <Grid container spacing={3} justify="center" >
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card,styles.infected)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                            Infected
                        </Typography>
                        <Typography variant="h5" >
                            <CountUp start={0} end={parseInt(data.data.confirmed)} duration={4} separator=','/>
                        </Typography>
                        <Typography color="textSecondary" >
                            {(data.data.lastupdatedtime)}
                        </Typography>
                        <Typography variant="body2">
                            Number of active cases of  covid-19
                        </Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card,styles.recovered)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                            Recovered
                        </Typography>
                        <Typography variant="h5" >
                            <CountUp start={0} end={parseInt(data.data.recovered)} duration={4} separator=','/>
                        </Typography>
                        <Typography color="textSecondary" >
                        {data.data.lastupdatedtime}
                        </Typography>
                        <Typography variant="body2">
                            Number of Recovered cases of  covid-19
                        </Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card,styles.death)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                            Death
                        </Typography>
                        <Typography variant="h5" >
                            <CountUp start={0} end={parseInt(data.data.deaths)} duration={4} separator=','/>
                        </Typography>
                        <Typography color="textSecondary" >
                        {data.data.lastupdatedtime}
                        </Typography>
                        <Typography variant="body2">
                            Number of Death cases due to covid-19
                        </Typography>
                    </CardContent>
                </Grid>
            </Grid>
        </div>
    )
}

export default GujaratCard
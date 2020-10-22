import React from 'react';
import Switch from '@material-ui/core/Switch';

import Cards from './Components/Cards/Cards';
import Chart from './Components/Chart/Chart';
import CountryPicker from './Components/CountryPicker/CountryPicker';

import {fetchData} from './api/index';
import styles from './App.module.css';

import image from './image/logo1.jpg';
import CovidMap from './Components/CovidMap/CovidMap';

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

class App extends React.Component {
    state = {
      data: {},
      country: '',
      flag: false,
      check: true
    }
  
    async componentDidMount() {
      const data = await fetchData();
  
      this.setState({ data });
    }


    handleCountryChange = async (country) => {
      const data = await fetchData(country);
  
      this.setState({ data, country: country });
    }

    handleChange=()=>{
      var val=!this.state.flag;
      var ch=!this.state.check;
      this.setState({flag: val,check:ch})
    }
  
    render() {
      const { data, country,flag,check } = this.state;
  
      return (
        <div className={styles.container}>
          <img className={styles.image} alt="covid" src={image}/>
          <CountryPicker handleCountryChange={this.handleCountryChange} />
          <Cards data={data} />
          <p className={styles.heading}>Switch to see the country chart</p>
          <Switch
            checked={check}
            onChange={()=>{this.handleChange()}}
            name="checked"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
           />
           {
             flag ? <Chart data={data} country={country} /> 
             : <CovidMap/>
           }
           <div className={styles.footer}>
              <CssBaseline />
              <Container component="main" maxWidth="sm">
                <Typography variant="body1" align="center"><Link href='https://github.com/hiya0'>GitHub Profile</Link></Typography>
              </Container>
            </div>
        </div>
      );
    }
  }
  
  export default App;
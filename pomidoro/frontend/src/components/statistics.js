import React, { Component } from "react";
import Configuration from "./extra/configuration";
import Navigation from "./extra/navigation";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import axios from "axios";
import Cookies from "js-cookie";

import TimerFooter from "./extra/timer_footer";
import { renderChart } from "../actions/chartStatistic";

class Statistics extends Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
    this.chartInstance = null;

  }

  componentDidMount() {
    axios
      .get(`http://localhost:8081/api/tasks/countByWeek/${Cookies.get('token')}`)
      .then((response) => {
        const data = response.data;
        this.chartInstance = renderChart(this.chartRef, data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <div>
        <Configuration />
        <HelmetProvider>
          <Helmet>
            <title>{"Pomidoro | Statistics"}</title>
          </Helmet>
        </HelmetProvider>
        <link rel ="stylesheet" type = "text/css" href="css/statistics.css"/>
        <link rel ="stylesheet" type = "text/css" href="css/extra/navigation.css"/>
        <Navigation />
        <main>
        <div className="base_container">
          
            <div className="canvas-container">
              <canvas ref={this.chartRef} id="myChart"></canvas>
            </div>
            
            <TimerFooter/>
            </div>
          
          </main>
        
      </div>
    );
  }
}

export default Statistics;

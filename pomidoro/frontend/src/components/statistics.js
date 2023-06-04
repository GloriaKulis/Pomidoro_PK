import React, { Component } from "react";
import Configuration from "./extra/configuration";
import Navigation from "./extra/navigation";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import axios from "axios";
import Cookies from "js-cookie";
import Chart from 'chart.js/auto';
import TimerFooter from "./extra/timer_footer";
import { statisticsByUser } from "./extra/fetchData";

class Statistics extends Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
    this.chartInstance = null;
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    // statisticsByUser(this.state);
    axios
      .get(`http://localhost:8081/api/tasks/countByWeek/${Cookies.get('token')}`)
      .then((response) => {
        const data = response.data;
        this.setState({ data }, () => {
          this.renderChart();
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  renderChart() {
    const { data } = this.state;

    const days = data.map((item) => item[0]);
    const count = data.map((item) => item[1]);

    const chartData = {
      labels: days,
      datasets: [
        {
          label: "Statystyki dot. liczby wykonanych zadań",
          data: count,
          borderWidth: 1,
          backgroundColor: "#88C057",
          borderRadius: 20,
          fontSize: 25,
        },
      ],
    };

    const chartConfig = {
      type: "bar",
      data: chartData,
      options: {
        plugins: {
          customCanvasBackgroundColor: {
            color: "#FFFFFF",
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };

    if (this.chartInstance) {
      this.chartInstance.destroy();
    }

    this.chartInstance = new Chart(this.chartRef.current, chartConfig);
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

        <div className="base_container">
          <main>
            <div className="canvas-container">
              <canvas ref={this.chartRef} id="myChart"></canvas>
            </div>
          </main>
          <div>
            <TimerFooter/>
          </div>
        </div>
      </div>
    );
  }
}

export default Statistics;

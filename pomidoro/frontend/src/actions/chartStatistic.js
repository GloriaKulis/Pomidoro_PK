import Chart from 'chart.js/auto';

export const renderChart = (chartRef, data) => {
  if (!chartRef.current) {
    return;
  }

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

  const chartInstance = new Chart(chartRef.current, chartConfig);

  return chartInstance;
};

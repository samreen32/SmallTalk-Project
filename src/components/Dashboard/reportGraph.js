import React from "react";
import ReactApexChart from "react-apexcharts";

class ReportGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        chart: {
          id: "basic-bar",
          events: {
            zoomable: false,
            pannable: false,
            markerClick: false,
            selection: false,
          },
        },
        xaxis: {
          categories: this.getPreviousMonths(8),
        },
        colors: ["#F5F5F5"],
        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 1,
            opacityTo: 0.6,
            stops: [0, 100],
          },
        },
        toolbar: {
          show: false,
        },
      },
      series: [
        {
          name: "Reports",
          data: [20, 10, 75, 0, 60, 10, 30, 56],
        },
      ],
    };
  }

  componentDidMount() {
    const chartContainer = document.querySelector(".apexcharts-canvas");
    if (chartContainer) {
      chartContainer.classList.add("no-toolbar");
    }
  }

  getPreviousMonths(numMonths) {
    const currentDate = new Date();
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const previousMonths = [];
    for (let i = numMonths - 1; i >= 0; i--) {
      const monthIndex = (currentDate.getMonth() - i + 12) % 12;
      const monthName = monthNames[monthIndex];
      previousMonths.push(`${monthName}`);
    }
    return previousMonths;
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart
          className="apexcharts-canvas"
          options={this.state.options}
          series={this.state.series}
          type="area"
          height={300}
        />
        <div
          style={{ position: "relative" }}
          className="d-flex justify-content-center"
        >
          <p
            className="graph-caption"
            style={{ position: "absolute", top: "-10px" }}
          >
            Total Reports
          </p>
        </div>
      </div>
    );
  }
}
export default ReportGraph;

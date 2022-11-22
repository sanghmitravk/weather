import Chart from "react-google-charts";
export const LineChart = ({ chartData }) => {
  console.log(chartData);
  const LineChartOptions = {
    hAxis: {
      title: "Days",
    },
    vAxis: {
      title: "Temperature",
    },
    series: {
      1: { curveType: "function" },
    },
    tooltip: { isHtml: true, trigger: "visible" },
  };

  const generateArray = () => {
    const LineData = [
      [
        "days",
        "low",
        "high",
        { role: "tooltip", type: "string", p: { html: true } },
      ],
    ];
    chartData.map((chart, index) =>
      LineData.push([
        index,
        chart.temp_min,
        chart.temp_max,
        `<p>day of the week- ${chart.day}<br/>
        description- ${chart.description}<br/>
          max temp- ${chart.temp_max}<br/>
          min temp- ${chart.temp_min}
        </p>`,
      ])
    );
    console.log(LineData);
    return LineData;
  };

  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Line Chart</h2>
      <Chart
        width={"700px"}
        height={"410px"}
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data={generateArray()}
        options={LineChartOptions}
        rootProps={{ "data-testid": "2" }}
      />
    </div>
  );
};

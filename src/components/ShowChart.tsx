import Chart from "react-google-charts";
export const LineChart = ({ chartData }: any) => {
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
    chartData.map((chart: any, index: number) =>
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
      <h2 style={{ textAlign: "center" }}>{chartData.length} days forecast</h2>
      <Chart
        width={"inherit"}
        height={"inherit"}
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data={generateArray()}
        options={LineChartOptions}
        rootProps={{ "data-testid": "2" }}
      />
    </div>
  );
};

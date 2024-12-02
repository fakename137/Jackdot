import React, { useEffect, useRef } from "react";
import { createChart, IChartApi, LineData } from "lightweight-charts";

interface LineChartProps {
  data: LineData[]; // Data passed as a prop
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null); // Reference to the chart instance

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Create the chart instance
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 400,
      layout: {
        background: { color: "#1e1e1e" }, // Dark background
        textColor: "#d1d4dc", // Light text color
      },
      grid: {
        vertLines: {
          color: "#2b2b2b", // Grid line color
        },
        horzLines: {
          color: "#2b2b2b",
        },
      },
      timeScale: {
        borderColor: "#444", // Time scale border color
      },
      rightPriceScale: {
        borderColor: "#444", // Price scale border color
      },
    });

    chartRef.current = chart;

    // Add a line series
    const lineSeries = chart.addLineSeries({
      color: "#FF0068", // Line color (green)
      lineWidth: 2,
    });

    // Set the data for the line series
    lineSeries.setData(data);

    // Automatically fit the chart to the data
    chart.timeScale().fitContent();

    // Handle chart resizing
    const handleResize = () => {
      chart.applyOptions({
        width: chartContainerRef.current?.clientWidth || 600,
      });
    };
    window.addEventListener("resize", handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [data]);

  return (
    <div ref={chartContainerRef} style={{ width: "100%", height: "400px" }} />
  );
};

export default LineChart;

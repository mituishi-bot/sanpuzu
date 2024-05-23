import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";

function Chart({ data }) {
  const chartRef = useRef();

  useEffect(() => {
    const margin = { top: 20, right: 150, bottom: 50, left: 50 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // x軸とy軸のスケール
    const x = d3.scaleLinear().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);

    // x軸とy軸のドメイン
    x.domain([4.0, d3.max(data, (d) => d.sepalLength + 0.1)]);
    y.domain([2.0, d3.max(data, (d) => d.sepalWidth)]);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const circles = svg
      .selectAll("g.dot")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "dot")
      .attr(
        "transform",
        (d) => `translate(${x(d.sepalLength)}, ${y(d.sepalWidth)})`
      );

    // 円
    circles
      .append("circle")
      .attr("r", 4.5)
      .style("fill", (d) => color(d.species));

    // 四角setosa
    svg
      .append("rect")
      .attr("x", width + 50)
      .attr("y", 0)
      .attr("width", 10)
      .attr("height", 10)
      .style("fill", color("setosa"));

    svg
      .append("text")
      .attr("x", width + 75)
      .attr("y", 5)
      .text("setosa")
      .attr("alignment-baseline", "middle")
      .style("fill", "black");
    //versiolor
    svg
      .append("rect")
      .attr("x", width + 50)
      .attr("y", 35)
      .attr("width", 10)
      .attr("height", 10)
      .style("fill", color("versicolor"));

    svg
      .append("text")
      .attr("x", width + 75)
      .attr("y", 40)
      .text("versicolor")
      .attr("alignment-baseline", "middle")
      .style("fill", "black");
    //virginica
    svg
      .append("rect")
      .attr("x", width + 50)
      .attr("y", 70)
      .attr("width", 10)
      .attr("height", 10)
      .style("fill", color("virginica"));

    svg
      .append("text")
      .attr("x", width + 75)
      .attr("y", 75)
      .text("virginica")
      .attr("alignment-baseline", "middle")
      .style("fill", "black");

    // x軸とy軸
    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    svg.append("g").call(d3.axisLeft(y));

    // x軸のラベル
    svg
      .append("text")
      .attr(
        "transform",
        "translate(" + width / 2 + " ," + (height + margin.top + 20) + ")"
      )
      .style("text-anchor", "middle")
      .text("Sepal Length");

    // y軸のラベル
    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 20)
      .attr("x", 0 - height / 2)
      .style("text-anchor", "middle")
      .text("Sepal Width");

    return () => {
      d3.select(chartRef.current).selectAll("*").remove();
    };
  }, [data]);

  return <div ref={chartRef} />;
}

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://s3-us-west-2.amazonaws.com/s.cdpn.io/2004014/iris.json")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  return <Chart data={data} />;
}

export default App;

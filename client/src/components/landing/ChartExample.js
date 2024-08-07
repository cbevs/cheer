import React, { useRef, useEffect } from "react"
import * as d3 from "d3"

const ChartExample = () => {
  const svgRef = useRef(null)

  const generateChart = () => {

    const data = [
      { mood: "Happy", date: "2024-07-01" },
      { mood: "Neutral", date: "2024-07-02" },
      { mood: "Neutral", date: "2024-07-03" },
      { mood: "Sad", date: "2024-07-04" },
      { mood: "Neutral", date: "2024-07-05" }
    ]

    const parseDate = d3.timeParse("%Y-%m-%d")
    const formatDate = d3.timeFormat("%b %d")
    data.forEach((d) => (d.date = parseDate(d.date)))

    const svgWidth = 350
    const svgHeight = 200
    const margin = { top: 20, right: 30, bottom: 40, left: 100 }
    const width = svgWidth - margin.left - margin.right
    const height = svgHeight - margin.top - margin.bottom

    const svg = d3
      .select(svgRef.current)
      .attr("width", svgWidth)
      .attr("height", svgHeight)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)

    const xScale = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => d.date))
      .range([0, width])

    const yScale = d3
      .scaleBand()
      .domain(["Sad", "Neutral", "Happy"])
      .range([height, 0])
      .padding(0.2)

    const tooltip = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0)

    svg
      .selectAll(".dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", (d) => `dot ${d.mood.toLowerCase()}`)
      .attr("cx", (d) => xScale(d.date))
      .attr("cy", (d) => yScale(d.mood) + yScale.bandwidth() / 2)
      .attr("r", 6)
      .on("mouseover", (event, d) => {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("r", 8)
          .style("stroke", "black")
          .style("stroke-width", 2)
        tooltip.transition().duration(200).style("opacity", 0.9)
        tooltip
          .html(`Date: ${formatDate(d.date)}<br>Mood: ${d.mood}`)
          .style("left", event.pageX + 5 + "px")
          .style("top", event.pageY - 28 + "px")
      })
      .on("mouseout", () => {
        d3.select(this).transition().duration(200).attr("r", 5)
        tooltip.transition().duration(500).style("opacity", 0)
      })

    svg
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale).ticks(d3.timeDay.every(1)).tickFormat(formatDate))
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dy", "-0.3em")
      .attr("dx", "1em")
      .attr("transform", "rotate(-90)")

    svg
      .append("g")
      .attr("class", "y-axis")
      .call(d3.axisLeft(yScale))
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-0.5em")
  }

  useEffect(() => {
    generateChart()
  }, [])

  return (
    <div className="chart-bg">
      <svg className="chart-example-svg" ref={svgRef}></svg>
    </div>
  )
}

export default ChartExample

"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import * as echarts from "echarts"

type LineChartProps = {
  data: any[]
  xField: string
  series: {
    name: string
    field: string
    color?: string
  }[]
  title?: string
  chartId: string
  enableTooltip?: boolean
  showLegend?: boolean
  legendOrientation?: "horizontal" | "vertical"
  legendPosition?: {
    top?: string
    bottom?: string
    left?: string
    right?: string
  }
}

const LineChartComponent: React.FC<LineChartProps> = ({
  data,
  xField,
  series,
  title,
  chartId,
  enableTooltip = true,
  showLegend = true,
  legendOrientation = "horizontal",
  legendPosition = { top: "10px" },
}) => {
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current)

      const seriesConfig = series.map((s) => ({
        name: s.name,
        type: "line",
        data: data.map((item) => item[s.field]),
        smooth: true,
        symbol: "circle",
        symbolSize: 8,
        lineStyle: {
          width: 3,
        },
        itemStyle: {
          color: s.color,
        },
      }))

      // Configuración del gráfico
      chart.setOption({
        title: {
          text: title || "",
          left: "center",
          top: "top",
          textStyle: {
            fontSize: 16,
            fontWeight: "bold",
          },
        },
        tooltip: enableTooltip
          ? {
              trigger: "axis",
              axisPointer: {
                type: "cross",
                label: {
                  backgroundColor: "#6a7985",
                },
              },
            }
          : undefined,
        legend: showLegend
          ? {
              data: series.map((s) => s.name),
              orient: legendOrientation,
              ...legendPosition,
            }
          : undefined,
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: data.map((item) => item[xField]),
          axisLine: {
            lineStyle: {
              color: "#ccc",
            },
          },
          axisLabel: {
            color: "#666",
          },
        },
        yAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#ccc",
            },
          },
          axisLabel: {
            color: "#666",
          },
          splitLine: {
            lineStyle: {
              color: "rgba(0,0,0,0.05)",
            },
          },
        },
        series: seriesConfig,
      })

      // Cleanup
      return () => {
        chart.dispose()
      }
    }
  }, [data, title, xField, series, enableTooltip, showLegend, legendOrientation])

  return (
    <div
      id={chartId}
      ref={chartRef}
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
      }}
    />
  )
}

export default LineChartComponent

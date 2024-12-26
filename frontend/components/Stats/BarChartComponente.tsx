// BarChartComponent.tsx
import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

type BarChartProps = {
  data: { value: number; name: string }[]; // Datos para el gráfico
  title?: string; // Título opcional
  chartId: string; // Identificador único para el contenedor del gráfico
  showLabels?: boolean; // Mostrar nombres de los bloques fuera del gráfico
  enableTooltip?: boolean; // Activar/desactivar tooltip al pasar el mouse
  labelPosition?: "inside" | "outside" | "center"; // Posición de los labels
  showEmphasis?: boolean; // Mostrar énfasis en los labels
  legendOrientation?: "horizontal" | "vertical"; // Orientación de la leyenda
  legendPosition?: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  }; // Posición de la leyenda
};

const BarChartComponent: React.FC<BarChartProps> = ({
  data,
  title,
  chartId,
  showLabels = false,
  enableTooltip = false,
  showEmphasis = false,
  labelPosition = "center",
  legendOrientation = "horizontal",
  legendPosition = { bottom: "0%" },
}) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const dataAxis = data.map((item) => item.name);
  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current);

      // Configuración del gráfico
      chart.setOption({
        xAxis: {
          data: dataAxis,
          axisLabel: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          z: 10,
        },
        yAxis: {
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            color: "#999",
          },
        },
        dataZoom: [
          {
            type: "inside",
          },
        ],
        tooltip: enableTooltip
          ? {
              trigger: "item",
            }
          : undefined,

        series: [
          {
            name: "Data",
            type: "bar",
            showBackground: true,
            data: data,

            label: {
              show: showLabels,
              position: labelPosition,
              formatter: "{b}: {c}",
              orient: "vertical",
            },
            legend: {
              align: "auto",
              top: "center",
              itemWidth: 15,
              orient: legendOrientation,
              ...legendPosition,
            },
            emphasis: {
              label: {
                show: showEmphasis,
                fontSize: "16",
                fontWeight: "bold",
              },
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#2378f7" },
                  { offset: 0.7, color: "#2378f7" },
                  { offset: 1, color: "#83bff6" },
                ]),
              },
            },
            labelLine: {
              show: false,
            },
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#83bff6" },
                { offset: 0.5, color: "#188df0" },
                { offset: 1, color: "#188df0" },
              ]),
            },
          },
        ],
      });

      // Cleanup
      return () => {
        chart.dispose();
      };
    }
  }, [data, title, showLabels, enableTooltip, labelPosition, dataAxis, legendOrientation, legendPosition, showEmphasis]);

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
  );
};

export default BarChartComponent;

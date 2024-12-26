// PieChartComponent.tsx
import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

type PieChartProps = {
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

const PieChartComponent: React.FC<PieChartProps> = ({
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

  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current);

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
              trigger: "item",
              formatter: "{b}: {c} ({d}%)",
            }
          : undefined,
        legend: {
          align: "auto",
          top: "center",
          itemWidth: 15,
          orient: legendOrientation,
          ...legendPosition,
        },
        series: [
          {
            name: "Data",
            type: "pie",
            radius: ["40%", "90%"],
            avoidLabelOverlap: false,
            padAngle: 5,
            data: data,
            left: "50%",
            label: {
              show: showLabels,
              position: labelPosition,
              formatter: "{b}: {c} ({d}%)",
            },
            emphasis: {
              label: {
                show: showEmphasis,
                fontSize: "16",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
          },
        ],
      });

      // Cleanup
      return () => {
        chart.dispose();
      };
    }
  }, [data, title, showLabels, enableTooltip, labelPosition, legendOrientation, legendPosition, showEmphasis]);

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

export default PieChartComponent;

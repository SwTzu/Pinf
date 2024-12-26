// VisualPieChartComponent.tsx
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

const VisualPieChartComponent: React.FC<PieChartProps> = ({
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
            name: 'Access From',
            left: "50%",
            type: 'pie',
            radius: '90%',
            center: ['50%', '50%'],
            data: data.sort(function (a, b) {
              return a.value - b.value;
            }),
            roseType: 'radius',
            label: {
              show: showLabels,
              position: labelPosition,
              formatter: "{b}: {c} ({d}%)",
            },
            labelLine: {
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.3)'
              },
              smooth: 0.2,
              length: 10,
              length2: 20
            },
            emphasis: {
              label: {
                show: showEmphasis,
                fontSize: "16",
                fontWeight: "bold",
              },
            },
            animationType: 'scale',
            animationEasing: 'elasticOut',
          }
        ]
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

export default VisualPieChartComponent;

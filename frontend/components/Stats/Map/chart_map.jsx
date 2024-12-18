import React, { useEffect, useRef, useMemo} from "react";
import * as echarts from "echarts";

const ChartMap = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null); // Almacenamos la instancia del gráfico aquí

  // Datos para el gráfico
  const data = useMemo(() => [
    { name: "Arica", value: 335 },
    { name: "Tarapacá", value: 5449 },
    { name: "Antofagasta", value: 67 },
    { name: "Atacama", value: 585 },
    { name: "Coquimbo", value: 4901 },
    { name: "Valparaíso", value: 5273 },
    { name: "Santiago", value: 6727 },
    { name: "O'Higgins", value: 545 },
    { name: "Maule", value: 6172 },
    { name: "Ñuble", value: 306 },
    { name: "Bío-Bío", value: 317 },
    { name: "Araucanía", value: 6262 },
    { name: "Los Ríos", value: 17 },
    { name: "Los Lagos", value: 5176 },
    { name: "Aysén", value: 7674 },
    { name: "Magallanes", value: 5218 },
  ], []);

  // Opciones para el mapa
  const mapOption = useMemo(() => ({
    visualMap: {
      left: "right",
      min: 0,
      max: 10000,
      inRange: {
        color: [
          "#313695",
          "#4575b4",
          "#74add1",
          "#abd9e9",
          "#e0f3f8",
          "#ffffbf",
          "#fee090",
          "#fdae61",
          "#f46d43",
          "#d73027",
          "#a50026",
        ],
      },
      text: ["Alto", "Bajo"],
      calculable: true,
    },
    series: [
      {
        name: "Población",
        type: "map",
        roam: true,
        map: "CLP",
        data: data,
        label: { // Configuración de las etiquetas de texto
          fontSize: 16, // Tamaño de la fuente
        }
      },
    ],
  }), [data]);

  // Opciones para el gráfico de barras
  const barOption = {
    xAxis: {
      type: "value",
    },
    yAxis: {
      type: "category",
      data: data.map((item) => item.name),
    },
    series: [
      {
        type: "bar",
        data: data.map((item) => item.value),
      },
    ],
  };

  useEffect(() => {
    const initChart = async () => {
      if (!chartRef.current) return;
      const myChart = echarts.init(chartRef.current);
      chartInstance.current = myChart; // Guardamos la instancia en la referencia
      myChart.showLoading();
      const CLPJson = await fetch("/maps/gadma41_chile.json").then((response) =>
        response.json()
      );
      myChart.hideLoading();
      echarts.registerMap("CLP", CLPJson);
      myChart.setOption(mapOption); // Configuración inicial para mostrar el mapa
    };
    initChart();
  }, [mapOption]);

  const toggleChart = () => {
    if (!chartInstance.current) return; // Comprobamos si la instancia del gráfico existe
    const currentOption = chartInstance.current.getOption().series[0].type;
    const newOption = currentOption === "map" ? barOption : mapOption;
    chartInstance.current.setOption(newOption, true);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
        borderRadius: "2ch",
        backgroundColor: "#334550",
        color: "white",
      }}
    >
      <button
        style={{ position: "absolute", zIndex: 1}}
        onClick={() => toggleChart()}>Change</button>
      <div
        ref={chartRef}
        style={{
          height: "100%",
          width: "100%",
        }}
      ></div>
    </div>
  );
};

export default ChartMap;

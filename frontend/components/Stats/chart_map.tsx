"use client"

import { useEffect, useRef, useState } from "react"
import * as echarts from "echarts"
import { backendUrl } from "@/config/config"
interface RegionData {
  name: string
  value: number
}

const ChartMap = () => {
  const chartRef = useRef<HTMLDivElement>(null)
  const chartInstance = useRef<echarts.ECharts | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState<RegionData[]>([])
  const [viewMode, setViewMode] = useState<"map" | "bar">("bar")

  // Función para obtener los datos de la API
  useEffect(() => {
    const fetchRegionData = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`${backendUrl}/stats/statRegiones`)
        const apiData = await response.json()
        // Transformar los datos al formato requerido por echarts
        const formattedData = Object.entries(apiData).map(([region, value]) => ({
          name: region,
          value: value as number,
        }))

        setData(formattedData)
      } catch (error) {
        console.error("Error al obtener datos de regiones:", error)
        // Usar datos de ejemplo en caso de error
        setData([
          { name: "Metropolitana de Santiago", value: 1 },
          { name: "Magallanes y de la Antártica Chilena", value: 1 },
          { name: "Coquimbo", value: 1 },
          { name: "Los Lagos", value: 1 },
          { name: "Tarapacá", value: 1 },
          { name: "Arica y Parinacota", value: 1 },
          { name: "Antofagasta", value: 1 },
          { name: "Atacama", value: 1 },
          { name: "Valparaíso", value: 1 },
          { name: "Libertador General Bernardo O'Higgins", value: 1 },
          { name: "Maule", value: 1 },
          { name: "Ñuble", value: 1 },
          { name: "Biobío", value: 1 },
          { name: "La Araucanía", value: 1 },
          { name: "Los Ríos", value: 1 },
          { name: "Aysén del General Carlos Ibáñez del Campo", value: 1 },
        ])
      } finally {
        setIsLoading(false)
      }
    }

    fetchRegionData()
  }, [])

  // Opciones para el mapa
  const getMapOption = () => {
    const maxValue = Math.max(...data.map((item) => item.value), 1)

    return {
      title: {
        left: "center",
        top: 10,
        textStyle: {
          color: "#333",
          fontWeight: "bold",
          fontSize: 16,
        },
      },
      tooltip: {
        trigger: "item",
        formatter: "{b}<br/>Estudiantes: {c}",
        backgroundColor: "rgba(255,255,255,0.9)",
        borderColor: "#ccc",
        borderWidth: 1,
        textStyle: {
          color: "#333",
        },
        extraCssText: "box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);",
      },
      visualMap: {
        type: "continuous",
        left: "right",
        min: 0,
        max: maxValue,
        inRange: {
          color: [
            "#e0f7fa",
            "#b2ebf2",
            "#80deea",
            "#4dd0e1",
            "#26c6da",
            "#00bcd4",
            "#00acc1",
            "#0097a7",
            "#00838f",
            "#006064",
          ],
        },
        text: ["Alto", "Bajo"],
        calculable: true,
        textStyle: {
          color: "#333",
        },
        formatter: (value: number) => Math.round(value),
        show: true,
      },
      series: [
        {
          name: "Estudiantes",
          type: "map",
          map: "CLP",
          roam: true,
          emphasis: {
            label: {
              show: true,
              fontSize: 14,
              fontWeight: "bold",
              color: "#023f4a",

            },
            itemStyle: {
              areaColor: "#0097a7",
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 20,
              borderWidth: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
          select: {
            itemStyle: {
              areaColor: "#00838f",
            },
          },
          data: data,
          nameMap: {
            "Arica y Parinacota": "Arica y Parinacota",
            Tarapacá: "Tarapacá",
            Antofagasta: "Antofagasta",
            Atacama: "Atacama",
            Coquimbo: "Coquimbo",
            Valparaíso: "Valparaíso",
            "Libertador General Bernardo O'Higgins": "Libertador General Bernardo O'Higgins",
            Maule: "Maule",
            Ñuble: "Ñuble",
            Biobío: "Biobío",
            "La Araucanía": "La Araucanía",
            "Los Ríos": "Los Ríos",
            "Los Lagos": "Los Lagos",
            "Aysén del General Carlos Ibáñez del Campo": "Aysén del General Carlos Ibáñez del Campo",
            "Magallanes y de la Antártica Chilena": "Magallanes y de la Antártica Chilena",
            // Nombres cortos para compatibilidad
            Arica: "Arica y Parinacota",
            Santiago: "Metropolitana de Santiago",
            "O'Higgins": "Libertador General Bernardo O'Higgins",
            "Bío-Bío": "Biobío",
            Araucanía: "La Araucanía",
            Aysén: "Aysén del General Carlos Ibáñez del Campo",
            Magallanes: "Magallanes y de la Antártica Chilena",
          },
        },
      ],
    }
  }

  // Opciones para el gráfico de barras
  const getBarOption = () => ({
    title: {
      left: "center",
      top: 10,
      textStyle: {
        color: "#333",
        fontWeight: "bold",
        fontSize: 16,
      },
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      formatter: "{b}<br/>Estudiantes: {c}",
      backgroundColor: "rgba(255,255,255,0.9)",
      borderColor: "#ccc",
      borderWidth: 1,
      textStyle: {
        color: "#333",
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "value",
      axisLabel: {
        color: "#666",
      },
    },
    yAxis: {
      type: "category",
      data: data.map((item) => item.name),
      axisLabel: {
        color: "#666",
        fontSize: 12,
      },
    },
    series: [
      {
        name: "Estudiantes",
        type: "bar",
        data: data.map((item) => item.value),
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: "#0097a7" },
            { offset: 1, color: "#4dd0e1" },
          ]),
          borderRadius: [0, 4, 4, 0],
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: "#006064" },
              { offset: 1, color: "#00bcd4" },
            ]),
          },
        },
      },
    ],
  })

  // Inicializar y actualizar el gráfico
  useEffect(() => {
    if (!chartRef.current || isLoading || data.length === 0) return

    const initChart = async () => {
      if (!chartRef.current) return

      // Inicializar el gráfico
      const chart = echarts.getInstanceByDom(chartRef.current) || echarts.init(chartRef.current)
      chartInstance.current = chart

      // Mostrar indicador de carga
      chart.showLoading()

      try {
        // Cargar el mapa de Chile
        const CLPJson = await fetch("/maps/gadma41_chile.json").then((response) => response.json())
        echarts.registerMap("CLP", CLPJson)

        // Configurar el gráfico según el modo de visualización
        const option = viewMode === "map" ? getMapOption() : getBarOption()
        chart.setOption(option, true)
      } catch (error) {
        console.error("Error al cargar el mapa:", error)
        // Si hay error al cargar el mapa, mostrar el gráfico de barras
        chart.setOption(getBarOption(), true)
        setViewMode("bar")
      } finally {
        chart.hideLoading()
      }
    }

    initChart()

    // Manejar el redimensionamiento
    const handleResize = () => {
      chartInstance.current?.resize()
    }
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      // Limpiar la instancia de echarts al desmontar
      if (chartInstance.current) {
        chartInstance.current.dispose()
      }
    }
  }, [data, isLoading, viewMode])

  // Actualizar el gráfico cuando cambia el modo de visualización
  useEffect(() => {
    if (!chartInstance.current || isLoading || data.length === 0) return

    const option = viewMode === "map" ? getMapOption() : getBarOption()
    chartInstance.current.setOption(option, true)
  }, [viewMode])

  // Cambiar entre mapa y gráfico de barras
  const toggleChartType = () => {
    setViewMode((prev) => (prev === "map" ? "bar" : "map"))
  }

  return (
    <div className="relative h-full w-full">
      {isLoading ? (
        <div className="flex h-full w-full items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <>
          <button
            onClick={toggleChartType}
            className="absolute right-4 top-4 z-10 rounded-md bg-white px-3 py-1 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100"
          >
            {viewMode === "map" ? "Ver Barras" : "Ver Mapa"}
          </button>
          <div ref={chartRef} className="h-full w-full" />
        </>
      )}
    </div>
  )
}

export default ChartMap

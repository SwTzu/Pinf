"use client"

import { useState, useEffect } from "react"
import { Card } from "@nextui-org/react"
import { PieChartIcon as ChartPie, BarChart2, BookOpen, TrendingUp, Notebook, MapPin } from "lucide-react"
import PieChartComponent from "@/components/Stats/PieChartComponente"
import BarChartComponent from "@/components/Stats/BarChartComponente"
import LineChartComponent from "@/components/Stats/LineChartComponent"
import ChartMap from "@/components/Stats/chart_map"
import styles from "@/styles/coo.module.css"
import type { DataCharts, PracticaAnual } from "@/types/interfaces"
import { backendUrl } from "@/config/config"

export default function StatsPage() {
  const [notasData, setNotasData] = useState<DataCharts[]>([])
  const [practicasAnuales, setPracticasAnuales] = useState<PracticaAnual[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingPracticas, setIsLoadingPracticas] = useState(true)
  const [moda, setModa] = useState<number>(0)

  // Función para convertir el número de nota a su rango correspondiente
  const getRangoNota = (nota: number): string => {
    if (nota === 1) return "0 - 1"
    return `${nota - 1}.1 - ${nota}`
  }

  // Función para obtener un nombre formateado para la nota
  const getNombreFormateado = (nota: string): string => {
    const numeroNota = Number(nota.split(" ")[1])
    return `Rango ${getRangoNota(numeroNota)}`
  }

  useEffect(() => {
    const fetchNotasData = async () => {
      setIsLoading(true)
      try {
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }

        const response = await fetch(`${backendUrl}/stats/cantidadCoherte`, options)
        const data = await response.json()

        // Transformar los datos al formato requerido por los componentes de gráficos
        const formattedData = Object.entries(data).map(([key, value]) => ({
          name: `Nota ${key}`,
          displayName: `Rango ${getRangoNota(Number(key))}`,
          value: value as number,
          rangoInicio: key === "1" ? 0 : Number(key) - 1 + 0.1,
          rangoFin: Number(key),
        }))

        setNotasData(formattedData)

        // Calcular la moda
        const aux = Number(
          formattedData.reduce((prev, current) => (prev.value > current.value ? prev : current)).name.split(" ")[1],
        )
        setModa(aux)
      } catch (error) {
        console.error("Error al obtener datos de notas:", error)
      } finally {
        setIsLoading(false)
      }
    }

    const fetchPracticasAnuales = async () => {
      setIsLoadingPracticas(true)
      try {
        const response = await fetch(`${backendUrl}/stats/practicasAnuales`)
        const data = await response.json()

        // Ordenar los datos por año
        const sortedData = [...data].sort((a, b) => a.año - b.año)
        setPracticasAnuales(sortedData)
      } catch (error) {
        console.error("Error al obtener datos de prácticas anuales:", error)
      } finally {
        setIsLoadingPracticas(false)
      }
    }

    fetchNotasData()
    fetchPracticasAnuales()
  }, [])

  // Calcular tasa de finalización para el año más reciente
  const tasaFinalizacion =
    practicasAnuales.length > 0
      ? Math.round(
          (Number(practicasAnuales[practicasAnuales.length - 1].cantidad_terminadas) /
            Number(practicasAnuales[practicasAnuales.length - 1].cantidad_solicitadas)) *
            100,
        )
      : 0

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Estadísticas</h1>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <>
          <div className="grid gap-[2rem] md:grid-cols-3 mb-6">
            <Card id="total_estudiantes" className={styles.card_base}>
              <h1 className={styles.card_h1}>Total Estudiantes</h1>
              <h2 className={styles.card_h2}>Cantidad total de estudiantes evaluados</h2>
              <div className="flex items-center justify-center gap-4 mt-2">
                <span className="text-5xl font-bold">{notasData.reduce((acc, item) => acc + item.value, 0)}</span>
                <BookOpen size={48} className="text-primary" />
              </div>
            </Card>

            <Card id="promedio_notas" className={styles.card_base}>
              <h1 className={styles.card_h1}>Moda de Notas</h1>
              <h2 className={styles.card_h2}>Rango de notas más común</h2>
              <div className="flex items-center justify-center gap-4 mt-2">
                <span className="text-5xl font-bold">{getRangoNota(moda)}</span>
                <BarChart2 size={48} className="text-primary" />
              </div>
            </Card>

            <Card id="aprobacion" className={styles.card_base}>
              <h1 className={styles.card_h1}>Tasa de Aprobación</h1>
              <h2 className={styles.card_h2}>Porcentaje de estudiantes aprobados</h2>
              <div className="flex items-center justify-center gap-4 mt-2">
                <span className="text-5xl font-bold">
                  {Math.round(
                    (notasData
                      .filter((item) => Number.parseInt(item.name.split(" ")[1]) >= 4)
                      .reduce((acc, item) => acc + item.value, 0) /
                      notasData.reduce((acc, item) => acc + item.value, 0)) *
                      100,
                  )}
                  %
                </span>
                <ChartPie size={48} className="text-primary" />
              </div>
            </Card>
          </div>

          <div className="p-[1.5rem] bg-white rounded-lg shadow-md mb-6">
            <h1 className="text-3xl font-semibold black mb-4">Distribución de Calificaciones</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className={styles.stats_btn}>
                <BarChart2 className="h-5 w-5 mr-2" />
                Distribución por rango de notas (Barras)
              </div>
              <div className={styles.stats_btn}>
                <ChartPie className="h-5 w-5 mr-2" />
                Distribución por rango de notas (Anillo)
              </div>
              <div className={styles.stats_btn}>
                <Notebook className="h-5 w-5 mr-2" />
                Estadísticas Generales
              </div>

              <Card id="bar_chart" className={styles.card_base_stats}>
                <BarChartComponent
                  data={notasData.map((item) => ({
                    ...item,
                    name: getNombreFormateado(item.name),
                  }))}
                  chartId="barChartNotas"
                  showEmphasis={true}
                  enableTooltip={true}
                  legendOrientation="horizontal"
                  legendPosition={{ left: "0" }}
                />
              </Card>

              <Card id="pie_chart" className={styles.card_base_stats}>
                <PieChartComponent
                  data={notasData.map((item) => ({
                    ...item,
                    name: getNombreFormateado(item.name),
                  }))}
                  chartId="pieChartNotas"
                  showEmphasis={true}
                  enableTooltip={true}
                  legendOrientation="vertical"
                  legendPosition={{ left: "0" }}
                />
              </Card>

              <Card id="stats_g" className={styles.card_base_stats}>
                <div className="space-y-4 p-4">
                  <div className="flex justify-between">
                    <span>Total de estudiantes:</span>
                    <span className="font-semibold">{notasData.reduce((acc, item) => acc + item.value, 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rango más común:</span>
                    <span className="font-semibold">
                      {getRangoNota(
                        Number(
                          notasData
                            .reduce((prev, current) => (prev.value > current.value ? prev : current))
                            .name.split(" ")[1],
                        ),
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estudiantes aprobados:</span>
                    <span className="font-semibold">
                      {notasData
                        .filter((item) => Number.parseInt(item.name.split(" ")[1]) >= 4)
                        .reduce((acc, item) => acc + item.value, 0)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estudiantes reprobados:</span>
                    <span className="font-semibold">
                      {notasData
                        .filter((item) => Number.parseInt(item.name.split(" ")[1]) < 4)
                        .reduce((acc, item) => acc + item.value, 0)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rango máximo:</span>
                    <span className="font-semibold">6.1 - 7</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rango mínimo:</span>
                    <span className="font-semibold">0 - 1</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Sección de distribución geográfica */}
          <div className="p-[1.5rem] bg-white rounded-lg shadow-md mb-6">
            <h1 className="text-3xl font-semibold black mb-4">Distribución Geográfica</h1>
            <div className="grid grid-cols-1 gap-4">
              <div className={styles.stats_btn}>
                <MapPin className="h-5 w-5 mr-2" />
                Distribución de estudiantes por región
              </div>

              <Card className="h-[500px] p-4">
                <ChartMap />
              </Card>
            </div>
          </div>

          {/* Sección para prácticas anuales */}
          <div className="p-[1.5rem] bg-white rounded-lg shadow-md mb-6">
            <h1 className="text-3xl font-semibold black mb-4">Evolución de Prácticas Anuales</h1>

            {isLoadingPracticas ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
              </div>
            ) : (
              <>
                <div className="grid gap-[2rem] md:grid-cols-3 mb-6">
                  <Card className={styles.card_base}>
                    <h1 className={styles.card_h1}>Prácticas Solicitadas</h1>
                    <h2 className={styles.card_h2}>Último año registrado</h2>
                    <div className="flex items-center justify-center gap-4 mt-2">
                      <span className="text-5xl font-bold">
                        {practicasAnuales.length > 0
                          ? practicasAnuales[practicasAnuales.length - 1].cantidad_solicitadas
                          : "0"}
                      </span>
                      <TrendingUp size={48} className="text-primary" />
                    </div>
                  </Card>

                  <Card className={styles.card_base}>
                    <h1 className={styles.card_h1}>Prácticas Terminadas</h1>
                    <h2 className={styles.card_h2}>Último año registrado</h2>
                    <div className="flex items-center justify-center gap-4 mt-2">
                      <span className="text-5xl font-bold">
                        {practicasAnuales.length > 0
                          ? practicasAnuales[practicasAnuales.length - 1].cantidad_terminadas
                          : "0"}
                      </span>
                      <BarChart2 size={48} className="text-primary" />
                    </div>
                  </Card>

                  <Card className={styles.card_base}>
                    <h1 className={styles.card_h1}>Tasa de Finalización</h1>
                    <h2 className={styles.card_h2}>Último año registrado</h2>
                    <div className="flex items-center justify-center gap-4 mt-2">
                      <span className="text-5xl font-bold">{tasaFinalizacion}%</span>
                      <ChartPie size={48} className="text-primary" />
                    </div>
                  </Card>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className={styles.stats_btn}>
                    <TrendingUp className="h-5 w-5 mr-2" />
                    Evolución de prácticas por año
                  </div>

                  <Card className="h-[400px] p-4">
                    <LineChartComponent
                      data={practicasAnuales}
                      xField="año"
                      series={[
                        {
                          name: "Prácticas Solicitadas",
                          field: "cantidad_solicitadas",
                          color: "#0097a7",
                        },
                        {
                          name: "Prácticas Terminadas",
                          field: "cantidad_terminadas",
                          color: "#4caf50",
                        },
                      ]}
                      chartId="practicasAnualesChart"
                      enableTooltip={true}
                      showLegend={true}
                    />
                  </Card>
                </div>
              </>
            )}
          </div>

          <div className="p-[1.5rem] bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-semibold black mb-4">Análisis Detallado de Calificaciones</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Distribución por Rango</h2>
                <div className="space-y-4">
                  {notasData.map((item) => {
                    const notaNum = Number(item.name.split(" ")[1])
                    return (
                      <div key={item.name} className="flex items-center">
                        <div className="w-32">{getRangoNota(notaNum)}:</div>
                        <div className="flex-1 mx-2">
                          <div
                            className="bg-blue-500 h-5 rounded-full"
                            style={{
                              width: `${Math.max(5, (item.value / Math.max(...notasData.map((d) => d.value))) * 100)}%`,
                              backgroundColor: getColorForNote(notaNum),
                            }}
                          ></div>
                        </div>
                        <div className="w-8 text-right">{item.value}</div>
                      </div>
                    )
                  })}
                </div>
              </Card>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

// Función para obtener un color basado en la nota
function getColorForNote(note: number): string {
  const colors = {
    1: "#FF0000", // Rojo
    2: "#FF4500", // Naranja rojizo
    3: "#FFA500", // Naranja
    4: "#FFFF00", // Amarillo
    5: "#9ACD32", // Verde amarillento
    6: "#32CD32", // Verde lima
    7: "#008000", // Verde
  }

  return colors[note as keyof typeof colors] || "#CCCCCC"
}

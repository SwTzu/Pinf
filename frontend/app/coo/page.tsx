"use client";
import React, { useState, useRef, useEffect } from "react";
import { Button, Card } from "@nextui-org/react";
import styles from "@/styles/coo.module.css";
import * as echarts from "echarts";
import {
  Building2,
  UserRound,
  ChartPie,
  FileCheck2,
  BarChart2,
  ArrowUpToLine,
} from "lucide-react";
import { Empresas } from "@/api/coo/solicitudes";
import TablaUsers from "@/components/Tablas/TabCoo/TablaUsers";
import TablaEvaluacionCarta from "@/components/Tablas/TabCoo/TablaEvaluacionCarta";
import {
  obtenerEstadisticasFasesSolicitudes,
  obtenerStatsAreas,
} from "@/api/coo/stats";
import PieChartComponent from "@/components/Stats/PieChartComponente";
import VisualPieChartComponent from "@/components/Stats/VisualPieChartComponente";
import BarChartComponent from "@/components/Stats/BarChartComponente";
type empresa = {
  verificadas: number;
  total: number;
};
interface DataCharts {
  value: number;
  name: string;
}
export default function HomeCoo() {
  const chartRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const empresasRef = useRef<HTMLDivElement>(null);
  const usersRef = useRef<HTMLDivElement>(null);
  const evaluacionesRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null); // Ref para el div que contiene el scroll
  const [isvisible, setIsvisible] = useState(false);
  const [s_empresas, setS_empresas] = useState(false);
  const [st_resumen, setSt_resumen] = useState(false);
  const [s_users, setS_users] = useState(false);
  const [s_evaluaciones, setS_evaluaciones] = useState(false);
  const [statsFases, setStatsFases] = useState<DataCharts[]>([]);
  const [statsAreas, setStatsAreas] = useState<DataCharts[]>([]);
  const Token =
    typeof window !== "undefined" ? localStorage.getItem("token") || "" : "";
  const [empresas, setEmpresas] = useState<empresa>({
    verificadas: 0,
    total: 0,
  });
  const redireccion = (
    ref: React.RefObject<HTMLDivElement>,
    funcion: (arg: boolean) => void
  ) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    funcion(true);
    setTimeout(() => {
      funcion(false);
    }, 2000);
  };
  // Detectar el scroll dentro del contenedor específico
  useEffect(() => {
    const handleScroll = () => {
      const position = containerRef.current?.scrollTop || 0;
      if (position > 200) {
        setIsvisible(true);
      } else {
        setIsvisible(false);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);
  useEffect(() => {
    Empresas(Token).then((res) => {
      setEmpresas(res);
      if (chartRef.current) {
        const chart = echarts.init(chartRef.current);
        chart.setOption({
          tooltip: {
            trigger: "item",
          },
          series: [
            {
              name: "Empresas",
              type: "pie",
              radius: ["40%", "90%"],
              avoidLabelOverlap: false,
              data: [
                { value: res.verificadas, name: "Verificadas" },
                { value: res.total - res.verificadas, name: "No Verificadas" },
              ],
              label: {
                show: false,
                position: "center",
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
      }
    });
  }, [Token]);
  useEffect(() => {
    obtenerEstadisticasFasesSolicitudes().then((res) => {
      const data = [
        { value: res[0], name: "Rechazado" },
        { value: res[1], name: "Solicitado" },
        { value: res[2], name: "Revisado" },
        { value: res[3], name: "Firmado" },
        { value: res[5], name: "Coordinación" },
        { value: res[6], name: "Iniciada" },
        { value: res[8], name: "Revision evaluación" },
      ];
      setStatsFases(data);
    });
  }, []);
  useEffect(() => {
    obtenerStatsAreas().then((res) => {
      setStatsAreas(res);
    });
  }, []);

  return (
    <div className={styles.CooDiv} ref={containerRef}>
      {isvisible && (
        <Button
          id="reset"
          variant="bordered"
          className={styles.reset}
          color="secondary"
          onPress={() => {
            panelRef.current?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <ArrowUpToLine />
        </Button>
      )}
      <div className="flex justify-between items-center mb-6" ref={panelRef}>
        <h1 className="text-3xl font-bold text-gray-800">
          Panel de coordinación
        </h1>
      </div>

      <div className="grid gap-[2rem] md:grid-cols-4 mb-6">
        <div onClick={() => redireccion(usersRef, setS_users)}>
          <Card id="res_Users" className={styles.card_base}>
            <h1 className={styles.card_h1}>Usuarios administrativos</h1>
            <h2 className={styles.card_h2}>
              Vista general de usuarios administrativos
            </h2>
            <UserRound className={styles.card_icon} />
          </Card>
        </div>
        <div onClick={() => redireccion(empresasRef, setS_empresas)}>
          <Card id="res_empresas" className={styles.card_base}>
            <h1 className={styles.card_h1}>Resumen de empresas</h1>
            <h2 className={styles.card_h2}>
              Vista general empresas en sistema
            </h2>
            <Building2 className={styles.card_icon} />
          </Card>
        </div>
        
        <div onClick={() => redireccion(statsRef, setSt_resumen)}>
          <Card id="res_stats" className={styles.card_base}>
            <h1 className={styles.card_h1}>Resumen estadístico</h1>
            <h2 className={styles.card_h2}>
              Muestreo de estadisticas relevantes
            </h2>
            <ChartPie className={styles.card_icon} />
          </Card>
        </div>
        
        <div onClick={() => redireccion(evaluacionesRef, setS_evaluaciones)}>
          <Card id="res_evaluaciones" className={styles.card_base}>
            <h1 className={styles.card_h1}>Evaluaciones</h1>
            <h2 className={styles.card_h2}>
              Vista general de evaluaciones pendientes
            </h2>
            <FileCheck2 className={styles.card_icon} />
          </Card>
        </div>
      </div>
      <Card
        ref={evaluacionesRef}
        className={`mb-6 ${styles.box} ${
          s_evaluaciones ? styles.active_box : ""
        }`}
      >
        <h1 className="text-3xl font-semibold black pt-[2rem] pl-[2rem]">
          Evaluaciones
        </h1>
        <h2 className="text-1xl text-gray-400 pl-[2.2rem]">
          Lista de evaluaciones pendientes.
        </h2>
        <div className={styles.divtable}>
          <TablaEvaluacionCarta token={Token} />
        </div>
      </Card>
      <div
        className={`p-[1.5rem] bg-white ${styles.box} ${
          st_resumen ? styles.active_box : ""
        }`}
        ref={statsRef}
      >
        <h1 className="text-3xl font-semibold black mb-4">
          Resumen estadístico personalizado
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={styles.stats_btn}>
            <BarChart2 className="h-5 w-5 mr-2" />
            Ponderación de fases/estados de solicitudes
          </div>
          <div className={styles.stats_btn}>
            <BarChart2 className="h-5 w-5 mr-2" />
            Ponderación de empresas verificadas por región
          </div>
          <div className={styles.stats_btn}>
            <BarChart2 className="h-5 w-5 mr-2" />
            Ponderación de áreas en practicas
          </div>
          <Card id="res_empresas" className={styles.card_base_stats}>
            <PieChartComponent
              data={statsFases}
              chartId="chartFases"
              showEmphasis={true}
              legendOrientation="vertical"
            />
          </Card>

          <Card id="res_empresas" className={styles.card_base_stats}>
            <BarChartComponent
              data={statsAreas}
              chartId="BarEmp"
              showEmphasis={true}
              legendOrientation="horizontal"
              legendPosition={{ left: "0" }}
            />
          </Card>
          <Card id="res_empresas" className={styles.card_base_stats}>
            <VisualPieChartComponent
              data={statsAreas}
              chartId="chartAreas"
              showEmphasis={true}
              legendOrientation="vertical"
              legendPosition={{ left: "0" }}
            />
          </Card>
        </div>
      </div>
      <div
        id="resumenempresas"
        className="grid gap-[2rem] md:grid-cols-3 mb-[1rem]"
        ref={empresasRef}
      >
        <Card
          className={`mb-6 max-h-[20vh] ${styles.box} ${
            s_empresas ? styles.active_box : ""
          }`}
        >
          <h1 className="text-3xl font-semibold black pt-[2rem] pl-[2rem]">
            Empresas verificadas
          </h1>
          <div className="grid md:grid-cols-2 self-center mb-[2rem]">
            <p className="text-[4rem] font-semibold">{empresas.verificadas}</p>
            <Building2 className="self-center" size={62}/>
          </div>
        </Card>
        <Card
          className={`mb-6 max-h-[20vh] ${styles.box} ${
            s_empresas ? styles.active_box : ""
          }`}
        >
          <h1 className="text-3xl font-semibold black pt-[2rem] pl-[2rem]">
            Empresas no verificadas
          </h1>
          <div className="grid md:grid-cols-2 self-center mb-[2rem]">
            <p className="text-[4rem] font-semibold">
              {empresas.total - empresas.verificadas}
            </p>
            <Building2 className="self-center" size={62} />
          </div>
        </Card>



        <Card
          className={`mb-6 max-h-[20vh] ${styles.box} ${
            s_empresas ? styles.active_box : ""
          }`}
        >
          <h1 className="text-3xl font-semibold black pt-[2rem] pl-[2rem]">
          Total empresas
          </h1>
          <div className="grid md:grid-cols-2 self-center mb-[2rem]">
          <p className="text-[4rem] font-semibold">{empresas.total}</p>
          <div
              id="chart"
              ref={chartRef}
              style={{ width: "5rem", height: "5rem", alignSelf: "center", justifySelf  : "center" }}
            />
          </div>
        </Card>




      </div>
      <Card
        ref={usersRef}
        className={`mb-6 ${styles.box} ${s_users ? styles.active_box : ""}`}
      >
        <h1 className="text-3xl font-semibold black pt-[2rem] pl-[2rem]">
          Usuarios administrativos
        </h1>
        <h2 className="text-1xl text-gray-400 pl-[2.2rem]">
          Lista de usuarios administrativos.
        </h2>
        <div className={styles.divtable}>
          <TablaUsers token={Token} />
        </div>
      </Card>
    </div>
  );
}

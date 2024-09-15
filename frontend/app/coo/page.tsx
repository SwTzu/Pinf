"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Button,
  Input,
  Card,
  Checkbox,
  Select,
  SelectItem,
  Divider,
} from "@nextui-org/react";
import styles from "@/styles/est.module.css";
import TablaCoo from "@/components/Tablas/TabCoo/TablaCoo";
import { PlusIcon } from "@/public/icons/PlusIcon";
import {
  datosEst,
  actualizarDatosUsuario,
  All_EMP,
} from "@/api/est/solicitudes";
import CardMisDatos from "@/components/Cards/CardMisDatos"; // Importa el nuevo componente
import CardACP from "@/components/Cards/CardACP";
import { FileText, Home, Settings, User, Mail } from "lucide-react";
type estudiante = {
  rut: string;
  nombre1: string;
  nombre2: string;
  apellido1: string;
  apellido2: string;
  planEstudio: string;
  correo: string;
  telefono: string;
  ingreso: string;
};

type empresa = {
  rutEmpresa: string;
  razonSocial: string;
  correo: string;
  telefono: string;
  direccion: string;
  region: string;
  ciudad: string;
  rubro: string;
};

export default function HomeCoo() {
  const nuevaSolicitudRef = useRef<HTMLDivElement>(null);
  const resumenRef = useRef<HTMLDivElement>(null);
  const misDatosRef = useRef<HTMLDivElement>(null);
  const ac = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [a_resumen, setA_resumen] = useState(false);
  const [a_misDatos, setA_misDatos] = useState(false);
  const [a_ac, setA_ac] = useState(false);
  const Token =
    typeof window !== "undefined" ? localStorage.getItem("token") || "" : "";
  const [new_empresa, setNew_empresa] = useState(true);
  const [datos_est, setDatos_est] = useState<estudiante>({
    rut: "",
    nombre1: "",
    nombre2: "",
    apellido1: "",
    apellido2: "",
    planEstudio: "",
    correo: "",
    telefono: "",
    ingreso: "",
  });
  const [datos_emp, setDatos_emp] = useState<empresa[]>([]);
  const [mod_est, setMod_est] = useState(false);
  const [value, setValue] = React.useState("");
  const [emp_selected, setEmp_selected] = useState<empresa>();
  useEffect(() => {
    datosEst(Token).then((res) => {
      setDatos_est(res);
    });
    All_EMP().then((res) => {
      setDatos_emp(res.empresas);
    });
  }, [Token]);

  const redireccion = (ref: React.RefObject<HTMLDivElement>, funcion: (arg: boolean) => void) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    funcion(true);
    setTimeout(() => {
      funcion(false);
    }, 2000);
  };

  const click_save = () => {
    actualizarDatosUsuario(Token, datos_est);
    setMod_est(false);
  };

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
    setEmp_selected(datos_emp.find((emp) => emp.rutEmpresa === e.target.value));
  };

  return (
      <div className={styles.EstDiv}>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Solicitudes</h1>
        </div>
        <Card ref={resumenRef} className={`mb-6 ${styles.box} ${a_resumen ? styles.active : ""}`}>
          <h1 className="text-3xl font-bold text-gray-800 pt-[2rem] pl-[2rem]">
            Resumen de solicitudes
          </h1>
          <h2 className="text-1xl text-gray-400 pl-[2rem]">
            Vista general de solicitudes.
          </h2>
          <div className={styles.divtable}>
            <TablaCoo />
          </div>
        </Card>
        <div className="grid gap-6 md:grid-cols-2">
          <Card
            id="nueva_solicitud"
            className={`${styles.new_solicitud} ${
              isActive ? styles.active : ""
            }`}
          >

            <div className="p-[0.8rem] bg-red">
              {!new_empresa && (
                <Select
                  variant="faded"
                  label="Selecciona una empresa verificada"
                  className="max-w-xs mb-[1rem]"
                  selectedKeys={[value]}
                  onChange={handleSelectionChange}
                >
                  {datos_emp.map((empresa) => (
                    <SelectItem key={empresa.rutEmpresa}>
                      {empresa.razonSocial}
                    </SelectItem>
                  ))}
                </Select>
              )}
              {!new_empresa && <Divider className="mb-[1rem]" />}
              <div className="grid grid-cols-2 gap-[0.8rem] mb-[0.8rem]">
                <Input
                  variant="faded"
                  label="Rut empresa"
                  isDisabled={!new_empresa}
                  value={emp_selected?.rutEmpresa}
                />
                <Input
                  variant="faded"
                  label="numero de practica"
                  isRequired
                  color={!new_empresa ? "primary" : "default"}
                />
                <Input
                  variant="faded"
                  label="Razon social"
                  isDisabled={!new_empresa}
                  value={emp_selected?.razonSocial}
                />
                <Input
                  variant="faded"
                  label="Region"
                  isDisabled={!new_empresa}
                  value={emp_selected?.region}
                />
                <Input
                  variant="faded"
                  label="Direccion"
                  isDisabled={!new_empresa}
                  value={emp_selected?.direccion}
                />
                <Input
                  variant="faded"
                  label="Ciudad"
                  isDisabled={!new_empresa}
                  value={emp_selected?.ciudad}
                />
                <Input
                  variant="faded"
                  label="Rubro"
                  isDisabled={!new_empresa}
                  value={emp_selected?.rubro}
                />
              </div>
              <Button color="primary">Enviar solicitud</Button>
            </div>
          </Card>
          <div ref={misDatosRef} className={`${styles.box} ${a_misDatos ? styles.active : ""}`}>
            <CardMisDatos
              datos_est={datos_est}
              setDatos_est={setDatos_est}
              mod_est={mod_est}
              setMod_est={setMod_est}
              click_save={click_save}
            />
          </div>
        </div>
        <div ref={ac} className={`${styles.box} ${a_ac ? styles.active : ""}`}>
        <CardACP/>
        </div>
      </div>
  );
}

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
  CheckboxGroup,
} from "@nextui-org/react";
import styles from "@/styles/est.module.css";
import TablaSolicitudes from "@/components/Tablas/EST/TablaSolicitudes";
import { PlusIcon } from "@/public/icons/PlusIcon";
import {
  datosEst,
  actualizarDatosUsuario,
  All_EMP,
} from "@/api/est/solicitudes";
import CardMisDatos from "@/components/Cards/CardMisDatos"; // Importa el nuevo componente
import TablaAcp from "@/components/Tablas/ACP/TablaAcp";
import { Home, User, Mail } from "lucide-react";
import { crearSolicitud,newEmpresaCreate} from "@/api/est/solicitudes";
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
  direccion: string;
  region: string;
  ciudad: string;
  rubro: string;
};
export default function HomeEst() {
  const nuevaSolicitudRef = useRef<HTMLDivElement>(null);
  const tablaRef = useRef<{ reload: () => void }>(null);
  const resumenRef = useRef<HTMLDivElement>(null);
  const misDatosRef = useRef<HTMLDivElement>(null);
  const ac = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [a_resumen, setA_resumen] = useState(false);
  const [a_misDatos, setA_misDatos] = useState(false);
  const [a_ac, setA_ac] = useState(false);
  const Token =
    typeof window !== "undefined" ? localStorage.getItem("token") || "" : "";
  const userType =
    typeof window !== "undefined" ? localStorage.getItem("userType") || "" : "";
  const [new_empresa, setNew_empresa] = useState(true);
  const [new_empresa_data, setNew_empresa_data] = useState<empresa>({ rutEmpresa: "", razonSocial: "", direccion: "", region: "", ciudad: "", rubro: ""});
  const [numeroPractica, setNumeroPractica] = useState(1);
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
  const NewRequest = () => {
    if(new_empresa){
      if(new_empresa_data.rutEmpresa===""||new_empresa_data.razonSocial===""||new_empresa_data.direccion===""||new_empresa_data.region===""||new_empresa_data.ciudad===""||new_empresa_data.rubro===""){
        alert("Complete todos los campos");
      }
      else{
        newEmpresaCreate(Token,new_empresa_data,numeroPractica).then(() => {
          tablaRef.current?.reload();
        });
      }
    }else{
      if (emp_selected) {
      crearSolicitud(Token, emp_selected.rutEmpresa, numeroPractica).then(() => {
        tablaRef.current?.reload();
      });
        }
      else{
        alert("Seleccione una empresa");
      }
    }
  }
  return (
    <div className={styles.body}>
      <div className={styles.navbar}>
        <a
          className={`${styles.btn_nav}`}
          onClick={() => redireccion(resumenRef, setA_resumen)}
        >
          <Home className="w-5 h-5 mr-2" />
          Inicio
        </a>
        <a className={styles.btn_nav}
        onClick={() => redireccion(misDatosRef, setA_misDatos)}
        >
          <User className="w-5 h-5 mr-2" />
          Mis datos
        </a>
        <a className={styles.btn_nav}
        onClick={() => redireccion(ac, setA_ac)}
        >
          <Mail className="w-5 h-5 mr-2" />
          Aceptación
        </a>
        <a className={styles.btn_nav}>
          <User className="w-5 h-5 mr-2" />
          Cerrar Sesión
        </a>
      </div>
      <div className={styles.EstDiv}>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Mis Solicitudes</h1>
          <Button color="secondary" onPress={()=>redireccion(nuevaSolicitudRef,setIsActive)}>
            Nueva solicitud
          </Button>
        </div>
        <Card ref={resumenRef} className={`mb-6 ${styles.box} ${a_resumen ? styles.active : ""}`}>
          <h1 className="text-3xl font-bold text-gray-800 pt-[2rem] pl-[2rem]">
            Resumen de solicitudes
          </h1>
          <h2 className="text-1xl text-gray-400 pl-[2rem]">
            Vista general de solicitudes realizadas
          </h2>
          <div className={styles.divtable}>
            <TablaSolicitudes token={Token} ref={tablaRef}/>
          </div>
        </Card>
        <div className="grid gap-6 md:grid-cols-2">
          <Card
            id="nueva_solicitud"
            ref={nuevaSolicitudRef}
            className={`${styles.new_solicitud} ${
              isActive ? styles.active : ""
            }`}
          >
            <div className="grid grid-cols-2">
              <h1 className="text-3xl font-bold text-gray-800 pt-[2rem] pl-[2rem]">
                Nueva solicitud
              </h1>

              <Checkbox
                defaultSelected
                icon={<PlusIcon size={23} height={23} width={23} />}
                color="warning"
                style={{
                  justifySelf: "end",
                  marginRight: "1rem",
                  marginTop: "2rem",
                }}
                value={new_empresa.toString()}
                isSelected={new_empresa}
                onValueChange={(e) => {
                  setNew_empresa(e);
                  if (e) {
                    setEmp_selected(undefined); // Limpia la empresa seleccionada
                    setValue(""); // Limpia el valor del select
                    setNew_empresa_data({ rutEmpresa: "", razonSocial: "", direccion: "", region: "", ciudad: "", rubro: "" }); // Limpia los inputs
                  }
                }}
              >
                Nueva empresa
              </Checkbox>
              <h2 className="text-1xl text-gray-400 pl-[2rem] mb-[0.8rem]">
                Ingrese los datos para generar una nueva solicitud
              </h2>
            </div>

            <div className="p-[0.8rem] bg-red">
              {!new_empresa && (
                <Select
                  aria-label="Selecciona una empresa verificada"
                  variant="faded"
                  placeholder="Selecciona una empresa verificada"
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
                  placeholder="Rut empresa"
                  isDisabled={!new_empresa}
                  value={emp_selected?.rutEmpresa}
                  onChange={(e) =>
                    setNew_empresa_data({
                      ...new_empresa_data,
                      rutEmpresa: e.target.value,
                    })
                  }
                />
                
                <Input
                  variant="faded"
                  placeholder="Razon social"
                  isDisabled={!new_empresa}
                  value={emp_selected?.razonSocial}
                  onChange={(e) =>
                    setNew_empresa_data({
                      ...new_empresa_data,
                      razonSocial: e.target.value,
                    })
                  }
                />
                <Input
                  variant="faded"
                  placeholder="Region"
                  isDisabled={!new_empresa}
                  value={emp_selected?.region}
                  onChange={(e) =>
                    setNew_empresa_data({
                      ...new_empresa_data,
                      region: e.target.value,
                    })
                  }
                />
                <Input
                  variant="faded"
                  placeholder="Direccion"
                  isDisabled={!new_empresa}
                  value={emp_selected?.direccion}
                  onChange={(e) =>
                    setNew_empresa_data({
                      ...new_empresa_data,
                      direccion: e.target.value,
                    })
                  }
                />
                <Input
                  variant="faded"
                  placeholder="Ciudad"
                  isDisabled={!new_empresa}
                  value={emp_selected?.ciudad}
                  onChange={(e) =>
                    setNew_empresa_data({
                      ...new_empresa_data,
                      ciudad: e.target.value,
                    })
                  }
                />
                <Input
                  variant="faded"
                  placeholder="Rubro"
                  isDisabled={!new_empresa}
                  value={emp_selected?.rubro}
                  onChange={(e) =>
                    setNew_empresa_data({
                      ...new_empresa_data,
                      rubro: e.target.value,
                    })
                  }
                />
                <>
                  <CheckboxGroup
                  label="Numero de practica"
                  orientation="horizontal"
                  className="pl-[1rem]"
                  value={[numeroPractica.toString()]}
                  >
                  <Checkbox value="1" onChange={()=>setNumeroPractica(1)}>
                    I
                  </Checkbox>
                  <Checkbox value="2" onChange={()=>setNumeroPractica(2)}>
                    II
                  </Checkbox>
                  </CheckboxGroup>
                </>
              </div>
              <Button color="primary" onPress={()=>NewRequest()}>Enviar solicitud</Button>
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
        <Card className="mb-6 mt-[1rem]">
        <h1 className="text-3xl font-bold text-gray-800 pt-[2rem] pl-[2rem]">
          Cartas de aceptacion
        </h1>
        <h2 className="text-1xl text-gray-400 pl-[2rem]">
          Vista general para cartas de aceptacion
        </h2>
        <TablaAcp token={Token} />
      </Card>
        </div>
      </div>
    </div>
  );
}

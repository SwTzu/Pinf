"use client";
import "@react-pdf-viewer/core/lib/styles/index.css";
import React, { useState, useEffect } from "react";
import { Button, Select, SelectItem, Input, Image } from "@nextui-org/react";
import NextLink from "next/link";
import styles from "../../../styles/styleop.module.css";
import Datosest from "../../../components/Tablas/datosest";
import { useRouter } from "next/navigation";
import {funcionSave, solicitudes} from "../../../api/est/solicitudes"; //cambiar al .env en un futuro
import {All_EMP } from '../../../api/est/solicitudes';
export default function Soli() {
  const router = useRouter();
  const Token =typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const [selectedEmpresaId, setSelectedEmpresaId] = useState(null);
  const [selectedRegionName, setSelectedRegionName] = useState('');
  const [asignatura, setAsignatura] = useState({id: "1", nombre: "ICI-2413", carrera: "Ingenieria Civil Informatica" });
  const [isInputsDisabled, setIsInputsDisabled] = useState(false);
  const [sempresa, setSempresa] = useState(false);
  const [dataempresa, setdataempresa] = useState([]);
  const [razonsocial, setrazonsocial] = useState("");
  const [direccion, setDireccion] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [rutEmpresa, setRutEmpresa] = useState("");
  const [rubro, setRubro] = useState("");

  const handlerazonsocialChange = (e) => {
    setrazonsocial(e.target.value);
  };

  const handleDireccionChange = (e) => {
    setDireccion(e.target.value);
  };

  const handleCiudadChange = (e) => {
    setCiudad(e.target.value);
  };

  const handleRutEmpresaChange = (e) => {
    setRutEmpresa(e.target.value);
  };

  const handleRubroChange = (e) => {
    setRubro(e.target.value);
  };
  const handleAsignaturaChange = (e) => {
    const selectedAsignaturaId = e.target.value;
    const selectedAsignatura = Asignaturas.find(asignatura => asignatura.id === selectedAsignaturaId);
    if (selectedAsignatura) {
      setAsignatura(selectedAsignatura);
    }
  };

  const handleSelectionChangeRegion = (e) => {
    const index=e.target.value;
    if(index){
      setSelectedRegionName(region[index].nombre);
    };
  };
  const Solicitar = async () => {
    const datos={
        rutEmpresa: rutEmpresa,
        numeroPractica: parseInt(asignatura.id),
        fase: 1
    };
    solicitudes(Token, datos);
    router.back();
  };
  const Save = async () => {
    const dataToSave = {
      rutEmpresa: rutEmpresa,
      razonsocial: razonsocial,
      ciudad: ciudad,
      region: selectedRegionName,
      direccion: direccion,
      rubro: rubro,
    };
    funcionSave(dataToSave);
    setSempresa(true);
    setIsInputsDisabled(true);
  };
  useEffect(() => {
    const fetchDataEMP = async () => {
      try {
        const Data = await All_EMP();
        const rawData= Data.empresas;
        const transformedData = rawData.map((item) => ({
          rutEmpresa: item.rutEmpresa,
          razonSocial: item.razonSocial,
          region: item.region,
          direccion: item.direccion,
          rubro: item.rubro,
          ciudad: item.ciudad,
        }));
        setdataempresa(transformedData);
      } catch (error) {
        console.error("Error al obtener datos del usuario:", error);
      }
    };
    fetchDataEMP();
    const intervalId = setInterval(fetchDataEMP, 5 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);
  const Asignaturas = [
    {
      id: "1",
      nombre: "ICI-2413",
      carrera: "Ingenieria Civil Informatica",
    },
    {
      id: "2",
      nombre: "ICI-2414",
      carrera: "Ingenieria Civil Informatica",
    },
  ];
  const region = [
    {
      id: 1,
      nombre: "Región I - Tarapacá",
    },
    {
      id: 2,
      nombre: "Región II - Antofagasta",
    },
    {
      id: 3,
      nombre: "Región III - Atacama",
    },
    {
      id: 4,
      nombre: "Región IV - Coquimbo",
    },
    {
      id: 5,
      nombre: "Región V - Valparaíso",
    },
    {
      id: 6,
      nombre: "Región VI - O'Higgins",
    },
    {
      id: 7,
      nombre: "Región VII - Maule",
    },
    {
      id: 8,
      nombre: "Región VIII - Biobío",
    },
    {
      id: 9,
      nombre: "Región IX - La Araucanía",
    },
    {
      id: 10,
      nombre: "Región X - Los Ríos",
    },
    {
      id: 11,
      nombre: "Región XI - Aysén",
    },
    {
      id: 12,
      nombre: "Región XII - Magallanes",
    },
    {
      id: 13,
      nombre: "Región Metropolitana",
    },
    {
      id: 14,
      nombre: "Región XIV - Los Ríos",
    },
    {
      id: 15,
      nombre: "Región XV - Arica y Parinacota",
    },
    {
      id: 16,
      nombre: "Región XVI - Ñuble",
    },
  ];
  const handleSelectionChangeEmpresa = (e) => {
    const selectedId = e.target.value;
    setSelectedEmpresaId(selectedId);setIsInputsDisabled(Boolean(selectedId));
    const Empresa = dataempresa[parseInt(selectedId.replace(/^\D+/g, ''))];
    if(Empresa){
      setrazonsocial(Empresa.razonSocial);
      setDireccion(Empresa.direccion);
      setCiudad(Empresa.ciudad);
      setRutEmpresa(Empresa.rutEmpresa);
      setRubro(Empresa.rubro);
      setSelectedRegionName(Empresa.region);
    }
    else{
      setrazonsocial('');
      setDireccion('');
      setCiudad('');
      setRutEmpresa('');
      setRubro('');
      setSelectedRegionName('');
    };
  };
  return (
    <div className={styles.EstDiv}>
      <div className={styles.boxe10}>
        <NextLink href="https://informatica.uv.cl/" className={styles.boxe13}>
        <Image
            radius="none"
            src="../UV.svg"
            alt="Descripción del SVG"
            width={"100%"}
            height={"50%"}
          />
        <Image
            radius='none'
            src='../Logo_Practica_Blanco.svg'
            alt='Descripción del SVG'
            width={'100%'}
            height={'50%'}
          />
        </NextLink>
        <div className={styles.boxe11}>icono pag</div>
        <div className={styles.boxe12}>
        <Button className={styles.botNextEst} variant="light" onClick={()=>{router.back()}}>
              Mis Solicitud
            </Button>
          <Button className={styles.botEst} variant="light">
            Logout
          </Button>
        </div>
      </div>
      <div className={styles.boxe20}>
        <div className={styles.boxe21}> iconos notificaciones, usuario</div>
        <div className={styles.boxe22Soli}>
          <div className={styles.boxe220soli}>
            <div className={styles.boxe2200soli}>
              <div className={styles.boxe22000soli}>
                <p className={styles.TextSoli}>Asignatura</p>
                <Select
                  id="select-Asignatura"
                  aria-label="Asignatura"
                  size="lg"
                  variant="faded"
                  color="secondary"
                  placeholder="Selecciona una asignatura"
                  labelPlacement="outside"
                  className={styles.selectSoli}
                  onChange={handleAsignaturaChange}
                  
                >
                  {Asignaturas.map((asignatura) => (
                    <SelectItem
                      key={asignatura.id}
                      textValue = {asignatura.nombre}
                      className={styles.selectItemSoli}
                      value={asignatura.id}
                    >
                      {asignatura.nombre}
                    </SelectItem>
                  ))}
                </Select>
              </div>
              <div className={styles.boxe22000soli}>
                <p className={styles.TextSoli}>Empresas</p>
                <Select
                  id="select-Empresa"
                  aria-label="Empresas"
                  size="lg"
                  variant="faded"
                  color="secondary"
                  placeholder="Selecciona una Empresa"
                  labelPlacement="outside"
                  className={styles.selectSoli}
                  isDisabled={sempresa}
                  onChange={handleSelectionChangeEmpresa}
                >
                  {dataempresa.map((empresa: any, index: number) => (
                    <SelectItem
                      key={index}
                      textValue = {empresa.razonSocial}
                      className={styles.selectItemSoli}
                      
                      value={empresa.id}
                    >
                      {empresa.razonSocial}
                    </SelectItem>
                  ))}
                </Select>
              </div>
            </div>
            <div className={styles.boxe2201soli}>
              <div className={styles.boxe22010soli}>
                <div className={styles.boxe220110soli}>
                  <div className={styles.boxe2201100soli}>
                    <Input
                      radius="sm"
                      size="lg"
                      label="Razon social"
                      labelPlacement="outside"
                      classNames={{
                        inputWrapper: ["bg-default-200/50", "!cursor-text"],
                        label: ["!text-white"],
                      }}
                      isDisabled={isInputsDisabled}
                      value={razonsocial}
                      onChange={handlerazonsocialChange}
                    />
                  </div>
                  <div className={styles.boxe2201100soli}>
                    <Input
                      radius="sm"
                      size="lg"
                      label="Direccion"
                      labelPlacement="outside"
                      classNames={{
                        inputWrapper: ["bg-default-200/50", "!cursor-text"],
                        label: ["!text-white"],
                      }}
                      isDisabled={isInputsDisabled}
                      value={direccion}
                      onChange={handleDireccionChange}
                    />
                  </div>
                </div>
                <div className={styles.boxe220110soli}>
                  <div className={styles.boxe2201100soli}>
                  <Select
                      aria-label="Region"
                      size="lg"
                      variant="faded"
                      color="secondary"
                      placeholder={selectedEmpresaId ? `Región de ${selectedRegionName}` : "Selecciona una Región"}
                      labelPlacement="outside"
                      onChange={handleSelectionChangeRegion}
                      isDisabled={isInputsDisabled}
                    >
                      {region.map((region) => (
                        <SelectItem
                          textValue = {region.nombre}
                          className={styles.selectItemSoli}
                          key={region.id}
                          value={region.id}
                        >
                          {region.nombre}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                  <div className={styles.boxe2201100soli}>
                    <Input
                      radius="sm"
                      size="lg"
                      label="Ciudad"
                      labelPlacement="outside"
                      classNames={{
                        inputWrapper: ["bg-default-200/50", "!cursor-text"],
                        label: ["!text-white"],
                      }}
                      isDisabled={isInputsDisabled}
                      value={ciudad}
                      onChange={handleCiudadChange}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.boxe22011soli}>
                <div className={styles.boxe220110soli}>
                  <div className={styles.boxe2201100soli}>
                    <Input
                      radius="sm"
                      size="lg"
                      label="Rut"
                      labelPlacement="outside"
                      classNames={{
                        inputWrapper: ["bg-default-200/50", "!cursor-text"],
                        label: ["!text-white"],
                      }}
                      isDisabled={isInputsDisabled}
                      value={rutEmpresa}
                      onChange={handleRutEmpresaChange}
                    />
                  </div>
                  <div className={styles.boxe2201100soli}>
                    <Input
                      radius="sm"
                      size="lg"
                      label="Rubro"
                      labelPlacement="outside"
                      classNames={{
                        inputWrapper: ["bg-default-200/50", "!cursor-text"],
                        label: ["!text-white"],
                      }}
                      isDisabled={isInputsDisabled}
                      value={rubro}
                      onChange={handleRubroChange}
                    />
                  </div>
                </div>
                <div className={styles.boxe220110soli}>
                  <div className={styles.boxe2201100soli}>
                    <Button
                      className={styles.buttomSoli}
                      isDisabled={isInputsDisabled}
                      onClick={Save}
                    >
                      Guardar empresa
                    </Button>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.boxe221soli}>
            <div className={styles.boxe2210soli}>
              <Datosest token={Token}/>
            </div>
            <Button className={styles.boxe2211soli} onClick={Solicitar}>
                Realizar Solicitud
              </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
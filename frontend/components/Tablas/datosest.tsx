import React, { useState, useEffect } from "react";
import { Select, Button, Input, SelectItem } from "@nextui-org/react";
import styles from "../../styles/styleop.module.css";
import { datosEst, actualizarDatosUsuario } from "../../api/est/solicitudes";
import { updateSourceFile } from "typescript";
export default function Datosest({ token }) {
  const [isDisabled, setIsDisabled] = useState(true);
  const [data, setData] = useState({});
  const [selectedPlan, setSelectedPlan] = useState(data.planEstudio);
  const [selectedIngreso, setSelectedIngreso] = useState(data.ingreso);
  const planesDeCarrera = ["Plan A", "Plan B", "Plan C", "Plan D", "Plan E"];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await datosEst(token);
        setData(data);
      } catch (error) {
        console.error("Error al obtener datos del usuario:", error);
      }
    };
    fetchData();
  }, [token]);
  const editardatos = () => {
    if (!isDisabled) {
      const updatedData = {
        nombre1: document.getElementById("input-nombre1").value || data.nombre1,
        nombre2: document.getElementById("input-nombre2").value || data.nombre2,
        apellido1: document.getElementById("input-apellido1").value || data.apellido1,
        apellido2: document.getElementById("input-apellido2").value || data.apellido2,
        correo: document.getElementById("input-email").value || data.correo,
        telefono: document.getElementById("input-fono").value || data.telefono,
        planEstudio: selectedPlan || data.planEstudio,
        ingreso: selectedIngreso || data.ingreso,
      };
      actualizarDatosEnBackend(updatedData);
      alert("Se modificaron los datos");
      //obtener valores nuevos de los inputs
    }
    setIsDisabled(!isDisabled);
  };

  const actualizarDatosEnBackend = async (updatedData) => {
    try {
      // Llama a la función para actualizar datos en el backend
      await actualizarDatosUsuario(token, updatedData);
      alert("Datos actualizados exitosamente");
    } catch (error) {
      alert("Error al actualizar datos del usuario");
    }
  };
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1979 },
    (_, index) => currentYear - index
  );
  return (
    <div className={styles.datosest}>
      <p className={styles.Titulo}>Datos del alumno</p>
      <Input
        id="input-nombre1"
        className={styles.Textacept}
        type="name"
        label="Primer nombre:"
        placeholder={data.nombre1}
        isDisabled={isDisabled}
      />
      <Input
        id="input-nombre2"
        className={styles.Textacept}
        type="name"
        label="Segundo nombre:"
        placeholder={data.nombre2}
        isDisabled={isDisabled}
      />
      <Input
        id="input-apellido1"
        className={styles.Textacept}
        type="name"
        label="Primer apellido:"
        placeholder={data.apellido1}
        isDisabled={isDisabled}
      />
      <Input
        id="input-apellido2"
        className={styles.Textacept}
        type="name"
        label="Segundo apellido:"
        placeholder={data.apellido2}
        isDisabled={isDisabled}
      />

      <Input
        id="rut"
        className={styles.Textacept}
        type="rut"
        label="Rut"
        placeholder={data.rut}
        isDisabled
      />
      <Input
        id="input-email"
        className={styles.Textacept}
        type="email"
        label="Email"
        placeholder={data.correo}
        isDisabled
      />
      <Input
        id="input-fono"
        className={styles.Textacept}
        type="fono"
        label="Fono"
        placeholder={data.telefono}
        isDisabled={isDisabled}
      />
      <Select
        id="select-plan"
        className={styles.Textacept}
        isDisabled={isDisabled}
        disabled={isDisabled}
        label="Plan de estudio"
        placeholder={data.planEstudio}
        value={data.planEstudio}
        onChange={(value) => {
          //setSelectedPlan(value);
          // Agrega la lógica necesaria para manejar el cambio de valor
        }}
      >
        {planesDeCarrera.map((plan) => (
          <SelectItem key={plan} value={plan}>
            {plan}
          </SelectItem>
        ))}
      </Select>

      <Select
        id="select-ingreso"
        className={styles.Textacept}
        isDisabled={isDisabled}
        label="Año de ingreso"
        placeholder={data.ingreso}
        value={data.ingreso}
        onChange={(value) => {
          setSelectedIngreso(value);
          // Agrega la lógica necesaria para manejar el cambio de valor
        }}
      >
        {years.map((year) => (
          <SelectItem key={year} value={year} textValue={year.toString()}>
            {year}
          </SelectItem>
        ))}
      </Select>
      <Button
        size="lg"
        onClick={() => {
          editardatos();
        }}
        className={
          isDisabled
            ? "text-white bg-gradient-to-r from-blue-500 to-violet-500"
            : "text-white bg-gradient-to-r from-red-500 to-violet-500"
        }
      >
        {isDisabled ? "Habilitar Edición" : "Guardar Cambios"}
      </Button>
    </div>
  );
}

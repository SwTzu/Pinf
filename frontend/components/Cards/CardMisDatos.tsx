"use client";
import React from "react";
import { Button, Input, Card, Checkbox } from "@nextui-org/react";
import { PlusIcon } from "@/public/icons/PlusIcon";

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

interface CardMisDatosProps {
  datos_est: estudiante;
  setDatos_est: (datos_est: estudiante) => void;
  mod_est: boolean;
  setMod_est: (value: boolean) => void;
  click_save: () => void;
}

const CardMisDatos: React.FC<CardMisDatosProps> = ({
  datos_est,
  setDatos_est,
  mod_est,
  setMod_est,
  click_save,
}) => {
  return (
    <Card id="mis_datos">
      <div className="grid grid-cols-2">
        <h1 className="text-3xl font-bold text-gray-800 pt-[2rem] pl-[2rem]">
          Mis datos
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
          value={mod_est.toString()}
          isSelected={mod_est}
          onValueChange={setMod_est}
        >
          Modificar datos
        </Checkbox>
        <h2 className="text-1xl text-gray-400 pl-[2rem] mb-[0.8rem]">
          Vista general de mis datos
        </h2>
      </div>
      <div className="grid grid-cols-2 gap-[0.8rem] p-[0.8rem]">
        <Input
          variant="faded"
          placeholder="Nombre"
          value={datos_est.nombre1}
          onChange={(e) =>
            setDatos_est({ ...datos_est, nombre1: e.target.value })
          }
          isDisabled={!mod_est}
        />
        <Input
          variant="faded"
          placeholder="Segundo Nombre"
          value={datos_est.nombre2}
          onChange={(e) =>
            setDatos_est({ ...datos_est, nombre2: e.target.value })
          }
          isDisabled={!mod_est}
        />
        <Input
          variant="faded"
          placeholder="Apellido"
          value={datos_est.apellido1}
          onChange={(e) =>
            setDatos_est({ ...datos_est, apellido1: e.target.value })
          }
          isDisabled={!mod_est}
        />
        <Input
          variant="faded"
          placeholder="Segundo Apellido"
          value={datos_est.apellido2}
          onChange={(e) =>
            setDatos_est({ ...datos_est, apellido2: e.target.value })
          }
          isDisabled={!mod_est}
        />
        <Input variant="faded" placeholder="Rut" value={datos_est.rut} isDisabled />
        <Input
          variant="faded"
          placeholder="Plan de estudio"
          value={datos_est.planEstudio}
          onChange={(e) =>
            setDatos_est({ ...datos_est, planEstudio: e.target.value })
          }
          isDisabled={!mod_est}
        />
        <Input
          variant="faded"
          placeholder="Año de ingreso"
          value={datos_est.ingreso}
          onChange={(e) =>
            setDatos_est({ ...datos_est, ingreso: e.target.value })
          }
          isDisabled={!mod_est}
        />
        <Input
          variant="faded"
          placeholder="Email"
          type="email"
          value={datos_est.correo}
          onChange={(e) =>
            setDatos_est({ ...datos_est, correo: e.target.value })
          }
          isDisabled={!mod_est}
        />
        <Input
          variant="faded"
          placeholder="Nº Celular"
          type="number"
          isDisabled={!mod_est}
          startContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">+569</span>
            </div>
          }
          value={datos_est.telefono.toString()}
          onChange={(e) =>
            setDatos_est({ ...datos_est, telefono: e.target.value })
          }
        />
        {mod_est && (
          <div className="col-span-2">
            <Button color="primary" onClick={click_save}>
              Guardar
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default CardMisDatos;

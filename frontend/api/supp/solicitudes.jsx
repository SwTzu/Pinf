import { backendUrl } from "../../config/config";

export const crearSolicitud = async (token, rutEmpresa, numeroPractica) => {
  const datos = {
    numeroPractica: numeroPractica,
    rutEmpresa: rutEmpresa,
  };
  try {
    const response = await fetch(`${backendUrl}/solicitud/crear`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, datos }),
    });
    if (response.ok) {
      const data = await response.json();
      alert("Solicitud creada con exito");
      return data;
    } else {
      // Maneja el caso de credenciales incorrectas
      alert("Error al crear solicitud");
    }
  } catch (error) {
    // Maneja errores de red o de servidor
    console.error("Error de request", error);
    alert("Se produjo un error al intentar de nuevo mas tarde");
  }
};
export const crearCarta = async (datos) => {
  try {
    //console.log(datos);
    const response = await fetch(`${backendUrl}/carta/crear`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idSolicitud: datos.idSolicitud,
        correoSupervisor: datos.correoSupervisor,
        tareas: datos.tareas,
        //area:datos.tareas.area,
        fechaInicio: datos.fechaInicio,
        fechaTermino: datos.fechaTermino,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      alert("Carta creada con exito");
      return data; // Puedes devolver la respuesta del servidor si es necesario
    } else {
      throw new Error("Error al crear la carta");
    }
  } catch (error) {
    console.error("Error en la solicitud al servidor:", error);
    throw error; // Puedes manejar el error según tus necesidades
  }
};
export const crearInforme = async (idSolicitud, formulario) => {
  try {
    const response = await fetch(`${backendUrl}/informe/crear`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idSolicitud, formulario }),
    });
    if (response.ok) {
      return response; // Puedes devolver la respuesta del servidor si es necesario
    } else {
      throw new Error("Error al crear el informe");
    }
  } catch (error) {
    console.error("Error en la solicitud al servidor:", error);
    throw error; // Puedes manejar el error según tus necesidades
  }
};

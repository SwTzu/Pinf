"use client";
import { backendUrl } from "../../config/config";
export const actualizarDatosUsuario = async (token, nuevosDatos) => {
  console.log("nuevos datos", nuevosDatos);
  try {
    const response = await fetch(`${backendUrl}/usuario/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
        datos: nuevosDatos,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return data; // Puedes devolver la respuesta del servidor si es necesario
    } else {
      throw new Error("Error al actualizar datos del usuario");
    }
  } catch (error) {
    console.error("Error en la solicitud al servidor:", error);
    throw error; // Puedes manejar el error según tus necesidades
  }
};

export const Empresas = async (token) => {
  try {
    const response = await fetch(`${backendUrl}/stats/getNumerosEmpresas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return data; // Puedes devolver la respuesta del servidor si es necesario
    } else {
      throw new Error("Error al obtener datos del usuario");
    }
  } catch (error) {
    console.error("Error en la solicitud al servidor:", error);
    throw error; // Puedes manejar el error según tus necesidades
  }
};
export const Solicitudes = async (token) => {
  try {
    const response = await fetch(`${backendUrl}/solicitud/todasPracticas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("data", data);
      return data.solicitudes;
    } else {
      throw new Error("Error al obtener datos del usuario");
    }
  } catch (error) {
    console.error("Error en la solicitud al servidor:", error);
    throw error; // Puedes manejar el error según tus necesidades
  }
};
export const crearArea = async (nombre) => {
  try {
    const response = await fetch(`${backendUrl}/area/crear`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: nombre,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return data; // Puedes devolver la respuesta del servidor si es necesario
    } else {
      throw new Error("Error al crear el área");
    }
  } catch (error) {
    console.error("Error en la solicitud al servidor:", error);
    throw error; // Puedes manejar el error según tus necesidades
  }
};
export const listarArea = async () => {
  try {
    const response = await fetch(`${backendUrl}/area/listar`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const dato = await response.json();
      return dato;
    } else {
      alert("Error al recibir respuesta.");
    }
  } catch (error) {
    // Maneja errores de red o de servidor
    console.error("No funciono fetch:", error);
    return null;
  }
};
export const crearUsuarioAdm = async (
  token,
  data
) => {
  try {
    console.log("data", data);
    const response = await fetch(`${backendUrl}/coordinador/crear`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
        rut: data.rut,
        //password: password,
        telefono: data.telefono,
        correo: data.correo,
        direccion: data.direccion,
        tipoUsuario: data.tipoUsuario,
        nombre1: data.nombre1,
        nombre2: data.nombre2,
        apellido1: data.apellido1,
        apellido2: data.apellido2,
      }),
    });

    if (response.ok) {
      return response;
    } else {
      throw new Error("Error al crear el usuario");
    }
  } catch (error) {
    console.error("Error en la solicitud al servidor:", error);
    throw error; // Puedes manejar el error según tus necesidades
  }
};
export const editarUsuarioAdm = async (
  token, data
) => {
  try {
    const response = await fetch(`${backendUrl}/coordinador/editar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
        rut: data.rut,
        nombre1: data.nombre1 || undefined,
        nombre2: data.nombre2 || undefined,
        apellido1: data.apellido1 || undefined,
        apellido2: data.apellido2 || undefined,
        correo: data.correo || undefined,
        //password: data.password || undefined,
        tipoUsuario: data.tipoUsuario || undefined,
        telefono: data.telefono || undefined,
        direccion: data.direccion || undefined,
      }),
    });

    if (response.ok) {
      return response;
    } else {
      throw new Error("Error al editar el coordinador");
    }
  } catch (error) {
    console.error("Error en la solicitud al servidor:", error);
    throw error; // Puedes manejar el error según tus necesidades
  }
}
export const eliminarUsuarioAdm = async (token, rut) => {
  try {
    const response = await fetch(`${backendUrl}/coordinador/eliminar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
        rut: rut,
      }),
    });

    if (response.ok) {
      return response;
    } else {
      throw new Error("Error al eliminar el coordinador");
    }
  } catch (error) {
    console.error("Error en la solicitud al servidor:", error);
    throw error; // Puedes manejar el error según tus necesidades
  }
}
export const updateFase = async (token, idSolicitud, nroFase, motivoRechazo) => {
  try {
    const response = await fetch(`${backendUrl}/solicitud/actualizar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
        idSolicitud: idSolicitud,
        nroFase: nroFase,
        motivoRechazo: motivoRechazo,
      }),
    });

    if (response.ok) {
      return response;
    } else {
      throw new Error("Error al actualizar la fase de la solicitud");
    }
  } catch (error) {
    console.error("Error en la solicitud al servidor:", error);
    throw error; // Puedes manejar el error según tus necesidades
  }
}
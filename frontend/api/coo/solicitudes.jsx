"use client";
import { backendUrl } from '../../config/config';
export const actualizarDatosUsuario = async (token, nuevosDatos) => {
  console.log('nuevos datos',nuevosDatos);
  try {
    const response = await fetch(`${backendUrl}/usuario/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
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
      throw new Error('Error al actualizar datos del usuario');
    }
  } catch (error) {
    console.error('Error en la solicitud al servidor:', error);
    throw error; // Puedes manejar el error según tus necesidades
  }
};

export const Empresas = async (token) => {
  try {
    const response = await fetch(`${backendUrl}/stats/getNumerosEmpresas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: token,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return data; // Puedes devolver la respuesta del servidor si es necesario
    } else {
      throw new Error('Error al obtener datos del usuario');
    }
  } catch (error) {
    console.error('Error en la solicitud al servidor:', error);
    throw error; // Puedes manejar el error según tus necesidades
  }
};
export const Solicitudes = async (token) => {
  try {
    const response = await fetch(`${backendUrl}/solicitud/todasPracticas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: token,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('data',data);
      return data.solicitudes;
    } else {
      throw new Error('Error al obtener datos del usuario');
    }
  } catch (error) {
    console.error('Error en la solicitud al servidor:', error);
    throw error; // Puedes manejar el error según tus necesidades
  }
}
export const crearArea = async (nombre) => {
  try {
    const response = await fetch(`${backendUrl}/area/crear`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombre: nombre,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return data; // Puedes devolver la respuesta del servidor si es necesario
    } else {
      throw new Error('Error al crear el área');
    }
  }
  catch (error) {
    console.error('Error en la solicitud al servidor:', error);
    throw error; // Puedes manejar el error según tus necesidades
  }
};
export const listarArea = async () => {
  try {
    const response = await fetch(`${backendUrl}/area/listar`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const dato = await response.json();
      return dato;
    } else {
      alert('Error al recibir respuesta.');
    }
  } catch (error) {
    // Maneja errores de red o de servidor
    console.error('No funciono fetch:', error);
    return null;
  }
}
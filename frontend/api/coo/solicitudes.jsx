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
    const response = await fetch(`${backendUrl}/empresa/getEmpresas`, {
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
      console.log(data);
      return data; // Puedes devolver la respuesta del servidor si es necesario
    } else {
      throw new Error('Error al obtener datos del usuario');
    }
  } catch (error) {
    console.error('Error en la solicitud al servidor:', error);
    throw error; // Puedes manejar el error según tus necesidades
  }
};
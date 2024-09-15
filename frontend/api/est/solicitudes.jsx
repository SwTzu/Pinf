"use client";
import { backendUrl } from '../../config/config';
export const PDF = async (Token, selectedEmpresaId, asignatura) => {
  // Configurar los datos para la solicitud a la API
  if (!selectedEmpresaId) {
    alert('Selecciona una empresa antes de solicitar');
    return;
  }

  const Data = {
    token: Token,
    rutEmpresa: selectedEmpresaId,
    asignatura: asignatura,
  };
  // Realiza la solicitud a la API
  try {
    const response = await fetch(`${backendUrl}/utils/unirDatos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Data),
    });

    if (response.ok) {
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      window.open(blobUrl, '_blank');
    } else {
      // Maneja el caso de credenciales incorrectas
      alert('Error al recibir respuesta.');
    }
  } catch (error) {
    // Maneja errores de red o de servidor
    console.error('No funciono fetch:', error);
    alert('Error.');
  }
};
export const funcionSave = async (dataToSave) => {
  // Configurar los datos para la solicitud a la API
  const Data = {
    rutEmpresa: dataToSave.rutEmpresa,
    razonSocial: dataToSave.razonsocial,
    direccion: dataToSave.direccion,
    ciudad: dataToSave.ciudad,
    region: dataToSave.region,
    rubro: dataToSave.rubro,
  };
  // Realiza la solicitud a la API
  try {
    const response = await fetch(`${backendUrl}/empresa/crear`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Data),
    });

    if (response.ok) {
      alert('Empresa creada correctamente');
    } else {
      // Maneja el caso de credenciales incorrectas
      alert('Error al recibir respuesta.');
    }
  } catch (error) {
    // Maneja errores de red o de servidor
    console.error('No funciono fetch:', error);
    alert('Error.');
  }
};
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

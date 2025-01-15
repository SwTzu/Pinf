import { backendUrl } from '../../config/config';
export const PDF = async (Token, selectedEmpresaId, numeroPractica) => {
  // Configurar los datos para la solicitud a la API
  if (!selectedEmpresaId) {
    alert('Selecciona una empresa antes de solicitar');
    return;
  }

  const Data = {
    token: Token,
    rutEmpresa: selectedEmpresaId,
    numeroPractica: numeroPractica,
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
export const actualizarDatosUsuario = async (token, nuevosDatos) => {
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
export const datosEst = async (token) => {
  const Data = {
    token: token,
  };
  try {
    const response = await fetch(`${backendUrl}/usuario/verDatos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Data),
    });

    if (response.ok) {
      const dato = await response.json();
      const data = dato.usuario;
      return data;
    } else {
      alert('Error al recibir respuesta.');
    }
  } catch (error) {
    // Maneja errores de red o de servidor
    console.error('No funciono fetch:', error);
    return null;
  }
};
export const datosEMP = async (idSolicitud) => {
  const Data = {
    idSolicitud: idSolicitud,
  };
  try {
    const response = await fetch(`${backendUrl}/empresa/getEmpresa`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Data),
    });

    if (response.ok) {
      const empresa = await response.json();
      return empresa;
    } else {
      alert('Error al recibir respuesta.');
    }
  } catch (error) {
    // Maneja errores de red o de servidor
    console.error('No funciono fetch:', error);
    return null;
  }
};
export const extarerEmpresa = async (token, idSolicitud) => {
  try {
    const response = await fetch(`${backendUrl}/empresa/getEmpresa`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: token,
        idSolicitud: idSolicitud,
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
export const All_EMP = async () => {
  try {
    const response = await fetch(`${backendUrl}/empresa/listar`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      // Maneja el caso de credenciales incorrectas
      alert('Error al cargar solicitudes');
    }
  } catch (error) {
    // Maneja errores de red o de servidor
    console.error('Error de request', error);
    alert('Se produjo un error al intentar de nuevo mas tarde');
  }
};
export const DELETEsolicitudes = async (token, idSolicitud) => {
  const Data = {
    token: token,
    idSolicitud: idSolicitud,
  };
  try {
    const response = await fetch(`${backendUrl}/solicitud/eliminar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Data),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      // Maneja el caso de credenciales incorrectas
      alert('Error al eliminar solicitud');
    }
  } catch (error) {
    // Maneja errores de red o de servidor
    console.error('Error de request', error);
    alert('Se produjo un error al intentar de nuevo mas tarde');
  }
};
export const addSup = async (token, idSolicitud, correoSupervisor) => {
  const Data = {
    token: token,
    idSolicitud: idSolicitud,
    correoSupervisor: correoSupervisor,
  };
  try {
    const response = await fetch(`${backendUrl}/solicitud/addSup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Data),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      // Maneja el caso de credenciales incorrectas
      alert('Error al eliminar solicitud');
    }
  } catch (error) {
    // Maneja errores de red o de servidor
    console.error('Error de request', error);
    alert('Se produjo un error al intentar de nuevo mas tarde');
  }
};
export const crearSolicitud = async (token,rutEmpresa, numeroPractica) => {
  const datos = {
    numeroPractica: numeroPractica,
    rutEmpresa: rutEmpresa
  };
  try {
    const response = await fetch(`${backendUrl}/solicitud/crear`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({token,datos}),
    });
    if (response.ok) {
      const data = await response.json();
      alert('Solicitud creada con exito');
      return data;
    } else {
      // Maneja el caso de credenciales incorrectas
      alert('Error al crear solicitud');
    }
  } catch (error) {
    // Maneja errores de red o de servidor
    console.error('Error de request', error);
    alert('Se produjo un error al intentar de nuevo mas tarde');
  }
}
export const newEmpresaCreate= async (token,empresa,numeroPractica) => {
  const estudiante={token:token,numeroPractica:numeroPractica}
  try {
    const response = await fetch(`${backendUrl}/solicitud/SolicitudyEmpresa`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({estudiante,empresa}),
    });
    if (response.ok) {
      alert('Solicitud creada con exito');
    } else {
      // Maneja el caso de credenciales incorrectas
      if(response.status===500){
        alert('La empresa ya existe, por favor verifique que la empresa este en la lista de empresas verificadas');
      }
    }
  } catch (error) {
    // Maneja errores de red o de servidor
    console.error('Error de request', error);
    alert('Se produjo un error al intentar de nuevo mas tarde', error);
  }
}
export const deleteSolicitud = async (data) => {
  try {
    const response = await fetch(`${backendUrl}/solicitud/eliminar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      alert('Solicitud eliminada con exito');
    } else {
      // Maneja el caso de credenciales incorrectas
      alert('Error al crear empresa');
    }
  } catch (error) {
    // Maneja errores de red o de servidor
    console.error('Error de request', error);
    alert('Se produjo un error al intentar de nuevo mas tarde');
  }
}
export const obtenerCarta = async (idSolicitud) => {
  try {
    const response = await fetch(`${backendUrl}/carta/obtener`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idSolicitud }),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Error al obtener la carta');
    }
  } catch (error) {
    console.error('Error en la solicitud al servidor:', error);
    throw error;
  }
}
export const aceptarCarta = async (idSolicitud) => {
  try {
    const response = await fetch(`${backendUrl}/solicitud/check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({  idSolicitud}),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Error al aceptar la carta');
    }
  } catch (error) {
    console.error('Error en la solicitud al servidor:', error);
    throw error;
  }
}
export const uploadMemoria = async (token,idSolicitud, file) => {
  try {
    const formData = new FormData();
    formData.append('token', token);
    formData.append('file', file);
    formData.append('idSolicitud', idSolicitud);

    const response = await fetch(`${backendUrl}/memoria/uploadMemoria`, {
      method: 'POST',
      body: formData,
      file: file,
    });

    if (response.ok) {
      return response;
    } else {
      throw new Error('Error al subir la memoria');
    }
  } catch (error) {
    console.error('Error en la solicitud al servidor:', error);
    throw error;
  }
};

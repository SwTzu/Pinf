import { backendUrl} from "../config/config";
export const funcionlogin = async (rut, password,userType,isValid,setIsLoading,router) => {
    if (!isValid || !rut.raw || !password) {
      alert("Rut o contraseña inválidos");
      return; // Evitar iniciar sesión si el RUT no es válido
    }
    const userData = {
      rut: rut.raw,
      password: password,
      userType: userType
    };
  try {
    setIsLoading(true);
    const response = await fetch(`${backendUrl}/usuario/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (response.ok) {
      const data = await response.json();
      const token = data.token;
      localStorage.setItem('token', token);
      router.push(`/${userType}`); // cambiar al implementar tipos de usuario //userType
    } else {
      // Maneja el caso de credenciales incorrectas
      alert("Credenciales incorrectas. Por favor, inténtalo de nuevo.");
    }
  } catch (error) {
    // Maneja errores de red o de servidor
    console.error("Error al iniciar sesión:", error);
    setIsLoading(false);
    alert(
      "Se produjo un error al intentar iniciar sesión. Por favor, inténtalo más tarde."
    );
  } 
};
export const funcionloginSup = async (rut, password,userType,isValid,setIsLoading,router) => {
  const userData = {
    correoSupervisor: rut,
    password: password
  };
try {
  setIsLoading(true);
  const response = await fetch(`${backendUrl}/supervisor/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  if (response.ok) {
    const data = await response.json();
    const token = data.token;
    localStorage.setItem('token', token);
    router.push(`/${userType}`); // cambiar al implementar tipos de usuario //userType
  } else {
    // Maneja el caso de credenciales incorrectas
    alert("Credenciales incorrectas. Por favor, inténtalo de nuevo.");
  }
} catch (error) {
  // Maneja errores de red o de servidor
  console.error("Error al iniciar sesión:", error);
  setIsLoading(false);
  alert(
    "Se produjo un error al intentar iniciar sesión. Por favor, inténtalo más tarde."
  );
}
};
export const funcionLogOut = async () => {
  const response = await fetch(`${backendUrl}/supervisor/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  if (response.ok) {
    localStorage.clear();
    caches.keys().then(names => {
      for (let name of names) caches.delete(name);
    });
  } else {
    alert("Error al cerrar sesión");
  }
};
const API_ROOT_LOCAL = "http://localhost:8000/api/";
const API_ROOT_PRODUCTION = "https://biblioteca3.ieti.site/api/";
export const API_URL = API_ROOT_LOCAL; // Ajusta según tu Django API (uso en local o producción)

export const getBooks = () => {
  return fetch(API_URL + "llibres")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al obtener los libros");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error en la API:", error);
      return [];
    });
};

/* Obtenemos el archivo CSV para ser exportado en la base de datos*/
export const importCsv = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(API_URL + "import-users", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Error al importar el CSV");
    }

    return await response.json(); // Assuming the API returns JSON
  } catch (error) {
    console.error("Error en la API:", error);
    throw error;
  }
};

export const getBookById = async (id) => {
  try {
    const response = await fetch(`${API_URL}llibres/${id}`);
    if (!response.ok) {
      throw new Error("Error al obtener la información del libro");
    }
    const data = await response.json();

    return data; // Retorna los resultados de la búsqueda
  } catch (error) {
    console.error("Error en la API:", error);
    return null;
  }
};

export async function logIn(username, password) {
  try {
    // Codificar las credenciales en Base64
    const credentials = btoa(`${username}:${password}`);

    // Realizar la solicitud al endpoint de autenticación
    const response = await fetch(API_URL + "token", {
      method: "GET", // El endpoint usa GET
      headers: {
        Authorization: `Basic ${credentials}`, // Enviar las credenciales en el encabezado
      },
    });

    if (!response.ok) {
      throw new Error("Invalid credentials");
    }

    const data = await response.json();

    // Guardar el token en localStorage
    localStorage.setItem("token", data.token);

    return data.token; // Retornar el token si es necesario
  } catch (err) {
    console.error("Error during login:", err.message);
    throw err; // Lanza el error para manejarlo en el componente
  }
}

export async function getUserInfo(token) {
  try {
    const response = await fetch(API_URL + "user-info", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // Enviar el token en el encabezado
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user info");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error fetching user info:", err.message);
    throw err;
  }
}

export async function updateUserProfile(token, email, telefon, avatar = null) {
  try {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("telefon", telefon);
    if (avatar) {
      formData.append("avatar", avatar); // Si se sube una imagen, se agrega al FormData
    }

    const response = await fetch(API_URL + "update-profile/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`, // Enviar el token en el encabezado
      },
      body: formData, // Enviar los datos del formulario
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.formErrors || "Error al actualizar el perfil");
    }

    const data = await response.json();
    //("Perfil actualizado:", data);
    return data;
  } catch (err) {
    console.error("Error al actualizar el perfil:", err.message);
    throw err;
  }
}

export async function searchBook(queryText) {
  try {
    const response = await fetch(
      `${API_URL}llibres/search?text=${encodeURIComponent(queryText)}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error("Error al buscar libros");
    }

    const data = await response.json();
    return data; // Retorna los resultados de la búsqueda
  } catch (err) {
    console.error("Error en la búsqueda de libros:", err.message);
    throw err; // Lanza el error para manejarlo en el componente
  }
}

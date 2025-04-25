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
    const response = await fetch(API_URL + "importUsersFromCsv/", {
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

export const getItemById = async (id, itemType) => {
  console.log("ITEM DETAILS", id, itemType);
  try {
    const response = await fetch(`${API_URL}catalegs/${itemType}/${id}`);
    if (!response.ok) {
      throw new Error("Error al obtener la información del Item");
    }
    const data = await response.json();
    console.log("data", data);

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

export async function searchItem(queryText, page = 1) {
  try {
    const response = await fetch(
      `${API_URL}catalegs/search?text=${encodeURIComponent(
        queryText
      )}&page=${page}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error("Error al buscar libros");
    }

    const data = await response.json();
    let modifiedData = data;
    if (data) {
      modifiedData = { ...data, searchText: queryText };
    }
    return modifiedData; // { current_page, total_pages, results }
  } catch (err) {
    console.error("Error en la búsqueda de libros:", err.message);
    throw err;
  }
}
export async function searchUsers(textQuery, userToken) {
  console.log("usertoken", userToken);
  try {
    const response = await fetch(`${API_URL}usuaris/${textQuery}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${userToken}`, // Enviar las credenciales en el encabezado
      },
    });

    if (!response.ok) {
      if (response.status === 500) {
        throw new Error("Server error: Unable to process the request");
      }
      throw new Error("Failed to fetch user info");
    }

    const data = await response.json();
    return data; // Assuming the API returns a list of users
  } catch (err) {
    console.error("Error fetching user info:", err.message);
    throw err;
  }
}

export async function insertLoan(userId, exemplarId) {
  try {
    const response = await fetch(`${API_URL}prestecs/${userId}/${exemplarId}`, {
      method: "POST",
    });

    if (!response.ok) {
      if (response.status === 500) {
        throw new Error("Server error: Unable to process the request");
      }
      throw new Error("Failed to insert loan");
    }

    const data = await response.json();
    return data; // Assuming the API returns the loan details
  } catch (err) {
    console.error("Error inserting loan:", err.message);
    throw err;
  }
}

const API_URL = "http://localhost:8000/api/"; // Ajusta según tu Django API

export const getBooks = () => {
  console.log("llamando API...");
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

export const getBookById = (id) => {
  return fetch(`${API_URL}llibres/${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al obtener la información del libro");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error en la API:", error);
      return null;
    });
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
    console.log("Login success:", data);

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
    console.log("User info:", data["user-details"]); // Debugging
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
    console.log("Perfil actualizado:", data);
    return data;
  } catch (err) {
    console.error("Error al actualizar el perfil:", err.message);
    throw err;
  }
}

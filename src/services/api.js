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

export async function logIn() {
  try {
    const response = await fetch(API_URL + "llibres", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Invalid credentials");
    }

    const data = await response.json();
    console.log("Login success:", data);

    // Guardar el token (si usas JWT)
    localStorage.setItem("token", data.token);

    // Redirigir o cambiar estado
  } catch (err) {
    setError(err.message);
  }
}

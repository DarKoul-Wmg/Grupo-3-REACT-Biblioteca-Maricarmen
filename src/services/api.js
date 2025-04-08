const API_ROOT_LOCAL = 'http://localhost:8000'
const API_ROOT_PRODUCTION = 'https://biblioteca3.ieti.site'
const API_URL = API_ROOT_PRODUCTION+'/api/llibres'; // Ajusta según tu Django API (uso en local o producción)

export const getBooks = () => {
  console.log('llamando API...');
  return fetch(API_URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error al obtener los libros');
      }
      return response.json();
    })
    .catch((error) => {
      console.error('Error en la API:', error);
      return [];
    });
};

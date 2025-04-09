const API_URL = 'http://localhost:8000/api/'; // Ajusta según tu Django API

export const getBooks = () => {
  console.log('llamando API...');
  return fetch(API_URL + 'llibres')
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


 /* Obtenemos el archivo CSV para ser exportado en la base de datos*/
export const importCsv = (file) => {
    console.log('Llamada a la API para importar CSV...');

    const formData = new FormData();
    formData.append('file', file);

    return fetch(API_URL + 'importcsv', {
      method: 'POST',
      body:FormData,
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error al importar el CSV');
      }
      return response.json();
    })
    .catch((error) => {
      console.error('Error en la API:', error);
      return [];
    });
}

# TPO 

Este proyecto utiliza **json-server** para simular una API REST que maneja los datos de productos. A continuación, te proporciono las instrucciones para levantar el proyecto y acceder a los datos a través de la API.

## Requisitos

- **Node.js** y **npm** instalados en tu máquina.
- **json-server** para simular la API de productos.

## Instrucciones para levantar el proyecto

### 1. Levantar **json-server** para obtener los datos de los productos

1. Navega a la carpeta `data` donde se encuentra el archivo .json con los datos de productos.

2. **Haz clic derecho en `data` y selecciona "Abrir en terminal"**

3. Ejecuta el siguiente comando para levantar el servidor **json-server** en el puerto 3001:

   ```bash
   npx json-server db.json --port 3001

### 2. Levantar el servidor de desarrollo de tu proyecto

1. Abre una nueva terminal en la carpeta raíz de tu proyecto.

2. Ejecuta el siguiente comando para levantar el servidor de desarrollo de tu proyecto:

   ```bash
   npm run dev

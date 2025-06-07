# Sistema de E-Commerce - Frontend React + JS

Este repositorio corresponde al **frontend** del Trabajo Práctico Obligatorio de la materia _Aplicaciones Interactivas_ (Primer Cuatrimestre 2025).

La aplicación simula un sistema de e-commerce que permite a los usuarios registrarse, iniciar sesión, navegar por un catálogo de productos, gestionar un carrito de compras y publicar productos.

Para el desarrollo se utilizó **React** junto con **json-server** como servidor simulado, y **imgbb** para el manejo de imágenes de productos.

> 📁 Este repositorio representa **la primera entrega** enfocada exclusivamente en el frontend. La integración con el backend se realizará en próximas etapas del proyecto, reemplazando json-server.


## Índice

[1. Contexto del proyecto](#1-contexto-del-proyecto)  
[2. Requisitos](#2-requisitos)  
[3. Instrucciones para levantar el proyecto](#3-instrucciones-para-levantar-el-proyecto)  
  [3.1 Clonar e instalar dependencias](#31-clonar-e-instalar-dependencias)  
  [3.2 Levantar json-server](#32-levantar-json-server)  
  [3.3 Obtener API Key de imgbb](#33-obtener-api-key-de-imgbb)  
  [3.4 Iniciar servidor React](#34-iniciar-servidor-react)  
[4. Acceso al proyecto](#4-acceso-al-proyecto)  
[5. Notas adicionales](#5-notas-adicionales)  

## 1. Contexto del proyecto

Este trabajo consiste en el desarrollo de una aplicación web para una empresa que busca ofrecer un servicio de compras online.  
Los requerimientos incluyen:

### Gestión de Usuarios

- Registro con nombre, apellido, nombre de usuario, email y contraseña.
- Inicio de sesión con email y contraseña.

### Catálogo de Productos

- Listado alfabético de productos.
- Listado de categorías.
- Vista de detalle con imagen y descripción.
- Opción de agregar productos al catálogo.
- Control de stock para evitar agregar productos agotados.

### Carrito de Compras

- Agregar, eliminar y vaciar productos del carrito.
- Calcular el total del carrito (checkout sin pago).
- Descontar stock tras el checkout.

### Gestión de Productos

- Publicar productos con imagen, descripción y categoría.
- Modificar o eliminar publicaciones.
- Gestionar el stock del producto publicado.

## 2. Requisitos

Asegúrate de tener instalados los siguientes elementos:

- [Node.js y npm](https://nodejs.org/) (versión recomendada: 16.x o superior)
- Generar una **API Key** en [imgbb.com](https://api.imgbb.com/)

## 3. Instrucciones para levantar el proyecto

### 3.1 Clonar e instalar dependencias

Abre una terminal y ejecuta:

```bash
git clone https://github.com/jonathanmilo/APIS2025FRONT
cd APIS2025FRONT
npm install
```

Esto descargará el proyecto y sus dependencias.

---

### 3.2 Levantar json-server

```bash
cd data
npx json-server db.json --port 3001
```

Esto iniciará un servidor REST en `http://localhost:3001`.

> Mantén esta terminal abierta mientras trabajas.

### 3.3 Obtener API Key de imgbb

1. Accede a [https://api.imgbb.com/](https://api.imgbb.com/).
2. Regístrate o inicia sesión.
3. Genera una nueva API key desde el panel de control.
4. Copia tu API key y pegala en la constante **API_KEY** de la función [uploadImages.js](src/utils/uploadImages.js).

### 3.4 Iniciar servidor React

Abre una nueva terminal en la raíz del proyecto y ejecuta:

```bash
npm run dev
```

Esto levantará el frontend en: [http://localhost:5173](http://localhost:5173)

## 4. Acceso al proyecto

- **Frontend React:** [http://localhost:5173](http://localhost:5173)
- **API json-server:** [http://localhost:3001](http://localhost:3001)

## 5. Notas adicionales

- Asegúrate de que los puertos `5173` (Vite) y `3001` (json-server) estén disponibles.
- Los datos sensibles (como la API Key de imgbb) **no deben subirse al repositorio**. En el futuro, moveremos esta lógica al backend en Spring Boot para mayor seguridad.
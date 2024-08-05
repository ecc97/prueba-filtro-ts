# Data Leaker

### Introducción

Data leaker es una mini aplicación web que utiliza una API para gestionar post mediante operaciones CRUD. La aplicación está construida utilizando HTML, TypeScript y sigue el patrón MVC (Modelo-Vista-Controlador). Proporciona funcionalidades de autenticación para usuarios y administradores, así como operaciones básicas de administración de libros.

### Estructura del Proyecto

El proyecto está organizado en dos directorios principales:

- **/src**: Contiene el código fuente TypeScript y los recursos de la aplicación.
    - **/controllers**: Contiene controladores para la lógica de negocio.
    - **/models**: Define modelos de datos utilizando interfaces TypeScript.
    - **/views**: Contiene scripts adicionales para las vistas de la aplicación.
    - **/components**: Contiene componentes de funcionalidades adicionales
    - **main.ts**: Archivo de inicio que maneja la autenticación y la inicialización de la aplicación.
- **/dist**: Contiene el código compilado JavaScript y recursos estáticos para producción.

### Características

- Autenticación de usuarios y administradores.
- Operaciones CRUD para libros.

### Tecnologías Utilizadas

- HTML
- CSS (utilizando Tailwind CSS)
- TypeScript
- Swagger para documentación de API
- Postman para pruebas de API
- Node.js
- Git y GitHub

### Configuración

Para configurar y ejecutar el proyecto, sigue estos pasos:

1. Instala los paquetes de vite globalmente: `npm i`
2. Ejecuta `npm run dev` para inicializar el proyecto.
3. Ejecita json-server `npx json-server public/data/db.json`

(Por mótivos de que no me ejecutaban algunos endpoints de los post, opté por utilizar una rest api con json-server, los únicos endpoints de la api:https://api-posts.codificando.xyz/  que funcionaron fue la de Auth login y Create User)
### Endpoints

- **Auth**
    - POST `/api/v1/auth/login`: Inicia sesión con credenciales de usuario.
- **Books**
    - POST `/posts`: Crea un nuevo posts.
    - GET `/posts`: Obtiene todos los posts.
    - PUT `/posts/{id}`: Actualiza un post por ID.
    - DELETE `posts/{id}`: Elimina un post por ID.
- **Users**
    - POST `/users/register`: Crea un nuevo usuario.
    - POST `/auth/loginr`: Inicia sesión


### Autor

- GitHub: [@ecc97](https://github.com/ecc97)
- Correos electrónicos: [carmonaedwin5@gmail.com](mailto:carmonaedwin5@gmail.com), [carmonaedwin1123@gmail.com](mailto:carmonaedwin1123@gmail.com)

Este archivo [README.md](https://github.com/ecc97/HU-BooksManager-API/tree/develop#README) proporciona una visión general del proyecto BookManager-API, incluyendo su estructura, características, configuración, endpoints principales y detalles de ramificación.
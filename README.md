Este proyecto fue creado con [Create React App](https://github.com/facebook/create-react-app).

## Comenzar

Para instalar este proyecto primero debe clonarlo:

### Prerequisitos

 Git
 Node JS
 NPM
 JSON Server

### Instalacion

 `git clone https://github.com/GermanAngarita/PruebaFronted.git` Para clonar el repositorio
 `cd PruebaFronted` Acceder a la carpeta donde quedo clonado el repositorio
 `npm install` Instala las dependencias

### Instalacion JSON Server

Este proyecto usa JSON Server, debes instalarlo antes de continuar, una vez instalado correlo con el siguiente

 `cd PruebaFronted` Acceder a la carpeta donde quedo clonado el repositorio
 `json-server --watch db.json --port 3004`

### Iniciar el Proyecto

Este proyecto tiene variables de entorno que se fijan cuando se arranca el servidor, para iniciar con las 
variables de entorno:

 `npm run dev`


 Abra [http://localhost:3000](http://localhost:3000) para ver el proyecto en el navegador.

### Variables de entorno

Las variables de entorno para este proyecto son:

`REACT_APP_API_URL=http://localhost:3004`

Conexion on JSON Server

`REACT_APP_CAPITAL_BASE_BANCO=1000000`

Capital base del banco
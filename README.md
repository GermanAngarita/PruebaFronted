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

### Iniciar el Proyecto

Las variables de entorno para este proyecto son:

`REACT_APP_API_URL=http://localhost:3004`
`REACT_APP_CAPITAL_BASE_BANCO=1000000`


<!-- ### `npm run dev`

Para correr el proyecto en modo desarrollo, se cargaran las siguientes variables de entorno con este comando:

`REACT_APP_API_URL=http://localhost:3004`
`REACT_APP_CAPITAL_BASE_BANCO=1000000`


### `json-server --watch db.json --port 3004`

Para iniciar el servicio


### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information. -->


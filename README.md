# Backend - Task Tracker API

API REST para la gestión de proyectos, épicas, historias y tareas.

## 📋 Descripción

Backend desarrollado con Express.js que proporciona una API RESTful completa para gestionar:
- **Usuarios**: Autenticación y gestión de usuarios
- **Proyectos**: Creación y gestión de proyectos
- **Épicas**: Agrupación de funcionalidades dentro de proyectos
- **Historias**: Historias de usuario dentro de épicas
- **Tareas**: Tareas específicas dentro de historias

## 🚀 Características

- ✅ Autenticación con JWT
- ✅ Middleware de autorización
- ✅ API RESTful completa
- ✅ Integración con MongoDB
- ✅ Encriptación de contraseñas con bcrypt
- ✅ CORS habilitado
- ✅ Validación de datos

## 📁 Estructura del Proyecto

```
src/
├── app.js                   # Configuración principal de Express
├── config/
│   └── db.js               # Configuración de conexión a MongoDB
├── controllers/            # Lógica de negocio
│   ├── user.controllers.js
│   ├── project.controllers.js
│   ├── epic.controllers.js
│   ├── story.controllers.js
│   └── task.controllers.js
├── middlewares/            # Middleware de la aplicación
│   └── auth.middlewares.js # Verificación de JWT
├── models/                 # Modelos de datos (MongoDB)
│   ├── user.model.js
│   ├── project.model.js
│   ├── epic.model.js
│   ├── story.model.js
│   └── task.model.js
└── routes/                 # Definición de rutas
    ├── user.routes.js
    ├── project.routes.js
    ├── epic.routes.js
    ├── story.routes.js
    └── task.routes.js
```

## 🔧 Requisitos Previos

- Node.js v16 o superior
- npm o yarn
- MongoDB (local o Atlas)

## 💻 Instalación

```bash
npm install
```

## 🔐 Configuración

Crear archivo `.env` en la raíz del proyecto:

```env
PORT=8000
MONGODB_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/nombre_bd
JWT_SECRET=tu_clave_secreta_muy_segura
```

## 🏃 Ejecución

### Modo desarrollo (con nodemon)
```bash
npm run dev
```

### Modo producción
```bash
npm start
```

El servidor estará disponible en `http://localhost:8000`

## 📚 Documentación de Endpoints

### Autenticación (sin protección)

#### Registrar usuario
```
POST /api/users/register
Content-Type: application/json

{
  "email": "usuario@ejemplo.com",
  "password": "contraseña",
  "nombre": "Juan"
}
```

#### Iniciar sesión
```
POST /api/users/login
Content-Type: application/json

{
  "email": "usuario@ejemplo.com",
  "password": "contraseña"
}
```

**Respuesta:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": { ... }
}
```

---

### Proyectos (requieren autenticación)

#### Listar proyectos
```
GET /api/projects
Authorization: Bearer <token>
```

#### Crear proyecto
```
POST /api/projects
Authorization: Bearer <token>
Content-Type: application/json

{
  "nombre": "Mi Proyecto",
  "descripcion": "Descripción del proyecto",
  "owner": "id_del_usuario"
}
```

#### Obtener proyecto específico
```
GET /api/projects/:id
Authorization: Bearer <token>
```

#### Actualizar proyecto
```
PUT /api/projects/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "nombre": "Nuevo nombre",
  "descripcion": "Nueva descripción"
}
```

#### Eliminar proyecto
```
DELETE /api/projects/:id
Authorization: Bearer <token>
```

---

### Épicas (requieren autenticación)

#### Listar épicas
```
GET /api/epics
Authorization: Bearer <token>
```

#### Crear épica
```
POST /api/epics
Authorization: Bearer <token>
Content-Type: application/json

{
  "titulo": "Título de la épica",
  "descripcion": "Descripción",
  "projectId": "id_del_proyecto"
}
```

#### Obtener épica
```
GET /api/epics/:id
Authorization: Bearer <token>
```

#### Actualizar épica
```
PUT /api/epics/:id
Authorization: Bearer <token>
Content-Type: application/json
```

#### Eliminar épica
```
DELETE /api/epics/:id
Authorization: Bearer <token>
```

---

### Historias (requieren autenticación)

#### Listar historias
```
GET /api/stories
Authorization: Bearer <token>
```

#### Crear historia
```
POST /api/stories
Authorization: Bearer <token>
Content-Type: application/json

{
  "titulo": "Título de la historia",
  "descripcion": "Descripción",
  "epicId": "id_de_la_epica"
}
```

#### Obtener historia
```
GET /api/stories/:id
Authorization: Bearer <token>
```

#### Actualizar historia
```
PUT /api/stories/:id
Authorization: Bearer <token>
Content-Type: application/json
```

#### Eliminar historia
```
DELETE /api/stories/:id
Authorization: Bearer <token>
```

---

### Tareas (requieren autenticación)

#### Listar tareas
```
GET /api/tasks
Authorization: Bearer <token>
```

#### Crear tarea
```
POST /api/tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "titulo": "Título de la tarea",
  "descripcion": "Descripción",
  "storyId": "id_de_la_historia",
  "estado": "pendiente|en_progreso|completada"
}
```

#### Obtener tarea
```
GET /api/tasks/:id
Authorization: Bearer <token>
```

#### Actualizar tarea
```
PUT /api/tasks/:id
Authorization: Bearer <token>
Content-Type: application/json
```

#### Eliminar tarea
```
DELETE /api/tasks/:id
Authorization: Bearer <token>
```

---

## 🔐 Autenticación

La API utiliza **JWT (JSON Web Tokens)** para autenticación. 

Para acceder a rutas protegidas, incluye el token en el header:
```
Authorization: Bearer <tu_token_jwt>
```

El token se obtiene al registrarse o iniciar sesión.

## 📦 Dependencias

- **express** - Framework web
- **mongoose** - ODM para MongoDB
- **jwt** - Autenticación con tokens
- **bcrypt** - Hash seguro de contraseñas
- **cors** - Permitir solicitudes cross-origin
- **dotenv** - Gestión de variables de entorno

## 🛠️ Scripts

- `npm run dev` - Inicia en modo desarrollo con nodemon
- `npm start` - Inicia servidor en modo producción
- `npm test` - Ejecuta tests (no configurado)

## 📝 Variables de Entorno

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `PORT` | Puerto del servidor | 8000 |
| `MONGODB_URI` | URI de conexión a MongoDB | mongodb+srv://user:pass@cluster.mongodb.net/dbname |
| `JWT_SECRET` | Clave secreta para JWT | tu_clave_muy_segura |

## 🚨 Manejo de Errores

La API retorna códigos HTTP estándar:

- `200` - Éxito
- `201` - Recurso creado
- `400` - Solicitud inválida
- `401` - No autenticado
- `403` - No autorizado
- `404` - Recurso no encontrado
- `500` - Error del servidor

## 👤 Autor

Gonzalo Barroso

## 📄 Licencia

ISC

---

**Última actualización:** Diciembre 2025

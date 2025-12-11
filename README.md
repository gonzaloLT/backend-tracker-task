# 🚀 TaskManager API - Documentación Técnica

Backend API RESTful desarrollada con **Node.js**, **Express** y **MongoDB** para la gestión integral de proyectos. Este sistema permite administrar Proyectos, Épicas, Historias de Usuario y Tareas, siguiendo una estructura jerárquica y validaciones de seguridad basadas en la propiedad del recurso (*Ownership*).

## 🛠️ Tecnologías Utilizadas

-   **Runtime:** Node.js
-   **Framework:** Express.js
-   **Base de Datos:** MongoDB
-   **ODM:** Mongoose
-   **Autenticación:** JWT (JSON Web Tokens)
-   **Seguridad:** Bcrypt (Hashing) & CORS

---

## ⚙️ Instalación y Configuración

### 1. Variables de Entorno
Crea un archivo `.env` en la raíz del proyecto y define las siguientes variables:

| Variable | Descripción | Ejemplo |
| :--- | :--- | :--- |
| `PORT` | Puerto del servidor | `8000` |
| `MONGO_URI` | Cadena de conexión a MongoDB | `mongodb://localhost:27017/taskmanager` |
| `JWT_SECRET` | Clave secreta para firmar tokens | `mi_clave_secreta_super_segura` |

### 2. Ejecución

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar en modo desarrollo (requiere nodemon)
npm run dev

# 3. Iniciar en modo producción
npm start
```

## 📡 Códigos de Estado HTTP

La API utiliza los siguientes códigos estándar para indicar el resultado de las operaciones:

| Código | Estado | Significado en esta API |
| :--- | :--- | :--- |
| **200** | `OK` | Petición exitosa (GET, PUT, DELETE). |
| **201** | `Created` | Recurso creado exitosamente (POST). |
| **400** | `Bad Request` | Faltan datos obligatorios o conflicto de integridad (ej: borrar padre con hijos). |
| **401** | `Unauthorized` | Credenciales inválidas o Token no provisto. |
| **403** | `Forbidden` | Token válido, pero no eres el dueño del recurso. |
| **404** | `Not Found` | El recurso no existe o no tienes acceso a él. |
| **409** | `Conflict` | Dato duplicado (ej: Usuario ya registrado). |
| **500** | `Server Error` | Error interno del servidor. |

---

## 🔐 Reglas de Negocio y Seguridad

### 1. Ownership (Propiedad)
Para garantizar la privacidad y seguridad, todas las entidades (`Project`, `Epic`, `Story`, `Task`) cuentan con un campo `owner`.
* El sistema valida en cada petición de lectura, escritura o eliminación que `req.user.id === resource.owner`.
* Esto impide que un usuario manipule datos de otro, protegiendo contra vulnerabilidades IDOR.

### 2. Integridad Referencial (Borrado Seguro)
El sistema protege la estructura de datos impidiendo eliminaciones accidentales en cascada:
* ❌ **Proyectos:** No se pueden eliminar si contienen **Épicas**.
* ❌ **Épicas:** No se pueden eliminar si contienen **Historias**.
* ✅ **Solución:** Se deben eliminar los elementos "hijos" antes de poder eliminar al "padre".

---

## 📚 Documentación de Endpoints

**Autenticación requerida:** Todas las rutas (excepto `/users`) requieren el header `Authorization: Bearer <token>`.

### 👤 Usuarios (Auth)
| Método | Endpoint | Descripción | Body Requerido |
| :----- | :------- | :---------- | :------------- |
| `POST` | `/api/users/register` | Registro de usuario | `{ username, password, name: { first, last } }` |
| `POST` | `/api/users/login` | Inicio de sesión | `{ username, password }` |

### 📁 Proyectos (`/api/projects`)
| Método | Endpoint | Descripción |
| :----- | :------- | :---------- |
| `GET` | `/` | Obtiene todos los proyectos del usuario. |
| `POST` | `/` | Crea un nuevo proyecto. |
| `GET` | `/:id` | Obtiene un proyecto por ID. |
| `PUT` | `/:id` | Actualiza un proyecto. |
| `DELETE` | `/:id` | Elimina un proyecto (Valida que no tenga épicas). |
| `GET` | `/:id/epics` | **Anidado:** Obtiene todas las épicas de este proyecto. |

### ⚡ Épicas (`/api/epics`)
| Método | Endpoint | Descripción | Params / Body |
| :----- | :------- | :---------- | :------------ |
| `POST` | `/` | Crea una épica. | Body: `{ name, project: ID, icon... }` |
| `GET` | `/:id` | Obtiene una épica por ID. | |
| `PUT` | `/:id` | Actualiza una épica. | |
| `DELETE` | `/:id` | Elimina una épica (Valida que no tenga historias). | |
| `GET` | `/:id/stories` | **Anidado:** Obtiene todas las historias de esta épica. |

### 🔖 Historias (`/api/stories`)
| Método | Endpoint | Descripción | Params / Body |
| :----- | :------- | :---------- | :------------ |
| `GET` | `/` | **Global:** Obtiene todas las historias del usuario (Dashboard). | |
| `POST` | `/` | Crea una historia. | Body: `{ name, epic: ID, status... }` |
| `GET` | `/:id` | Obtiene una historia por ID. | |
| `PUT` | `/:id` | Actualiza historia (ej: cambiar estado). | Body: `{ status: "En progreso" }` |
| `DELETE` | `/:id` | Elimina una historia. | |
| `GET` | `/:id/tasks` | **Anidado:** Obtiene todas las tareas de esta historia. |

### ✅ Tareas (`/api/tasks`)
| Método | Endpoint | Descripción | Body Requerido |
| :----- | :------- | :---------- | :------------- |
| `POST` | `/` | Crea una tarea. | `{ name, story: ID }` |
| `GET` | `/:id` | Obtiene una tarea por ID. | |
| `PUT` | `/:id` | Actualiza una tarea (ej: marcar `done`). | `{ done: true }` |
| `DELETE` | `/:id` | Elimina una tarea. | |

---

## 🗂 Estructura de Datos

### Jerarquía del Sistema
```text
User
 └── Project
      └── Epic
           └── Story
                └── Task
```

### Estados de Historia (Enum)
Dependiendo de la configuración, los estados admitidos son:
* `Pendiente` / `todo`
* `En progreso` / `running`
* `Completado` / `done`
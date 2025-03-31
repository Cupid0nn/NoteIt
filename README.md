# NoteIt

# 📒 API de Notas

## 📌 Descripción

> [!IMPORTANT] *API de Notas* es un proyecto para gestionar notas personales de manera sencilla y eficiente. Permite a los usuarios crear, editar, eliminar y compartir notas, organizarlas con etiquetas y marcarlas como favoritas.

## 📦 Instalación

Para ejecutar el proyecto localmente, sigue estos pasos:

> [!TIP]

### Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/api-notas.git 
cd api-notas
```

### Instalar dependencias

```bash
npm install
```

### Configurar variables de entorno (`.env`)

```env
DATABASE_URL=postgres://usuario:contraseña@localhost:5432/notas
JWT_SECRET=tu_secreto
```

### Levantar la base de datos con Docker

```bash
docker-compose up -d
```

### Iniciar el servidor

```bash
npm run start:dev
```

## 🛠 Tecnologías

- **Backend:** NestJS (TypeScript)
- **Base de Datos:** PostgreSQL con TypeORM
- **Autenticación:** JWT
- **Cache:** Redis (opcional)
- **Documentación:** Swagger
- **Despliegue:** Vercel / Railway / Render

## 🚀 Funcionalidades

> [!IMPORTANT]

- **Autenticación** con JWT (Registro, Login, Logout)
- **CRUD de Notas** (Crear, Leer, Actualizar, Eliminar)
- **Etiquetas y Filtros** para organizar notas
- **Búsqueda** por contenido de la nota
- **Compartir notas** con otros usuarios
- **Notas favoritas** para acceso rápido

## 📖 Documentación

> [!TIP] Una vez corriendo el servidor, accede a la documentación en Swagger:

```
http://localhost:3000/api
```

## 🏗 Roadmap

> [!IMPORTANT]

-

## 📬 Contacto

- **Nombre**: Mateo Laureano Acierno
- **Correo**: [malaucierno@gmail.com](mailto\:malaucierno@gmail.com)
- **LinkedIn**: [Mateo Acierno](https://www.linkedin.com/in/mateo-acierno/)
- **Portafolio**: [portfolio](https://portfolio-rust-eight-62.vercel.app)

## 📜 Licencia

Este proyecto está bajo la licencia MIT.


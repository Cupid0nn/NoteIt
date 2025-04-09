## 📘 Documentación del Proyecto NoteIt

### 📌 Descripción General

**NoteIt** es una API RESTful construida con **NestJS**, que permite crear, leer, actualizar, eliminar y gestionar notas. Incluye funcionalidades adicionales como:
- Marcar notas como favoritas
- Enviar notas por correo electrónico
- Testing con **Jest**

---

### ⚙️ Funcionalidades Implementadas

#### 📄 CRUD de Notas
- **POST `/notes`**: Crear una nueva nota.
- **GET `/notes`**: Obtener todas las notas.
- **GET `/notes/:id`**: Obtener una nota específica por ID.
- **PATCH `/notes/:id`**: Actualizar una nota existente.
- **DELETE `/notes/:id`**: Eliminar una nota.

#### ⭐ Notas Favoritas
- **GET `/notes/favorites`**: Obtener todas las notas marcadas como favoritas.

#### 📤 Enviar Notas por Correo
- **POST `/notes/:id/send?to=mail@ejemplo.com`**: Envía el contenido de una nota al correo indicado mediante el servicio de email integrado (Gmail SMTP + `nodemailer`).

#### ✅ Testing con Jest
- Implementamos **tests unitarios** para:
  - El **NotesService** (todas sus funciones)
  - El **NotesController**
- Mockeamos el repositorio de TypeORM y el servicio de envío de mails para pruebas controladas.

---

### 📚 Lo que Aprendiste

- Cómo estructurar un proyecto real en NestJS usando buenas prácticas.
- Uso de **TypeORM** para trabajar con base de datos PostgreSQL.
- Uso de **DTOs** para validar y estructurar los datos.
- Cómo extender la funcionalidad de un CRUD agregando lógica de favoritos.
- Cómo integrar un servicio de terceros (Gmail) para enviar mails con `nodemailer`.
- Cómo implementar testing unitario con Jest en servicios y controladores NestJS.
- Buen uso de inyección de dependencias y modularidad.

---

### 🧪 Próximos Pasos Recomendados

- Añadir **autenticación y autorización** (JWT).
- Implementar **soft delete** para no borrar las notas realmente.
- Agregar paginación a las notas.
- Integrar con una base de datos externa y desplegar en Vercel o Railway.
- Crear documentación OpenAPI (Swagger) para la API.
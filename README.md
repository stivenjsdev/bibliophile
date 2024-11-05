# 📚 Bibliophile

Bibliophile es una aplicación web para gestionar tu biblioteca personal. Permite llevar un registro de tus libros, organizarlos por estado de lectura, valorarlos y filtrarlos por diferentes criterios.

## 🚀 Características

- ✨ Gestión completa de libros (añadir, editar, eliminar)
- 📊 Estados de lectura (Por leer, Leyendo, Leído)
- ⭐ Sistema de valoración
- 🔍 Búsqueda y filtrado avanzado
- 📱 Diseño responsive
- 🔐 Autenticación de usuarios
- 📄 Paginación de resultados

## 🛠️ Tecnologías

- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui
- React Router DOM
- Axios
- Lucide Icons

## 📋 Prerrequisitos

- Node.js (v22.11.0 o superior)
- npm
- API Backend ejecutándose (ver repositorio backend)

## 🔧 Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/stivenjsdev/bibliophile.git
cd bibliophile
```

2. Instala las dependencias:

```bash
npm install
```

3. Crea un archivo .env en la raíz del proyecto:

```env
VITE_API_BASE_URL=http://localhost:4000/
```

4. Inicia el servidor de desarrollo:

```bash
npm run dev
```

## 🗂️ Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── BookForm.tsx
│   ├── BookItem.tsx
│   ├── BookList.tsx
│   └── BookSearch.tsx
├── context/            # Contextos de React
│   ├── AuthContext.tsx
│   └── BookContext.tsx
├── hooks/              # Custom hooks
│   ├── useAuth.ts
│   └── useBook.ts
├── layouts/            # Componentes de layout
├── pages/              # Componentes de página
├── services/           # Servicios API
├── types/              # Definiciones de tipos
└── utils/              # Utilidades
```

## 📖 Uso

1. Regístrate o inicia sesión en la aplicación
2. Navega a la página principal para ver tu biblioteca
3. Usa el botón "Añadir Libro" para agregar nuevos libros
4. Utiliza los filtros para encontrar libros específicos
5. Gestiona tus libros con las opciones de editar y eliminar

## 🔐 Autenticación

La aplicación utiliza autenticación basada en tokens JWT. El token se almacena en localStorage y se envía en cada petición a la API mediante un interceptor de Axios.

## 🤝 Contribuir

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para más detalles.

## 👥 Autores

- Stiven Trujillo - [stivenjsdev](https://github.com/stivenjsdev)

## 🙏 Agradecimientos

- shadcn/ui por los componentes de UI
- Lucide por los iconos
- Todos los contribuidores que han participado en este proyecto

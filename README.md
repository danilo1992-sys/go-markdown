# go-markdown

Sitio estático construido con **Astro** que publica como web las notas de un vault de **Obsidian** (archivos Markdown/MDX). El contenido vive en un repositorio separado ([`danilo1992-sys/obsidian`](https://github.com/danilo1992-sys/obsidian)) y se integra en `src/content` como submódulo de Git, de modo que escribir notas y mantener el sitio son flujos independientes.

## ✨ Características

- 📝 Renderizado de notas en Markdown y MDX
- 🔎 Búsqueda del lado del cliente con [Pagefind](https://pagefind.app/)
- 🎨 Estilos con Tailwind CSS 4, daisyUI y `@tailwindcss/typography`
- 💻 Los bloques de código se transforman en un mockup de terminal (`mockup-code` de daisyUI), tanto en desarrollo como en el build final
- 🔄 Sincronización del contenido con un solo comando (`pnpm pull`)
- 🚀 Listo para desplegar en Render o Netlify

## 🧱 Stack

| Área          | Tecnología                                                         |
| :------------ | :----------------------------------------------------------------- |
| Framework     | [Astro](https://astro.build/)                                      |
| Contenido     | Markdown + MDX (`@astrojs/mdx`, `@astrojs/markdown-remark`)        |
| Estilos       | Tailwind CSS 4 (`@tailwindcss/vite`), daisyUI, Typography          |
| Búsqueda      | `astro-pagefind`                                                   |
| Lenguaje      | JavaScript / TypeScript                                            |
| Gestor        | pnpm                                                               |
| Despliegue    | Render (sitio estático) · Netlify                                  |

## 📋 Requisitos

- **Node.js** `>= 22.12.0`
- **pnpm**
- **Git** (el contenido se gestiona como submódulo)

## 🚀 Instalación

Clona el repositorio **incluyendo el submódulo** con el contenido:

```bash
git clone --recurse-submodules https://github.com/danilo1992-sys/go-markdown.git
cd go-markdown
pnpm install
```

Si ya lo clonaste sin submódulos:

```bash
git submodule update --init --recursive
```

## 🧞 Comandos

Todos los comandos se ejecutan desde la raíz del proyecto:

| Comando            | Acción                                                                           |
| :----------------- | :------------------------------------------------------------------------------- |
| `pnpm install`     | Instala las dependencias                                                         |
| `pnpm pull`        | Actualiza el contenido (`git -C src/content pull origin master`)                 |
| `pnpm dev`         | Ejecuta `pnpm pull` y levanta el servidor de desarrollo en `localhost:4321`      |
| `pnpm build`       | Genera el sitio de producción en `./dist/`                                       |
| `pnpm preview`     | Previsualiza el build localmente antes de desplegar                              |
| `pnpm astro ...`   | Ejecuta comandos del CLI de Astro (`astro add`, `astro check`, etc.)             |

> 💡 También puedes iniciar el servidor en segundo plano con `astro dev --background` y administrarlo con `astro dev status`, `astro dev logs` y `astro dev stop`.

## 📁 Estructura del proyecto

```text
/
├── .vscode/
├── public/            # Archivos estáticos (favicon, etc.)
├── scripts/           # Scripts auxiliares (p. ej. fix-content.py)
├── src/
│   ├── content/       # Submódulo Git → repositorio "obsidian" (notas)
│   ├── components/
│   ├── layouts/
│   └── pages/
├── astro.config.mjs   # Configuración de Astro, integraciones y transformación de código
├── netlify.toml       # Configuración de despliegue en Netlify
├── render.yaml        # Configuración de despliegue en Render
├── pnpm-workspace.yaml
├── tsconfig.json
└── package.json
```

## 📚 Cómo funciona el contenido

1. Las notas se escriben en el vault de Obsidian y se publican en el repositorio [`obsidian`](https://github.com/danilo1992-sys/obsidian).
2. Este proyecto monta ese repositorio en `src/content` mediante `.gitmodules`.
3. Astro lee los archivos Markdown/MDX, genera las páginas y Pagefind crea el índice de búsqueda durante el build.
4. Un hook de build (`astro:build:done`) recorre los HTML generados y aplica la transformación de bloques de código a formato terminal.

Para ver cambios nuevos de tus notas en local, basta con ejecutar `pnpm pull` (o simplemente `pnpm dev`).

## ☁️ Despliegue

El contenido no está versionado dentro de este repo, por lo que ambos proveedores lo descargan durante el build.

### Render

Configurado en [`render.yaml`](./render.yaml) como servicio web estático. El build:

1. Elimina `src/content` y clona el repositorio `obsidian`.
2. Ejecuta `scripts/fix-content.py` para ajustar el contenido.
3. Instala pnpm y las dependencias (`--frozen-lockfile`).
4. Ejecuta `pnpm build` y publica `dist/`.

### Netlify

Configurado en [`netlify.toml`](./netlify.toml). Descarga el contenido del repositorio `obsidian` como tarball, lo mueve a `src/content`, ejecuta `pnpm build` y publica `dist/` usando Node 22.

## 🤝 Contribuir

1. Haz un fork del repositorio
2. Crea una rama: `git checkout -b feature/mi-mejora`
3. Haz commit de tus cambios: `git commit -m "feat: descripción"`
4. Sube la rama: `git push origin feature/mi-mejora`
5. Abre un Pull Request

## 📖 Recursos

- [Documentación de Astro](https://docs.astro.build)
- [Content collections](https://docs.astro.build/en/guides/content-collections/)
- [Tailwind CSS](https://tailwindcss.com/docs) · [daisyUI](https://daisyui.com/)
- [Pagefind](https://pagefind.app/)

## 📄 Licencia

Aún no se ha definido una licencia para este proyecto. Agrega un archivo `LICENSE` (por ejemplo, MIT) si quieres que otros puedan usarlo.

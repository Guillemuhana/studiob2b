# Studio B2B — sitio web

Sitio de agencia hecho con React + Vite. Sin dependencias de CSS: todos los estilos viven dentro del componente, en la constante `CSS` al inicio de `src/App.jsx`.

## Arrancar en tu máquina

Necesitás Node.js 18 o superior.

```bash
npm install
npm run dev
```

Se abre solo en `http://localhost:5173`.

Otros comandos:

```bash
npm run build      # genera la carpeta dist/
npm run preview    # sirve dist/ para revisar antes de publicar
```

## Estructura

```
studio-b2b/
├─ index.html          → meta tags SEO, Open Graph y carga de fuentes
├─ public/
│  └─ favicon.svg      → sello de la marca
├─ src/
│  ├─ main.jsx         → punto de entrada
│  ├─ index.css        → reset global
│  └─ App.jsx          → TODO el sitio (estilos + datos + componentes)
└─ vite.config.js
```

## Dónde tocar el contenido

Todo el texto está en constantes al principio de `src/App.jsx`, antes de los componentes. No hace falta meterse en el JSX para cambiar contenido.

| Constante     | Qué controla                                        |
| ------------- | --------------------------------------------------- |
| `SOLUCIONES`  | Mega-menú del nav y las tres tarjetas del hero      |
| `CLIENTES`    | Carrusel de clientes                                 |
| `SERVICIOS`   | Las tres filas grandes de servicios                  |
| `ETAPAS`      | Las cuatro etapas del Ciclo B2B                      |
| `AGENT_LINES` | Líneas que escribe la terminal del agente            |
| `AGENT_PTS`   | Bullets de la sección de agentes                     |
| `STACK`       | Pestañas de tecnologías                              |
| `STATS`       | Números de la barra de métricas                      |
| `TESTIMONIOS` | Carrusel de testimonios                              |
| `EQUIPO`      | Iniciales del mosaico del equipo                     |
| `VALORES`     | Los tres valores                                     |
| `FAQS`        | Preguntas frecuentes                                 |

El titular del hero está en el JSX, buscá `<h1>`.

Los colores se definen una sola vez, en el bloque `.s2b { ... }` dentro de la constante `CSS`.

## Pendientes antes de publicar

- [ ] Reemplazar los nombres de clientes por logos reales (SVG o PNG en `public/`)
- [ ] Testimonios: hoy tienen nombres y empresas inventados
- [ ] Números de `STATS`: verificar que sean los reales
- [ ] Fotos del equipo (hoy son iniciales sobre degradé)
- [ ] Teléfono real en la sección de contacto y en el footer
- [ ] Links de redes en el footer (hoy apuntan a `#`)
- [ ] Video del Ciclo B2B (hoy el play no reproduce nada)
- [ ] Conectar el formulario (ver abajo)
- [ ] Subir una imagen `og.png` de 1200×630 a `public/`

## Conectar el formulario

Hoy el formulario simula el envío: valida nombre y email, y muestra el mensaje de éxito. Buscá la función `send` en `App.jsx`.

La opción más rápida es Formspree: creás un formulario, te dan una URL y reemplazás `send` por:

```js
const send = async () => {
  if (!form.nombre || !form.email) return;
  await fetch("https://formspree.io/f/TU_ID", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });
  setSent(true);
};
```

Si preferís que los mails salgan desde tu dominio, conviene Resend con una función serverless en Vercel.

## Subir a GitHub y publicar en Vercel

```bash
git init
git add .
git commit -m "Sitio Studio B2B"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/studio-b2b.git
git push -u origin main
```

Después, en vercel.com: **Add New → Project**, elegís el repo y le das Deploy. Vercel detecta Vite solo, no hay nada que configurar. Cada `git push` a `main` publica una versión nueva.

Para conectar tu dominio: **Settings → Domains** dentro del proyecto.

## Notas técnicas

- El degradé animado del titular usa `@property` (Houdini). Funciona en Chrome, Edge y Safari. En Firefox el degradé se ve fijo en lugar de animado; nada se rompe.
- Todas las animaciones se apagan si el visitante tiene activado "reducir movimiento" en su sistema operativo.
- Responsive hasta 375px de ancho.

# TP Geografía – Grupo 3 · Producción de alimentos en la Pampa

Integrantes: Mateo Sosa, Juan Rodriguez, Ramiro Mercado y Bautista Pereda.

## Estructura

```
tp-geografia-grupo-3/
├── index.html            ← página principal (texto, integrantes, botones)
├── css/estilos.css       ← estilos
├── js/
│   ├── config.js         ← archivos predeterminados (imagen y diapositivas)
│   ├── datos.js          ← datos de los gráficos 1B y 2C
│   └── main.js           ← gráficos, animaciones y 3D
└── assets/
    ├── fondo.jpg         ← imagen de fondo (opcional)
    ├── presentacion.jpg  ← imagen junto a la presentación (opcional)
    └── diapositivas/     ← 1.png, 2.png, 3.png...
```

## Qué archivos poner en `assets/`

Los nombres tienen que ser exactamente estos (en minúsculas). Si un archivo no está, esa parte simplemente no se muestra.

- `assets/fondo.jpg`: foto de la Pampa. Recomendado 1920×1080 px (16:9), JPG calidad 80–85 %, menos de 1,5 MB. Si es de internet, que sea libre de derechos (Wikimedia Commons, Unsplash) y citá la fuente.
- `assets/presentacion.jpg`: imagen, mapa o foto de la maqueta.
- `assets/diapositivas/1.png`, `2.png`, ...: diapositivas de Canva, en orden.

## Cómo abrirlo en Visual Studio Code

1. *Archivo → Abrir carpeta…* y elegí `tp-geografia-grupo-3`.
2. Instalá la extensión **Live Server** (Ritwick Dey).
3. Clic derecho sobre `index.html` → **Open with Live Server**.

También se puede abrir `index.html` con doble clic en el navegador. La página necesita internet para cargar Chart.js y Three.js.

## Dónde editar

- Texto de la presentación e integrantes: `index.html` (buscá "Integrantes").
- Datos y textos de los gráficos: `js/datos.js`.
- Colores y estilos: `css/estilos.css`.

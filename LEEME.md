# Lu Beauti Studio — página web

## Qué completar (todo en `js/config.js`)
- **instagram**: el usuario sin @.
- **direccion** y **mapsLink**: dirección y link de Google Maps.
- **horarios**: días y horas de atención.
- **horasTurno**: horarios que se pueden elegir al pedir turno. Si queda vacío, la clienta elige "Mañana / Mediodía / Tarde".
- **diasCerrados**: días sin turnos (0 = domingo … 6 = sábado).
- **servicios**: descripción, precio (opcional) y foto de cada uno. Las fotos van en `img/servicios/`.
- **galeria**: una línea por foto. Las fotos van en `img/galeria/`.
- **fotoLucila**: foto para "Sobre nosotras" (por ejemplo `img/lucila.jpg`).

En `index.html` hay que reemplazar los textos entre [corchetes] de "Sobre nosotras" y de "Preguntas frecuentes".

## Publicarla gratis en Netlify
1. Entrá a https://app.netlify.com/drop
2. Arrastrá la carpeta completa del sitio.
3. Cuando tengas el dominio, reemplazá `https://TU-DOMINIO` en `index.html`, `robots.txt` y `sitemap.xml`.

## Aparecer en Google
1. Creá el perfil de Google Business (https://business.google.com) con la dirección y los horarios.
2. Cargá el sitio en Google Search Console (https://search.google.com/search-console) y enviá el `sitemap.xml`.

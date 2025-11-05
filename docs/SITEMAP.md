# Sitemap.xml - Documentación

## 📋 Resumen

Este proyecto incluye un `sitemap.xml` generado automáticamente para optimizar el SEO y permitir que Google indexe correctamente todas las secciones del sitio.

## 📁 Archivos

- **`public/sitemap.xml`**: Sitemap XML estático (se genera automáticamente)
- **`public/robots.txt`**: Archivo robots.txt que referencia el sitemap
- **`scripts/generate-sitemap.js`**: Script Node.js para generar el sitemap automáticamente

## 🔄 Actualización Automática

El sitemap se genera automáticamente durante el build gracias a la configuración en `package.json`:

```json
"build": "npm run generate-sitemap && tsc && vite build"
```

### Generación Manual

Si necesitas generar el sitemap manualmente:

```bash
npm run generate-sitemap
```

## 📍 URLs Incluidas

El sitemap incluye las siguientes secciones:

1. **Página Principal** (`/`) - Prioridad: 1.0
2. **Inicio** (`/#inicio`) - Prioridad: 1.0
3. **Integraciones** (`/#integraciones`) - Prioridad: 0.9
4. **Problema y Solución** (`/#problema-solucion`) - Prioridad: 0.8
5. **Características** (`/#caracteristicas`) - Prioridad: 0.9
6. **Módulos** (`/#modulos`) - Prioridad: 0.9
7. **Casos de Uso** (`/#casos`) - Prioridad: 0.8
8. **Roadmap** (`/#roadmap`) - Prioridad: 0.7
9. **Acerca de** (`/#acerca`) - Prioridad: 0.7
10. **Contacto** (`/#contacto`) - Prioridad: 0.8

## 🔧 Configuración

### Cambiar el Dominio

Edita `scripts/generate-sitemap.js`:

```javascript
const DOMAIN = 'https://www.alojasys.com';
```

### Agregar Nuevas Secciones

Edita el array `sections` en `scripts/generate-sitemap.js`:

```javascript
const sections = [
  { path: '/#nueva-seccion', priority: 0.8, changefreq: 'monthly' },
  // ...
];
```

## ✅ Verificación

Una vez desplegado en Netlify, verifica que el sitemap esté accesible:

- **Sitemap**: https://www.alojasys.com/sitemap.xml
- **Robots.txt**: https://www.alojasys.com/robots.txt

## 🔍 Google Search Console

1. Ve a [Google Search Console](https://search.google.com/search-console)
2. Agrega tu propiedad (https://www.alojasys.com)
3. En "Sitemaps", ingresa: `sitemap.xml`
4. Google comenzará a indexar las URLs automáticamente

## 📊 Prioridades

- **1.0**: Páginas principales (inicio)
- **0.9**: Secciones importantes (características, módulos, integraciones)
- **0.8**: Secciones de conversión (contacto, casos de uso)
- **0.7**: Contenido informativo (acerca de, roadmap)

## 🚀 Mejoras Futuras

Para hacer el sitemap aún más dinámico:

1. **Plugin de Vite**: Usar `vite-plugin-sitemap` para generación automática
2. **API Routes**: Si agregas páginas dinámicas, incluir rutas desde la API
3. **Fechas dinámicas**: Actualizar `lastmod` basado en cambios reales del contenido
4. **Sitemap Index**: Si creces mucho, dividir en múltiples sitemaps

## 📝 Notas

- El sitemap se actualiza automáticamente en cada build
- Las fechas (`lastmod`) se actualizan a la fecha actual del build
- El formato sigue el estándar [sitemaps.org](https://www.sitemaps.org/)


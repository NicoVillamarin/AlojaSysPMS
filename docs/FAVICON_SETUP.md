# Configuración del Favicon para Google Search

## Problema
Google muestra un icono genérico del planeta en lugar del logo de AlojaSys en los resultados de búsqueda.

## Solución

### 1. Generar un favicon.ico correcto

El `favicon.ico` actual puede no estar bien formado. Necesitas generar uno nuevo con múltiples tamaños.

#### Opción A: Usar herramienta online (Recomendado)
1. Ve a [https://realfavicongenerator.net/](https://realfavicongenerator.net/)
2. Sube tu archivo `logo_new_alone.png`
3. Configura:
   - **Android Chrome**: Marca todas las opciones
   - **iOS**: Marca Apple touch icon
   - **Windows**: Marca todas las opciones
4. Genera el favicon
5. Descarga el paquete completo
6. Reemplaza el archivo `public/favicon.ico` con el nuevo `favicon.ico` generado
7. Opcionalmente, actualiza otros archivos si la herramienta los genera

#### Opción B: Usar favicon.io
1. Ve a [https://favicon.io/favicon-converter/](https://favicon.io/favicon-converter/)
2. Sube tu `logo_new_alone.png`
3. Descarga el `favicon.ico` generado
4. Reemplaza `public/favicon.ico`

### 2. Verificar que el favicon sea accesible

Después de desplegar, verifica que estos URLs sean accesibles:
- `https://www.alojasys.com/favicon.ico`
- `https://www.alojasys.com/logo_new_alone.png`

Puedes probar abriendo estas URLs directamente en el navegador.

### 3. Verificar en Google

Puedes verificar si Google ha indexado tu favicon usando:
```
https://www.google.com/s2/favicons?domain=www.alojasys.com
```

### 4. Solicitar re-indexación en Google Search Console

1. Ve a [Google Search Console](https://search.google.com/search-console)
2. Selecciona tu propiedad (www.alojasys.com)
3. Usa la herramienta de inspección de URL
4. Ingresa: `https://www.alojasys.com/`
5. Haz clic en "Solicitar indexación"

### 5. Tiempo de actualización

- Google puede tardar **varios días o semanas** en actualizar el favicon en los resultados de búsqueda
- Incluso con todo configurado correctamente, la actualización no es instantánea

## Requisitos del Favicon según Google

- **Formato**: ICO (preferido) o PNG
- **Tamaño mínimo**: 48x48 píxeles
- **Ubicación**: Debe estar en la raíz del dominio (`/favicon.ico`)
- **Múltiples tamaños**: El ICO debe contener 16x16, 32x32, y 48x48 píxeles
- **Accesibilidad**: Debe ser accesible públicamente, no bloqueado por robots.txt

## Configuración actual en index.html

La configuración en `index.html` ya está optimizada:
- Favicon ICO en la raíz
- Favicons PNG como fallback
- Datos estructurados (JSON-LD) con el logo configurado
- Schema.org Organization con el logo

## Notas importantes

- El favicon.ico debe estar en la carpeta `public/` para que Vite lo copie a la raíz durante el build
- Después de generar el nuevo favicon, ejecuta `npm run build` y vuelve a desplegar
- Google busca automáticamente `/favicon.ico` en la raíz del dominio, así que no necesitas configuraciones adicionales en el HTML (aunque las tenemos como respaldo)



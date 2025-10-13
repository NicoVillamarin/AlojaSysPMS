# Videos de Fondo para AlojaSys

## 📁 Estructura de Archivos

Coloca tus videos en esta carpeta con los siguientes nombres:

```
src/assets/videos/
├── hotel-reception.mp4    # Video de recepción de hotel
├── hotel-lobby.mp4        # Video de lobby de hotel  
└── hotel-management.mp4   # Video de gestión hotelera
```

## 🎬 Especificaciones Recomendadas

### **Formato y Calidad**
- **Formato**: MP4 (H.264)
- **Resolución**: 1920x1080 (Full HD) o superior
- **Duración**: 10-30 segundos por video
- **Tamaño**: Máximo 10MB por video

### **Contenido Sugerido**
1. **hotel-reception.mp4**: Recepción de hotel con personal atendiendo
2. **hotel-lobby.mp4**: Lobby elegante con movimiento sutil
3. **hotel-management.mp4**: Personal trabajando con computadoras/sistemas

## ⚙️ Configuración

Los videos se configuran automáticamente para:
- ✅ **Autoplay** (reproducción automática)
- ✅ **Muted** (sin sonido)
- ✅ **Loop** (rotación automática)
- ✅ **Responsive** (adaptable a móviles)
- ✅ **Fade transitions** (transiciones suaves)

## 🔄 Rotación de Videos

Los videos se reproducen en secuencia:
1. Video 1 → Fade Out → Video 2 → Fade Out → Video 3 → Fade Out → Video 1...

## 📱 Optimización Móvil

Los videos se adaptan automáticamente para dispositivos móviles con:
- Reducción de calidad en pantallas pequeñas
- Pausa automática en scroll para ahorrar batería
- Overlay optimizado para legibilidad

## 🎨 Personalización

Para cambiar los videos, edita el array `videos` en:
`src/components/Hero.tsx` (líneas 10-14)

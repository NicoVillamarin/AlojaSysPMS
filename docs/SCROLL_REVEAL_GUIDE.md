# Guía de Scroll Reveal

## ¿Qué es Scroll Reveal?

Scroll Reveal es una técnica donde los elementos de la página se **revelan** o **animan** cuando entran al área visible (viewport) al hacer scroll.

## Cómo Funciona

1. **Detección del Viewport**: Usa `Intersection Observer API` para detectar cuando un elemento entra/sale del área visible
2. **Aplicación de Animación**: Cuando el elemento entra, aplica una animación predefinida
3. **Reversión (opcional)**: Cuando el elemento sale, puede revertir la animación

## Tipos de Animaciones Disponibles

### 1. **Fade** (Desvanecimiento)
- El elemento aparece/desaparece suavemente
- `type="fade"`

### 2. **Slide** (Deslizamiento)
- El elemento se desliza desde una dirección
- `type="slide"` con `origin="top|bottom|left|right"`

### 3. **Zoom** (Acercamiento)
- El elemento aparece haciendo zoom
- `type="zoom"`

### 4. **Rotate** (Rotación)
- El elemento aparece rotando
- `type="rotate"`

### 5. **Flip** (Volteo 3D)
- El elemento aparece como si se volteara
- `type="flip"`

## Ejemplo de Uso

### Opción 1: Usando el componente ScrollReveal

```tsx
import ScrollReveal from './components/ScrollReveal'

// Animación simple
<ScrollReveal type="fade" origin="bottom" delay={0.2}>
  <div>Este elemento aparecerá desde abajo</div>
</ScrollReveal>

// Con stagger (animación en cascada para listas)
<ScrollReveal type="slide" origin="left" stagger={0.1}>
  {items.map(item => <div key={item.id}>{item.name}</div>)}
</ScrollReveal>
```

### Opción 2: Usando el hook directamente

```tsx
import { useScrollReveal } from '../hooks/useScrollReveal'

const MyComponent = () => {
  const { ref, variants, initial, animate } = useScrollReveal({
    type: 'zoom',
    origin: 'center',
    duration: 0.8,
    delay: 0.3
  })

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      variants={variants}
    >
      Contenido animado
    </motion.div>
  )
}
```

## Parámetros Configurables

- **origin**: `'top' | 'bottom' | 'left' | 'right' | 'center'` - Desde dónde viene la animación
- **distance**: `string` - Distancia de la animación (ej: `'50px'`, `'100%'`)
- **duration**: `number` - Duración en segundos (default: 0.6)
- **delay**: `number` - Delay en segundos (default: 0)
- **type**: `'fade' | 'slide' | 'zoom' | 'rotate' | 'flip'` - Tipo de animación
- **once**: `boolean` - Si solo anima una vez (default: false)
- **threshold**: `number` - Porcentaje visible para activar (0-1, default: 0.1)
- **reset**: `boolean` - Si se resetea al salir del viewport (default: true)

## Ejemplos Prácticos

### Cards que aparecen desde abajo
```tsx
<ScrollReveal type="slide" origin="bottom" distance="80px" delay={0.1}>
  <div className="card">Card 1</div>
</ScrollReveal>
```

### Lista con animación en cascada
```tsx
<ScrollReveal type="fade" stagger={0.15}>
  {features.map(feature => (
    <div key={feature.id}>{feature.name}</div>
  ))}
</ScrollReveal>
```

### Zoom desde el centro
```tsx
<ScrollReveal type="zoom" origin="center" duration={0.8}>
  <div className="hero-image">Imagen</div>
</ScrollReveal>
```

## Ventajas sobre animaciones básicas

1. ✅ **Se activan solo cuando son visibles** (mejor performance)
2. ✅ **Se revierten al hacer scroll hacia arriba** (más dinámico)
3. ✅ **Configurables y reutilizables**
4. ✅ **Múltiples tipos de animación**
5. ✅ **Soporte para stagger** (animaciones en cascada)


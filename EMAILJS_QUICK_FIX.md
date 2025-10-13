# 🔧 Solución Rápida - Error "Recipients address is empty"

## El Problema
EmailJS no puede enviar el email porque no encuentra la dirección de destino.

## ✅ Solución Paso a Paso

### 1. Ve a EmailJS Dashboard
1. Abre [https://www.emailjs.com/](https://www.emailjs.com/)
2. Ve a **Email Templates**
3. Busca y edita el template `template_r8gld09`

### 2. Configura los Campos de Envío
En la configuración del template (NO en el contenido del email):

**📧 To Email:**
```
{{to_email}}
```
*O directamente:* `villamarin.nico@gmail.com`

**👤 From Name:**
```
AlojaSys
```

**📨 From Email:**
```
{{from_email}}
```
*O tu email si quieres que venga de ti*

**📋 Subject:**
```
Nueva Solicitud de Demo - AlojaSys
```

### 3. Configura el Contenido del Email
En el editor de contenido, usa este template simple:

```
Nueva Solicitud de Demo - AlojaSys

Hola,

Has recibido una nueva solicitud de demo de AlojaSys:

📋 INFORMACIÓN DEL SOLICITANTE:
• Nombre: {{from_name}}
• Email: {{from_email}}
• Teléfono: {{phone}}

🏨 INFORMACIÓN DEL HOTEL/EMPRESA:
• Hotel/Empresa: {{hotel}}
• Cargo/Posición: {{position}}
• Fecha preferida: {{preferred_date}}

💬 MENSAJE ADICIONAL:
{{message}}

📧 CONTACTO:
• Email: {{from_email}}
• Hotel: {{hotel}}
• Fecha de solicitud: {{current_date}}

=====================================
Esta solicitud fue enviada automáticamente desde la landing page de AlojaSys.

Saludos,
Sistema AlojaSys
```

### 4. Guarda y Prueba
1. **Guarda** el template
2. **Prueba** desde tu landing page
3. **Verifica** que llegue el email a villamarin.nico@gmail.com

## 🚨 Puntos Importantes

- **To Email** debe estar en la configuración del template, NO en el contenido
- Usa `{{to_email}}` o pon directamente tu email
- El template ID `template_r8gld09` ya está configurado en el código
- Todas las variables están correctas en el código

## ✅ Verificación Final

Después de configurar, el email debe llegar con:
- ✅ Asunto: "Nueva Solicitud de Demo - AlojaSys"
- ✅ De: El email del solicitante ({{from_email}})
- ✅ Para: villamarin.nico@gmail.com
- ✅ Contenido: Toda la información del formulario

import React, { useEffect, useRef, useState } from 'react'
import { X, Layout, Zap, Layers } from 'lucide-react'

// @ts-ignore - vis-network desde CDN global
declare const vis: any

interface ModuleData {
  label: string
  title: string
  description: string
  features?: string[]
  requirements?: string[]
  steps?: string[]
  group: string
  level: number
}

interface SystemMapModalProps {
  isOpen: boolean
  onClose: () => void
}

const SystemMapModal: React.FC<SystemMapModalProps> = ({ isOpen, onClose }) => {
  const networkRef = useRef<HTMLDivElement>(null)
  const networkInstanceRef = useRef<any>(null)
  const [physicsEnabled, setPhysicsEnabled] = useState(true)
  const [layoutMode, setLayoutMode] = useState<'radial' | 'hierarchical'>('radial')
  const [showPaymentSubmodules, setShowPaymentSubmodules] = useState(true)
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set())

  // Datos completos de los módulos basados en la documentación
  const modulesData: Record<string, ModuleData> = {
    alojaSys: {
      label: 'AlojaSys\nSistema PMS',
      title: 'Sistema de Gestión Hotelera Completo',
      description: 'Plataforma integral para administrar hoteles, reservas, pagos y más. AlojaSys es un sistema completo que permite gestionar todos los aspectos de un hotel de manera digital y eficiente.',
      group: 'center',
      level: 0
    },
    
    hoteles: {
      label: 'Gestión de\nHoteles',
      title: 'Configuración y administración de hoteles',
      description: 'Gestiona información básica, horarios, automatizaciones y configuraciones de cada hotel.',
      features: [
        'Datos del hotel (nombre, dirección, contacto)',
        'Información legal (razón social, CUIT/CUIL)',
        'Horarios de check-in/check-out configurables',
        'Auto check-in/check-out configurable',
        'Auto no-show para reservas vencidas',
        'Zona horaria por hotel',
        'Soporte multi-hotel',
        'Gestión de ubicación (país, provincia, ciudad)'
      ],
      requirements: [
        'Datos básicos del hotel',
        'CUIT/CUIL y razón social',
        'Ubicación (país, provincia, ciudad)',
        'Horarios de check-in/check-out'
      ],
      steps: [
        'Crear la empresa (opcional multi-hotel)',
        'Crear el hotel y completar datos legales y de contacto',
        'Configurar horarios y zona horaria',
        'Definir automatizaciones (auto check-out/no-show)'
      ],
      group: 'config',
      level: 1
    },
    
    habitaciones: {
      label: 'Gestión de\nHabitaciones',
      title: 'Administración de habitaciones',
      description: 'Control completo de tipos, precios, capacidad y estados de habitaciones.',
      features: [
        'Tipos de habitación (Single, Doble, Triple, Suite)',
        'Capacidad incluida y máxima',
        'Precio base y extra por huésped',
        'Estados en tiempo real (Disponible, Ocupada, Mantenimiento)',
        'Gestión por piso y número',
        'Descripción y características',
        'Validación de disponibilidad automática'
      ],
      requirements: [
        'Hotel creado',
        'Tipos y capacidades definidas',
        'Precios base por tipo'
      ],
      steps: [
        'Definir tipos de habitación y capacidades',
        'Crear habitaciones (piso, número, descripción)',
        'Establecer precio base y extra por huésped',
        'Configurar estados iniciales'
      ],
      group: 'config',
      level: 1
    },
    
    reservas: {
      label: 'Gestión de\nReservas',
      title: 'Ciclo completo de reservas',
      description: 'Desde la consulta hasta el check-out, con validaciones automáticas y prevención de overbooking.',
      features: [
        'Consulta de disponibilidad en tiempo real',
        'Creación y confirmación de reservas',
        'Estados: Pendiente, Confirmada, Check-in, Check-out, Cancelada, No-show',
        'Validación de solapamientos automática',
        'Verificación con OTAs (anti-overbooking)',
        'Restricciones CTA/CTD (cerrado a llegadas/salidas)',
        'Validación de estadía mínima/máxima',
        'Gestión de datos de huéspedes',
        'Cálculo automático de precios con impuestos'
      ],
      requirements: [
        'Hoteles y habitaciones cargadas',
        'Planes de tarifas activos',
        'Políticas de pago definidas (opcional)'
      ],
      steps: [
        'Buscar disponibilidad por fechas y capacidad',
        'Seleccionar habitación y plan de tarifa',
        'Cargar datos del huésped y confirmar',
        'Gestionar estados (check-in/out, cancelaciones)'
      ],
      group: 'core',
      level: 1
    },
    
    pagos: {
      label: 'Sistema de\nPagos',
      title: 'Procesamiento de pagos',
      description: 'Múltiples métodos de pago con políticas configurables y validaciones inteligentes.',
      features: [
        'Integración con Mercado Pago',
        'Múltiples métodos: Tarjeta, Efectivo, Transferencia, POS',
        'Políticas de pago configurables',
        'Señas y pagos parciales',
        'Validaciones de seguridad',
        'Rotación segura de tokens',
        'Webhooks y confirmación automática',
        'Soporte multi-moneda'
      ],
      requirements: [
        'Configurar credenciales de pasarela por hotel',
        'Definir políticas de pago y seña',
        'Habilitar métodos permitidos'
      ],
      steps: [
        'Cargar claves de Mercado Pago (test/producción)',
        'Definir políticas (porcentaje/monto y vencimientos)',
        'Cobrar seña y registrar saldo al check-in/out',
        'Usar módulo de Cobros y/o Conciliación'
      ],
      group: 'payment',
      level: 1
    },
    
    politicasCancelacion: {
      label: 'Políticas de\nCancelación',
      title: 'Reglas de cancelación',
      description: 'Políticas configurables para manejar cancelaciones con reembolsos automáticos y snapshots históricos.',
      features: [
        'Políticas por porcentaje o monto fijo',
        'Rangos de fechas configurables',
        'Reembolsos automáticos',
        'Diferentes políticas por canal',
        'Aplicación por tipo de habitación',
        'Prioridad y combinabilidad',
        'Integración con pasarelas de pago',
        'Snapshots históricos de políticas',
        'Trazabilidad completa de cambios',
        'Validación de elegibilidad automática'
      ],
      requirements: [
        'Definir reglas de cancelación',
        'Configurar políticas por hotel'
      ],
      steps: [
        'Crear política de cancelación',
        'Definir rangos de fechas y penalidades',
        'Asignar a canales y tipos de habitación',
        'El sistema aplica automáticamente en cancelaciones'
      ],
      group: 'policy',
      level: 1
    },
    
    politicasDevolucion: {
      label: 'Políticas de\nDevolución',
      title: 'Reglas de devolución',
      description: 'Gestión de devoluciones con políticas flexibles y procesamiento automático.',
      features: [
        'Políticas configurables',
        'Procesamiento automático 24/7',
        'Validación de elegibilidad',
        'Cálculo automático de montos',
        'Integración con pasarelas de pago',
        'Notificaciones automáticas'
      ],
      group: 'policy',
      level: 1
    },
    
    tarifas: {
      label: 'Gestión de\nTarifas',
      title: 'Sistema de tarifas dinámicas',
      description: 'Planes de tarifas, reglas automáticas, promociones e impuestos.',
      features: [
        'Planes de tarifas base',
        'Reglas automáticas (fin de semana, estadía mínima)',
        'Promociones con códigos',
        'Sistema de impuestos',
        'Prioridad y alcance configurable',
        'Aplicación por canal y tipo de habitación',
        'Restricciones CTA/CTD',
        'Validación de estadía mínima/máxima'
      ],
      requirements: [
        'Tipos de habitación y precios base',
        'Reglas de negocio (mín/max estadía, CTA/CTD)'
      ],
      steps: [
        'Crear planes de tarifa base',
        'Configurar reglas automáticas y restricciones',
        'Crear promociones y cupones',
        'Definir impuestos aplicables'
      ],
      group: 'pricing',
      level: 1
    },
    
    dashboard: {
      label: 'Dashboard y\nReportes',
      title: 'Análisis y métricas',
      description: 'Visualización de datos, reportes y métricas del negocio en tiempo real con métricas completas.',
      features: [
        'Métricas en tiempo real',
        'Métricas de habitaciones (disponibles, ocupadas, mantenimiento)',
        'Métricas de reservas (pendientes, confirmadas, canceladas)',
        'Métricas de huéspedes (check-in/out del día)',
        'Métricas financieras (ingresos, tarifa promedio, ocupación)',
        'Ocupación por tipo de habitación',
        'Reportes personalizables',
        'Gráficos y visualizaciones',
        'Exportación de datos',
        'Análisis de tendencias',
        'Métricas históricas por fecha'
      ],
      requirements: [
        'Hotel configurado',
        'Reservas y pagos registrados'
      ],
      steps: [
        'Acceder al dashboard',
        'Ver métricas en tiempo real',
        'Filtrar por fechas y hoteles',
        'Exportar reportes si es necesario'
      ],
      group: 'analytics',
      level: 1
    },
    
    calendario: {
      label: 'Calendario de\nReservas',
      title: 'Vista de calendario',
      description: 'Visualización interactiva de reservas en formato calendario.',
      features: [
        'Vista mensual y semanal',
        'Filtros por hotel y habitación',
        'Drag & drop para cambios',
        'Información detallada de reservas',
        'Colores por estado',
        'Búsqueda y filtrado',
        'Vista de ocupación'
      ],
      group: 'view',
      level: 1
    },
    
    usuarios: {
      label: 'Gestión de\nUsuarios',
      title: 'Usuarios y permisos',
      description: 'Administración de usuarios, roles y permisos del sistema.',
      features: [
        'Creación y gestión de usuarios',
        'Sistema de roles y permisos',
        'Asignación de hoteles',
        'Control de acceso granular',
        'Imagen de perfil',
        'Información de contacto',
        'Auditoría de acciones'
      ],
      requirements: [
        'Definir roles (admin, recepción, etc.)'
      ],
      steps: [
        'Crear roles y permisos',
        'Crear usuarios y asignar roles',
        'Asignar hoteles a cada usuario'
      ],
      group: 'config',
      level: 1
    },
    
    empresas: {
      label: 'Gestión de\nEmpresas',
      title: 'Administración de empresas',
      description: 'Gestión de empresas que operan múltiples hoteles.',
      features: [
        'Datos de empresa',
        'Información legal (CUIT/CUIL)',
        'Ubicación (País, Provincia, Ciudad)',
        'Contacto y dirección',
        'Relación con hoteles',
        'Soporte multi-empresa'
      ],
      requirements: [
        'Datos legales y de contacto de la empresa'
      ],
      steps: [
        'Crear empresa',
        'Asociar hoteles existentes o crear nuevos'
      ],
      group: 'config',
      level: 1
    },
    
    ubicaciones: {
      label: 'Gestión de\nUbicaciones',
      title: 'Módulo de ubicaciones geográficas',
      description: 'Gestión completa de ubicaciones geográficas con códigos estándar ISO.',
      features: [
        'Jerarquía geográfica completa (País → Estado → Ciudad)',
        'Códigos ISO-3166 estándar',
        'Coordenadas geográficas (lat/lng)',
        'Códigos postales',
        'Códigos telefónicos por país',
        'Códigos de moneda',
        'Relación con hoteles y empresas',
        'APIs para búsqueda y validación'
      ],
      requirements: [
        'Datos geográficos estándar'
      ],
      steps: [
        'Seleccionar país con código ISO',
        'Seleccionar estado/provincia',
        'Seleccionar ciudad con código postal',
        'Asociar coordenadas si es necesario'
      ],
      group: 'config',
      level: 1
    },
    
    notificaciones: {
      label: 'Sistema de\nNotificaciones',
      title: 'Notificaciones automáticas',
      description: 'Sistema de alertas y notificaciones para eventos importantes.',
      features: [
        'Notificaciones en tiempo real',
        'Múltiples canales (email, push)',
        'Eventos configurables',
        'Historial de notificaciones',
        'Preferencias de usuario',
        'Notificaciones de reservas y pagos'
      ],
      group: 'system',
      level: 1
    },
    
    reembolsos: {
      label: 'Procesamiento\nAutomático de\nReembolsos',
      title: 'Reembolsos automáticos',
      description: 'Procesamiento automático 24/7 de reembolsos según políticas configuradas.',
      features: [
        'Procesamiento automático 24/7',
        'Validación de elegibilidad',
        'Integración con pasarelas',
        'Notificaciones automáticas',
        'Logs de auditoría',
        'Manejo de errores',
        'Reembolsos parciales y totales'
      ],
      group: 'automation',
      level: 1
    },
    
    facturacion: {
      label: 'Facturación\nElectrónica\nArgentina',
      title: 'Facturación AFIP',
      description: 'Integración completa con AFIP para facturación electrónica argentina.',
      features: [
        'Integración con AFIP',
        'Generación de CAE',
        'Facturas A, B, C',
        'Notas de crédito',
        'Códigos QR',
        'PDFs fiscales',
        'Facturación en seña o solo recibos'
      ],
      requirements: [
        'Datos fiscales (puntos de venta, tipo de contribuyente)',
        'Conexión con AFIP'
      ],
      steps: [
        'Configurar datos fiscales por hotel/empresa',
        'Emitir comprobantes desde reservas o cobros',
        'Descargar/reenviar comprobantes'
      ],
      group: 'billing',
      level: 1
    },
    
    comprobantes: {
      label: 'Comprobantes de\nSeñas y\nDevoluciones',
      title: 'Comprobantes automáticos',
      description: 'Generación automática de recibos y comprobantes de pagos con envío por email.',
      features: [
        'Recibos de señas automáticos',
        'Comprobantes de pagos parciales',
        'PDFs profesionales automáticos',
        'Envío automático por email',
        'Logo del hotel personalizado',
        'Datos completos del hotel y huésped',
        'Integración con facturación AFIP',
        'Historial completo de recibos',
        'Almacenamiento en nube',
        'Sello fiscal interno'
      ],
      requirements: [
        'Configuración de email (Resend)',
        'Logo del hotel (opcional)',
        'Datos completos del hotel'
      ],
      steps: [
        'Configurar proveedor de email',
        'Subir logo del hotel (opcional)',
        'Los recibos se generan automáticamente en cada pago',
        'El huésped recibe el recibo por email'
      ],
      group: 'billing',
      level: 1
    },
    
    otas: {
      label: 'Integraciones\ncon OTAs\n(Channel Manager)',
      title: 'Channel Manager',
      description: 'Integración con Booking.com, Airbnb y otras OTAs para sincronización bidireccional.',
      features: [
        'Sincronización bidireccional',
        'Prevención de overbooking',
        'Actualización automática de disponibilidad',
        'Sincronización de tarifas',
        'Gestión de reservas OTA',
        'Soporte para Booking.com y Airbnb',
        'Validación automática de conflictos'
      ],
      requirements: [
        'Credenciales de cada canal (Booking, Airbnb, etc.)'
      ],
      steps: [
        'Conectar canales con credenciales',
        'Activar sincronización de disponibilidad y tarifas',
        'Revisar reservas entrantes y reconciliar'
      ],
      group: 'integration',
      level: 1
    },
    
    limpieza: {
      label: 'Gestión de\nLimpieza\n(Housekeeping)',
      title: 'Sistema de Housekeeping',
      description: 'Sistema completo de gestión de tareas de limpieza y mantenimiento con asignación automática de personal y checklists personalizables.',
      features: [
        'Asignación automática de personal',
        'Generación automática de tareas (diarias y checkout)',
        'Checklists personalizables por tipo de habitación',
        'Seguimiento en tiempo real de tareas',
        'Gestión de zonas y turnos',
        'Control de vencimientos y alertas',
        'Estados: Pendiente, En Proceso, Completada, Cancelada',
        'Integración con reservas (checkout automático)',
        'Historial completo de tareas',
        'Notificaciones al personal'
      ],
      requirements: [
        'Personal de limpieza registrado',
        'Zonas de limpieza configuradas',
        'Checklists definidos (opcional)'
      ],
      steps: [
        'Registrar personal de limpieza con horarios y zonas',
        'Configurar zonas de limpieza del alojamiento',
        'Crear checklists por tipo de habitación y tarea',
        'Configurar reglas de generación automática',
        'Las tareas se generan automáticamente al hacer checkout'
      ],
      group: 'core',
      level: 1
    }
  }

  // Sub-módulos de Pagos
  const paymentSubmodules: Record<string, ModuleData> = {
    transferencias: {
      label: 'Transferencias\nBancarias\ncon OCR',
      title: 'Transferencias con OCR',
      description: 'Procesamiento de transferencias bancarias con reconocimiento óptico de comprobantes.',
      features: [
        'Subida de comprobantes',
        'Procesamiento OCR automático',
        'Confirmación automática',
        'Almacenamiento en nube (Cloudinary)',
        'Validación inteligente de montos y CBU',
        'Historial completo de transferencias'
      ],
      group: 'payment',
      level: 2
    },
    
    cobros: {
      label: 'Módulo de\nCobros',
      title: 'Historial de cobros',
      description: 'Vista unificada de todos los pagos y cobros con análisis avanzado.',
      features: [
        'Historial completo de pagos',
        'Filtros avanzados (fecha, tipo, método, estado)',
        'Estadísticas y métricas',
        'Exportación CSV',
        'Archivos adjuntos',
        'Búsqueda por huésped'
      ],
      group: 'payment',
      level: 2
    },
    
    conciliacion: {
      label: 'Conciliación\nBancaria\nAutomática',
      title: 'Conciliación bancaria',
      description: 'Matching automático de pagos con extractos bancarios.',
      features: [
        'Subida de extractos CSV',
        'Matching inteligente',
        'Confirmación automática',
        'Logs de auditoría',
        'Configuración flexible',
        'Detección de discrepancias'
      ],
      group: 'payment',
      level: 2
    },
    
    vouchers: {
      label: 'Sistema de\nVouchers de\nCrédito',
      title: 'Vouchers reutilizables',
      description: 'Sistema de vouchers de crédito para pagos futuros y reembolsos.',
      features: [
        'Creación de vouchers',
        'Aplicación a reservas',
        'Seguimiento de uso',
        'Vencimientos configurables',
        'Historial completo',
        'Uso para reembolsos'
      ],
      group: 'payment',
      level: 2
    }
  }

  // Detalles por módulo (para expandir/colapsar)
  const moduleDetails: Record<string, Array<{ id: string; label: string }>> = {
    hoteles: [
      { id: 'hoteles:datos', label: 'Datos Básicos' },
      { id: 'hoteles:ubicacion', label: 'Ubicación' },
      { id: 'hoteles:legales', label: 'Legales' },
      { id: 'hoteles:horarios', label: 'Horarios' },
      { id: 'hoteles:auto', label: 'Automatizaciones' }
    ],
    habitaciones: [
      { id: 'habitaciones:tipos', label: 'Tipos' },
      { id: 'habitaciones:capacidad', label: 'Capacidad' },
      { id: 'habitaciones:precio', label: 'Precios' },
      { id: 'habitaciones:estado', label: 'Estados' },
      { id: 'habitaciones:ident', label: 'Identificación' }
    ],
    tarifas: [
      { id: 'tarifas:planes', label: 'Planes' },
      { id: 'tarifas:reglas', label: 'Reglas' },
      { id: 'tarifas:promos', label: 'Promociones' },
      { id: 'tarifas:impuestos', label: 'Impuestos' }
    ],
    reservas: [
      { id: 'reservas:disp', label: 'Disponibilidad' },
      { id: 'reservas:creacion', label: 'Creación' },
      { id: 'reservas:estados', label: 'Estados' },
      { id: 'reservas:valid', label: 'Validaciones' }
    ],
    pagos: [
      { id: 'pagos:pasarelas', label: 'Pasarelas' },
      { id: 'pagos:politicas', label: 'Políticas' },
      { id: 'pagos:senas', label: 'Señas/Parciales' },
      { id: 'pagos:webhooks', label: 'Webhooks' }
    ],
    usuarios: [
      { id: 'usuarios:roles', label: 'Roles' },
      { id: 'usuarios:permisos', label: 'Permisos' },
      { id: 'usuarios:asign', label: 'Asignación Hoteles' }
    ],
    empresas: [
      { id: 'empresas:datos', label: 'Datos' },
      { id: 'empresas:hoteles', label: 'Hoteles Asociados' }
    ],
    ubicaciones: [
      { id: 'ubicaciones:paises', label: 'Países' },
      { id: 'ubicaciones:estados', label: 'Estados/Provincias' },
      { id: 'ubicaciones:ciudades', label: 'Ciudades' },
      { id: 'ubicaciones:coordenadas', label: 'Coordenadas' }
    ],
    facturacion: [
      { id: 'facturacion:tipos', label: 'Tipos' },
      { id: 'facturacion:cae', label: 'CAE/QR' },
      { id: 'facturacion:pdf', label: 'PDFs' }
    ],
    otas: [
      { id: 'otas:sync', label: 'Sincronización' },
      { id: 'otas:over', label: 'Anti-Overbooking' }
    ],
    notificaciones: [
      { id: 'notif:eventos', label: 'Eventos' },
      { id: 'notif:canales', label: 'Canales' }
    ],
    calendario: [
      { id: 'calendario:vistas', label: 'Vistas' },
      { id: 'calendario:filtros', label: 'Filtros' }
    ],
    limpieza: [
      { id: 'limpieza:tareas', label: 'Tareas' },
      { id: 'limpieza:personal', label: 'Personal' },
      { id: 'limpieza:zonas', label: 'Zonas' },
      { id: 'limpieza:checklists', label: 'Checklists' },
      { id: 'limpieza:config', label: 'Configuración' }
    ]
  }

  const getColorForGroup = (group: string) => {
    // Paleta de colores simplificada y coherente - solo 3 colores principales
    // Todos con texto blanco para máxima legibilidad
    const colors: Record<string, { background: string; border: string; textColor: string }> = {
      // Nodo central - destacado con dorado
      center: { background: '#0A304A', border: '#D4AF37', textColor: '#ffffff' },
      
      // Configuración y gestión básica - azul oscuro
      config: { background: '#1e3a5f', border: '#2d5a87', textColor: '#ffffff' },
      
      // Funcionalidades core - azul medio
      core: { background: '#2d5a87', border: '#3d6fa3', textColor: '#ffffff' },
      
      // Pagos y financiero - azul oscuro (mismo que config)
      payment: { background: '#1e3a5f', border: '#2d5a87', textColor: '#ffffff' },
      
      // Políticas - azul medio
      policy: { background: '#2d5a87', border: '#3d6fa3', textColor: '#ffffff' },
      
      // Tarifas y precios - azul oscuro
      pricing: { background: '#1e3a5f', border: '#2d5a87', textColor: '#ffffff' },
      
      // Analytics y reportes - azul medio
      analytics: { background: '#2d5a87', border: '#3d6fa3', textColor: '#ffffff' },
      
      // Vistas y visualización - azul oscuro
      view: { background: '#1e3a5f', border: '#2d5a87', textColor: '#ffffff' },
      
      // Sistema y notificaciones - azul medio
      system: { background: '#2d5a87', border: '#3d6fa3', textColor: '#ffffff' },
      
      // Automatización - azul oscuro
      automation: { background: '#1e3a5f', border: '#2d5a87', textColor: '#ffffff' },
      
      // Facturación - azul medio
      billing: { background: '#2d5a87', border: '#3d6fa3', textColor: '#ffffff' },
      
      // Integraciones - azul oscuro
      integration: { background: '#1e3a5f', border: '#2d5a87', textColor: '#ffffff' }
    }
    return colors[group] || { background: '#1e3a5f', border: '#2d5a87', textColor: '#ffffff' }
  }

  const getHierLevelForNode = (nodeId: string): number => {
    const map: Record<string, number> = {
      alojaSys: 0,
      empresas: 1,
      ubicaciones: 1,
      hoteles: 2,
      usuarios: 2,
      habitaciones: 3,
      tarifas: 3,
      otas: 3,
      politicasCancelacion: 3,
      politicasDevolucion: 3,
      reservas: 4,
      calendario: 5,
      pagos: 5,
      notificaciones: 5,
      limpieza: 5,
      cobros: 6,
      transferencias: 6,
      conciliacion: 6,
      vouchers: 6,
      facturacion: 6,
      comprobantes: 6,
      reembolsos: 6,
      dashboard: 6
    }
    return map[nodeId] ?? 4
  }

  const createNetworkData = () => {
    if (!vis || !vis.DataSet) return { nodes: null, edges: null }
    const nodes = new vis.DataSet([])
    const edges = new vis.DataSet([])

    // Nodo central
    const centerColor = getColorForGroup('center')
    const centerNode: any = {
      id: 'alojaSys',
      label: modulesData.alojaSys.label,
      title: modulesData.alojaSys.title,
      shape: 'box',
      color: {
        background: centerColor.background,
        border: centerColor.border,
        highlight: { background: '#D4AF37', border: '#0A304A' }
      },
      font: { color: centerColor.textColor, size: 28, face: 'Arial', bold: true },
      size: 60
    }
    
    if (layoutMode === 'radial') {
      centerNode.x = 0
      centerNode.y = 0
      centerNode.fixed = false // Permitir mover el nodo central
      centerNode.level = undefined
    } else {
      centerNode.level = 0
      centerNode.x = undefined
      centerNode.y = undefined
      centerNode.fixed = false
    }
    
    nodes.add(centerNode)

    // Agregar módulos principales
    Object.keys(modulesData).forEach((key, index) => {
      if (key === 'alojaSys') return
      
      const module = modulesData[key]
      const moduleColor = getColorForGroup(module.group)
      const baseNode: any = {
        id: key,
        label: module.label,
        title: module.title,
        shape: 'box',
        color: {
          background: moduleColor.background,
          border: moduleColor.border,
          highlight: { background: moduleColor.border, border: moduleColor.background }
        },
        font: { color: moduleColor.textColor, size: 18, face: 'Arial', bold: true },
        size: 35
      }

      if (layoutMode === 'radial') {
        const angle = (index - 1) * (2 * Math.PI / (Object.keys(modulesData).length - 1))
        const radius = 500
        const x = Math.cos(angle) * radius
        const y = Math.sin(angle) * radius
        // En modo radial, establecer posiciones explícitas y no fijas para que la física funcione
        nodes.add({ 
          ...baseNode, 
          x, 
          y, 
          fixed: false, // No fijar posiciones para permitir que la física ajuste
          level: undefined // No usar level en modo radial
        })
      } else {
        // En modo jerárquico, usar level y no posiciones fijas
        nodes.add({ 
          ...baseNode, 
          x: undefined, 
          y: undefined, 
          fixed: false,
          level: getHierLevelForNode(key) 
        })
      }

      edges.add({
        from: 'alojaSys',
        to: key,
        color: { color: '#ffffff', opacity: 0.6 },
        width: 2,
        smooth: { type: 'continuous', roundness: 0.5 }
      })
    })

    // Flujos entre módulos (direccionales)
    const flows = [
      ['empresas', 'hoteles'],
      ['ubicaciones', 'hoteles'],
      ['ubicaciones', 'empresas'],
      ['hoteles', 'habitaciones'],
      ['hoteles', 'tarifas'],
      ['hoteles', 'usuarios'],
      ['habitaciones', 'reservas'],
      ['tarifas', 'reservas'],
      ['otas', 'reservas'],
      ['reservas', 'calendario'],
      ['reservas', 'pagos'],
      ['reservas', 'limpieza'],
      ['habitaciones', 'limpieza'],
      ['pagos', 'facturacion'],
      ['pagos', 'cobros'],
      ['pagos', 'transferencias'],
      ['pagos', 'conciliacion'],
      ['pagos', 'comprobantes'],
      ['reservas', 'notificaciones'],
      ['reservas', 'politicasCancelacion'],
      ['politicasCancelacion', 'reembolsos'],
      ['reservas', 'dashboard']
    ]

    flows.forEach(pair => {
      edges.add({
        from: pair[0],
        to: pair[1],
        color: { color: '#ffffff', opacity: 0.7 },
        width: 2,
        arrows: 'to',
        dashes: true,
        smooth: { type: 'continuous', roundness: 0.3 }
      })
    })

    // Agregar sub-módulos de pagos
    if (showPaymentSubmodules) {
      Object.keys(paymentSubmodules).forEach((key, index) => {
        const submodule = paymentSubmodules[key]
        const submoduleColor = getColorForGroup(submodule.group)
        const baseNode: any = {
          id: key,
          label: submodule.label,
          title: submodule.title,
          shape: 'box',
          color: {
            background: submoduleColor.background,
            border: submoduleColor.border,
            highlight: { background: submoduleColor.border, border: submoduleColor.background }
          },
          font: { color: submoduleColor.textColor, size: 16, face: 'Arial', bold: true },
          size: 28
        }

        if (layoutMode === 'radial') {
          const angle = index * (2 * Math.PI / Object.keys(paymentSubmodules).length)
          const radius = 250
          const paymentAngle = (Object.keys(modulesData).indexOf('pagos') - 1) * (2 * Math.PI / (Object.keys(modulesData).length - 1))
          const paymentX = Math.cos(paymentAngle) * 500
          const paymentY = Math.sin(paymentAngle) * 500
          const x = paymentX + Math.cos(angle) * radius
          const y = paymentY + Math.sin(angle) * radius
          nodes.add({ 
            ...baseNode, 
            x, 
            y, 
            fixed: false, // No fijar para permitir ajuste de física
            level: undefined 
          })
        } else {
          nodes.add({ 
            ...baseNode, 
            x: undefined, 
            y: undefined, 
            fixed: false,
            level: getHierLevelForNode(key) 
          })
        }

        edges.add({
          from: 'pagos',
          to: key,
          color: { color: '#ffffff', opacity: 0.4 },
          width: 1.5,
          smooth: { type: 'continuous', roundness: 0.3 }
        })
      })
    }

    return { nodes, edges }
  }

  const getLayoutOptions = () => {
    if (layoutMode === 'hierarchical') {
      return {
        hierarchical: {
          enabled: true,
          direction: 'LR',
          sortMethod: 'hubsize',
          levelSeparation: 160,
          nodeSpacing: 110,
          treeSpacing: 180
        }
      }
    }
    return { improvedLayout: true }
  }

  const initializeNetwork = () => {
    if (!networkRef.current || !vis || !vis.Network) return

    const { nodes, edges } = createNetworkData()
    if (!nodes || !edges) return

    // Obtener dimensiones del contenedor
    const container = networkRef.current
    const width = container.offsetWidth || container.clientWidth || 1200
    const height = container.offsetHeight || container.clientHeight || 800

    const options = {
      nodes: {
        borderWidth: 3,
        shadow: true,
        shapeProperties: {
          borderRadius: 10
        },
        font: {
          size: 16,
          face: 'Arial',
          bold: true
        }
      },
      edges: {
        shadow: true,
        width: 2,
        arrows: {
          to: {
            enabled: false
          }
        }
      },
      physics: {
        enabled: layoutMode === 'radial' ? physicsEnabled : false, // Solo física en modo radial
        stabilization: {
          enabled: layoutMode === 'radial',
          iterations: layoutMode === 'radial' ? 200 : 0
        },
        barnesHut: {
          gravitationalConstant: layoutMode === 'radial' ? -8000 : -2000,
          centralGravity: layoutMode === 'radial' ? 0.3 : 0.1,
          springLength: layoutMode === 'radial' ? 400 : 200,
          springConstant: layoutMode === 'radial' ? 0.05 : 0.04,
          damping: layoutMode === 'radial' ? 0.1 : 0.09
        }
      },
      interaction: {
        hover: true,
        tooltipDelay: 100,
        zoomView: true,
        dragView: true,
        zoomSpeed: 1.2
      },
      layout: getLayoutOptions()
    }

    const network = new vis.Network(container, { nodes, edges }, options)
    
    // Forzar el tamaño del canvas
    if (network.setSize) {
      network.setSize(`${width}px`, `${height}px`)
    }

    // Eventos
    network.on('click', (params: any) => {
      if (params.nodes.length > 0) {
        const nodeId = params.nodes[0]
        setSelectedNode(nodeId)
      } else {
        setSelectedNode(null)
      }
    })

    network.on('doubleClick', (params: any) => {
      if (params.nodes.length > 0) {
        const nodeId = params.nodes[0]
        toggleModuleDetails(nodeId)
      }
    })

    networkInstanceRef.current = network

    // Ajustar vista después de un breve delay para asegurar que el contenedor tenga su tamaño
    setTimeout(() => {
      if (networkInstanceRef.current && networkRef.current) {
        const container = networkRef.current
        const width = container.offsetWidth || container.clientWidth || 1200
        const height = container.offsetHeight || container.clientHeight || 800
        
        // Forzar tamaño nuevamente después de que el DOM esté completamente renderizado
        if (networkInstanceRef.current.setSize) {
          networkInstanceRef.current.setSize(`${width}px`, `${height}px`)
        }
        
        networkInstanceRef.current.fit({
          animation: {
            duration: 1000,
            easingFunction: 'easeInOutQuad'
          },
          padding: 100
        })
      }
    }, 500)
  }

  const toggleModuleDetails = (moduleId: string) => {
    if (!moduleDetails[moduleId]) return
    
    const newExpanded = new Set(expandedModules)
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId)
    } else {
      newExpanded.add(moduleId)
    }
    setExpandedModules(newExpanded)
    rebuildNetwork()
  }

  const rebuildNetwork = () => {
    if (!networkInstanceRef.current || !networkRef.current) return
    
    // Destruir la red actual y crear una nueva para evitar problemas de posicionamiento
    networkInstanceRef.current.destroy()
    networkInstanceRef.current = null
    
    // Pequeño delay para asegurar que se destruyó completamente
    setTimeout(() => {
      initializeNetwork()
    }, 100)
  }

  const fitNetwork = () => {
    if (networkInstanceRef.current && networkRef.current) {
      const container = networkRef.current
      const width = container.offsetWidth || container.clientWidth || 1200
      const height = container.offsetHeight || container.clientHeight || 800
      
      if (networkInstanceRef.current.setSize) {
        networkInstanceRef.current.setSize(`${width}px`, `${height}px`)
      }
      
      networkInstanceRef.current.fit({
        animation: {
          duration: 1000,
          easingFunction: 'easeInOutQuad'
        },
        padding: 100
      })
    }
  }

  const resetView = () => {
    if (networkInstanceRef.current) {
      networkInstanceRef.current.setOptions({
        physics: {
          enabled: true
        }
      })
      setTimeout(() => {
        fitNetwork()
      }, 100)
    }
  }

  const togglePhysics = () => {
    setPhysicsEnabled(!physicsEnabled)
    if (networkInstanceRef.current) {
      networkInstanceRef.current.setOptions({
        physics: {
          enabled: !physicsEnabled
        }
      })
    }
  }

  useEffect(() => {
    if (isOpen) {
      // Pequeño delay para asegurar que el DOM esté listo
      setTimeout(() => {
        initializeNetwork()
      }, 100)
    }
    return () => {
      if (networkInstanceRef.current) {
        networkInstanceRef.current.destroy()
        networkInstanceRef.current = null
      }
    }
  }, [isOpen])

  useEffect(() => {
    rebuildNetwork()
  }, [layoutMode, showPaymentSubmodules, physicsEnabled])

  const selectedModule = selectedNode 
    ? (modulesData[selectedNode] || paymentSubmodules[selectedNode])
    : null

  if (!isOpen) return null

  return (
    <div className="system-map-modal-overlay" onClick={onClose}>
      <div className="system-map-modal" onClick={(e) => e.stopPropagation()}>
        <div className="system-map-header">
          <div>
            <h2 className="system-map-title">Mapa del Sistema AlojaSys</h2>
            <p className="system-map-subtitle">
              Explora todos los módulos y funcionalidades del sistema. Haz clic en cualquier módulo para ver más detalles.
            </p>
          </div>
          <button 
            className="btn-close-modal"
            onClick={onClose}
            aria-label="Cerrar modal"
          >
            <X size={24} />
          </button>
        </div>

        <div className="system-map-container">
          <div className="system-map-wrapper">
            <div className="system-map-controls">
            <h3>Controles</h3>
            <button onClick={fitNetwork} className="control-btn">
              <Layout size={16} />
              Ajustar Vista
            </button>
            <button onClick={resetView} className="control-btn">
              <Layers size={16} />
              Restablecer
            </button>
            <button onClick={togglePhysics} className="control-btn">
              <Zap size={16} />
              {physicsEnabled ? 'Desactivar' : 'Activar'} Física
            </button>
            <button 
              onClick={() => setLayoutMode('hierarchical')} 
              className={`control-btn ${layoutMode === 'hierarchical' ? 'active' : ''}`}
            >
              Vista Jerárquica
            </button>
            <button 
              onClick={() => setLayoutMode('radial')} 
              className={`control-btn ${layoutMode === 'radial' ? 'active' : ''}`}
            >
              Vista Radial
            </button>
            <button 
              onClick={() => setShowPaymentSubmodules(!showPaymentSubmodules)} 
              className="control-btn"
            >
              {showPaymentSubmodules ? 'Ocultar' : 'Mostrar'} Submódulos de Pagos
            </button>
          </div>

            <div ref={networkRef} className="system-map-network" />

            {selectedModule && (
              <div className="system-map-info-panel">
                <button 
                  className="info-panel-close"
                  onClick={() => setSelectedNode(null)}
                  aria-label="Cerrar panel"
                >
                  ×
                </button>
                <h3>{selectedModule.title}</h3>
                <p className="info-description">{selectedModule.description}</p>
                
                {selectedModule.features && selectedModule.features.length > 0 && (
                  <>
                    <h4>Características</h4>
                    <ul>
                      {selectedModule.features.map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                  </>
                )}

                {selectedModule.requirements && selectedModule.requirements.length > 0 && (
                  <>
                    <h4>Requisitos</h4>
                    <ul>
                      {selectedModule.requirements.map((req, idx) => (
                        <li key={idx}>{req}</li>
                      ))}
                    </ul>
                  </>
                )}

                {selectedModule.steps && selectedModule.steps.length > 0 && (
                  <>
                    <h4>Pasos de uso</h4>
                    <ul>
                      {selectedModule.steps.map((step, idx) => (
                        <li key={idx}>{step}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SystemMapModal


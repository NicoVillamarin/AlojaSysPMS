/**
 * Script para generar sitemap.xml automáticamente
 * 
 * Uso:
 *   node scripts/generate-sitemap.js
 * 
 * Este script se ejecuta automáticamente durante el build
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOMAIN = 'https://www.alojasys.com';
const OUTPUT_PATH = path.join(__dirname, '../public/sitemap.xml');

// Secciones del sitio con sus prioridades
const sections = [
  { path: '/', priority: 1.0, changefreq: 'weekly' },
  { path: '/#inicio', priority: 1.0, changefreq: 'monthly' },
  { path: '/#integraciones', priority: 0.9, changefreq: 'monthly' },
  { path: '/#problema-solucion', priority: 0.8, changefreq: 'monthly' },
  { path: '/#caracteristicas', priority: 0.9, changefreq: 'monthly' },
  { path: '/#modulos', priority: 0.9, changefreq: 'monthly' },
  { path: '/#casos', priority: 0.8, changefreq: 'monthly' },
  { path: '/#roadmap', priority: 0.7, changefreq: 'monthly' },
  { path: '/#acerca', priority: 0.7, changefreq: 'monthly' },
  { path: '/#contacto', priority: 0.8, changefreq: 'monthly' },
];

// Fecha actual en formato ISO
const lastmod = new Date().toISOString().split('T')[0];

// Generar XML
const xmlHeader = `<?xml version="1.0" encoding="UTF-8"?>
<!--
  Sitemap XML generado automáticamente para AlojaSys
  Generado el: ${lastmod}
-->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
`;

const xmlFooter = `</urlset>`;

const urlEntries = sections.map(section => {
  return `  <url>
    <loc>${DOMAIN}${section.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${section.changefreq}</changefreq>
    <priority>${section.priority}</priority>
  </url>`;
}).join('\n');

const sitemapContent = `${xmlHeader}
${urlEntries}
${xmlFooter}
`;

// Escribir archivo
try {
  fs.writeFileSync(OUTPUT_PATH, sitemapContent, 'utf8');
  console.log('✅ Sitemap generado exitosamente en:', OUTPUT_PATH);
  console.log(`📄 ${sections.length} URLs incluidas`);
} catch (error) {
  console.error('❌ Error al generar sitemap:', error);
  process.exit(1);
}


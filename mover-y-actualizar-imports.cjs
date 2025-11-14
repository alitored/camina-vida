// mover-y-actualizar-imports.cjs
const fs = require('fs');
const path = require('path');

const proyectoRoot = path.resolve(__dirname, 'src');
const nombreArchivo = 'GraficoCircuitosPopulares.jsx';
const origen = path.join(proyectoRoot, 'components', 'Dashboard', 'Circuitos', nombreArchivo);
const destino = path.join(proyectoRoot, 'components', 'Dashboard', 'Estadisticas', nombreArchivo);

// 1. Mover el archivo
if (fs.existsSync(origen)) {
  fs.renameSync(origen, destino);
  console.log(`✅ Archivo movido a: ${destino}`);
} else {
  console.error(`❌ Archivo no encontrado en: ${origen}`);
  process.exit(1);
}

// 2. Actualizar imports en todo el proyecto
const actualizarImports = (dir) => {
  const archivos = fs.readdirSync(dir, { withFileTypes: true });

  for (const archivo of archivos) {
    const ruta = path.join(dir, archivo.name);

    if (archivo.isDirectory()) {
      actualizarImports(ruta);
    } else if (archivo.name.endsWith('.jsx') || archivo.name.endsWith('.tsx')) {
      let contenido = fs.readFileSync(ruta, 'utf8');
      const importRegex = /(['"])@\/components\/Dashboard\/Circuitos\/GraficoCircuitosPopulares\1/g;

      if (importRegex.test(contenido)) {
        const nuevoImport = `'@/components/Dashboard/Estadisticas/GraficoCircuitosPopulares'`;
        contenido = contenido.replace(importRegex, nuevoImport);
        fs.writeFileSync(ruta, contenido, 'utf8');
        console.log(`🔄 Import actualizado en: ${ruta}`);
      }
    }
  }
};

actualizarImports(proyectoRoot);
console.log('✅ Todos los imports fueron actualizados.');

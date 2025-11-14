// validar-imports-dashboard.cjs
const fs = require('fs');
const path = require('path');

const baseDir = path.resolve(__dirname, 'src', 'components', 'Dashboard');
const extensiones = ['.jsx', '.tsx'];
const errores = [];

function validarImport(rutaArchivo) {
  const contenido = fs.readFileSync(rutaArchivo, 'utf8');
  const regex = /import\s+.*?\s+from\s+['"](.+?)['"]/g;
  let match;

  while ((match = regex.exec(contenido)) !== null) {
    const importPath = match[1];
    if (importPath.startsWith('@/')) {
      const rutaRelativa = importPath.replace('@/', path.join(__dirname, 'src') + '/');
      const rutaFinal = rutaRelativa + (fs.existsSync(rutaRelativa + '.jsx') ? '.jsx' :
                                        fs.existsSync(rutaRelativa + '.tsx') ? '.tsx' : '');

      if (!rutaFinal || !fs.existsSync(rutaFinal)) {
        errores.push({
          archivo: rutaArchivo,
          importOriginal: importPath,
          rutaEsperada: rutaFinal || '(no encontrada)',
        });
      }
    } else if (importPath.startsWith('./') || importPath.startsWith('../')) {
      const rutaFinal = path.resolve(path.dirname(rutaArchivo), importPath);
      const existe = extensiones.some(ext => fs.existsSync(rutaFinal + ext));
      if (!existe) {
        errores.push({
          archivo: rutaArchivo,
          importOriginal: importPath,
          rutaEsperada: rutaFinal + '(.jsx/.tsx)',
        });
      }
    }
  }
}

function recorrerCarpeta(carpeta) {
  const archivos = fs.readdirSync(carpeta, { withFileTypes: true });
  for (const archivo of archivos) {
    const ruta = path.join(carpeta, archivo.name);
    if (archivo.isDirectory()) {
      recorrerCarpeta(ruta);
    } else if (extensiones.includes(path.extname(archivo.name))) {
      validarImport(ruta);
    }
  }
}

recorrerCarpeta(baseDir);

if (errores.length === 0) {
  console.log('✅ Todos los imports del dashboard están correctos.');
} else {
  console.log('❌ Se encontraron errores de importación:\n');
  errores.forEach(({ archivo, importOriginal, rutaEsperada }) => {
    console.log(`📄 Archivo: ${archivo}`);
    console.log(`   ❌ Import roto: ${importOriginal}`);
    console.log(`   🔍 Ruta esperada: ${rutaEsperada}\n`);
  });
}

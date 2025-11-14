const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'src', 'components');
const replacements = {
  'DashboardSesiones': 'Dashboard/Coordinadores/DashboardSesiones',
  'DashboardCoordinadores': 'Dashboard/Coordinadores/DashboardCoordinadores',
  'DashboardVistaInscripciones': 'Dashboard/Coordinadores/DashboardVistaInscripciones',
  'DashboardResumen': 'Dashboard/Estadisticas/DashboardResumen',
  'DashboardGraficos': 'Dashboard/Estadisticas/DashboardGraficos',
  'DashboardComparativo': 'Dashboard/Estadisticas/DashboardComparativo',
  'DashboardVistaFiltrada': 'Dashboard/Estadisticas/DashboardVistaFiltrada',
  'DashboardCircuitos': 'Dashboard/Circuitos/DashboardCircuitos',
  'DashboardRoles': 'Dashboard/Roles/DashboardRoles',
  'DashboardInscriptos': 'Dashboard/Inscriptos/DashboardInscriptos',
  'DashboardInscriptosPorCircuito': 'Dashboard/Inscriptos/DashboardInscriptosPorCircuito',
};

function actualizarImportsEnArchivo(filePath) {
  let contenido = fs.readFileSync(filePath, 'utf8');
  let modificado = false;

  Object.entries(replacements).forEach(([nombre, nuevaRuta]) => {
    const regex = new RegExp(`from ['"]@/components/${nombre}['"]`, 'g');
    if (regex.test(contenido)) {
      contenido = contenido.replace(regex, `from '@/components/${nuevaRuta}'`);
      modificado = true;
    }
  });

  if (modificado) {
    fs.writeFileSync(filePath, contenido, 'utf8');
    console.log(`✅ Actualizado: ${filePath}`);
  }
}

function recorrerCarpeta(carpeta) {
  fs.readdirSync(carpeta).forEach(nombre => {
    const ruta = path.join(carpeta, nombre);
    const stats = fs.statSync(ruta);

    if (stats.isDirectory()) {
      recorrerCarpeta(ruta);
    } else if (ruta.endsWith('.jsx') || ruta.endsWith('.tsx')) {
      actualizarImportsEnArchivo(ruta);
    }
  });
}

recorrerCarpeta(baseDir);

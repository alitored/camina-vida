Listo, Alesi — acá tenés el contenido listo para integrarlo directamente como `src/components/Dashboard/README.md` en tu repo:

---

```markdown
# 📘 README Técnico — Arquitectura del Dashboard

## 🧱 Estructura modular del dashboard

El dashboard está organizado por dominio funcional dentro de `src/components/Dashboard/`, siguiendo una lógica clara y escalable:

```
src/components/Dashboard/
├── Coordinadores/
│   ├── DashboardCoordinadores.jsx
│   ├── DashboardSesiones.jsx
│   └── DashboardVistaInscripciones.jsx
├── Estadisticas/
│   ├── DashboardResumen.jsx
│   ├── DashboardGraficos.jsx
│   ├── DashboardComparativo.jsx
│   └── DashboardVistaFiltrada.jsx
├── Circuitos/
│   └── DashboardCircuitos.jsx
├── Roles/
│   └── DashboardRoles.jsx
├── Inscriptos/
│   ├── DashboardInscriptos.jsx
│   └── DashboardInscriptosPorCircuito.jsx
├── Dashboard.jsx
├── DashboardHeader.jsx
```

Cada subcarpeta representa un dominio funcional del dashboard, lo que facilita la navegación, el mantenimiento y la incorporación de nuevos módulos.

---

## 📦 Convenciones de import

Usamos alias `@/components` para importar desde `src/components`. Esto requiere tener configurado `jsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": "src",
    "paths": {
      "@/*": ["*"]
    }
  }
}
```

Ejemplo de import correcto:

```tsx
import DashboardSesiones from '@/components/Dashboard/Coordinadores/DashboardSesiones';
```

Evitá rutas relativas como `../../components/...` para mantener claridad y consistencia.

---

## 👥 Guía para nuevos colaboradores

1. **Ubicación de componentes**: Todos los componentes del dashboard están en `src/components/Dashboard/`, organizados por dominio.
2. **Agregar nuevos módulos**: Creá una subcarpeta dentro de `Dashboard/` y ubicá ahí los componentes relacionados.
3. **Estilos**: Usamos Tailwind CSS (o el sistema definido en `globals.css`).
4. **Validación**: Usá el script `verificar-imports.js` para asegurarte de que todos los imports estén correctos.
5. **Importación**: Usá alias `@/components/...` para mantener consistencia.

---

## 🛠 Scripts útiles

### ✅ `actualizar-imports.cjs`

Actualiza automáticamente los imports según la nueva estructura modular.

```bash
node actualizar-imports.cjs
```

### ✅ `verificar-imports.js`

Verifica que todos los imports apunten a rutas válidas dentro de `src/components`.

```bash
node verificar-imports.js
```

Si hay errores, se listan en consola. Podés agregar una línea para guardar el reporte en `reporte-imports.txt`.

---

## 📈 Cómo escalar con nuevos dominios o submódulos

1. Crear subcarpeta dentro de `Dashboard/` con el nombre del nuevo dominio (ej. `EstadisticasAvanzadas/`)
2. Ubicar componentes relacionados dentro de esa carpeta
3. Actualizar imports usando el alias `@/components/...`
4. Opcional: agregar validadores, hooks o layouts específicos dentro del submódulo si es necesario

Ejemplo:

```
src/components/Dashboard/EstadisticasAvanzadas/
├── DashboardTendencias.jsx
├── DashboardPredicciones.jsx
```

---

```

Podés copiar este contenido directamente en `src/components/Dashboard/README.md`. Si querés, también puedo ayudarte a generar documentación técnica por submódulo (`Coordinadores`, `Estadisticas`, etc.) o preparar una guía de estilo para componentes UI. ¿Lo sumamos?
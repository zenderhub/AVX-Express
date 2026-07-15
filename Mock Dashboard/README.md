# Mock Dashboard — AVX Express

Prototipo de alta fidelidad del dashboard web adaptado para **AVX Express**, basado en la estructura del Dashboard de ZenderBox.

**Ver el dashboard:** [http://localhost:7788](http://localhost:7788)
_(Requiere servidor local activo. Desde la carpeta del proyecto: `python3 -m http.server 7788`)_

---

## Resumen de cambios vs. Dashboard ZenderBox

Este documento sirve como plantilla de referencia para aplicar adaptaciones de marca a nuevas versiones del dashboard.

---

### Logo

| ZenderBox | AVX Express |
|---|---|
| Logo SVG horizontal con wordmark "Zender" cyan + "Box" lime | `LOGOsinfondo.png` de AVX Express |

---

### Colores

| Elemento | ZenderBox | AVX Express |
|---|---|---|
| Color primario | Cyan `#029ECB` | Rojo `#C8352B` |
| Gradiente / GRADIENT | `linear-gradient(45deg, #029ECB, #CCD32A)` | Azul sólido `#1E4B8A` |
| Títulos y números principales | `#333333` | Azul de marca `#1E4B8A` |
| Hover / links | Dark cyan `#007B9F` | Rojo `#C8352B` |
| Primarios sin cambio | Navy `#004B72`, neutros, semánticos de estado | Igual |

> **Regla para nuevas marcas:** reemplazar `#029ECB` → color primario de marca, `GRADIENT` → color secundario o gradiente de marca, y `#1E4B8A` en títulos → el color que más representa la identidad visual.

---

### Tipografía

| ZenderBox | AVX Express |
|---|---|
| Plus Jakarta Sans (pesos 500, 700, 800) | Ubuntu (pesos 400, 500, 700) |

> **Regla para nuevas marcas:** reemplazar la familia tipográfica en `build_standalone.py` (Google Fonts `<link>`) y hacer find & replace de `"Plus Jakarta Sans"` → `"NuevaFuente"` en todos los `.jsx`.

---

### Formas (border-radius)

| Elemento | ZenderBox | AVX Express |
|---|---|---|
| Cards | `10px` | `10px` (sin cambio) |
| Avatares, badges, pills | `99px` (circular) | `10px` (cuadrado redondeado) |
| Botones | `8px` | `8px` (sin cambio) |
| Steps del timeline | Circular | Cuadrado `10px` |
| Avatar de usuario (header, sidebar) | Circular `99px` | Cuadrado `10px` |

> **Regla para nuevas marcas:** decidir si la identidad es "circular" (más suave, friendly) o "angular redondeada" (más técnico, profesional) y aplicarlo en avatares, steps y pills.

---

### Iconografía

| ZenderBox | AVX Express |
|---|---|
| Set custom SVG inline (paths hardcodeados) | Lucide Icons vía CDN (`unpkg.com/lucide@latest`) |
| Sin dependencia externa | `window.lucide[NombreIcono]` en runtime |

Equivalencias clave:

| Función | Lucide usado |
|---|---|
| Dashboard/Home | `House` |
| Tracking | `Scan` |
| Step: En Tienda | `ShoppingBag` |
| Step: En Bodega | `Warehouse` |
| Step: Despachado | `Send` |
| Step: En Camino | `Truck` |
| Step: Entregado | `PackageCheck` |

> **Regla para nuevas marcas:** cambiar los nombres de iconos en `TIMELINE_ICONS` (shell.jsx) y las funciones `IcoXxx` de icons.jsx para que coincidan con la semántica de la marca.

---

### Steps del timeline (Tracking)

| ZenderBox | AVX Express |
|---|---|
| Círculo con borde de color + icono SVG custom en color | Cuadrado `10px` relleno azul `#1E4B8A` + icono Lucide en blanco |
| Color activo varía por estado | Color activo único: azul de marca |
| Línea conectora en color activo | Línea conectora en azul de marca |

> **Regla para nuevas marcas:** en `shell.jsx`, cambiar `activeColor` en `Timeline` al color primario de la marca. Los cuadrados vs círculos se controlan con `borderRadius` en el nodo del step.

---

### Fondos

| Elemento | ZenderBox | AVX Express |
|---|---|---|
| Fondo global (body) | `#F6F6F6` | `#FFFFFF` |
| Sidebar | `#FFFFFF` | `#F6F6F6` |
| Cards | `#FFFFFF` | `#F6F6F6` |
| Área de contenido principal | `#F6F6F6` | `#FFFFFF` |

> Los fondos de ZenderBox y AVX Express están invertidos. Esta inversión (White First en ZenderBox vs. Gray First en AVX) es uno de los cambios más rápidos de aplicar para diferenciar visualmente dos instancias del mismo template.

---

### Badges de estado (StateBadge)

| ZenderBox | AVX Express |
|---|---|
| Pill con borde de color + fondo sutil multicolor (verde, rojo, naranja, magenta, azul) | Sin borde · Familia tonal azul `#1E4B8A` con variaciones de opacidad |

> **Regla para nuevas marcas:** en `STATE_COLORS` (shell.jsx), definir la paleta de badges. Puede ser multicolor (semántico por estado) o tonal (monocromático basado en el primario de marca).

---

## Checklist de adaptación para nueva marca

Al reutilizar este template para otra marca, aplicar en orden:

- [ ] **Logo** — reemplazar `assets/logo-avx.png` y actualizar `src` en `shell.jsx`
- [ ] **Color primario** — find & replace `#C8352B` → nuevo primario
- [ ] **GRADIENT** — cambiar la constante en `shell.jsx` (puede ser sólido o gradiente)
- [ ] **Títulos y números** — find & replace `#1E4B8A` → color de énfasis de la marca
- [ ] **Tipografía** — actualizar Google Fonts en `build_standalone.py` + find & replace del nombre de fuente
- [ ] **Formas** — decidir `borderRadius` para avatares y steps (circular vs. cuadrado)
- [ ] **Iconos** — actualizar `TIMELINE_ICONS` y funciones `IcoXxx` en `icons.jsx`
- [ ] **Fondos** — definir el esquema global/sidebar/cards (White First o Gray First)
- [ ] **Badges** — actualizar `STATE_COLORS` en `shell.jsx`
- [ ] **Datos mock** — actualizar `data.jsx` con usuario, dirección y paquetes de prueba reales de la marca
- [ ] **Build** — correr `python3 build_standalone.py` y verificar en `localhost:7788`

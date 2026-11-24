# USB Stock Showcase

# USB Stock — Diseño premium de e-commerce tecnológico con animaciones GSAP y experiencia visual de alto impacto

Quiero diseñar una nueva experiencia visual para **USB Stock**, una empresa especializada en memorias USB promocionales y productos tecnológicos personalizados para empresas.

El objetivo es crear una propuesta de diseño web extraordinariamente moderna, con calidad de estudio de diseño digital, comparable a los mejores sitios de comercio electrónico tecnológico.

No quiero una plantilla genérica de e-commerce ni un dashboard administrativo.

Quiero una experiencia visual memorable, elegante, dinámica y comercialmente efectiva.

## Identidad de marca

Nombre: USB Stock.

Colores principales:

- Rojo corporativo: `#EF1239`.
- Blanco: `#FFFFFF`.
- Negro/tinta: `#192126`.
- Gris claro: `#F5F6F6`.

Utiliza una tipografía moderna, por ejemplo Manrope, Inter o una alternativa similar.

El logotipo original será proporcionado como recurso de referencia. No lo rediseñes.

La identidad debe sentirse tecnológica, profesional, premium y accesible para clientes corporativos.

## Referencias estéticas

Me gustan los sitios diseñados con:

- Grandes fotografías de producto.
- Composiciones editoriales.
- Tipografía protagonista.
- Espacios negativos equilibrados.
- Secciones asimétricas.
- Gradientes suaves.
- Profundidad visual.
- Microinteracciones.
- Animaciones fluidas.
- Transiciones elegantes.
- Tarjetas de producto atractivas.
- Navegación refinada.

Inspiración de calidad: sitios premium de tecnología y estudios digitales contemporáneos.

Evita los patrones repetitivos de tarjetas grises y fondos planos.

No quiero una página que parezca diseñada hace diez años.

## Páginas que debes diseñar

Diseña exclusivamente dos páginas completas y navegables:

1. Página de inicio.
2. Catálogo de productos.

Ambas deben compartir navegación, identidad, componentes y lenguaje visual.

No desarrollar administrador, backend, autenticación, base de datos ni API.

## Página 1. Inicio

### Encabezado

Diseña una navegación moderna con:

- Logotipo USB Stock.
- Menú de categorías.
- Enlace al catálogo.
- Acceso a cotización.
- Contacto.

Las categorías principales son:

- Memorias USB.
- Cargadores.
- Audio.
- Estuches.
- Tecnología.
- Bebidas.

El menú debe incluir un dropdown o megamenú elegante para subcategorías.

No utilizar flechas desplegables grandes o decoraciones innecesarias.

El encabezado debe funcionar correctamente en móvil.

### Hero principal

Este debe ser el elemento más impactante del sitio.

Crear una composición editorial moderna con:

- Fotografía grande de memoria USB premium.
- Titular de gran tamaño.
- Texto comercial breve.
- Botón principal para explorar productos.
- Botón secundario para solicitar cotización.
- Composición con profundidad.
- Elementos gráficos discretos relacionados con tecnología.

Mensaje sugerido:

**Tu marca, siempre presente.**

Subtítulo:

Memorias USB y productos tecnológicos personalizados para hacer destacar tu marca.

No inventar descuentos, garantías, promociones o estadísticas comerciales.

### Secciones de inicio

Diseñar:

- Categorías destacadas.
- Selección visual de productos.
- Beneficios de personalización.
- Proceso de cotización.
- Sección editorial con fotografía protagonista.
- Llamada final a la acción.
- Footer profesional.

No construir todas las secciones como tarjetas idénticas.

Alternar composiciones para crear ritmo visual.

## Página 2. Catálogo

Crear una experiencia de exploración visual de productos.

### Estructura

- Encabezado compartido.
- Título y descripción breve.
- Buscador destacado.
- Categorías accesibles desde el menú superior.
- Grid de tarjetas.
- Indicadores de disponibilidad.
- Acciones para ver y cotizar.

No incluir una barra lateral grande con filtros redundantes.

### Productos

Usar memorias USB de diferentes estilos:

- Giratorias.
- Metálicas.
- Tarjetas.
- Madera.
- Ecológicas.
- Ejecutivas.
- Llaveros.

Utilizar fotografías realistas de productos, sin deformarlas.

Cada tarjeta debe mostrar:

- Fotografía.
- Nombre.
- Modelo.
- Capacidad cuando exista.
- Disponibilidad.
- Botón «Ver producto».
- Acción «Agregar a cotización» cuando sea apropiada.

No mostrar precios de costo.

### Carga infinita

El catálogo debe simular carga progresiva de productos.

Mostrar inicialmente 24 tarjetas y añadir otras al hacer scroll mediante IntersectionObserver.

Sin números de página.

Incluir estados elegantes de carga, error y final de catálogo.

No recargar toda la página.

### Pedido mínimo

USB Stock maneja un pedido mínimo de 50 piezas por variante.

Los productos sin disponibilidad suficiente no deben mostrarse en el catálogo público.

No permitir agregar cantidades inferiores a 50.

Estos comportamientos pueden simularse en el prototipo.

## Carrito de cotización

Incluir una pestaña flotante «Revisar cotización».

Debe:

- Mantenerse visible cuando haya productos seleccionados.
- Mostrar contador de productos.
- Permitir continuar navegando.
- Actualizarse sin recarga.
- Tener animaciones discretas.
- Adaptarse a móvil.

No desarrollar un checkout de pago.

USB Stock utiliza solicitudes de cotización, no venta directa en línea.

## Animaciones

Quiero animaciones premium, fluidas y bien ejecutadas.

Utiliza **GSAP y ScrollTrigger** para movimientos complejos y CSS nativo para microinteracciones sencillas.

### Hero

Crear una secuencia de entrada:

1. Aparece el titular.
2. Entra el subtítulo.
3. Aparecen las acciones.
4. Se revela la fotografía.
5. Los elementos secundarios terminan de acomodarse.

La duración total debe sentirse rápida y sofisticada.

### Scroll

Implementar:

- Aparición progresiva de secciones.
- Reveal de fotografías.
- Movimiento vertical sutil.
- Stagger de tarjetas.
- Transiciones coordinadas entre texto e imagen.
- Parallax muy discreto donde aporte valor.

### Hover

En tarjetas:

- Elevación suave.
- Cambio sutil de sombra.
- Transición de borde.
- Aparición de acciones.
- Movimiento ligero de iconos.

**No hacer zoom sobre las fotografías de los productos.**

Evitar rebotes y animaciones exageradas.

No animar dimensiones que provoquen saltos de layout.

Priorizar transform y opacity.

Respetar `prefers-reduced-motion`.

No implementar scroll-jacking.

## WhatsApp corporativo

Incluir un botón flotante de WhatsApp.

Al pulsarlo debe abrirse un panel anclado en la esquina inferior derecha, no un modal centrado.

El panel debe presentar:

- Logotipo.
- Banner.
- Vendedores.
- Fotografías circulares.
- Nombre.
- Estado disponible/no disponible.
- Acceso al chat.

Utilizar datos ficticios únicamente para la demostración.

No conectar con servicios externos.

Debe convivir sin superposición con la pestaña de cotización.

## Calidad visual

El sitio debe sentirse:

- Moderno.
- Editorial.
- Tecnológico.
- Comercial.
- Premium.
- Rápido.
- Elegante.

No utilizar emojis como iconografía principal.

Utilizar iconos SVG consistentes.

Priorizar fotografías sobre ilustraciones genéricas.

El diseño debe parecer una web terminada, no un wireframe.

## Responsive

Diseñar y comprobar:

- Escritorio 1440 px.
- Laptop 1024 px.
- Tableta 820 px.
- Móvil 390 px.

En móvil:

- Encabezado compacto.
- Hero bien proporcionado.
- Fotografías visibles.
- Tarjetas legibles.
- Menús accesibles.
- Botones táctiles.
- Carrito y WhatsApp correctamente posicionados.

Evitar desbordamiento horizontal.

## Requisitos técnicos

Puedes utilizar React y Tailwind si es lo más adecuado para construir el prototipo en Lovable.

Este trabajo es exclusivamente una propuesta visual.

Posteriormente trasladaremos el diseño a una aplicación existente construida en Laravel 12, Blade, Tailwind y JavaScript.

Por lo tanto:

- Mantén componentes claramente separables.
- Utiliza tokens de diseño.
- Evita dependencias innecesarias.
- No implementes un backend real.
- No agregues autenticación.
- No conectes servicios externos.
- No implementes pagos.
- No inventes integraciones.

## Entrega esperada

Quiero una propuesta navegable y funcional de:

**Inicio + Catálogo**

Con:

- Dirección de arte premium.
- Fotografías protagonistas.
- Animaciones GSAP.
- ScrollTrigger.
- Carga infinita simulada.
- Carrito de cotización AJAX simulado.
- Navegación por categorías.
- Selector WhatsApp.
- Responsive completo.

No quiero únicamente una pantalla estática.

**Sorpréndeme con la composición visual y la calidad de las interacciones. Prioriza una experiencia verdaderamente contemporánea que podamos utilizar como referencia para rediseñar USB Stock en Laravel.**

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/fc8e8b7e-411e-4108-9096-5c572564e9fd).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

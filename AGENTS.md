# AGENTS.md – Proyecto ET3

Guía breve para agentes de código que toquen este repositorio (HTML/JS/CSS puro, sin bundler).

## Objetivo y alcance
- Interfaz genérica de gestión CRUD para múltiples entidades usando estructuras JS dinámicas.
- Formularios/tablas se generan a partir de `estructura_<entidad>` y textos multiidioma (ES/EN).
- Core reutilizable: UI manager, builder de formularios/tablas y validador común. Entidades pueden aportar lógica propia opcional.

## Cómo ejecutar y probar
- Ejecutar en estático: abrir `index.html` en navegador moderno.
- Tests UI/datos: abrir `Test/Unit/index.html` o `Test/Data/index.html` (o crear `new Unit_Test('<entidad>')` / `new Data_Test(<claseEntidad>)` en consola).
- No hay build ni dependencias locales; solo se carga jQuery desde CDN (evita añadir más librerías).

## Estructura del código
- `index.html`: shell principal, carga de todos los scripts/estilos y menú dinámico de entidades.
- `Base/` y `Core/`:
  - `Base/css/IU.css`: estilos y accesibilidad básicos.
  - `Base/EntidadAbstracta.js`: utilidades comunes de entidades (DOM, validaciones heredadas).
  - `Core/LanguageManager.js`: gestor de idioma y registro de traducciones.
  - `Core/App_Class.js`: contenedor ligero para inicializar utilidades (usado por `GeneralUIManager`).
  - `Core/GeneralUIManager.js`: orquesta la entidad activa, render de acciones y validaciones automáticas.
  - `Core/DOMFormTableBuilder.js`: genera formularios/tablas desde estructuras (usa `data-attribute-name`).
  - `Core/Validations_Class.js`: valida valores contra reglas (`min_size`, `max_size`, `exp_reg`, `required`, ficheros, etc.).
  - `Core/Dom_Class.js`, `Core/Dom_table_Class.js`: helpers de DOM usados por entidades y tests.
  - `Core/ExternalAccess_class.js`: stub para llamadas a backend (no implementa lógica real).
- `app/`:
  - `entitiesConfig.js`: lista de entidades disponibles (`persona`, `producto`).
  - `estructura_persona.js`, `estructura_producto.js`: definición de atributos, HTML y reglas por acción.
  - `persona_Class.js`: clase concreta con datos dummy, validaciones manuales heredadas de ET2 y wrappers para usar el form-builder.
  - `Textos_ES.js`, `Textos_EN.js`, `Textos_Comunes.js`: diccionarios multiidioma.
  - `ET3_Datos_NombreEquipo.js`: datos del equipo para la tabla inferior.
- `locale/idioma.js`: utilidades históricas de idioma (compatibilidad).
- `Test/Unit`, `Test/Data`: harness de pruebas con resultados en pantalla y consola.
- `API.html`: documentación generada a partir de clases cargadas (puede quedarse vacía si no hay datos).

## Flujo funcional y entidades
- Menú dinámico: se construye con `entitiesConfig` y textos `text_menu_<entidad>` / `text_entity_<entidad>`.
- Selección de entidad: `UIManager.loadEntity(name)` instancia la clase (`persona` o fallback genérico) y resuelve la estructura registrada.
- Acciones soportadas por el core: `SEARCH`, `ADD`, `EDIT`, `DELETE`, `SHOWCURRENT`.
  - Si la entidad tiene `createForm_<ACCION>`, se usa; si no, `DOMFormTableBuilder.createForm` genera la UI desde la estructura.
  - `GeneralUIManager` aplica convenciones de título, visibilidad y engancha validaciones onblur/onsubmit.
- Validaciones: `Validations.validateValueAgainstRules` ejecuta reglas declarativas. Los campos con `personalized: true` pueden delegar en métodos `specialized_test_<atributo>` de la entidad (p. ej. `specialized_test_dni` en `persona`).
- Tablas y resultados: `DOMFormTableBuilder` pinta tablas/acciones si se invoca; el flujo de búsqueda aún simula datos manualmente (ver `persona_Class.js` y tests).
- Multiidioma: `LanguageManager` registra y refresca textos; usar siempre claves (`text_*`, `label_*`, mensajes de error) en lugar de strings fijos.

## Estilo de código y convenciones
- JS plano (ES6), sin empaquetador ni módulos; se espera compatibilidad directa en navegador.
- Usar `data-attribute-name` en inputs generados para que validaciones y traducciones funcionen.
- Formularios: ids/clases comunes (`form_iu`, `formulario`), acciones con `javascript:entidad.<ACCION>()` cuando se requiera compatibilidad.
- Evitar duplicar HTML: preferir `DOMFormTableBuilder` + estructura. Mantener compatibilidad con `EntidadAbstracta`/`dom` cuando sea necesario para tests.
- Textos visibles deben venir de `LanguageManager` y diccionarios; no hardcodear literal.
- No encapsular imports en try/catch.

## Reglas y límites para agentes
- No acoplar lógica a una sola entidad; evitar condicionales específicos y reutilizar estructuras/configuración.
- No añadir dependencias externas nuevas (ya se carga jQuery; no sumes frameworks/bundlers).
- No insertar datos estáticos del equipo en HTML; solo mediante `ET3_Datos_NombreEquipo.js` y `GeneralUIManager.renderTeamData`.
- Mantén rutas y nombres existentes (`index.html`, `IU.css`, `estructura_*`, `Textos_*`...).
- Respetar multiidioma: al añadir claves nuevas, incluir ES y EN.

## Estado actual y notas para agentes
- Entidades disponibles: `persona` (clase concreta + estructura completa) y `producto` (solo estructura genérica, sin clase). Si no hay clase, `GenericStructureEntity` actúa como fallback para formularios.
- El form-builder ya se usa para renders genéricos; `persona` mantiene validaciones heredadas de ET2 (duplicadas respecto a reglas declarativas). No rompas compatibilidad con sus métodos `ADD_*_validation` y `*_submit_*` porque los tests los verifican.
- Validaciones personalizadas de DNI/NIE usan `specialized_test_dni`/`personalize_*`; el flujo genérico permite invocarlas cuando `personalized: true`.
- Búsqueda/resultados siguen siendo dummy (arrays en `persona_Class.js`). Si implementas tabla real, reutiliza `DOMFormTableBuilder` y las reglas de estructura.
- `API.html` depende de clases cargadas; puede mostrarse vacío si no se generan datos.

## Cómo añadir o extender entidades
- Crear `estructura_<entidad>.js` con `entity`, `attributes` (html + rules por acción) y exponerla en `window`.
- Registrar el nombre en `app/entitiesConfig.js` y añadir textos en `Textos_ES.js` / `Textos_EN.js` (`text_menu_`, `text_entity_`, `text_contenido_titulo_form_<entidad>_<ACCION>`, labels y errores).
- Opcional: clase `app/<entidad>_Class.js` heredando de `EntidadAbstracta` para lógica específica, datos dummy o validaciones personalizadas (`specialized_test_*`). Implementa `getStructure()` y, si necesitas control manual, `createForm_<ACCION>()` invocando `DOMFormTableBuilder`.
- Evita tocar `index.html` o el core para añadir entidades nuevas; debe bastar con estructura+textos (+clase opcional).

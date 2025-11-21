# Definición de Agentes del Sistema - Entrega ET3 (IU 2025-2026)

Este documento define la arquitectura de agentes (clases y módulos) necesarios para la generación dinámica de interfaces basada estrictamente en la estructura JSON de entidad proporcionada (`estructura_nombreentidad`).

## 1. Agente Principal: Orquestador de Interfaz (`index.html` + script principal)
**Responsabilidad:** Inicialización y gestión del ciclo de vida de la aplicación.
**Tareas:**
* **Carga de Recursos:** Importación secuencial de CSS (`IU.css`) y JS (Clases, jQuery, Idiomas).
* **Instanciación Dinámica:**
    * Detectar la entidad solicitada vía menú.
    * Cargar la variable de estructura correspondiente (ej: `estructura_persona`).
    * Instanciar la clase de entidad específica si existe; de lo contrario, instanciar `EntidadAbstracta` inyectando la estructura JSON.
* **Información del Grupo:** Leer dinámicamente `ET3_Datos_NombreEquipo.js` y renderizar en el HTML los datos de entrega (Alumnos, DNI, Horas).
* **Enlace API:** Proveer acceso visible a `API.html`.

## 2. Agente de Entidad Abstracta (`EntidadAbstracta.js`)
**Responsabilidad:** Lógica de negocio agnóstica basada en la interpretación de la estructura JSON.
**Tareas:**
* **Gestión de Acciones:** Implementar `ADD`, `EDIT`, `DELETE`, `SEARCH`, `SHOWCURRENT`.
* **Orquestación de Formularios:**
    * Método `createForm(accion, datos_tupla)`: Debe recorrer `estructura.attributes` y llamar al **Agente DOM** para pintar cada campo.
* **Validación de Submit:**
    * Iterar sobre los atributos definidos en `estructura.attributes`.
    * Para cada atributo, invocar al **Agente de Validación** pasando la regla correspondiente a la acción actual (`rules.validations[accion]`).
* **Delegación Personalizada:**
    * Si la regla contiene `personalized: true`, invocar dinámicamente el método `specialized_test_nombreAtributo()` de la clase hija.

## 3. Agente de Generación DOM (`Dom_Class.js`)
**Responsabilidad:** Traducir el objeto `html` de la estructura JSON a etiquetas HTML reales.
**Entrada:** Recibe el objeto `structure.attributes[nombreAtributo].html`.
**Tareas Específicas de Mapeo:**
* **Tipo de Etiqueta (`tag`):**
    * Si `tag: 'select'`: Generar `<select>`, iterar sobre el array `options` para crear los `<option>`.
    * Si `tag: 'input'`: Generar `<input>` aplicando el atributo `type` (text, date, file, number...).
    * Si `tag: 'textarea'`: Generar `<textarea>` aplicando estrictamente `rows` y `columns`.
    * Si `tag: 'radio'` / `checkbox`: Generar grupos de inputs basados en `options` o lógica de enumerados.
* **Atributos Especiales:**
    * **`multiple`:** Si `true`, añadir el atributo `multiple` al input/select.
    * **`component_visible_size`:** Aplicar estilos o el atributo `size`/`width` para respetar la longitud física visual solicitada.
* **Eventos:** Asignar automáticamente `onblur` (o `onchange` para selects/files) vinculados a la función de validación de campo.

## 4. Agente de Validación (`Validations_Class.js`)
**Responsabilidad:** Interpretar el objeto `rules.validations[accion]` y ejecutar comprobaciones atómicas.
**Entrada:** Recibe el valor del campo y el objeto de reglas para la acción actual (ADD, EDIT, SEARCH).
**Tareas de Mapeo de Reglas:**
* **Validaciones de Texto/General:**
    * `min_size` / `max_size`: Verificar longitud de cadena.
    * `exp_reg`: Validar formato contra la expresión regular proporcionada.
* **Validaciones de Ficheros (Objeto File):**
    * `no_file`: Verificar obligatoriedad de subida.
    * **`max_size_file`**: Validar que el tamaño en bytes del archivo no exceda el límite definido en el array de configuración.
    * **`type_file`**: Validar que el MIME type del archivo coincida con el definido.
    * **`format_name_file`**: Validar el nombre del archivo contra la RegExp proporcionada en la configuración.
* **Retorno:** Devolver códigos de error (strings) compatibles con el sistema de idiomas o `true` si es correcto.

## 5. Agente de Internacionalización (`idioma.js`)
**Responsabilidad:** Traducción dinámica de etiquetas y errores.
**Tareas:**
* Detectar códigos de error devueltos por el Agente de Validación.
* Aplicar sufijos de idioma (`-ES` / `-EN`) a los códigos si es necesario (según especificación de errores de back/front).
* Traducir al vuelo los `labels` generados por el Agente DOM.

## 6. Agente de Definición de Datos (Estructura)
**Responsabilidad:** Contrato de datos que alimenta a los demás agentes.
**Estructura de Referencia:**
Debe cumplir estrictamente el formato JSON proporcionado, asegurando que cada atributo cuente con:
1.  **`html`**: Configuración visual (`tag`, `type`, `options`, `multiple`, `rows`, `columns`, `component_visible_size`).
2.  **`rules`**: Configuración lógica anidada por acción (`validations: { ADD: {...}, EDIT: {...}, ... }`) incluyendo las claves específicas para ficheros y validaciones personalizadas.

## 7. Documentación y API
**Archivos:**
* `ET3_Datos_NombreEquipo.js`: Fuente de datos del grupo.
* `API.html`: Catálogo detallado de las funciones desarrolladas por los agentes (parámetros de entrada, salida y descripción).
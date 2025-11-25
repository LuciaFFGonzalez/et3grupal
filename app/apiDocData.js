const apiDocData = [
  // -----------------------
  // Core: registros y entidades genéricas
  // -----------------------
  {
    className: 'StructureRegistry',
    methodName: 'constructor',
    params: [
      { name: 'initialStructures', type: 'object', description: 'Mapa opcional de estructuras precargadas (clave estructura_<entidad>).' }
    ],
    returns: 'StructureRegistry',
    description: 'Inicializa un registro en memoria para recuperar y almacenar estructuras de entidades.'
  },
  {
    className: 'StructureRegistry',
    methodName: 'getKey',
    params: [
      { name: 'entityName', type: 'string', description: 'Nombre lógico de la entidad.' }
    ],
    returns: 'string',
    description: 'Normaliza el nombre de la entidad a la clave esperada (estructura_<entidad>).'
  },
  {
    className: 'StructureRegistry',
    methodName: 'register',
    params: [
      { name: 'structure', type: 'object', description: 'Estructura con propiedad entity a registrar.' }
    ],
    returns: 'void',
    description: 'Guarda en memoria la estructura recibida si declara la propiedad entity.'
  },
  {
    className: 'StructureRegistry',
    methodName: 'get',
    params: [
      { name: 'entityName', type: 'string', description: 'Nombre de entidad a recuperar.' }
    ],
    returns: 'object | null',
    description: 'Devuelve la estructura registrada para la entidad o null si no existe.'
  },
  {
    className: 'StructureRegistry',
    methodName: 'hydrateFromWindow',
    params: [
      { name: 'entityName', type: 'string', description: 'Nombre de entidad a buscar en window.' }
    ],
    returns: 'object | null',
    description: 'Carga desde window la variable estructura_<entidad> y la registra si está disponible.'
  },
  {
    className: 'GenericStructureEntity',
    methodName: 'constructor',
    params: [
      { name: 'entityName', type: 'string', description: 'Nombre de la entidad representada.' },
      { name: 'structure', type: 'object', description: 'Estructura asociada usada como fallback.' }
    ],
    returns: 'GenericStructureEntity',
    description: 'Entidad de respaldo que hereda utilidades base y expone nombre y estructura cuando no existe clase concreta.'
  },
  {
    className: 'GenericStructureEntity',
    methodName: 'getEntityName',
    params: [],
    returns: 'string',
    description: 'Devuelve el nombre lógico de la entidad representada.'
  },
  {
    className: 'GenericStructureEntity',
    methodName: 'getStructure',
    params: [],
    returns: 'object',
    description: 'Retorna la estructura almacenada para que el UIManager pueda pintar formularios genéricos.'
  },
  // -----------------------
  // UIManager
  // -----------------------
  {
    className: 'UIManager',
    methodName: 'constructor',
    params: [
      { name: 'options', type: 'object', description: 'Permite inyectar formRenderer, validationManager, structures, languageManager y structureRegistry.' }
    ],
    returns: 'UIManager',
    description: 'Configura gestores de idioma, formularios y validaciones, y prepara el registro de estructuras.'
  },
  {
    className: 'UIManager',
    methodName: 'loadEntity',
    params: [
      { name: 'entityName', type: 'string', description: 'Identificador de la entidad seleccionada en el menú.' }
    ],
    returns: 'void',
    description: 'Instancia la entidad, resuelve su estructura, guarda la referencia global y abre la vista de búsqueda.'
  },
  {
    className: 'UIManager',
    methodName: 'instantiateEntity',
    params: [
      { name: 'entityName', type: 'string', description: 'Nombre de la entidad a instanciar.' }
    ],
    returns: 'object',
    description: 'Busca la clase en window y la instancia; si no existe, crea una GenericStructureEntity con estructura de respaldo.'
  },
  {
    className: 'UIManager',
    methodName: 'resolveStructure',
    params: [
      { name: 'entityName', type: 'string', description: 'Nombre de la entidad activa.' },
      { name: 'entityInstance', type: 'object', description: 'Instancia concreta de la entidad.' }
    ],
    returns: 'object',
    description: 'Prioriza la estructura expuesta por la entidad y, en su defecto, la registrada en StructureRegistry.'
  },
  {
    className: 'UIManager',
    methodName: 'getGeneralStructure',
    params: [
      { name: 'entityName', type: 'string', description: 'Entidad cuya estructura genérica se solicita.' }
    ],
    returns: 'object | null',
    description: 'Recupera una estructura desde el registro o la hidrata desde window si no estaba almacenada.'
  },
  {
    className: 'UIManager',
    methodName: 'capitalize',
    params: [
      { name: 'value', type: 'string', description: 'Texto a capitalizar.' }
    ],
    returns: 'string',
    description: 'Devuelve la cadena con la primera letra en mayúsculas.'
  },
  {
    className: 'UIManager',
    methodName: 'refreshSearchView',
    params: [
      { name: 'payload', type: 'object | null', description: 'Datos opcionales para precargar el formulario.' }
    ],
    returns: 'void',
    description: 'Acceso directo para refrescar la vista SEARCH usando refreshAction.'
  },
  {
    className: 'UIManager',
    methodName: 'refreshAddView',
    params: [
      { name: 'payload', type: 'object | null', description: 'Datos opcionales para prellenar el alta.' }
    ],
    returns: 'void',
    description: 'Atajo para refrescar la vista ADD.'
  },
  {
    className: 'UIManager',
    methodName: 'refreshEditView',
    params: [
      { name: 'payload', type: 'object | null', description: 'Tupla a editar.' }
    ],
    returns: 'void',
    description: 'Atajo para refrescar la vista EDIT con datos de la fila seleccionada.'
  },
  {
    className: 'UIManager',
    methodName: 'refreshShowCurrentView',
    params: [
      { name: 'payload', type: 'object | null', description: 'Tupla a mostrar en modo lectura.' }
    ],
    returns: 'void',
    description: 'Atajo para refrescar la vista SHOWCURRENT.'
  },
  {
    className: 'UIManager',
    methodName: 'refreshAction',
    params: [
      { name: 'action', type: 'string', description: 'Acción CRUD a renderizar.' },
      { name: 'payload', type: 'object | null', description: 'Datos opcionales para el builder o el método de la entidad.' }
    ],
    returns: 'void',
    description: 'Centraliza el pintado del formulario: usa método de la entidad, formRenderer o un placeholder si falta soporte.'
  },
  {
    className: 'UIManager',
    methodName: 'renderWithBuilder',
    params: [
      { name: 'action', type: 'string', description: 'Acción a representar.' },
      { name: 'payload', type: 'object | null', description: 'Datos de precarga.' }
    ],
    returns: 'boolean',
    description: 'Invoca DOMFormTableBuilder.createForm para la acción indicada y confirma si se pudo pintar.'
  },
  {
    className: 'UIManager',
    methodName: 'getEntityFormMethod',
    params: [
      { name: 'action', type: 'string', description: 'Acción CRUD.' }
    ],
    returns: 'function | null',
    description: 'Busca en la entidad un método createForm_<ACTION> y lo devuelve ligado al contexto si existe.'
  },
  {
    className: 'UIManager',
    methodName: 'renderPlaceholder',
    params: [
      { name: 'action', type: 'string', description: 'Acción solicitada.' }
    ],
    returns: 'void',
    description: 'Muestra un bloque informativo cuando no hay builder ni método específico para la acción.'
  },
  {
    className: 'UIManager',
    methodName: 'applyFormConventions',
    params: [
      { name: 'action', type: 'string', description: 'Acción activa.' }
    ],
    returns: 'void',
    description: 'Normaliza id, clases y atributos data-action/data-entity del formulario renderizado.'
  },
  {
    className: 'UIManager',
    methodName: 'updateFormTitle',
    params: [
      { name: 'action', type: 'string', description: 'Acción actual.' }
    ],
    returns: 'void',
    description: 'Aplica la clave de idioma para el título del formulario según la entidad y la acción.'
  },
  {
    className: 'UIManager',
    methodName: 'ensureFormVisibility',
    params: [],
    returns: 'void',
    description: 'Garantiza que el contenedor del formulario esté visible.'
  },
  {
    className: 'UIManager',
    methodName: 'applyLanguage',
    params: [],
    returns: 'void',
    description: 'Reaplica las traducciones usando LanguageManager o setLang heredado.'
  },
  {
    className: 'UIManager',
    methodName: 'attachValidationHooks',
    params: [
      { name: 'action', type: 'string', description: 'Acción para la que se configuran validaciones.' }
    ],
    returns: 'void',
    description: 'Añade validaciones onblur/ onchange por campo y controla el submit para mostrar resumen de errores.'
  },
  {
    className: 'UIManager',
    methodName: 'validateFormOnSubmit',
    params: [
      { name: 'form', type: 'HTMLFormElement', description: 'Formulario activo.' },
      { name: 'action', type: 'string', description: 'Acción a validar.' }
    ],
    returns: '{ isValid: boolean, errors: Array, firstInvalidElement: HTMLElement | null }',
    description: 'Recorre campos únicos por atributo, valida y devuelve listado de códigos de error por atributo.'
  },
  {
    className: 'UIManager',
    methodName: 'validateCurrentAction',
    params: [
      { name: 'form', type: 'HTMLFormElement', description: 'Formulario renderizado.' },
      { name: 'action', type: 'string', description: 'Acción cuyo conjunto de reglas se aplica.' }
    ],
    returns: 'boolean',
    description: 'Ejecuta validaciones clásicas y personalizadas declaradas en la estructura para la acción indicada.'
  },
  {
    className: 'UIManager',
    methodName: 'validateFieldOnEvent',
    params: [
      { name: 'formElement', type: 'HTMLElement', description: 'Elemento que dispara el evento.' },
      { name: 'attributeName', type: 'string', description: 'Nombre de atributo asociado.' },
      { name: 'action', type: 'string', description: 'Acción en curso.' }
    ],
    returns: '{ isValid: boolean, errorCodes: string[] }',
    description: 'Valida un campo con Validations.validateValueAgainstRules y muestra mensajes asociados en el DOM.'
  },
  {
    className: 'UIManager',
    methodName: 'extractFieldValue',
    params: [
      { name: 'formElement', type: 'HTMLElement', description: 'Elemento del que se extraerá el valor.' },
      { name: 'attributeName', type: 'string', description: 'Atributo al que pertenece el campo.' }
    ],
    returns: 'string | Array | File | null',
    description: 'Normaliza el valor de inputs, radios, checkboxes, selects múltiples o ficheros según el tipo.'
  },
  {
    className: 'UIManager',
    methodName: 'showValidationResult',
    params: [
      { name: 'formElement', type: 'HTMLElement', description: 'Campo que se está validando.' },
      { name: 'attributeName', type: 'string', description: 'Nombre del atributo del campo.' },
      { name: 'errorCodes', type: 'Array<string>', description: 'Códigos de error devueltos por la validación.' }
    ],
    returns: 'void',
    description: 'Pinta errores o éxitos en el campo, añadiendo clases y contenedores de mensajes.'
  },
  {
    className: 'UIManager',
    methodName: 'showGlobalErrorSummary',
    params: [
      { name: 'errors', type: 'Array<{ attributeName: string, errorCodes: string[] }>', description: 'Lista de errores por atributo.' },
      { name: 'action', type: 'string', description: 'Acción cuyo formulario se valida.' }
    ],
    returns: 'void',
    description: 'Construye un modal con mensajes de error traducidos agrupados por atributo.'
  },
  {
    className: 'UIManager',
    methodName: 'hideGlobalErrorSummary',
    params: [],
    returns: 'void',
    description: 'Limpia y oculta el modal de errores globales.'
  },
  {
    className: 'UIManager',
    methodName: 'collectFormData',
    params: [
      { name: 'form', type: 'HTMLFormElement', description: 'Formulario del que se extraen los datos.' }
    ],
    returns: 'object',
    description: 'Recorre campos con data-attribute-name y devuelve un objeto atributo → valor normalizado.'
  },
  {
    className: 'UIManager',
    methodName: 'showSuccessMessage',
    params: [
      { name: 'action', type: 'string', description: 'Acción validada.' }
    ],
    returns: 'void',
    description: 'Muestra un mensaje de éxito global encima del formulario con la acción realizada.'
  },
  {
    className: 'UIManager',
    methodName: 'formatErrorCodes',
    params: [
      { name: 'errorCodes', type: 'Array<string>', description: 'Códigos devueltos por Validations.' }
    ],
    returns: 'Array<string>',
    description: 'Traduce códigos de error a mensajes usando LanguageManager cuando está disponible.'
  },
  {
    className: 'UIManager',
    methodName: 'getText',
    params: [
      { name: 'key', type: 'string', description: 'Clave de idioma.' },
      { name: 'fallbackText', type: 'string', description: 'Texto de respaldo cuando no hay traducción.' }
    ],
    returns: 'string',
    description: 'Obtiene texto traducido o devuelve el fallback si la clave no existe.'
  },
  // -----------------------
  // DOMFormTableBuilder
  // -----------------------
  {
    className: 'DOMFormTableBuilder',
    methodName: 'constructor',
    params: [
      { name: 'options', type: 'object', description: 'Clases CSS opcionales y LanguageManager a usar en formularios/tablas.' }
    ],
    returns: 'DOMFormTableBuilder',
    description: 'Configura listas de clases, gestor de idioma y opciones por defecto para formularios y tablas.'
  },
  {
    className: 'DOMFormTableBuilder',
    methodName: 'createForm',
    params: [
      { name: 'containerElement', type: 'HTMLElement', description: 'Nodo donde se renderiza el formulario.' },
      { name: 'entityStructure', type: 'object', description: 'Estructura con atributos y definición html.' },
      { name: 'action', type: 'string', description: 'Acción CRUD (ADD, EDIT, SEARCH, SHOWCURRENT).' },
      { name: 'tupleData', type: 'object', description: 'Datos para prellenar campos.' },
      { name: 'options', type: 'object', description: 'Opciones adicionales: id, clases, campos ocultos/readonly, prefijos, botones.' }
    ],
    returns: 'void',
    description: 'Genera un formulario dinámico con labels traducibles, campos y botones estándar según la acción.'
  },
  {
    className: 'DOMFormTableBuilder',
    methodName: 'createTable',
    params: [
      { name: 'containerElement', type: 'HTMLElement', description: 'Nodo donde se insertará la tabla.' },
      { name: 'entityStructure', type: 'object', description: 'Estructura que define cabeceras y etiquetas.' },
      { name: 'dataArray', type: 'Array<object>', description: 'Filas de datos a pintar.' },
      { name: 'options', type: 'object', description: 'Lista de atributos visibles, acciones y callback onActionClick.' }
    ],
    returns: 'void',
    description: 'Construye una tabla con cabeceras traducidas, filas y botones de acción con ganchos para manejadores externos.'
  },
  // -----------------------
  // Validations
  // -----------------------
  {
    className: 'Validations',
    methodName: 'constructor',
    params: [],
    returns: 'Validations',
    description: 'Inicializa el contenedor de reglas de validación básicas.'
  },
  {
    className: 'Validations',
    methodName: 'min_size',
    params: [
      { name: 'id', type: 'string', description: 'Id del elemento DOM a validar.' },
      { name: 'minsize', type: 'number', description: 'Longitud mínima permitida.' }
    ],
    returns: 'boolean',
    description: 'Comprueba que la longitud del valor no sea inferior al mínimo.'
  },
  {
    className: 'Validations',
    methodName: 'max_size',
    params: [
      { name: 'id', type: 'string', description: 'Id del elemento DOM a validar.' },
      { name: 'maxsize', type: 'number', description: 'Longitud máxima permitida.' }
    ],
    returns: 'boolean',
    description: 'Verifica que la longitud del valor no supere el máximo.'
  },
  {
    className: 'Validations',
    methodName: 'format',
    params: [
      { name: 'id', type: 'string', description: 'Id del campo a comprobar.' },
      { name: 'exprreg', type: 'RegExp | string', description: 'Expresión regular a evaluar.' }
    ],
    returns: 'boolean',
    description: 'Evalúa el valor del campo contra la expresión regular indicada.'
  },
  {
    className: 'Validations',
    methodName: 'not_exist_file',
    params: [
      { name: 'id', type: 'string', description: 'Id del input file.' }
    ],
    returns: 'boolean',
    description: 'Confirma que se ha seleccionado al menos un archivo.'
  },
  {
    className: 'Validations',
    methodName: 'max_size_file',
    params: [
      { name: 'id', type: 'string', description: 'Id del input file.' },
      { name: 'maxsize', type: 'number', description: 'Tamaño máximo admitido (bytes).' }
    ],
    returns: 'boolean',
    description: 'Comprueba que el primer fichero no supera el tamaño límite.'
  },
  {
    className: 'Validations',
    methodName: 'type_file',
    params: [
      { name: 'id', type: 'string', description: 'Id del input file.' },
      { name: 'array_tipos', type: 'Array<string>', description: 'Tipos MIME permitidos.' }
    ],
    returns: 'boolean',
    description: 'Valida que el tipo MIME del archivo esté en la lista permitida.'
  },
  {
    className: 'Validations',
    methodName: 'format_name_file',
    params: [
      { name: 'id', type: 'string', description: 'Id del input file.' },
      { name: 'exprreg', type: 'RegExp | string', description: 'Patrón aplicado al nombre del archivo.' }
    ],
    returns: 'boolean',
    description: 'Comprueba que el nombre del archivo coincide con el patrón dado.'
  },
  {
    className: 'Validations',
    methodName: 'validateValueAgainstRules',
    params: [
      { name: 'value', type: 'any', description: 'Valor a validar (string, File, array...).' },
      { name: 'rulesForAction', type: 'object', description: 'Reglas declaradas en la estructura para la acción.' },
      { name: 'options', type: 'object', description: 'Contexto opcional con attributeName, action y entityInstance.' }
    ],
    returns: '{ isValid: boolean, errorCodes: string[] }',
    description: 'Aplica reglas min/max/exp_reg y validaciones personalizadas, devolviendo códigos de error encontrados.'
  },
  // -----------------------
  // EntidadAbstracta (base)
  // -----------------------
  {
    className: 'EntidadAbstracta',
    methodName: 'constructor',
    params: [
      { name: 'esTest', type: 'string | undefined', description: 'Marca opcional para saltar acciones automáticas en modo test.' }
    ],
    returns: 'EntidadAbstracta',
    description: 'Inicializa utilidades DOM/validaciones/acceso y, salvo en modo test, muestra la gestión de entidad y lanza SEARCH.'
  },
  {
    className: 'EntidadAbstracta',
    methodName: 'cargar_formulario',
    params: [],
    returns: 'void',
    description: 'Rellena el contenedor de formulario con la versión manual o dinámica disponible para la entidad.'
  },
  {
    className: 'EntidadAbstracta',
    methodName: 'SEARCH',
    params: [],
    returns: 'Promise<void>',
    description: 'Pide datos al back para SEARCH, limpia el formulario y construye la tabla o muestra estado vacío.'
  },
  {
    className: 'EntidadAbstracta',
    methodName: 'EDIT',
    params: [],
    returns: 'Promise<void>',
    description: 'Lanza EDIT en el back; si es correcto oculta formulario y recarga resultados.'
  },
  {
    className: 'EntidadAbstracta',
    methodName: 'ADD',
    params: [],
    returns: 'Promise<void>',
    description: 'Ejecuta ADD contra el back y, si responde ok, reinicia la vista y vuelve a buscar.'
  },
  {
    className: 'EntidadAbstracta',
    methodName: 'DELETE',
    params: [],
    returns: 'Promise<void>',
    description: 'Envía DELETE y, tras éxito, limpia el formulario y refresca la búsqueda.'
  },
  {
    className: 'EntidadAbstracta',
    methodName: 'crearTablaDatos',
    params: [
      { name: 'datos', type: 'Array<object>', description: 'Filas devueltas por el back.' },
      { name: 'mostrarespeciales', type: 'Array<string>', description: 'Atributos con transformación de valor al pintar.' }
    ],
    returns: 'void',
    description: 'Añade columnas de acciones, aplica transformaciones solicitadas y delega en dom.showData para dibujar la tabla.'
  },
  {
    className: 'EntidadAbstracta',
    methodName: 'mostrarocultarcolumnas',
    params: [],
    returns: 'void',
    description: 'Alterna la visibilidad de columnas según la lista columnasamostrar.'
  },
  {
    className: 'EntidadAbstracta',
    methodName: 'modificarcolumnasamostrar',
    params: [
      { name: 'atributo', type: 'string', description: 'Nombre de la columna a añadir o quitar.' }
    ],
    returns: 'void',
    description: 'Actualiza columnasamostrar y refresca la tabla y el selector de columnas.'
  },
  // -----------------------
  // Persona (entidad ejemplo)
  // -----------------------
  {
    className: 'persona',
    methodName: 'constructor',
    params: [
      { name: 'esTest', type: 'string | undefined', description: 'Marca para evitar acciones automáticas en tests.' }
    ],
    returns: 'persona',
    description: 'Configura columnas visibles, datos dummy y lanza SEARCH salvo en modo test.'
  },
  {
    className: 'persona',
    methodName: 'getStructure',
    params: [],
    returns: 'object | null',
    description: 'Devuelve la estructura estructura_persona expuesta en window si existe.'
  },
  {
    className: 'persona',
    methodName: 'hasSpecializedTest',
    params: [
      { name: 'attributeName', type: 'string', description: 'Nombre del atributo a comprobar.' }
    ],
    returns: 'boolean',
    description: 'Indica si existe una validación especializada para el atributo (specialized_test_<atributo>).'
  },
  {
    className: 'persona',
    methodName: 'runSpecializedTest',
    params: [
      { name: 'attributeName', type: 'string', description: 'Atributo a validar.' },
      { name: 'action', type: 'string', description: 'Acción durante la que se valida.' },
      { name: 'value', type: 'any', description: 'Valor recibido desde el formulario.' }
    ],
    returns: 'boolean | string',
    description: 'Ejecuta la validación especializada del atributo si existe y devuelve true o un código de error.'
  },
  {
    className: 'persona',
    methodName: 'specialized_test_dni',
    params: [
      { name: 'action', type: 'string', description: 'Acción que dispara la validación.' },
      { name: 'valor', type: 'string', description: 'Valor de DNI/NIE recibido.' }
    ],
    returns: 'boolean | string',
    description: 'Validación personalizada de DNI/NIE delegada en personalize_dni_nie sin mostrar errores en DOM.'
  },
  {
    className: 'persona',
    methodName: 'manual_form_creation',
    params: [],
    returns: 'string',
    description: 'Genera el HTML del formulario ADD usando DOMFormTableBuilder sin botones de acción (modo legacy).'
  },
  {
    className: 'persona',
    methodName: 'getFormRenderer',
    params: [],
    returns: 'DOMFormTableBuilder',
    description: 'Devuelve el formRenderer activo (de uiManager o uno nuevo con LanguageManager global).'
  },
  {
    className: 'persona',
    methodName: 'getFormOptionsForAction',
    params: [
      { name: 'action', type: 'string', description: 'Acción CRUD.' },
      { name: 'structure', type: 'object', description: 'Estructura de persona para ajustar readonly/hidden.' }
    ],
    returns: 'object',
    description: 'Construye opciones de renderizado: id, clases, atributos de formulario y campos ocultos/solo lectura según la acción.'
  },
  {
    className: 'persona',
    methodName: 'renderActionForm',
    params: [
      { name: 'action', type: 'string', description: 'Acción a renderizar.' },
      { name: 'tupleData', type: 'object', description: 'Datos a precargar en el formulario.' }
    ],
    returns: 'HTMLFormElement | null',
    description: 'Construye el formulario para la acción indicada con DOMFormTableBuilder y aplica decoraciones adicionales.'
  },
  {
    className: 'persona',
    methodName: 'decorateForm',
    params: [
      { name: 'action', type: 'string', description: 'Acción asociada al formulario.' },
      { name: 'tupleData', type: 'object', description: 'Datos precargados, usados por ejemplo para mostrar el enlace de foto.' }
    ],
    returns: 'void',
    description: 'Muestra el contenedor, añade enlaces a foto_persona si procede y refresca traducciones.'
  },
  {
    className: 'persona',
    methodName: 'addFotoPersonaLink',
    params: [
      { name: 'tupleData', type: 'object', description: 'Tupla con posible ruta de foto_persona.' }
    ],
    returns: 'void',
    description: 'Inserta un enlace de descarga de la foto asociada en el grupo del campo de foto.'
  },
  {
    className: 'persona',
    methodName: 'personalize_dni_nie',
    params: [
      { name: 'valor', type: 'string', description: 'Valor DNI/NIE a evaluar (usa el input si se omite).' },
      { name: 'options', type: 'object', description: 'Permite desactivar la escritura de errores en el DOM.' }
    ],
    returns: 'boolean | string',
    description: 'Valida formato y letra de DNI o NIE devolviendo true o un código de error localizado.'
  },
  {
    className: 'persona',
    methodName: 'personalize_dni_format',
    params: [
      { name: 'valor', type: 'string', description: 'Valor a comprobar (usa el input dni si no se pasa).' },
      { name: 'options', type: 'object', description: 'Permite mostrar u ocultar errores en DOM.' }
    ],
    returns: 'boolean | string',
    description: 'Comprueba que el DNI cumpla el patrón numérico y de letra final.'
  },
  {
    className: 'persona',
    methodName: 'personalize_nie_format',
    params: [
      { name: 'valor', type: 'string', description: 'Valor a comprobar (usa el input dni si no se pasa).' },
      { name: 'options', type: 'object', description: 'Permite mostrar u ocultar errores en DOM.' }
    ],
    returns: 'boolean | string',
    description: 'Valida el patrón de NIE con prefijo X/Y/Z, dígitos y letra final.'
  },
  {
    className: 'persona',
    methodName: 'personalize_validate_dni',
    params: [
      { name: 'dni', type: 'string', description: 'Valor de DNI con 8 dígitos y letra.' }
    ],
    returns: 'boolean',
    description: 'Calcula la letra mediante módulo 23 y la compara con la letra suministrada.'
  },
  {
    className: 'persona',
    methodName: 'personalize_validate_nie',
    params: [
      { name: 'nie', type: 'string', description: 'Valor NIE a validar.' }
    ],
    returns: 'boolean',
    description: 'Convierte el prefijo X/Y/Z a número y delega en personalize_validate_dni.'
  },
  {
    className: 'persona',
    methodName: 'createForm_EDIT',
    params: [
      { name: 'fila', type: 'object', description: 'Tupla a editar.' }
    ],
    returns: 'void',
    description: 'Renderiza el formulario EDIT con datos de la fila seleccionada.'
  },
  {
    className: 'persona',
    methodName: 'createForm_DELETE',
    params: [
      { name: 'fila', type: 'object', description: 'Tupla a eliminar.' }
    ],
    returns: 'void',
    description: 'Renderiza el formulario DELETE mostrando los datos en modo lectura.'
  },
  {
    className: 'persona',
    methodName: 'createForm_SHOWCURRENT',
    params: [
      { name: 'fila', type: 'object', description: 'Tupla a consultar.' }
    ],
    returns: 'void',
    description: 'Renderiza el formulario SHOWCURRENT deshabilitando todos los campos.'
  },
  {
    className: 'persona',
    methodName: 'createForm_ADD',
    params: [],
    returns: 'void',
    description: 'Renderiza el formulario ADD vacío.'
  },
  {
    className: 'persona',
    methodName: 'createForm_SEARCH',
    params: [],
    returns: 'void',
    description: 'Renderiza el formulario SEARCH vacío.'
  },
  {
    className: 'persona',
    methodName: 'SEARCH',
    params: [
      { name: 'formValues', type: 'object | null', description: 'Filtros opcionales (si no se pasan, se leen del formulario).' }
    ],
    returns: 'Array<object>',
    description: 'Filtra el dataset dummy con los filtros recibidos, guarda los resultados y pinta la tabla.'
  },
  {
    className: 'persona',
    methodName: 'collectSearchFormValues',
    params: [],
    returns: 'object',
    description: 'Recolecta valores de los campos SEARCH teniendo en cuenta radios, checkboxes y selects múltiples.'
  },
  {
    className: 'persona',
    methodName: 'filterDummyData',
    params: [
      { name: 'filters', type: 'object', description: 'Mapa atributo → filtro introducido.' }
    ],
    returns: 'Array<object>',
    description: 'Devuelve las filas del dataset dummy que cumplen todos los filtros indicados.'
  },
  {
    className: 'persona',
    methodName: 'matchesFilter',
    params: [
      { name: 'recordValue', type: 'any', description: 'Valor de la fila a comparar.' },
      { name: 'filterValue', type: 'any', description: 'Filtro introducido por la persona usuaria.' }
    ],
    returns: 'boolean',
    description: 'Evalúa si un valor cumple el filtro, contemplando arrays, cadenas vacías y coincidencias parciales.'
  },
  {
    className: 'persona',
    methodName: 'renderSearchResults',
    params: [
      { name: 'results', type: 'Array<object>', description: 'Filas a mostrar en la tabla de resultados.' }
    ],
    returns: 'void',
    description: 'Pinta la tabla de resultados con DOMFormTableBuilder y configura botones SHOWCURRENT/EDIT.'
  },
  {
    className: 'persona',
    methodName: 'mostrarcambioatributo',
    params: [
      { name: 'atributo', type: 'string', description: 'Nombre del atributo cuyo valor se transforma.' },
      { name: 'valorentrada', type: 'string', description: 'Valor original.' }
    ],
    returns: 'string',
    description: 'Formatea fechaNacimiento_persona o añade enlace de descarga a foto_persona al mostrar en tabla.'
  },
  {
    className: 'persona',
    methodName: 'ADD_dni_validation',
    params: [],
    returns: 'boolean | string',
    description: 'Validación específica de dni en alta: tamaño fijo, formato DNI/NIE y letra correcta.'
  },
  {
    className: 'persona',
    methodName: 'ADD_nombre_persona_validation',
    params: [],
    returns: 'boolean | string',
    description: 'Comprueba tamaño y formato alfabético del nombre en alta.'
  },
  {
    className: 'persona',
    methodName: 'ADD_nuevo_foto_persona_validation',
    params: [],
    returns: 'boolean | string',
    description: 'Exige fichero en alta, valida tamaño máximo, tipo JPEG y patrón del nombre.'
  },
  {
    className: 'persona',
    methodName: 'ADD_titulacion_persona_validation',
    params: [],
    returns: 'boolean | string',
    description: 'Valida que la titulación seleccionada sea PCEO (regla específica del ejemplo).'
  },
  {
    className: 'persona',
    methodName: 'ADD_menu_persona_validation',
    params: [],
    returns: 'boolean | string',
    description: 'Requiere que el menú seleccionado coincida con los valores permitidos.'
  },
  {
    className: 'persona',
    methodName: 'ADD_genero_persona_validation',
    params: [],
    returns: 'boolean | string',
    description: 'Comprueba que el género elegido está entre Masculino/Femenino/Otro.'
  },
  {
    className: 'persona',
    methodName: 'ADD_apellidos_persona_validation',
    params: [],
    returns: 'boolean | string',
    description: 'Valida tamaño y formato de apellidos (letras y espacios).'
  },
  {
    className: 'persona',
    methodName: 'ADD_fechaNacimiento_persona_validation',
    params: [],
    returns: 'boolean | string',
    description: 'Exige formato DD/MM/YYYY y comprueba que la fecha exista.'
  },
  {
    className: 'persona',
    methodName: 'ADD_direccion_persona_validation',
    params: [],
    returns: 'boolean | string',
    description: 'Comprueba tamaño mínimo/máximo de la dirección.'
  },
  {
    className: 'persona',
    methodName: 'ADD_telefono_persona_validation',
    params: [],
    returns: 'boolean | string',
    description: 'Valida longitud exacta de 9 dígitos y patrón numérico.'
  },
  {
    className: 'persona',
    methodName: 'ADD_email_persona_validation',
    params: [],
    returns: 'boolean | string',
    description: 'Aplica tamaños y expresión regular de email estándar.'
  },
  {
    className: 'persona',
    methodName: 'ADD_foto_persona_validation',
    params: [],
    returns: 'boolean | string',
    description: 'Comprueba tamaño máximo del nombre de archivo subido.'
  },
  {
    className: 'persona',
    methodName: 'ADD_submit_persona',
    params: [],
    returns: 'boolean',
    description: 'Ejecuta las validaciones clave del alta (dni, nombre, foto, titulación) y devuelve el resultado global.'
  },
  {
    className: 'persona',
    methodName: 'EDIT_submit_persona',
    params: [],
    returns: 'boolean',
    description: 'Valida nombre y fichero en edición reutilizando reglas ADD donde procede.'
  },
  {
    className: 'persona',
    methodName: 'SEARCH_dni_validation',
    params: [],
    returns: 'boolean | string',
    description: 'Validación de búsqueda para dni: permite vacío, tamaño máximo y patrón flexible de DNI/NIE.'
  },
  {
    className: 'persona',
    methodName: 'SEARCH_nombre_persona_validation',
    params: [],
    returns: 'boolean | string',
    description: 'Valida longitud máxima del nombre en búsquedas.'
  },
  {
    className: 'persona',
    methodName: 'SEARCH_apellidos_persona_validation',
    params: [],
    returns: 'boolean | string',
    description: 'Valida longitud máxima de apellidos en búsquedas.'
  },
  {
    className: 'persona',
    methodName: 'SEARCH_fechaNacimiento_persona_validation',
    params: [],
    returns: 'boolean | string',
    description: 'Si se informa, exige formato DD/MM/YYYY en búsqueda.'
  },
  {
    className: 'persona',
    methodName: 'SEARCH_direccion_persona_validation',
    params: [],
    returns: 'boolean | string',
    description: 'Valida longitud máxima de dirección en búsqueda.'
  },
  {
    className: 'persona',
    methodName: 'SEARCH_telefono_persona_validation',
    params: [],
    returns: 'boolean | string',
    description: 'Valida longitud máxima de teléfono en búsqueda.'
  },
  {
    className: 'persona',
    methodName: 'SEARCH_email_persona_validation',
    params: [],
    returns: 'boolean | string',
    description: 'Valida longitud máxima de email en búsqueda.'
  },
  // -----------------------
  // Gestión de idioma
  // -----------------------
  {
    className: 'LanguageManager',
    methodName: 'constructor',
    params: [
      { name: 'options', type: 'object', description: 'Idioma por defecto, diccionarios de traducción y mensajes de error.' }
    ],
    returns: 'LanguageManager',
    description: 'Crea un gestor de idioma con diccionarios cargados y listas de traducciones registradas.'
  },
  {
    className: 'LanguageManager',
    methodName: 'getActiveLanguage',
    params: [],
    returns: 'string',
    description: 'Obtiene el idioma actual desde memoria o cookie, usando el valor por defecto como respaldo.'
  },
  {
    className: 'LanguageManager',
    methodName: 'setLanguage',
    params: [
      { name: 'langCode', type: 'string', description: 'Código de idioma (ES, EN, ...).' }
    ],
    returns: 'string',
    description: 'Actualiza el idioma activo, reaplica traducciones registradas y notifica listeners.'
  },
  {
    className: 'LanguageManager',
    methodName: 'registerTranslationElement',
    params: [
      { name: 'element', type: 'HTMLElement', description: 'Elemento a traducir dinámicamente.' },
      { name: 'key', type: 'string', description: 'Clave de traducción.' },
      { name: 'fallbackText', type: 'string', description: 'Texto de respaldo si no hay traducción.' },
      { name: 'property', type: 'string', description: 'Propiedad a actualizar (textContent por defecto).' }
    ],
    returns: 'void',
    description: 'Registra un elemento para que se traduzca automáticamente cuando cambia el idioma.'
  },
  {
    className: 'LanguageManager',
    methodName: 'refreshRegisteredTranslations',
    params: [],
    returns: 'void',
    description: 'Elimina referencias rotas y reaplica traducciones a todos los elementos registrados.'
  },
  {
    className: 'LanguageManager',
    methodName: 'onLanguageChange',
    params: [
      { name: 'callback', type: 'function', description: 'Función a ejecutar al cambiar el idioma.' }
    ],
    returns: 'void',
    description: 'Permite suscribirse a cambios de idioma.'
  },
  {
    className: 'LanguageManager',
    methodName: 'getText',
    params: [
      { name: 'key', type: 'string', description: 'Clave de traducción solicitada.' }
    ],
    returns: 'string',
    description: 'Devuelve el texto traducido para la clave o la propia clave si no existe traducción.'
  },
  {
    className: 'LanguageManager',
    methodName: 'getErrorMessage',
    params: [
      { name: 'errorCode', type: 'string', description: 'Código de error a traducir.' }
    ],
    returns: 'string',
    description: 'Busca el mensaje de error localizado; si no existe, recurre a textos comunes o añade sufijo de idioma.'
  },
  {
    className: 'setLang (global)',
    methodName: 'setLang',
    params: [
      { name: 'lang', type: 'string', description: 'Código de idioma para la cookie y el recálculo de textos.' }
    ],
    returns: 'void',
    description: 'Función global que selecciona idioma, guarda cookie y recorre el DOM actualizando textos.'
  },
  {
    className: 'setLang (global)',
    methodName: 'cambiarLang',
    params: [
      { name: 'lang', type: 'string', description: 'Nuevo idioma a fijar.' }
    ],
    returns: 'void',
    description: 'Actualiza la cookie de idioma y recarga la página para aplicar el cambio.'
  },
  {
    className: 'setLang (global)',
    methodName: 'setCookie',
    params: [
      { name: 'name', type: 'string', description: 'Nombre de la cookie.' },
      { name: 'value', type: 'string', description: 'Valor a guardar.' },
      { name: 'days', type: 'number', description: 'Días de duración.' }
    ],
    returns: 'void',
    description: 'Crea una cookie con opciones de seguridad y duración indicadas.'
  },
  {
    className: 'setLang (global)',
    methodName: 'getCookie',
    params: [
      { name: 'name', type: 'string', description: 'Nombre de la cookie a leer.' }
    ],
    returns: 'string | null',
    description: 'Recupera el valor de la cookie solicitada o null si no existe.'
  }
];

if (typeof window !== 'undefined') {
  window.apiDocData = apiDocData;
}

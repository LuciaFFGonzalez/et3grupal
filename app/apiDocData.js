const apiDocData = [
  {
    className: 'EntidadAbstracta',
    methodName: 'constructor',
    params: [
      { name: 'esTest', type: "string | undefined" }
    ],
    returns: 'EntidadAbstracta',
    description: 'Inicializa utilidades comunes (DOM, validaciones, acceso externo) y, salvo en modo test, lanza la vista de búsqueda inicial.'
  },
  {
    className: 'EntidadAbstracta',
    methodName: 'cargar_formulario',
    params: [],
    returns: 'void',
    description: 'Rellena el contenedor de formulario usando la versión manual o dinámica disponible para la entidad.'
  },
  {
    className: 'EntidadAbstracta',
    methodName: 'SEARCH',
    params: [],
    returns: 'Promise<void>',
    description: 'Envía la acción SEARCH al back, refresca el formulario y muestra la tabla de resultados o el estado vacío.'
  },
  {
    className: 'EntidadAbstracta',
    methodName: 'EDIT',
    params: [],
    returns: 'Promise<void>',
    description: 'Lanza la acción EDIT y, si es correcta, limpia el formulario, oculta el modal y recarga los datos.'
  },
  {
    className: 'EntidadAbstracta',
    methodName: 'ADD',
    params: [],
    returns: 'Promise<void>',
    description: 'Gestiona la petición ADD y, cuando se completa con éxito, reinicia el formulario y actualiza la tabla.'
  },
  {
    className: 'EntidadAbstracta',
    methodName: 'DELETE',
    params: [],
    returns: 'Promise<void>',
    description: 'Ejecuta la acción DELETE sobre la entidad actual y vuelve a pintar la tabla tras la respuesta.'
  },
  {
    className: 'EntidadAbstracta',
    methodName: 'crearTablaDatos',
    params: [
      { name: 'datos', type: 'Array<Object>' },
      { name: 'mostrarespeciales', type: 'Array<string>' }
    ],
    returns: 'void',
    description: 'Añade acciones CRUD a cada fila, aplica transformaciones especiales y dibuja la tabla dinámica en pantalla.'
  },
  {
    className: 'EntidadAbstracta',
    methodName: 'mostrarocultarcolumnas',
    params: [],
    returns: 'void',
    description: 'Alterna la visibilidad de columnas de la tabla según la lista de columnas seleccionadas por la persona usuaria.'
  },
  {
    className: 'EntidadAbstracta',
    methodName: 'modificarcolumnasamostrar',
    params: [
      { name: 'atributo', type: 'string' }
    ],
    returns: 'void',
    description: 'Añade o quita atributos del selector de columnas y actualiza inmediatamente la tabla renderizada.'
  },
  {
    className: 'GeneralUIManager',
    methodName: 'constructor',
    params: [
      { name: 'defaultLanguage', type: 'string' }
    ],
    returns: 'GeneralUIManager',
    description: 'Crea el gestor general de interfaz configurando el idioma por defecto y un LanguageManager asociado.'
  },
  {
    className: 'GeneralUIManager',
    methodName: 'initDefaultLanguage',
    params: [
      { name: 'language', type: 'string | undefined' }
    ],
    returns: 'void',
    description: 'Selecciona el idioma inicial invocando el LanguageManager o la función global de idioma existente.'
  },
  {
    className: 'GeneralUIManager',
    methodName: 'renderTeamData',
    params: [
      { name: 'containerId', type: 'string' }
    ],
    returns: 'void',
    description: 'Construye dinámicamente la tabla de integrantes del equipo a partir de def_datos_NombreEquipo.'
  },
  {
    className: 'GeneralUIManager',
    methodName: 'hideInitialSections',
    params: [],
    returns: 'void',
    description: 'Oculta zonas iniciales de la interfaz para evitar mostrar paneles vacíos antes de cargar una entidad.'
  },
  {
    className: 'UIManager',
    methodName: 'loadEntity',
    params: [
      { name: 'entityName', type: 'string' }
    ],
    returns: 'void',
    description: 'Instancia la entidad solicitada, recupera su estructura y refresca la vista de búsqueda.'
  },
  {
    className: 'UIManager',
    methodName: 'instantiateEntity',
    params: [
      { name: 'entityName', type: 'string' }
    ],
    returns: 'object',
    description: 'Busca la clase concreta de la entidad en window y, si no existe, crea un fallback genérico con estructura base.'
  },
  {
    className: 'UIManager',
    methodName: 'resolveStructure',
    params: [
      { name: 'entityName', type: 'string' },
      { name: 'entityInstance', type: 'object' }
    ],
    returns: 'object',
    description: 'Prioriza la estructura expuesta por la entidad y, si no está disponible, usa el registro general o un stub vacío.'
  },
  {
    className: 'UIManager',
    methodName: 'refreshAction',
    params: [
      { name: 'action', type: 'string' },
      { name: 'payload', type: 'object | null' }
    ],
    returns: 'void',
    description: 'Centraliza el refresco de vistas CRUD, utilizando métodos de la entidad, el form builder o un placeholder.'
  },
  {
    className: 'UIManager',
    methodName: 'renderWithBuilder',
    params: [
      { name: 'action', type: 'string' },
      { name: 'payload', type: 'object | null' }
    ],
    returns: 'boolean',
    description: 'Invoca DOMFormTableBuilder para pintar el formulario de la acción indicada y confirma si se pudo renderizar.'
  },
  {
    className: 'UIManager',
    methodName: 'attachValidationHooks',
    params: [
      { name: 'action', type: 'string' }
    ],
    returns: 'void',
    description: 'Vincula validaciones por campo y por submit al formulario activo según las reglas de la estructura cargada.'
  },
  {
    className: 'UIManager',
    methodName: 'validateFormOnSubmit',
    params: [
      { name: 'form', type: 'HTMLFormElement' },
      { name: 'action', type: 'string' }
    ],
    returns: 'object',
    description: 'Evalúa todos los campos marcados con data-attribute-name, acumulando errores y el primer elemento inválido.'
  },
  {
    className: 'UIManager',
    methodName: 'validateFieldOnEvent',
    params: [
      { name: 'formElement', type: 'HTMLElement' },
      { name: 'attributeName', type: 'string' },
      { name: 'action', type: 'string' }
    ],
    returns: 'object',
    description: 'Extrae el valor del campo, lo valida con Validations y muestra los códigos de error asociados al atributo.'
  },
  {
    className: 'UIManager',
    methodName: 'extractFieldValue',
    params: [
      { name: 'formElement', type: 'HTMLElement' },
      { name: 'attributeName', type: 'string' }
    ],
    returns: 'string | Array | File | null',
    description: 'Obtiene el valor normalizado para inputs, select múltiple, radio, checkbox o campos de fichero.'
  },
  {
    className: 'UIManager',
    methodName: 'collectFormData',
    params: [
      { name: 'form', type: 'HTMLFormElement' }
    ],
    returns: 'object',
    description: 'Recorre los campos con data-attribute-name y construye un objeto listo para enviar o registrar.'
  },
  {
    className: 'DOMFormTableBuilder',
    methodName: 'constructor',
    params: [
      { name: 'options', type: 'object' }
    ],
    returns: 'DOMFormTableBuilder',
    description: 'Permite configurar clases CSS y un LanguageManager para aplicar traducciones a formularios y tablas.'
  },
  {
    className: 'DOMFormTableBuilder',
    methodName: 'createForm',
    params: [
      { name: 'containerElement', type: 'HTMLElement' },
      { name: 'entityStructure', type: 'object' },
      { name: 'action', type: 'string' },
      { name: 'tupleData', type: 'object' }
    ],
    returns: 'void',
    description: 'Genera un formulario completo para la entidad y acción indicadas, incluyendo botones de submit y reset/cancelar.'
  },
  {
    className: 'DOMFormTableBuilder',
    methodName: 'createTable',
    params: [
      { name: 'containerElement', type: 'HTMLElement' },
      { name: 'entityStructure', type: 'object' },
      { name: 'dataArray', type: 'Array<object>' }
    ],
    returns: 'void',
    description: 'Construye una tabla HTML con cabeceras traducibles y celdas de acción placeholder para editar, ver y borrar.'
  },
  {
    className: 'Validations',
    methodName: 'min_size',
    params: [
      { name: 'id', type: 'string' },
      { name: 'minsize', type: 'number' }
    ],
    returns: 'boolean',
    description: 'Comprueba que la longitud del valor del campo no sea inferior al mínimo indicado.'
  },
  {
    className: 'Validations',
    methodName: 'max_size',
    params: [
      { name: 'id', type: 'string' },
      { name: 'maxsize', type: 'number' }
    ],
    returns: 'boolean',
    description: 'Verifica que la longitud del campo no exceda el máximo permitido.'
  },
  {
    className: 'Validations',
    methodName: 'format',
    params: [
      { name: 'id', type: 'string' },
      { name: 'exprreg', type: 'RegExp | string' }
    ],
    returns: 'boolean',
    description: 'Evalúa el valor del elemento contra una expresión regular proporcionada.'
  },
  {
    className: 'Validations',
    methodName: 'not_exist_file',
    params: [
      { name: 'id', type: 'string' }
    ],
    returns: 'boolean',
    description: 'Indica si se ha seleccionado al menos un archivo en el input de tipo file.'
  },
  {
    className: 'Validations',
    methodName: 'max_size_file',
    params: [
      { name: 'id', type: 'string' },
      { name: 'maxsize', type: 'number' }
    ],
    returns: 'boolean',
    description: 'Comprueba que el fichero adjuntado no supera el tamaño máximo (bytes) configurado.'
  },
  {
    className: 'Validations',
    methodName: 'type_file',
    params: [
      { name: 'id', type: 'string' },
      { name: 'array_tipos', type: 'Array<string>' }
    ],
    returns: 'boolean',
    description: 'Valida que el tipo MIME del fichero esté incluido en la lista de tipos permitidos.'
  },
  {
    className: 'Validations',
    methodName: 'format_name_file',
    params: [
      { name: 'id', type: 'string' },
      { name: 'exprreg', type: 'RegExp | string' }
    ],
    returns: 'boolean',
    description: 'Chequea que el nombre del archivo cumpla el patrón indicado por la expresión regular.'
  },
  {
    className: 'Validations',
    methodName: 'validateValueAgainstRules',
    params: [
      { name: 'value', type: 'any' },
      { name: 'rulesForAction', type: 'object' }
    ],
    returns: '{ isValid: boolean, errorCodes: Array<string> }',
    description: 'Normaliza reglas de validación del atributo y devuelve los códigos de error encontrados para el valor dado.'
  },
  {
    className: 'LanguageManager',
    methodName: 'setLanguage',
    params: [
      { name: 'langCode', type: 'string' }
    ],
    returns: 'string',
    description: 'Actualiza el idioma activo, refresca traducciones registradas y notifica a los observadores.'
  },
  {
    className: 'LanguageManager',
    methodName: 'registerTranslationElement',
    params: [
      { name: 'element', type: 'HTMLElement' },
      { name: 'key', type: 'string' },
      { name: 'fallbackText', type: 'string' },
      { name: 'property', type: 'string' }
    ],
    returns: 'void',
    description: 'Asocia un elemento DOM a una clave de traducción para que se actualice automáticamente al cambiar de idioma.'
  },
  {
    className: 'LanguageManager',
    methodName: 'refreshRegisteredTranslations',
    params: [],
    returns: 'void',
    description: 'Limpia referencias rotas y reaplica las traducciones a todos los elementos registrados.'
  },
  {
    className: 'LanguageManager',
    methodName: 'getText',
    params: [
      { name: 'key', type: 'string' }
    ],
    returns: 'string',
    description: 'Devuelve la traducción de la clave solicitada usando el idioma activo con fallback al idioma por defecto.'
  },
  {
    className: 'LanguageManager',
    methodName: 'getErrorMessage',
    params: [
      { name: 'errorCode', type: 'string' }
    ],
    returns: 'string',
    description: 'Obtiene el texto de error localizado o, si no existe, genera un código con sufijo de idioma como respaldo.'
  },
  {
    className: 'LanguageManager',
    methodName: 'onLanguageChange',
    params: [
      { name: 'callback', type: 'function' }
    ],
    returns: 'void',
    description: 'Registra callbacks que se ejecutarán cada vez que el idioma cambie.'
  }
];

if (typeof window !== 'undefined') {
  window.apiDocData = apiDocData;
}

var textos_EN = {

	// textos titulos generales
        'text_titulo_app': 'IU ET2 Interface',
        'text_titulo_menu': 'Menu Options',
        'text_titulo_pie': 'Footer',
    'label_seleccioncolumnas': 'Select columns ',
    'text_article_section': 'Main section',
    'text_team_data_title': 'Team data',
    'text_api_link_label': 'API',
    'text_api_link_title': 'API documentation',
    
    // textos de test
    /*'res_estructura_tests':'Tabla verificacion estructura de test',
	'resultadodef':'formato correcto estructura definicion tests',
	'res_estructura_pruebas':'Tabla verificacion estructura de pruebas',
	'resultadoprueba':'formato correcto estructura pruebas',
	'res_pruebas':'Tabla ejecución de pruebas',
	'resultadotest':'Resultado ejecucion pruebas',
    */

    // textos menu
        'text_menu_persona': 'Person Management',
        'text_menu_gestionar_persona': 'Manage person',
        'text_menu_producto': 'Manage product',

    // textos entidad persona
        'text_titulo_page_persona' : 'Personal Data Management',
    'text_contenido_titulo_form_persona_ADD': 'Personal Data ADD Form',
	'text_contenido_titulo_form_persona_EDIT': 'Personal Data EDIT Form',
	'text_contenido_titulo_form_persona_DELETE': 'Personal Data DELETE Form',
	'text_contenido_titulo_form_persona_SHOWCURRENT': 'Personal Data SHOWCURRENT Form',
    'text_contenido_titulo_form_persona_SEARCH': 'Personal Data SEARCH Form',

	// atributos
	'dni': 'Identification',
    'nombre_persona': 'First Name',
    'apellidos_persona': 'Last Name',
    'fechaNacimiento_persona': 'Date of Birth',
    'direccion_persona': 'Address',
    'telefono_persona': 'Phone',
    'email_persona': 'Email',
    'foto_persona': 'Photo',

	// labels
	'label_dni': 'Identification',
	'label_nombre_persona': 'First Name',
	'label_apellidos_persona': 'Last Name',
	'label_fechaNacimiento_persona': 'Date of Birth',
        'label_direccion_persona': 'Address',
        'label_telefono_persona': 'Phone',
        'label_email_persona': 'Email',
        'label_foto_persona': 'Photo',
        'label_nuevo_foto_persona': 'New Photo',
        'label_menu_persona': 'Menu',
        'label_genero_persona': 'Gender',
        'label_Vegano': 'Vegan',
        'label_Celiaco': 'Celiac',
        'label_AlergiaMarisco': 'Seafood allergy',
        'label_Masculino': 'Male',
        'label_Femenino': 'Female',
        'label_Otro': 'Other',

	// errores validaciones formulario
	// ADD/EDIT

	// dni
	'dni_min_size_KO':'ID number too short. Must have 8 numbers and 1 alphabetical character',
    'dni_max_size_KO':'ID number too long. Must have 8 numbers and 1 alphabetical character',
    'dni_format_KO':'Incorrect ID/foreign ID format. ID number 8 digits 1 letter, foreign ID number 1 letter 7 digits 1 letter',
    // nombre_persona
    'nombre_persona_min_size_KO':'Name too short. Must have more than 4 alphabetical characters',
    'nombre_persona_max_size_KO':'Name too long. Must have less than 15 alphabetic characters',
    'nombre_persona_format_KO':'Incorrect name. Only alphabetic characters are allowed',

    // apellidos_persona
    'apellidos_persona_min_size_KO': 'Last name too short. Must have more than 4 alphabetic characters or spaces',
    'apellidos_persona_max_size_KO': 'Last name too long. Must have less than 20 alphabetic characters or spaces',
    'apellidos_persona_format_KO': 'Last name incorrect. Only alphabetic characters and spaces are allowed',

    //fechaNacimiento_persona
    'fechaNacimiento_persona_format_KO': 'Date is incorrect. Must be in dd/mm/yyyy format',
    'fechaNacimiento_persona_valid_KO': 'Date is invalid. The date must exist',

        // dirección persona
        'direccion_persona_min_size_KO': 'Address is too short. It must have at least 5 characters',
        'direccion_persona_max_size_KO': 'Address is too long. It must have fewer than 200 characters',

        // telefono persona
        'telefono_persona_min_size_KO': 'Phone number is too short. It must have 9 digits',
        'telefono_persona_max_size_KO': 'Phone number is too long. It must have 9 digits',
        'telefono_persona_format_KO': 'Incorrect phone number. Only 9 digits are allowed',


        // email persona
        'email_persona_min_size_KO': 'Email is too short. Please include user and domain',
        'email_persona_max_size_KO':'Email is too long. Maximum 60 characters',
        'email_persona_format_KO':'Incorrect email. It must follow the user@domain format',

        // nuevo foto persona
        'nuevo_foto_persona_not_exist_file_KO':'The file does not exist. A photo in jpg format must be uploaded.',
        'nuevo_foto_persona_max_size_file_KO':'The file exceeds the allowed size (2MB)',
        'nuevo_foto_persona_type_file_KO':'File type not allowed. Only JPG or PNG',
        'nuevo_foto_persona_format_name_file_KO':'Invalid filename. Use letters, numbers and .jpg or .png extension',
        'nuevo_foto_persona_min_size_KO':'Filename is too short',
        'nuevo_foto_persona_max_size_KO':'Filename is too long',

        //SEARCH
        // foto persona
        'foto_persona_max_size_KO':'Photo path is too long',
        'foto_persona_format_KO':'Invalid photo format',

        // enumerados
        'menu_persona_valor_KO':'You must choose a valid menu option',
        'genero_persona_valor_KO':'You must choose a valid gender option',
	

	//errores acciones
	'RECORDSET_VACIO' : 'There are not results for your search',
	'dni_es_nulo_KO':'DNI can not be empty',

        'admin_no_se_puede_modificar_KO':'El admin no se puede modificar',

        // textos entidad producto
        'text_titulo_page_producto' : 'Product Management',
        'text_contenido_titulo_form_producto_ADD': 'Product ADD Form',
        'text_contenido_titulo_form_producto_EDIT': 'Product EDIT Form',
        'text_contenido_titulo_form_producto_DELETE': 'Product DELETE Form',
        'text_contenido_titulo_form_producto_SHOWCURRENT': 'Product SHOWCURRENT Form',
        'text_contenido_titulo_form_producto_SEARCH': 'Product SEARCH Form',

    // textos interfaz genérica
    'ui.placeholder.action': 'Render {action} for {entity}.',
    'ui.placeholder.info': 'Dynamic structures will be used when available.',
    'ui.placeholder.entity.unnamed': 'unnamed entity',
    'validation.action.error.title': 'Errors found while validating action {action}.',
    'validation.form.success': 'Form is valid for action {action}.',

    // tabla de resultados
    'table.actions.header': 'Actions',
    'table.empty.message': 'No results',
    'action.add.button': 'Add',
    'action.edit.button': 'Edit',
    'action.delete.button': 'Delete',
    'action.search.button': 'Search',
    'action.showcurrent.button': 'Show detail',
    'action.showcurrent.table.button': 'View',
    'action.edit.table.button': 'Edit',
    'action.search.reset.button': 'Clear',
    'action.cancel.button': 'Cancel',

    // tabla datos equipo
    'team.data.empty': 'No team data available.',
    'team.data.header.entrega': 'Delivery',
    'team.data.header.nombre': 'Name',
    'team.data.header.dni': 'ID',
    'team.data.header.horas': 'Hours',

    // textos enumerados
    'form.persona.menu_persona.option.Vegano': 'Vegan',
    'form.persona.menu_persona.option.Celiaco': 'Celiac',
    'form.persona.menu_persona.option.AlergiaMarisco': 'Seafood allergy',
    'form.persona.genero_persona.option.Masculino': 'Male',
    'form.persona.genero_persona.option.Femenino': 'Female',
    'form.persona.genero_persona.option.Otro': 'Other',

    // errores personalizados faltantes
    'dni_validate_KO': 'The ID number is not valid.',
    'nie_validate_KO': 'The foreign ID is not valid.',
    'dni_nie_format_KO': 'Identification format is incorrect.',
    'nie_format_KO': 'Incorrect foreign ID format. It must start with X, Y or Z followed by 7 digits and one letter.',

        // atributos producto
        'codigo_producto': 'Code',
        'nombre_producto': 'Name',
        'descripcion_producto': 'Description',

        // labels producto
        'label_codigo_producto': 'Product code',
        'label_nombre_producto': 'Product name',
        'label_descripcion_producto': 'Product description',

}
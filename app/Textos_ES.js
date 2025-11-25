var textos_ES = {

	// textos titulos generales
        'text_titulo_app': 'Interfaz ET2 IU',
        'text_titulo_menu': 'Opciones  Menú',
        'text_titulo_pie': 'Pie de página',
    'label_seleccioncolumnas': 'Seleccionar columnas',
    'text_article_section': 'Sección principal',
    'text_team_data_title': 'Datos del equipo',
    'text_api_link_label': 'API',
    'text_api_link_title': 'Documentación API',

    // textos de test
    /*'res_estructura_tests':'Tabla verificacion estructura de test',
	'resultadodef':'formato correcto estructura definicion tests',
	'res_estructura_pruebas':'Tabla verificacion estructura de pruebas',
	'resultadoprueba':'formato correcto estructura pruebas',
	'res_pruebas':'Tabla ejecución de pruebas',
	'resultadotest':'Resultado ejecucion pruebas',
    */

    // textos menu
        'text_menu_persona': 'Gestionar persona',
        'text_menu_gestionar_persona': 'Gestionar persona',
        'text_menu_producto': 'Gestionar producto',

    // textos entidad persona
        'text_titulo_page_persona' : 'Gestión de Datos Personales',
    'text_contenido_titulo_form_persona_ADD': 'Formulario Alta Datos Personales',
	'text_contenido_titulo_form_persona_EDIT': 'Formulario Modificación Datos Personales',
	'text_contenido_titulo_form_persona_DELETE': 'Formulario Eliminación Datos Personales',
	'text_contenido_titulo_form_persona_SHOWCURRENT': 'Formulario Detalle Datos Persona',
	'text_contenido_titulo_form_persona_SEARCH': 'Formulario Búsqueda Datos Persona',

	// atributos
	'dni': 'Identificación',
	'nombre_persona': 'Nombre',
	'apellidos_persona': 'Apellidos',
	'fechaNacimiento_persona': 'Fecha Nacimiento',
	'direccion_persona': 'Dirección',
	'telefono_persona': 'Teléfono',
	'email_persona': 'Correo Electrónico',
	'foto_persona': 'Foto',

	// labels
	'label_dni': 'Identificación',
	'label_nombre_persona': 'Nombre',
	'label_apellidos_persona': 'Apellidos',
	'label_fechaNacimiento_persona': 'Fecha Nacimiento',
        'label_direccion_persona': 'Dirección',
        'label_telefono_persona': 'Teléfono',
        'label_email_persona': 'Correo Electrónico',
        'label_foto_persona': 'Foto',
        'label_nuevo_foto_persona': 'Nueva Foto',
        'label_menu_persona': 'Menú',
        'label_genero_persona': 'Género',
        'label_Vegano': 'Vegano',
        'label_Celiaco': 'Celíaco',
        'label_AlergiaMarisco': 'Alergia Marisco',
        'label_Masculino': 'Masculino',
        'label_Femenino': 'Femenino',
        'label_Otro': 'Otro',

	// errores validaciones formulario
	// ADD/EDIT

	// dni
	'dni_min_size_KO':'Dni demasiado corto. Debe tener 8 números y 1 caracter alfabético',
	'dni_max_size_KO':'DNI demasiado largo. Debe tener 8 números y 1 caracter alfabético',
	'dni_format_KO':'Formato dni/nie no correcto. DNI 8digitos1letra, NIE 1letra7digitos1letra',
	// nombre_persona
	'nombre_persona_min_size_KO':'Nombre demasiado corto. Debe tener mas de 4 caracteres alfabéticos',
	'nombre_persona_max_size_KO':'Nombre demasiado largo. Debe tener menos de 15 caracteres alfabéticos',
	'nombre_persona_format_KO':'Nombre no correcto. Solo se permiten alfabéticos',

	// apellidos persona
        'apellidos_persona_min_size_KO': 'Apellidos demasiado corto. Debe tener mas de 4 caracteres alfabéticos o espacios',
        'apellidos_persona_max_size_KO': 'Apellidos demasiado largo. Debe tener menos de 20 caracteres alfabéticos o espacios',
        'apellidos_persona_format_KO': 'Apellidos no correcto. Solo se permiten alfabéticos y espacios',

        //fecha nacimiento persona
        'fechaNacimiento_persona_format_KO': 'Fecha no correcta. Debe tener el formato dd/mm/aaaa',
        'fechaNacimiento_persona_valid_KO': 'Fecha no válida. La fecha debe existir',

        // dirección persona
        'direccion_persona_min_size_KO': 'Dirección demasiado corta. Debe tener al menos 5 caracteres',
        'direccion_persona_max_size_KO': 'Dirección demasiado larga. Debe tener menos de 200 caracteres',

        // telefono persona
        'telefono_persona_min_size_KO': 'Teléfono demasiado corto. Debe tener 9 dígitos',
        'telefono_persona_max_size_KO': 'Teléfono demasiado largo. Debe tener 9 dígitos',
        'telefono_persona_format_KO': 'Teléfono incorrecto. Solo se permiten 9 dígitos',

        // email persona
        'email_persona_min_size_KO': 'Correo demasiado corto. Debe incluir usuario y dominio',
        'email_persona_max_size_KO':'Correo demasiado largo. Máximo 60 caracteres',
        'email_persona_format_KO':'Correo electrónico incorrecto. Debe tener el formato usuario@dominio',

        // nuevo foto persona
        'nuevo_foto_persona_not_exist_file_KO':'El fichero no existe. Debe subir una foto',
        'nuevo_foto_persona_max_size_file_KO':'El fichero supera el tamaño máximo permitido (2MB)',
        'nuevo_foto_persona_type_file_KO':'Tipo de fichero no permitido. Solo JPG o PNG',
        'nuevo_foto_persona_format_name_file_KO':'Nombre de fichero incorrecto. Usa letras, números y extensión .jpg o .png',
        'nuevo_foto_persona_min_size_KO':'El nombre del fichero es demasiado corto',
        'nuevo_foto_persona_max_size_KO':'El nombre del fichero es demasiado largo',

        //SEARCH
        // foto persona
        'foto_persona_max_size_KO':'La ruta de la foto es demasiado larga',
        'foto_persona_format_KO':'Formato de foto no válido',

        // enumerados
        'menu_persona_valor_KO':'Debe seleccionar un valor válido de menú',
        'genero_persona_valor_KO':'Debe seleccionar un género válido',
	

	//errores acciones
	'RECORDSET_VACIO' : 'No hay coincidencias para la búsqueda',
	'dni_es_nulo_KO':'El dni no puede ser vacio',

        'admin_no_se_puede_modificar_KO':'El admin no se puede modificar',

        // textos entidad producto
        'text_titulo_page_producto' : 'Gestión de Productos',
        'text_contenido_titulo_form_producto_ADD': 'Formulario Alta Producto',
        'text_contenido_titulo_form_producto_EDIT': 'Formulario Modificación Producto',
        'text_contenido_titulo_form_producto_DELETE': 'Formulario Eliminación Producto',
        'text_contenido_titulo_form_producto_SHOWCURRENT': 'Formulario Detalle Producto',
        'text_contenido_titulo_form_producto_SEARCH': 'Formulario Búsqueda Producto',

    // textos interfaz genérica
    'ui.placeholder.action': 'Render {action} para {entity}.',
    'ui.placeholder.info': 'Se usarán las estructuras dinámicas cuando estén disponibles.',
    'ui.placeholder.entity.unnamed': 'entidad sin nombre',
    'validation.action.error.title': 'Se han encontrado errores al validar la acción {action}.',
    'validation.form.success': 'Formulario válido para la acción {action}.',

    // tabla de resultados
    'table.actions.header': 'Acciones',
    'table.empty.message': 'No hay resultados',
    'action.add.button': 'Añadir',
    'action.edit.button': 'Editar',
    'action.delete.button': 'Eliminar',
    'action.search.button': 'Buscar',
    'action.showcurrent.button': 'Ver detalle',
    'action.showcurrent.table.button': 'Ver',
    'action.edit.table.button': 'Editar',
    'action.search.reset.button': 'Limpiar',
    'action.cancel.button': 'Cancelar',

    // tabla datos equipo
    'team.data.empty': 'No hay datos del equipo disponibles.',
    'team.data.header.entrega': 'Entrega',
    'team.data.header.nombre': 'Nombre',
    'team.data.header.dni': 'DNI',
    'team.data.header.horas': 'Horas',

    // textos enumerados
    'form.persona.menu_persona.option.Vegano': 'Vegano',
    'form.persona.menu_persona.option.Celiaco': 'Celíaco',
    'form.persona.menu_persona.option.AlergiaMarisco': 'Alergia Marisco',
    'form.persona.genero_persona.option.Masculino': 'Masculino',
    'form.persona.genero_persona.option.Femenino': 'Femenino',
    'form.persona.genero_persona.option.Otro': 'Otro',

    // errores personalizados faltantes
    'dni_validate_KO': 'El DNI no es válido.',
    'nie_validate_KO': 'El NIE no es válido.',
    'dni_nie_format_KO': 'Formato de identificación incorrecto.',
    'nie_format_KO': 'Formato NIE incorrecto. Debe empezar por X, Y o Z seguido de 7 dígitos y una letra.',

        // atributos producto
        'codigo_producto': 'Código',
        'nombre_producto': 'Nombre',
        'descripcion_producto': 'Descripción',

        // labels producto
        'label_codigo_producto': 'Código de producto',
        'label_nombre_producto': 'Nombre del producto',
        'label_descripcion_producto': 'Descripción del producto',

}
class persona extends EntidadAbstracta{

        constructor(esTest){
                super(esTest);
		

		//definicion de atributos a mostrarn en la tabla de muestra de tuplas al entrar en la gestion de la entidad
		this.columnasamostrar = ['dni','titulacion_persona', 'menu_persona','genero_persona'];
		//definicion de atributos a cambiar su visualización
		this.mostrarespecial = ['fechaNacimiento_persona','foto_persona'];

                // definicion de los atributos del formulario (Necesario para test de unidad)
                this.attributes = [  'dni',
                                'nombre_persona',
                                'apellidos_persona',
                                'fechaNacimiento_persona',
                                'direccion_persona',
                                'telefono_persona',
                                'email_persona',
                                'foto_persona',
                                'nuevo_foto_persona'
                            ];

                this.personasDummy = [
                        {
                                dni: '00000000A',
                                nombre_persona: 'Ada',
                                apellidos_persona: 'Lovelace',
                                fechaNacimiento_persona: '1815-12-10',
                                direccion_persona: '10 Downing St',
                                telefono_persona: '600000001',
                                email_persona: 'ada@example.com',
                                titulacion_persona: 'MIA',
                                menu_persona: ['Vegano'],
                                genero_persona: 'Femenino',
                                foto_persona: 'ada.png',
                                nuevo_foto_persona: '',
                        },
                        {
                                dni: '12345678Z',
                                nombre_persona: 'Grace',
                                apellidos_persona: 'Hopper',
                                fechaNacimiento_persona: '1906-12-09',
                                direccion_persona: 'Naval Base',
                                telefono_persona: '600000002',
                                email_persona: 'grace@example.com',
                                titulacion_persona: 'GREI',
                                menu_persona: ['Celiaco'],
                                genero_persona: 'Femenino',
                                foto_persona: 'grace.jpg',
                                nuevo_foto_persona: '',
                        },
                        {
                                dni: '87654321X',
                                nombre_persona: 'Alan',
                                apellidos_persona: 'Turing',
                                fechaNacimiento_persona: '1912-06-23',
                                direccion_persona: 'Bletchley Park',
                                telefono_persona: '600000003',
                                email_persona: 'alan@example.com',
                                titulacion_persona: 'MEI',
                                menu_persona: ['Vegano', 'Celiaco'],
                                genero_persona: 'Masculino',
                                foto_persona: 'alan.jpg',
                                nuevo_foto_persona: '',
                        },
                        {
                                dni: '24681357Y',
                                nombre_persona: 'Linus',
                                apellidos_persona: 'Torvalds',
                                fechaNacimiento_persona: '1969-12-28',
                                direccion_persona: 'Helsinki',
                                telefono_persona: '600000004',
                                email_persona: 'linus@example.com',
                                titulacion_persona: 'GRIA',
                                menu_persona: ['AlergiaMarisco'],
                                genero_persona: 'Masculino',
                                foto_persona: 'linus.png',
                                nuevo_foto_persona: '',
                        },
                        {
                                dni: '13572468W',
                                nombre_persona: 'Katherine',
                                apellidos_persona: 'Johnson',
                                fechaNacimiento_persona: '1918-08-26',
                                direccion_persona: 'Virginia',
                                telefono_persona: '600000005',
                                email_persona: 'katherine@example.com',
                                titulacion_persona: 'PCEO',
                                menu_persona: ['Vegano'],
                                genero_persona: 'Femenino',
                                foto_persona: 'katherine.jpg',
                                nuevo_foto_persona: '',
                        }
                ];

                this.lastSearchResults = [];

                if (esTest !== 'test') {
                        this.SEARCH();
                }

                // TODO: añadir getStructure() en la fase de entidades de ejemplo (Fase 5) para exponer la estructura ET3.

        }

        getStructure(){
                return (typeof estructura_persona !== 'undefined') ? estructura_persona : null;
        }

        hasSpecializedTest(attributeName) {
                const methodName = `specialized_test_${attributeName}`;
                return typeof this[methodName] === 'function';
        }

        runSpecializedTest(attributeName, action, value) {
                const methodName = `specialized_test_${attributeName}`;
                if (typeof this[methodName] !== 'function') {
                        return true;
                }
                return this[methodName](action, value);
        }

        specialized_test_dni(action, valor) {
                return this.personalize_dni_nie(valor, { showDomErrors: false });
        }

	/**
	 * replace the content of section element with a particular entity menu
	 * @returns 
	 */
	manual_form_creation(){
		var form_content = `
			<form id = 'form_iu' action="" method="POST" enctype="multipart/form-data" onsubmit="" class='formulario'>

				<label class="label_dni">dni</label>
				<input type='text' id='dni' name='dni'></input>
				<span id="span_error_dni"><a id="error_dni"></a></span>
				<br>
				
				<label class="label_nombre_persona">Nombre de pila</label>
				<input type='text' id='nombre_persona' name='nombre_persona' ></input>
				<span id="span_error_nombre_persona" ><a id="error_nombre_persona"></a></span>
				<br>
				
				<label class="label_apellidos_persona">apellidos</label>
				<input type='text' id='apellidos_persona' name='apellidos_persona'></input>
				<span id="span_error_apellidos_persona" ><a id="error_apellidos_persona"></a></span>
				<br>
				
				<label class="label_fechaNacimiento_persona">Fecha de Nacimiento</label>
				<input type='text' id='fechaNacimiento_persona' name='fechaNacimiento_persona'></input>
				<span id="span_error_fechaNacimiento_persona" ><a id="error_fechaNacimiento_persona"></a></span>
				
				<br>
				<label class="label_direccion_persona">Dirección Postal</label>
				<textarea rows="5" cols="33" type='text' id='direccion_persona' name='direccion_persona'></textarea>
				<span id="span_error_direccion_persona" ><a id="error_direccion_persona"></a></span>
				<br>

				<label class="label_telefono_persona">Teléfono Persona</label>
				<input type='text' id='telefono_persona' name='telefono_persona'></input>
				<span id="span_error_telefono_persona" ><a id="error_telefono_persona"></a></span>
				
				<br>
				<label class="label_email_persona">Correo Electronico</label>
				<input type='text' id='email_persona' name='email_persona'></input>
				<span id="span_error_email_persona" ><a id="error_email_persona"></a></span>

				<br>
				<label class="label_titulacion_persona">Titulación</label>
				<select id="titulacion_persona" name='titulacion_persona'>
					<option value="GREI">GREI</option>
					<option value="GRIA">GRIA</option>
					<option value="MEI">MEI</option>
					<option value="MIA">MIA</option>
					<option value="PCEO">PCEO</option>
				</select>
				<span id="span_error_titulacion_persona" ><a id="error_titulacion_persona"></a></span>

				<br>
				<label id="label_menu_persona" class="label_menu_persona">Menu </label>

				<div class="checkbox_group">
					<input type="checkbox" name = "menu_persona" value="Vegano" /> 
					<label id='label_Vegano' class="label_Vegano">Vegano</label>
				</div>

				<div class="checkbox_group">
					<input type="checkbox" name = "menu_persona" value="Celiaco" />
					<label id='label_Celiaco' class="label_Celiaco">Celiaco</label>
				</div>

				<div class="checkbox_group">
					<input type="checkbox" name = "menu_persona" value="AlergiaMarisco" /> 
					<label id='label_AlergiaMarisco' class="label_AlergiaMarisco">Alergia Marisco</label> 
				</div>
				<span id="span_error_menu_persona" ><a id="error_menu_persona"></a></span>

				<br>
				<label id="label_genero_persona" class="label_genero_persona">Genero </label>
				
				<div class="checkbox_group">
					<input type="radio" name = "genero_persona" value="Masculino" /> 
					<label id='label_Masculino' class="label_Masculino">Masculino</label>
				</div>

				<div class="checkbox_group">
					<input type="radio" name = "genero_persona" value="Femenino" /> 
					<label id='label_Femenino' class="label_Femenino">Femenino</label>
				</div>

				<div class="checkbox_group">
					<input type="radio" name = "genero_persona" value="Otro" /> 
					<label id='label_Otro' class="label_Otro">Otro</label>
				</div>

				<span id="span_error_genero_persona" ><a id="error_genero_persona"></a></span>

				<br>
				<label id="label_foto_persona" class="label_foto_persona">Foto Persona</label>
				<input type='text' id='foto_persona' name='foto_persona'></input>
				<span id="span_error_foto_persona"><a id="error_foto_persona"></a></span>
				<a id="link_foto_persona" href="http://193.147.87.202/ET2/filesuploaded/files_foto_persona/"><img src="./iconos/FILE.png" /></a>
				
				<label id="label_nuevo_foto_persona" class="label_nuevo_foto_persona">Nueva Foto Persona</label>
				<input type='file' id='nuevo_foto_persona' name='nuevo_foto_persona'></input>
				<span id="span_error_nuevo_foto_persona"><a id="error_nuevo_foto_persona"></a></span>
				<br>

			</form>
		`;
		return form_content;
		
	}

	/**********************************************************************************************
		fields validations for ADD
	***********************************************************************************************/

	/** 
		
		@param 
		@return
			{string} Error code of field value (fieldname_validationfunction_KO) 
			or
			{bool} true due the field value is correct

	*/
	ADD_dni_validation(){
		
		if (!(this.validations.min_size('dni',9))){
			this.dom.mostrar_error_campo('dni','dni_min_size_KO');
			return "dni_min_size_KO";
		}
		if (!(this.validations.max_size('dni',9))){
			this.dom.mostrar_error_campo('dni','dni_max_size_KO');
			return "dni_max_size_KO";
		}
				
		var resp = this.personalize_dni_nie();
		if (!(resp === true)){
			this.dom.mostrar_error_campo('dni',resp);
			return resp;
		}
		
		this.dom.mostrar_exito_campo('dni');
		return true;

	}

	/**
		
		@param 
		@return
			{string} Error code of field value (fieldname_validationfunction_KO) 
			or
			{bool} true due the field value is correct

	*/

	ADD_nombre_persona_validation(){
		
		if (!(this.validations.min_size('nombre_persona',4))){
			this.dom.mostrar_error_campo('nombre_persona','nombre_persona_min_size_KO');
			return "nombre_persona_min_size_KO";
		}
		if (!(this.validations.max_size('nombre_persona',15))){
			this.dom.mostrar_error_campo('nombre_persona','nombre_persona_max_size_KO');
			return "nombre_persona_max_size_KO";
		}
		// allowed format aA to zZ letter
		if (!(this.validations.format('nombre_persona', '^[A-Za-z]*$'))){
			this.dom.mostrar_error_campo('nombre_persona','nombre_persona_format_KO');
			return "nombre_persona_format_KO";
		}
		this.dom.mostrar_exito_campo('nombre_persona');
		return true;
	}

	ADD_nuevo_foto_persona_validation(){

		if (!(this.validations.not_exist_file('nuevo_foto_persona'))){
			this.dom.mostrar_error_campo('nuevo_foto_persona','nuevo_foto_persona_not_exist_file_KO');
			return "nuevo_foto_persona_not_exist_file_KO";
		}
		if (!(this.validations.max_size_file('nuevo_foto_persona',2000000))){
			this.dom.mostrar_error_campo('nuevo_foto_persona','nuevo_foto_persona_max_size_file_KO');
			return "nuevo_foto_persona_max_size_file_KO";
		}
		if (!(this.validations.type_file('nuevo_foto_persona',['image/jpeg']))){
			this.dom.mostrar_error_campo('nuevo_foto_persona','nuevo_foto_persona_type_file_KO');
			return "nuevo_foto_persona_type_file_KO";
		}
		if (!(this.validations.format_name_file('nuevo_foto_persona','[a-zA-Z.]'))){
			this.dom.mostrar_error_campo('nuevo_foto_persona','nuevo_foto_persona_format_name_file_KO');
			return "nuevo_foto_persona_format_name_file_KO";
		}
		this.dom.mostrar_exito_campo('nuevo_foto_persona');
		return true;


	}

	/**
		
		@param 
		@return
			{bool} true if all field validations are correct or false if any field validation is false

	*/
	ADD_submit_persona(){

		let result = (
					(this.ADD_dni_validation()) &
					(this.ADD_nombre_persona_validation()) &
					(this.ADD_nuevo_foto_persona_validation()) &
					(this.ADD_titulacion_persona_validation())
					)
		
		result = Boolean(result);
		
		return result;	


	}

	EDIT_nombre_persona_validation(){

		return this.ADD_nombre_persona_validation();

	}

	EDIT_nuevo_foto_persona_validation(){

		if (!(this.validations.not_exist_file('nuevo_foto_persona'))){
			this.dom.mostrar_exito_campo('nuevo_foto_persona');
			return true;
		}
		if (!(this.validations.max_size_file('nuevo_foto_persona',2000))){
			this.dom.mostrar_error_campo('nuevo_foto_persona','nuevo_foto_persona_max_size_file_KO');
			return "nuevo_foto_persona_max_size_file_KO";
		}
		if (!(this.validations.type_file('nuevo_foto_persona',['image/jpeg']))){
			this.dom.mostrar_error_campo('nuevo_foto_persona','nuevo_foto_persona_type_file_KO');
			return "nuevo_foto_persona_type_file_KO";
		}
		if (!(this.validations.format_name_file('nuevo_foto_persona','[a-zA-Z.]'))){
			this.dom.mostrar_error_campo('nuevo_foto_persona','nuevo_foto_persona_format_name_file_KO');
			return "nuevo_foto_persona_format_name_file_KO";
		}
		this.dom.mostrar_exito_campo('nuevo_foto_persona');
		return true;


	}

	/**
		
		@param 
		@return
			{bool} true if all field validations are correct or false if any field validation is false

	*/
	EDIT_submit_persona(){

		let result = (
					(this.EDIT_nombre_persona_validation()) &
					(this.EDIT_nuevo_foto_persona_validation())
					)
		
		result = Boolean(result);
		
		return result;	


	}

	/**
	 * 
	 * test dni format in the regular expression
	 * @param {string} 
	 * @return {bool} true is regular expression is satified false otherwise  
	 * */ 

        personalize_dni_nie(valor, { showDomErrors = true } = {}){

                const dni = valor ?? document.getElementById('dni')?.value ?? '';
                const dniFormatResult = this.personalize_dni_format(dni, { showDomErrors });
                if (dniFormatResult === true){
                        if (!(this.personalize_validate_dni(dni))){
                                if (showDomErrors && this.dom?.mostrar_error_campo){
                                        this.dom.mostrar_error_campo('dni','dni_validate_KO');
                                }
                                return "dni_validate_KO";
                        }
                }
                else{
                        const nieFormatResult = this.personalize_nie_format(dni, { showDomErrors });
                        if (nieFormatResult === true){
                                        if (!(this.personalize_validate_nie(dni))){
                                                if (showDomErrors && this.dom?.mostrar_error_campo){
                                                        this.dom.mostrar_error_campo('dni','nie_validate_KO');
                                                }
                                                return "nie_validate_KO";
                                        }
                        }
                        else{
                                return "dni_nie_format_KO";
                        }
                }

                return true;

        }
	/**
	 * get dni as parameter, split letter and numbers, calculate
	 * %23 from number to obtain corresponding letter and compares with letter in dni value
	 * 
	 * @param dni value
	 * @returns true if dni is valid false otherwise
	 */
        personalize_dni_format(valor, { showDomErrors = true } = {}){

                const dniValue = valor ?? document.getElementById('dni')?.value ?? '';
                if (!(/^[0-9]{8}[A-Z]$/.test(dniValue))){
                        if (showDomErrors && this.dom?.mostrar_error_campo){
                                this.dom.mostrar_error_campo('dni','dni_format_KO');
                        }
                        return "dni_format_KO";
                }
                return true;

        }

        personalize_nie_format(valor, { showDomErrors = true } = {}){
                const nieValue = valor ?? document.getElementById('dni')?.value ?? '';
                if (!(/^[XYZ][0-9]{7}[A-Z]$/.test(nieValue))){
                        if (showDomErrors && this.dom?.mostrar_error_campo){
                                this.dom.mostrar_error_campo('dni','nie_format_KO');
                        }
                        return "nie_format_KO";
                }
                return true;
        }
        personalize_validate_dni(dni){

                var dni_letters = "TRWAGMYFPDXBNJZSQVHLCKE";
        var letter = dni_letters.charAt( parseInt( dni, 10 ) % 23 );

        return letter == dni.charAt(8);
        }

	/**
	 * get nie as parameter, split firts letter, calculate
	 * the number from this letter and create dni for validating in 
	 * personalizate method
	 * 
	 * @param nie value
	 * @returns true if nie is valid false otherwise
	 */
	personalize_validate_nie(nie){
		
		//var nie = document.getElementById('dni').value;
		// Change the initial letter for the corresponding number and validate as DNI
		var nie_prefix = nie.charAt( 0 );

		switch (nie_prefix) {
		case 'X': nie_prefix = 0; break;
		case 'Y': nie_prefix = 1; break;
		case 'Z': nie_prefix = 2; break;
		}

		return this.personalize_validate_dni( nie_prefix + nie.substr(1) );
	
	}

	createForm_EDIT(fila){

		// limpiar poner titulo y poner visible el formulario
		document.getElementById('contenedor_IU_form').innerHTML = this.manual_form_creation();
		this.dom.show_element('Div_IU_form','block');

		this.dom.remove_class_value('class_contenido_titulo_form', 'text_contenido_titulo_form');
		this.dom.assign_class_value('class_contenido_titulo_form', 'text_contenido_titulo_form_persona_EDIT');

		// rellenar onsubmit y action
		this.dom.assign_property_value('form_iu','onsubmit','return entidad.EDIT_submit_'+this.nombreentidad);
		this.dom.assign_property_value('form_iu', 'action', 'javascript:entidad.EDIT();');

		//activar el link al fichero
		this.dom.assign_property_value('link_foto_persona', 'href', 'http://193.147.87.202/ET2/filesuploaded/files_foto_persona/'+fila.foto_persona);
		
		// modificar presentacion (en este caso concreto para fecha)
		fila.fechaNacimiento_persona = this.mostrarcambioatributo('fechaNacimiento_persona',fila.fechaNacimiento_persona);

		// rellenar valores
		this.dom.rellenarvaloresform(fila);
		
		// poner las validaciones
		this.dom.colocarvalidaciones('form_iu','EDIT');

		// poner inactivos los campos correspondientes
		this.dom.assign_property_value('dni','readonly','true');
		this.dom.assign_property_value('foto_persona','readonly','true');

		// colocar boton de submit
		this.dom.colocarboton('EDIT');

		setLang();

	}

	createForm_DELETE(fila){

		// limpiar y poner visible el formulario
		document.getElementById('contenedor_IU_form').innerHTML = this.manual_form_creation();
	
		this.dom.show_element('Div_IU_form','block');
		this.dom.remove_class_value('class_contenido_titulo_form','text_contenido_titulo_form');
		this.dom.assign_class_value('class_contenido_titulo_form', 'text_contenido_titulo_form_persona_DELETE');

		// rellenar y action
		this.dom.assign_property_value('form_iu', 'action', 'javascript:entidad.DELETE();');

		// poner no visible el campo nuevo_foto_persona (solo se puede ver el nombre de fichero)
		this.dom.hide_element_form('nuevo_foto_persona');
		this.dom.assign_property_value('link_foto_persona', 'href', 'http://193.147.87.202/ET2/filesuploaded/files_foto_persona/'+fila.foto_persona);
		
		// modificar presentacion (en este caso concreto para fecha)
		fila.fechaNacimiento_persona = this.mostrarcambioatributo('fechaNacimiento_persona',fila.fechaNacimiento_persona);

		// rellenar valores
		this.dom.rellenarvaloresform(fila);

		// poner inactivos los campos correspondientes
		this.dom.colocartodosreadonly('form_iu');

		// colocar boton de submit
		this.dom.colocarboton('DELETE');

		setLang();
	}

	createForm_SHOWCURRENT(fila){
		// limpiar y poner visible el formulario
		document.getElementById('contenedor_IU_form').innerHTML = this.manual_form_creation();
		this.dom.show_element('Div_IU_form','block');
		this.dom.remove_class_value('class_contenido_titulo_form', 'text_contenido_titulo_form');
		this.dom.assign_class_value('class_contenido_titulo_form', 'text_contenido_titulo_form_persona_SHOWCURRENT');

		// rellenar y action
		//this.dom.assign_property_value('form_iu', 'action', 'javascript:entidad.DELETE();');

		// poner no visible el campo nuevo_foto_persona (solo se puede ver el nombre de fichero)
		this.dom.hide_element_form('nuevo_foto_persona');
		this.dom.assign_property_value('link_foto_persona', 'href', 'http://193.147.87.202/ET2/filesuploaded/files_foto_persona/'+fila.foto_persona);
		
		// modificar presentacion (en este caso concreto para fecha)
		fila.fechaNacimiento_persona = this.mostrarcambioatributo('fechaNacimiento_persona',fila.fechaNacimiento_persona);

		// rellenar valores
		this.dom.rellenarvaloresform(fila);

		// poner inactivos los campos correspondientes
		this.dom.colocartodosreadonly('form_iu');

		// colocar boton de submit
		//this.colocarboton('SHOWCURRENT');

		setLang();

	}

	createForm_ADD(){

		// poner titulo al formulario

		// limpiar y poner visible el formulario
		document.getElementById('contenedor_IU_form').innerHTML = this.manual_form_creation();
		this.dom.show_element('Div_IU_form','block');
		this.dom.remove_class_value('class_contenido_titulo_form', 'text_contenido_titulo_form');
		this.dom.assign_class_value('class_contenido_titulo_form', 'text_contenido_titulo_form_persona_ADD');

		// poner onsubmit
		this.dom.assign_property_value('form_iu','onsubmit','return entidad.ADD_submit_'+this.nombreentidad+'()');

		// poner action
		this.dom.assign_property_value('form_iu', 'action', 'javascript:entidad.ADD();');
		
		// poner no visible el campo foto_persona (solo se puede subir fichero)
		this.dom.hide_element_form('foto_persona');
		this.dom.hide_element('link_foto_persona');

		// rellenar valores
		// en ADD no hay valores que rellenar

		// poner las validaciones
		this.dom.colocarvalidaciones('form_iu','ADD');

		// poner inactivos los campos correspondientes
		// en ADD no hay inactivos... si hubiese un autoincremental ya no se mostraria

		// colocar boton de submit
		this.dom.colocarboton('ADD');

		setLang();
	}

        createForm_SEARCH(){
                const container = document.getElementById('contenedor_IU_form');
                if (!container) return;

                const formBuilder = window.uiManager?.formRenderer
                        || new DOMFormTableBuilder({ languageManager: window.generalUIManager?.languageManager });

                const structure = this.getStructure?.() || window['estructura_persona'] || {};

                formBuilder.createForm(container, structure, 'SEARCH', {});

                const form = container.querySelector('form');
                if (form) {
                        form.id = 'form_iu';
                        form.classList.add('formulario');
                }

                const titleSpan = document.getElementById('class_contenido_titulo_form');
                if (titleSpan) {
                        const titleKey = 'text_contenido_titulo_form_persona_SEARCH';
                        titleSpan.className = `${titleKey} text_titulo_formulario`;
                        const translatedTitle = window.generalUIManager?.languageManager?.getText?.(titleKey) || '';
                        titleSpan.textContent = translatedTitle;
                        window.generalUIManager?.languageManager?.registerTranslationElement?.(titleSpan, titleKey, translatedTitle);
                }

                const wrapper = document.getElementById('Div_IU_form');
                if (wrapper) {
                        wrapper.style.display = 'block';
                }

                const activeLang = window.generalUIManager?.languageManager?.getActiveLanguage?.() || 'ES';
                if (window.generalUIManager?.languageManager?.setLang) {
                        window.generalUIManager.languageManager.setLang(activeLang);
                } else if (typeof setLang === 'function') {
                        setLang(activeLang);
                }
        }

        buildSearchField(attributeName, definition = {}) {
                const html = definition.html || {};
                const tag = (html.tag || 'input').toLowerCase();
                const inputClass = 'form-control';

                if (tag === 'textarea') {
                        const textarea = document.createElement('textarea');
                        textarea.id = attributeName;
                        textarea.name = attributeName;
                        textarea.rows = html.rows || 4;
                        textarea.cols = html.columns || 40;
                        textarea.className = inputClass;
                        textarea.setAttribute('data-attribute-name', attributeName);
                        return textarea;
                }

                if (tag === 'select') {
                        const select = document.createElement('select');
                        select.id = attributeName;
                        select.name = attributeName;
                        if (html.multiple) select.multiple = true;
                        select.className = inputClass;
                        select.setAttribute('data-attribute-name', attributeName);

                        (html.options || []).forEach((optionValue) => {
                                const option = document.createElement('option');
                                option.value = optionValue;
                                option.className = `label_${optionValue}`;
                                option.textContent = optionValue;
                                select.appendChild(option);
                        });

                        return select;
                }

                if (tag === 'radio') {
                        const group = document.createElement('div');
                        group.className = 'radio-group';
                        (html.options || []).forEach((optionValue, index) => {
                                const wrapper = document.createElement('div');
                                wrapper.className = 'radio-item';
                                const input = document.createElement('input');
                                input.type = 'radio';
                                input.name = attributeName;
                                input.id = index === 0 ? attributeName : `${attributeName}_${index}`;
                                input.setAttribute('data-attribute-name', attributeName);
                                input.value = optionValue;

                                const label = document.createElement('label');
                                label.htmlFor = input.id;
                                label.className = `label_${optionValue}`;
                                label.textContent = optionValue;

                                wrapper.appendChild(input);
                                wrapper.appendChild(label);
                                group.appendChild(wrapper);
                        });
                        return group;
                }

                if (tag === 'checkbox') {
                        const group = document.createElement('div');
                        group.className = 'checkbox-group';
                        const options = html.multiple ? html.options || [] : [definition.label || attributeName];

                        options.forEach((optionValue, index) => {
                                const wrapper = document.createElement('div');
                                wrapper.className = 'checkbox-item';
                                const input = document.createElement('input');
                                input.type = 'checkbox';
                                input.name = attributeName;
                                input.id = index === 0 ? attributeName : `${attributeName}_${index}`;
                                input.value = optionValue;
                                input.setAttribute('data-attribute-name', attributeName);

                                const label = document.createElement('label');
                                label.htmlFor = input.id;
                                label.className = `label_${optionValue}`;
                                label.textContent = optionValue;

                                wrapper.appendChild(input);
                                wrapper.appendChild(label);
                                group.appendChild(wrapper);
                        });
                        return group;
                }

                const input = document.createElement('input');
                input.type = html.type || 'text';
                input.id = attributeName;
                input.name = attributeName;
                input.className = inputClass;
                if (html.component_visible_size) {
                        input.size = html.component_visible_size;
                }
                input.setAttribute('data-attribute-name', attributeName);
                return input;
        }

        SEARCH(formValues = null){
                if (!Array.isArray(this.personasDummy)) {
                        this.lastSearchResults = [];
                        return this.lastSearchResults;
                }

                const filters = formValues || this.collectSearchFormValues();
                const results = this.filterDummyData(filters);
                this.lastSearchResults = results;
                this.renderSearchResults(results);
                return results;
        }

        collectSearchFormValues(){
                const form = document.querySelector('#contenedor_IU_form form');
                const structure = this.getStructure?.() || window['estructura_persona'] || {};
                const attributes = structure.attributes || {};
                const data = {};

                Object.keys(attributes).forEach((attributeName) => {
                        const elements = form?.querySelectorAll(`[data-attribute-name="${attributeName}"]`);
                        if (!elements || elements.length === 0) {
                                return;
                        }

                        const first = elements[0];
                        if (first.type === 'radio') {
                                const checked = Array.from(elements).find((el) => el.checked);
                                data[attributeName] = checked ? checked.value : '';
                                return;
                        }

                        if (first.type === 'checkbox') {
                                data[attributeName] = Array.from(elements)
                                        .filter((el) => el.checked)
                                        .map((el) => el.value);
                                return;
                        }

                        if (first.tagName === 'SELECT' && first.multiple) {
                                data[attributeName] = Array.from(first.selectedOptions).map((opt) => opt.value);
                                return;
                        }

                        data[attributeName] = first.value ?? '';
                });

                return data;
        }

        filterDummyData(filters = {}){
                const dataset = Array.isArray(this.personasDummy) ? this.personasDummy : [];
                return dataset.filter((registro) => {
                        return Object.entries(filters).every(([key, filterValue]) => this.matchesFilter(registro[key], filterValue));
                });
        }

        matchesFilter(recordValue, filterValue){
                if (filterValue === undefined || filterValue === null) return true;
                if (Array.isArray(filterValue)){
                        if (filterValue.length === 0) return true;
                        if (Array.isArray(recordValue)){
                                return filterValue.every((value) => recordValue.includes(value));
                        }
                        return false;
                }
                if (filterValue === '') return true;
                const normalizedFilter = String(filterValue).toLowerCase();
                if (Array.isArray(recordValue)){
                        return recordValue.some((value) => String(value).toLowerCase().includes(normalizedFilter));
                }
                if (recordValue === undefined || recordValue === null) return false;
                return String(recordValue).toLowerCase().includes(normalizedFilter);
        }

        renderSearchResults(results = []){
                const container = document.getElementById('IU_manage_table');
                if (!container) return;

                const builder = window.uiManager?.formRenderer
                        || new DOMFormTableBuilder({ languageManager: window.generalUIManager?.languageManager });
                const structure = this.getStructure?.() || window['estructura_persona'] || {};
                const visibleAttributes = Object.keys(structure.attributes || {}).filter((attr) => attr !== 'nuevo_foto_persona');

                builder.createTable(container, structure, results, {
                        visibleAttributes,
                        actions: ['SHOWCURRENT', 'EDIT'],
                        onActionClick: (action, rowIndex, rowData) => {
                                if (action === 'SHOWCURRENT') {
                                        window.uiManager?.refreshShowCurrentView?.(rowData);
                                }
                                if (action === 'EDIT') {
                                        window.uiManager?.refreshEditView?.(rowData);
                                }
                        },
                });

                container.style.display = 'block';
        }

	/**
	 * modifica el formato de visualización de un atributo concreto y se devuelve el valor modificado
	 * en el caso de solicitar cambio de formato para un atributo no implementado se lanza una alerta
	 * 
	 * @param {String} atributo string con el nombre del atributo a modificar su valor
	 * @param {String} valorentrada string con el valor de entrada a modificar
	 * @returns 
	 */
	mostrarcambioatributo(atributo, valorentrada){
		
		switch (atributo){
			case 'fechaNacimiento_persona':
				var elementos = valorentrada.split('-');

				var day = elementos[2];
				var month = elementos[1];
				var year = elementos[0];
				
				return day+'/'+month+'/'+year;
				break;
			case 'foto_persona':
				var link = 'error';
				if (valorentrada !== ''){
					link = valorentrada+`  <a class="link_foto_persona" href="http://193.147.87.202/ET2/filesuploaded/files_foto_persona/`+valorentrada+`"><img src="./iconos/FILE.png" /></a>`;
				}
				return link;
				break;
			case 'default':
				alert('no existe mostrar especial para ese atributo');
				break;
		}

	}




	

	//
	//ADD
	//
	//ADD_dni_validation(){return true;}
	//ADD_nombre_persona_validation(){return true;}
	ADD_titulacion_persona_validation(){
		if (document.getElementById('titulacion_persona').value == 'PCEO'){
			return true;
		}
		else{
			return 'titulacion_persona_valor_KO';
		}
	}
	ADD_menu_persona_validation(){
		var menu = document.getElementsByName('menu_persona');
		var valores = ['primero', 'segundo', 'postre'];
		for (var i=0;i<menu.length;i++){
			if (menu[i].checked){
				if (valores.includes(menu[i].value))
				{
					return true;
				}
			}
		}
		return 'menu_persona_valor_KO';
		
	}
        ADD_genero_persona_validation(){
                var menu = document.getElementsByName('genero_persona');
                var valores = ['Masculino', 'Femenino', 'Otro'];
                for (var i=0;i<menu.length;i++){
                        if (menu[i].checked){
				if (valores.includes(menu[i].value))
				{
					return true;
				}
			}
		}
		return 'genero_persona_valor_KO';
		
	}
        ADD_apellidos_persona_validation(){
                if (!(this.validations.min_size('apellidos_persona',4))){
                        this.dom.mostrar_error_campo('apellidos_persona','apellidos_persona_min_size_KO');
                        return 'apellidos_persona_min_size_KO';
                }
                if (!(this.validations.max_size('apellidos_persona',20))){
                        this.dom.mostrar_error_campo('apellidos_persona','apellidos_persona_max_size_KO');
                        return 'apellidos_persona_max_size_KO';
                }
                if (!(this.validations.format('apellidos_persona','^[A-Za-zÁÉÍÓÚáéíóúÜüÑñ ]+$'))){
                        this.dom.mostrar_error_campo('apellidos_persona','apellidos_persona_format_KO');
                        return 'apellidos_persona_format_KO';
                }
                this.dom.mostrar_exito_campo('apellidos_persona');
                return true;
        }
        ADD_fechaNacimiento_persona_validation(){
                const rawValue = document.getElementById('fechaNacimiento_persona').value;
                const regExp = '^\\d{2}\/\\d{2}\/\\d{4}$';

                if (!(this.validations.format('fechaNacimiento_persona', regExp))){
                        this.dom.mostrar_error_campo('fechaNacimiento_persona','fechaNacimiento_persona_format_KO');
                        return 'fechaNacimiento_persona_format_KO';
                }

                const [day, month, year] = rawValue.split('/').map(Number);
                const parsedDate = new Date(`${year}-${month}-${day}`);
                const isValidDate = parsedDate && (parsedDate.getMonth() + 1) === month && parsedDate.getDate() === day && parsedDate.getFullYear() === year;

                if (!isValidDate){
                        this.dom.mostrar_error_campo('fechaNacimiento_persona','fechaNacimiento_persona_valid_KO');
                        return 'fechaNacimiento_persona_valid_KO';
                }

                this.dom.mostrar_exito_campo('fechaNacimiento_persona');
                return true;
        }
        ADD_direccion_persona_validation(){
                if (!(this.validations.min_size('direccion_persona',5))){
                        this.dom.mostrar_error_campo('direccion_persona','direccion_persona_min_size_KO');
                        return 'direccion_persona_min_size_KO';
                }
                if (!(this.validations.max_size('direccion_persona',200))){
                        this.dom.mostrar_error_campo('direccion_persona','direccion_persona_max_size_KO');
                        return 'direccion_persona_max_size_KO';
                }
                this.dom.mostrar_exito_campo('direccion_persona');
                return true;
        }
        ADD_telefono_persona_validation(){
                if (!(this.validations.min_size('telefono_persona',9))){
                        this.dom.mostrar_error_campo('telefono_persona','telefono_persona_min_size_KO');
                        return 'telefono_persona_min_size_KO';
                }
                if (!(this.validations.max_size('telefono_persona',9))){
                        this.dom.mostrar_error_campo('telefono_persona','telefono_persona_max_size_KO');
                        return 'telefono_persona_max_size_KO';
                }
                if (!(this.validations.format('telefono_persona','^\\d{9}$'))){
                        this.dom.mostrar_error_campo('telefono_persona','telefono_persona_format_KO');
                        return 'telefono_persona_format_KO';
                }
                this.dom.mostrar_exito_campo('telefono_persona');
                return true;
        }
        ADD_email_persona_validation(){
                if (!(this.validations.min_size('email_persona',6))){
                        this.dom.mostrar_error_campo('email_persona','email_persona_min_size_KO');
                        return 'email_persona_min_size_KO';
                }
                if (!(this.validations.max_size('email_persona',60))){
                        this.dom.mostrar_error_campo('email_persona','email_persona_max_size_KO');
                        return 'email_persona_max_size_KO';
                }
                if (!(this.validations.format('email_persona','^[\\\w.+-]+@[\\\w.-]+\\.[A-Za-z]{2,}$'))){
                        this.dom.mostrar_error_campo('email_persona','email_persona_format_KO');
                        return 'email_persona_format_KO';
                }
                this.dom.mostrar_exito_campo('email_persona');
                return true;
        }
        ADD_foto_persona_validation(){
                if (!(this.validations.max_size('foto_persona',100))){
                        this.dom.mostrar_error_campo('foto_persona','foto_persona_max_size_KO');
                        return 'foto_persona_max_size_KO';
                }
                this.dom.mostrar_exito_campo('foto_persona');
                return true;
        }
        //ADD_nuevo_foto_persona_validation(){return true;}

	//
	//EDIT
	//
        EDIT_dni_validation(){return this.ADD_dni_validation();}
        //EDIT_nombre_persona_validation(){return true;}
        EDIT_apellidos_persona_validation(){return this.ADD_apellidos_persona_validation();}
        EDIT_fechaNacimiento_persona_validation(){return this.ADD_fechaNacimiento_persona_validation();}
        EDIT_direccion_persona_validation(){return this.ADD_direccion_persona_validation();}
        EDIT_telefono_persona_validation(){return this.ADD_telefono_persona_validation();}
        EDIT_email_persona_validation(){return this.ADD_email_persona_validation();}
        EDIT_titulacion_persona_validation(){return this.ADD_titulacion_persona_validation();}
        EDIT_menu_persona_validation(){return this.ADD_menu_persona_validation();}
        EDIT_genero_persona_validation(){return this.ADD_genero_persona_validation();}
        EDIT_foto_persona_validation(){return this.ADD_foto_persona_validation();}
        //EDIT_nuevo_foto_persona_validation(){return true;}

	//
	//SEARCH
	//
        SEARCH_dni_validation(){
                const valor = document.getElementById('dni').value;
                if (valor === '') return true;
                if (!(this.validations.max_size('dni',9))){
                        this.dom.mostrar_error_campo('dni','dni_max_size_KO');
                        return 'dni_max_size_KO';
                }
                if (!(this.validations.format('dni','^[0-9XYZ]?[0-9]{0,7}[A-Z]?$'))){
                        this.dom.mostrar_error_campo('dni','dni_format_KO');
                        return 'dni_format_KO';
                }
                this.dom.mostrar_exito_campo('dni');
                return true;
        }
        SEARCH_nombre_persona_validation(){
                const valor = document.getElementById('nombre_persona').value;
                if (valor === '') return true;
                if (!(this.validations.max_size('nombre_persona',40))){
                        this.dom.mostrar_error_campo('nombre_persona','nombre_persona_max_size_KO');
                        return 'nombre_persona_max_size_KO';
                }
                this.dom.mostrar_exito_campo('nombre_persona');
                return true;
        }
        SEARCH_apellidos_persona_validation(){
                const valor = document.getElementById('apellidos_persona').value;
                if (valor === '') return true;
                if (!(this.validations.max_size('apellidos_persona',60))){
                        this.dom.mostrar_error_campo('apellidos_persona','apellidos_persona_max_size_KO');
                        return 'apellidos_persona_max_size_KO';
                }
                this.dom.mostrar_exito_campo('apellidos_persona');
                return true;
        }
        SEARCH_fechaNacimiento_persona_validation(){
                const valor = document.getElementById('fechaNacimiento_persona').value;
                if (valor === '') return true;
                if (!(this.validations.format('fechaNacimiento_persona','^\\d{2}\/\\d{2}\/\\d{4}$'))){
                        this.dom.mostrar_error_campo('fechaNacimiento_persona','fechaNacimiento_persona_format_KO');
                        return 'fechaNacimiento_persona_format_KO';
                }
                this.dom.mostrar_exito_campo('fechaNacimiento_persona');
                return true;
        }
        SEARCH_direccion_persona_validation(){
                const valor = document.getElementById('direccion_persona').value;
                if (valor === '') return true;
                if (!(this.validations.max_size('direccion_persona',200))){
                        this.dom.mostrar_error_campo('direccion_persona','direccion_persona_max_size_KO');
                        return 'direccion_persona_max_size_KO';
                }
                this.dom.mostrar_exito_campo('direccion_persona');
                return true;
        }
        SEARCH_telefono_persona_validation(){
                const valor = document.getElementById('telefono_persona').value;
                if (valor === '') return true;
                if (!(this.validations.max_size('telefono_persona',9))){
                        this.dom.mostrar_error_campo('telefono_persona','telefono_persona_max_size_KO');
                        return 'telefono_persona_max_size_KO';
                }
                if (!(this.validations.format('telefono_persona','^\\d{9}$'))){
                        this.dom.mostrar_error_campo('telefono_persona','telefono_persona_format_KO');
                        return 'telefono_persona_format_KO';
                }
                this.dom.mostrar_exito_campo('telefono_persona');
                return true;
        }
        SEARCH_email_persona_validation(){
                const valor = document.getElementById('email_persona').value;
                if (valor === '') return true;
                if (!(this.validations.max_size('email_persona',60))){
                        this.dom.mostrar_error_campo('email_persona','email_persona_max_size_KO');
                        return 'email_persona_max_size_KO';
                }
                if (!(this.validations.format('email_persona','^[\\\w.+-]+@[\\\w.-]+\\.[A-Za-z]{2,}$'))){
                        this.dom.mostrar_error_campo('email_persona','email_persona_format_KO');
                        return 'email_persona_format_KO';
                }
                this.dom.mostrar_exito_campo('email_persona');
                return true;
        }
        SEARCH_titulacion_persona_validation(){return true;}
        SEARCH_menu_persona_validation(){return true;}
        SEARCH_genero_persona_validation(){return true;}
        SEARCH_foto_persona_validation(){return true;}
        SEARCH_nuevo_foto_persona_validation(){return true;}

	//
	//submits
	//
	EDIT_submit_persona(){return true;}
	SEARCH_submit_persona(){return true;}

}
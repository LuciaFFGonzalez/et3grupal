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
                                habilidades_persona: ['JavaScript', 'DevOps'],
                                genero_persona: 'Femenino',
                                foto_persona: 'ada.png',
                                nuevo_foto_persona: '',
                                acepta_privacidad: ['acepta_privacidad'],
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
                                habilidades_persona: ['Python', 'Ciberseguridad'],
                                genero_persona: 'Femenino',
                                foto_persona: 'grace.jpg',
                                nuevo_foto_persona: '',
                                acepta_privacidad: ['acepta_privacidad'],
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
                                habilidades_persona: ['Python', 'DevOps'],
                                genero_persona: 'Masculino',
                                foto_persona: 'alan.jpg',
                                nuevo_foto_persona: '',
                                acepta_privacidad: ['acepta_privacidad'],
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
                                habilidades_persona: ['JavaScript', 'Ciberseguridad'],
                                genero_persona: 'Masculino',
                                foto_persona: 'linus.png',
                                nuevo_foto_persona: '',
                                acepta_privacidad: ['acepta_privacidad'],
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
                                habilidades_persona: ['Python', 'Ciberseguridad', 'DevOps'],
                                genero_persona: 'Femenino',
                                foto_persona: 'katherine.jpg',
                                nuevo_foto_persona: '',
                                acepta_privacidad: ['acepta_privacidad'],
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
                const container = document.createElement('div');
                const structure = this.getStructure?.() || window['estructura_persona'] || {};
                const builder = this.getFormRenderer();
                builder.createForm(container, structure, 'ADD', {}, {
                        formId: 'form_iu',
                        formClasses: ['formulario'],
                        showActions: false,
                        useEntityPrefix: false,
                });
                return container.innerHTML;

        }

        getFormRenderer() {
                return window.uiManager?.formRenderer
                        || new DOMFormTableBuilder({ languageManager: window.generalUIManager?.languageManager });
        }

        getFormOptionsForAction(action, structure = {}) {
                const options = {
                        formId: 'form_iu',
                        formClasses: ['formulario'],
                        useEntityPrefix: false,
                        formAttributes: {
                                enctype: 'multipart/form-data',
                                method: 'post',
                        },
                };

                if (typeof this[action] === 'function') {
                        options.formAttributes.action = `javascript:entidad.${action}();`;
                }

                if (action === 'ADD') {
                        options.hiddenAttributes = ['foto_persona'];
                }

                if (action === 'EDIT') {
                        options.readonlyAttributes = ['dni', 'foto_persona'];
                }

                if (action === 'DELETE') {
                        const attributeNames = Object.keys(structure.attributes || {});
                        options.readonlyAttributes = attributeNames;
                }

                if (action === 'SHOWCURRENT') {
                        const attributeNames = Object.keys(structure.attributes || {});
                        options.readonlyAttributes = attributeNames;
                        options.disabledAttributes = attributeNames;
                        options.showActions = false;
                }

                return options;
        }

        renderActionForm(action, tupleData = {}) {
                const container = document.getElementById('contenedor_IU_form');
                if (!container) return null;

                const structure = this.getStructure?.() || window['estructura_persona'] || {};
                const builder = this.getFormRenderer();
                const options = this.getFormOptionsForAction(action, structure);
                builder.createForm(container, structure, action, tupleData, options);

                this.decorateForm(action, tupleData);
                return container.querySelector('form');
        }

        decorateForm(action, tupleData = {}) {
                const wrapper = document.getElementById('Div_IU_form');
                if (wrapper) {
                        wrapper.style.display = 'block';
                }

                this.addFotoPersonaLink(tupleData);

                const langManager = window.generalUIManager?.languageManager;
                if (langManager?.refreshRegisteredTranslations) {
                        langManager.refreshRegisteredTranslations();
                } else if (typeof setLang === 'function') {
                        setLang(langManager?.getActiveLanguage?.());
                }
        }

        addFotoPersonaLink(tupleData = {}) {
                const form = document.getElementById('form_iu');
                if (!form) return;

                const fotoInput = form.querySelector('[data-attribute-name="foto_persona"]');
                if (!fotoInput) return;
                const wrapper = fotoInput.closest('.form-group') || fotoInput.parentElement;
                if (!wrapper) return;

                const existingLink = wrapper.querySelector('.link_foto_persona');
                if (existingLink) {
                        existingLink.remove();
                }

                if (tupleData.foto_persona) {
                        const link = document.createElement('a');
                        link.className = 'link_foto_persona';
                        link.href = `http://193.147.87.202/ET2/filesuploaded/files_foto_persona/${tupleData.foto_persona}`;
                        link.target = '_blank';

                        const img = document.createElement('img');
                        img.src = './iconos/FILE.png';
                        img.alt = 'foto_persona';

                        link.appendChild(img);
                        wrapper.appendChild(link);
                }
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
                this.renderActionForm('EDIT', fila || {});

        }

        createForm_DELETE(fila){
                this.renderActionForm('DELETE', fila || {});
        }

        createForm_SHOWCURRENT(fila){
                this.renderActionForm('SHOWCURRENT', fila || {});

        }

        createForm_ADD(){
                this.renderActionForm('ADD');
        }

        createForm_SEARCH(){
                this.renderActionForm('SEARCH');
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
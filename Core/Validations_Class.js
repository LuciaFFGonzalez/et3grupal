// Clase central de validaciones para ET3: única fuente oficial a ampliar con reglas por acción (ADD, EDIT, SEARCH).
class Validations{

	constructor(){
		
	}
	
	//min_size()
	//@param id Id objeto dom
	//@param minsize tamaño minimo a validar
	
	min_size(id, minsize){
		let elemento = document.getElementById(id);
		switch (elemento.tagName){
			case 'INPUT':
				switch (elemento.type){
					case 'number':
					case 'email':
					case 'text':
						let valorelemento = elemento.value;
						if (valorelemento.length<minsize){
							return false;
						}
						else{
							return true;
						}
						break;
					case 'file':
						break;
					default:
						break;
				
				}
				break;
			case 'SELECT':
				break;
			default:
				break;
		}

	}

	//max_size()
	//@param id Id objeto dom
	//@param minsize tamaño maximo a validar
	
	max_size(id, maxsize){
		let elemento = document.getElementById(id);
		switch (elemento.tagName){
			case 'INPUT':
				switch (elemento.type){
					case 'number':
					case 'email':
					case 'text':
						let valorelemento = elemento.value;
						if (valorelemento.length>maxsize){
							return false;
						}
						else{
							return true;
						}
						break;
					case 'file':
						break;
					default:
						break;
				
				}
				break;
			case 'SELECT':
				break;
			default:
				break;
		}

	}

	/**
	@param {string} id of html element
	@param {string} regular expression to testing id html element value
	@return {bool} result of regular expression testing  
	*/
	format(id, exprreg){
		let expresionregular = new RegExp(exprreg);
		let valor = document.getElementById(id).value;
		return expresionregular.test(valor);
	}

	/**
	 * 
	 */
	not_exist_file(id){
		let objfile = document.getElementById(id);
		if (objfile.files.length == 0){
			return false;
		}
		return true;
	}
	/**
	@param {string} id of html file element
	@param {number} maxsize max size allowed for fiel
	@return {bool} result of size comparison
	*/
	max_size_file(id, maxsize){
		let objfile = document.getElementById(id);
		if (objfile.files[0].size>maxsize){
			return false;
		}
		return true;
	}

	type_file(id, array_tipos){
		let objfile = document.getElementById(id);
		if (!(array_tipos.includes(objfile.files[0].type))){
			return false;
		}
		return true;
	}

        format_name_file(id, exprreg){
                let objfile = document.getElementById(id);
                let expresionregular = new RegExp(exprreg);
                let valor = objfile.files[0].name;
                return expresionregular.test(valor);
        }

        /**
         * Valida un valor simple según un conjunto de reglas de validación
         * definido en la estructura de la entidad para una acción concreta (ADD, EDIT, SEARCH).
         * @param {any} value Valor a validar.
         * @param {Object} rulesForAction Objeto con las reglas para la acción (min_size, max_size, exp_reg, etc.).
         * @returns {{ isValid: boolean, errorCodes: string[] }}
         */
        validateValueAgainstRules(value, rulesForAction, { attributeName = '', action = '', entityInstance = null } = {}) {
                const errorCodes = [];
                const rules = rulesForAction || {};
                const length = this.getLength(value);

                if (rules.required) {
                        const isEmpty = this.isEmptyValue(value);
                        if (isEmpty) {
                                errorCodes.push('ERR_REQUIRED');
                        }
                }

                if (rules.min_size !== undefined) {
                        if (length < rules.min_size) {
                                errorCodes.push('ERR_MIN_SIZE');
                        }
                }

                if (rules.max_size !== undefined) {
                        if (length > rules.max_size) {
                                errorCodes.push('ERR_MAX_SIZE');
                        }
                }

                if (rules.exp_reg !== undefined && !Array.isArray(value)) {
                        const regex = new RegExp(rules.exp_reg);
                        const valueToTest = typeof value === 'string' ? value : value?.name ?? '';
                        if (!regex.test(valueToTest)) {
                                errorCodes.push('ERR_EXP_REG');
                        }
                }

                // Soporte inicial para validaciones de fichero
                if (rules.no_file && !value) {
                        errorCodes.push('ERR_NO_FILE');
                }

                if (rules.max_size_file !== undefined && value?.size !== undefined) {
                        const maxSizeRule = Array.isArray(rules.max_size_file)
                                ? rules.max_size_file[0]?.max_size_file ?? rules.max_size_file[0]
                                : rules.max_size_file;
                        if (maxSizeRule !== undefined && value.size > maxSizeRule) {
                                errorCodes.push('ERR_MAX_SIZE_FILE');
                        }
                }

                if (rules.type_file !== undefined && value?.type !== undefined) {
                        const allowedTypes = Array.isArray(rules.type_file)
                                ? rules.type_file.map((rule) => rule.type_file ?? rule)
                                : [rules.type_file];
                        if (!allowedTypes.includes(value.type)) {
                                errorCodes.push('ERR_TYPE_FILE');
                        }
                }

                if (rules.format_name_file !== undefined && value?.name !== undefined) {
                        const formatRule = Array.isArray(rules.format_name_file)
                                ? rules.format_name_file[0]?.format_name_file ?? rules.format_name_file[0]
                                : rules.format_name_file;
                        if (formatRule !== undefined) {
                                const nameRegex = new RegExp(formatRule);
                                if (!nameRegex.test(value.name)) {
                                        errorCodes.push('ERR_FORMAT_NAME_FILE');
                                }
                        }
                }

                if (rules.personalized && attributeName && entityInstance) {
                        const methodName = `specialized_test_${attributeName}`;
                        const specializedFn = entityInstance[methodName];
                        if (typeof specializedFn === 'function') {
                                const specializedResult = specializedFn.call(entityInstance, action, value);

                                if (specializedResult === false) {
                                        errorCodes.push('ERR_PERSONALIZED');
                                } else if (typeof specializedResult === 'string' && specializedResult.trim() !== '') {
                                        errorCodes.push(specializedResult);
                                }
                        }
                }

                const isValid = errorCodes.length === 0;
                return { isValid, errorCodes };
        }

        getLength(value) {
                if (Array.isArray(value)) return value.length;
                if (typeof value === 'string') return value.length;
                if (value && typeof value.length === 'number') return value.length;
                return 0;
        }

        isEmptyValue(value) {
                if (value === null || value === undefined) return true;
                if (Array.isArray(value)) return value.length === 0;
                if (typeof value === 'string') return value.trim().length === 0;
                if (typeof value === 'boolean') return value === false;
                if (value && typeof value.size === 'number') return false;
                return false;
        }

        // validateFieldFromStructure(entityStructure, attributeName, action, formElement) {
        //      Método futuro que combinará la estructura de la entidad con la lectura del DOM
        //      para validar un campo específico según la acción indicada.
        // }

}
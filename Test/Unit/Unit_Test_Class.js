// Suite de pruebas de unidad para ET3.
// Para ejecutarla abre Test/Unit/index.html en el navegador (o crea manualmente new Unit_Test('persona'))
// y revisa la tabla y la consola para ver el resultado detallado de los checks.

class Unit_Test {
    constructor(entidad = 'persona') {
        this.nombreentidad = entidad || 'persona';
        this.actions = ['ADD', 'EDIT', 'SEARCH', 'SHOWCURRENT'];
        this.dom = new dom();
        this.testResults = [];

        this.runAllTests();

        const marcados = {
            estado: { value: 'KO', style: 'background-color: #ffb3b3' },
        };

        this.dom.showData('Div_IU_Test', this.testResults, marcados, true);
    }

    runAllTests() {
        this.testResults.push(...this.test_class_and_method_validation());
        this.testResults.push(...this.test_form_generation_against_structure());
        this.testResults.push(...this.test_validation_rules());
        this.testResults.push(...this.test_dummy_search_results());
        this.testResults.push(...this.test_producto_form_builder());
        return this.testResults;
    }

    /**
     * Verifica la presencia de la clase, los métodos de validación por atributo y los createForm.
     */
    test_class_and_method_validation() {
        const output = [];
        const baseResult = { categoria: 'clase', caso: '', estado: 'OK', detalle: '' };

        let entidadConstructor = null;
        try {
            entidadConstructor = eval(this.nombreentidad);
        } catch (e) {
            output.push({ ...baseResult, caso: 'Clase definida', estado: 'KO', detalle: e.message });
            return output;
        }

        if (typeof entidadConstructor !== 'function') {
            output.push({ ...baseResult, caso: 'Clase definida', estado: 'KO', detalle: 'No es una función' });
            return output;
        }

        const entidad = new entidadConstructor('test');
        const methodNames = Object.getOwnPropertyNames(Object.getPrototypeOf(entidad));

        // Submit y validaciones de atributos por acción
        ['ADD', 'EDIT', 'SEARCH'].forEach((accion) => {
            const submitMethod = `${accion}_submit_${this.nombreentidad}`;
            const submitExists = methodNames.includes(submitMethod);
            output.push({
                ...baseResult,
                caso: `Existe ${submitMethod}`,
                estado: submitExists ? 'OK' : 'KO',
                detalle: submitExists ? '' : 'Método ausente',
            });

            (entidad.attributes || []).forEach((atributo) => {
                const validationMethod = `${accion}_${atributo}_validation`;
                const exists = methodNames.includes(validationMethod);
                output.push({
                    ...baseResult,
                    caso: `Validación ${accion} ${atributo}`,
                    estado: exists ? 'OK' : 'KO',
                    detalle: exists ? '' : 'Método ausente',
                });
            });
        });

        // CreateForm por acción
        ['ADD', 'EDIT', 'DELETE', 'SEARCH', 'SHOWCURRENT'].forEach((accion) => {
            const createMethod = `createForm_${accion}`;
            const exists = methodNames.includes(createMethod);
            output.push({
                ...baseResult,
                caso: `CreateForm ${accion}`,
                estado: exists ? 'OK' : 'KO',
                detalle: exists ? '' : 'Método ausente',
            });
        });

        return output;
    }

    /**
     * Comprueba que el form builder pinta exactamente los atributos esperados para cada acción
     * según la estructura de la entidad persona (omitiendo los ocultos en cada caso).
     */
    test_form_generation_against_structure() {
        const output = [];
        const baseResult = { categoria: 'formulario', caso: '', estado: 'OK', detalle: '' };
        const entidad = new persona('test');
        const structure = entidad.getStructure?.() || window['estructura_persona'] || {};
        const attributeNames = Object.keys(structure.attributes || {});

        this.actions.forEach((accion) => {
            const container = document.createElement('div');
            const builder = entidad.getFormRenderer();
            const options = entidad.getFormOptionsForAction(accion, structure);
            builder.createForm(container, structure, accion, {}, options);

            const renderedAttributes = Array.from(
                container.querySelectorAll('[data-attribute-name]')
            ).map((el) => el.getAttribute('data-attribute-name'));
            const renderedUnique = [...new Set(renderedAttributes)];

            const expectedVisible = attributeNames.filter(
                (attr) => !(options.hiddenAttributes || []).includes(attr)
            );

            const missing = expectedVisible.filter((attr) => !renderedUnique.includes(attr));
            const extra = renderedUnique.filter((attr) => !expectedVisible.includes(attr));

            const isOk = missing.length === 0 && extra.length === 0;
            output.push({
                ...baseResult,
                caso: `Campos ${accion}`,
                estado: isOk ? 'OK' : 'KO',
                detalle: isOk
                    ? `Renderizados ${renderedUnique.length} campos`
                    : `Faltan: ${missing.join(', ') || '-'} | Sobran: ${extra.join(', ') || '-'}`,
            });
        });

        return output;
    }

    /**
     * Valida combinaciones de datos incorrectos contra las reglas de estructura y las
     * validaciones personalizadas de dni/nie.
     */
    test_validation_rules() {
        const output = [];
        const baseResult = { categoria: 'validacion', caso: '', estado: 'OK', detalle: '' };
        const estructura = window['estructura_persona'] || {};
        const validations = new Validations();
        const entidad = new persona('test');

        const casos = [
            {
                caso: 'Nombre demasiado corto',
                attribute: 'nombre_persona',
                action: 'ADD',
                value: 'A',
                expectedErrors: ['ERR_MIN_SIZE'],
                expectValid: false,
            },
            {
                caso: 'Apellidos demasiado largos',
                attribute: 'apellidos_persona',
                action: 'ADD',
                value: 'A'.repeat(80),
                expectedErrors: ['ERR_MAX_SIZE'],
                expectValid: false,
            },
            {
                caso: 'Nombre con caracteres inválidos',
                attribute: 'nombre_persona',
                action: 'ADD',
                value: 'Ana1',
                expectedErrors: ['ERR_EXP_REG'],
                expectValid: false,
            },
            {
                caso: 'DNI con letra incorrecta',
                attribute: 'dni',
                action: 'ADD',
                value: '12345678A',
                expectedErrors: ['dni_validate_KO'],
                expectValid: false,
            },
            {
                caso: 'NIE con formato inválido',
                attribute: 'dni',
                action: 'ADD',
                value: 'A2345678B',
                expectedErrors: ['dni_nie_format_KO'],
                expectValid: false,
            },
            {
                caso: 'Teléfono con letras',
                attribute: 'telefono_persona',
                action: 'EDIT',
                value: '12345abc',
                expectedErrors: ['ERR_MIN_SIZE', 'ERR_EXP_REG'],
                expectValid: false,
            },
            {
                caso: 'Email válido',
                attribute: 'email_persona',
                action: 'ADD',
                value: 'user@example.com',
                expectedErrors: [],
                expectValid: true,
            },
            {
                caso: 'Select múltiple sin elementos',
                attribute: 'habilidades_persona',
                action: 'ADD',
                value: [],
                expectedErrors: ['ERR_MIN_SIZE'],
                expectValid: false,
            },
            {
                caso: 'Select múltiple con exceso de elementos',
                attribute: 'habilidades_persona',
                action: 'ADD',
                value: ['JavaScript', 'Python', 'DevOps', 'Ciberseguridad'],
                expectedErrors: ['ERR_MAX_SIZE'],
                expectValid: false,
            },
            {
                caso: 'Select múltiple válido',
                attribute: 'habilidades_persona',
                action: 'ADD',
                value: ['JavaScript', 'Python'],
                expectedErrors: [],
                expectValid: true,
            },
            {
                caso: 'Checkbox requerido sin marcarse',
                attribute: 'acepta_privacidad',
                action: 'ADD',
                value: [],
                expectedErrors: ['ERR_REQUIRED'],
                expectValid: false,
            },
            {
                caso: 'Checkbox requerido marcado',
                attribute: 'acepta_privacidad',
                action: 'ADD',
                value: ['acepta_privacidad'],
                expectedErrors: [],
                expectValid: true,
            },
        ];

        casos.forEach((caso) => {
            const rules = estructura?.attributes?.[caso.attribute]?.rules?.validations?.[caso.action] || {};
            const result = validations.validateValueAgainstRules(caso.value, rules, {
                attributeName: caso.attribute,
                action: caso.action,
                entityInstance: entidad,
            });

            const hasExpectedErrors = caso.expectedErrors.every((code) => result.errorCodes.includes(code));
            const validityMatches = result.isValid === caso.expectValid;
            const estado = hasExpectedErrors && validityMatches ? 'OK' : 'KO';
            const detalle = `Errores: ${result.errorCodes.join(', ') || 'ninguno'}`;

            output.push({ ...baseResult, caso: caso.caso, estado, detalle });
        });

        return output;
    }

    /**
     * Comprueba que la búsqueda dummy devuelve el número esperado de resultados.
     */
    test_dummy_search_results() {
        const output = [];
        const baseResult = { categoria: 'search', caso: '', estado: 'OK', detalle: '' };
        const entidad = new persona('test');

        const pruebas = [
            { caso: 'Filtro por titulacion GREI', filtros: { titulacion_persona: 'GREI' }, esperado: 1 },
            { caso: 'Filtro por dieta Vegano', filtros: { menu_persona: ['Vegano'] }, esperado: 3 },
            { caso: 'Filtro por DNI parcial 0000', filtros: { dni: '0000' }, esperado: 1 },
        ];

        pruebas.forEach((prueba) => {
            const resultados = entidad.filterDummyData(prueba.filtros);
            const estado = resultados.length === prueba.esperado ? 'OK' : 'KO';
            const detalle = `Resultados: ${resultados.length} (esperado ${prueba.esperado})`;
            output.push({ ...baseResult, caso: prueba.caso, estado, detalle });
        });

        return output;
    }

    /**
     * Verifica de forma mínima que el form builder puede construir formularios para la entidad producto.
     */
    test_producto_form_builder() {
        const output = [];
        const baseResult = { categoria: 'formulario', caso: '', estado: 'OK', detalle: '' };
        const estructura = window['estructura_producto'];

        if (!estructura) {
            output.push({
                ...baseResult,
                caso: 'Estructura producto disponible',
                estado: 'KO',
                detalle: 'estructura_producto no está cargada',
            });
            return output;
        }

        const container = document.createElement('div');
        const builder = new DOMFormTableBuilder();
        builder.createForm(container, estructura, 'ADD', {}, { useEntityPrefix: false });

        const renderedAttributes = Array.from(container.querySelectorAll('[data-attribute-name]')).map((el) =>
            el.getAttribute('data-attribute-name')
        );
        const renderedUnique = [...new Set(renderedAttributes)];
        const expected = Object.keys(estructura.attributes || {});

        const missing = expected.filter((attr) => !renderedUnique.includes(attr));
        const estado = missing.length === 0 ? 'OK' : 'KO';
        const detalle = missing.length === 0 ? 'Formulario generado' : `Faltan: ${missing.join(', ')}`;

        output.push({ ...baseResult, caso: 'Formulario producto ADD', estado, detalle });
        return output;
    }
}

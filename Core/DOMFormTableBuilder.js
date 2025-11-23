/**
 * DOMFormTableBuilder is responsible for dynamically generating forms and tables
 * based on a given entity structure. It focuses on rendering and leaves hooks
 * ready so validations and action handlers can be attached externally.
 *
 * Será utilizado por UIManager para pintar los formularios de ADD, EDIT, SEARCH y SHOWCURRENT.
 * Por ahora únicamente dibuja la estructura; las validaciones y manejadores se enchufarán después.
 */
class DOMFormTableBuilder {
    constructor(options = {}) {
        const {
            formClassList = [],
            tableClassList = [],
            fieldWrapperClass,
            labelClass,
            inputClass,
        } = options;

        const normalizedFormClasses = Array.isArray(formClassList)
            ? formClassList
            : formClassList
                ? [formClassList]
                : [];
        const normalizedTableClasses = Array.isArray(tableClassList)
            ? tableClassList
            : tableClassList
                ? [tableClassList]
                : [];

        // Permite añadir clases CSS adicionales para personalizar los formularios y tablas.
        this.defaultFormClassList = ['formulario', 'bordeado', ...normalizedFormClasses];
        this.defaultFieldWrapperClass = fieldWrapperClass || 'form-group';
        this.defaultLabelClass = labelClass || 'form-label';
        this.defaultInputClass = inputClass || 'form-control';
        this.defaultTableClassList = ['table', 'bordeado', ...normalizedTableClasses];
    }

    /**
     * Creates a form for the provided entity structure and action.
     *
     * @param {HTMLElement} containerElement - Element where the form will be rendered.
     * @param {Object} entityStructure - Structure describing the entity fields.
     * @param {string} action - Action to represent (ADD, EDIT, SEARCH, SHOWCURRENT).
     * @param {Object} [tupleData={}] - Optional tuple data to prefill the form.
     */
    createForm(containerElement, entityStructure, action, tupleData = {}) {
        if (!containerElement || !entityStructure || !entityStructure.attributes) {
            return;
        }

        containerElement.innerHTML = '';

        const formElement = document.createElement('form');
        formElement.id = `form_${entityStructure.entity}_${action.toLowerCase()}`;
        this.defaultFormClassList.forEach((cls) => formElement.classList.add(cls));
        formElement.setAttribute('data-entity', entityStructure.entity);
        formElement.setAttribute('data-action', action);

        Object.entries(entityStructure.attributes).forEach(([attributeName, definition]) => {
            const wrapper = document.createElement('div');
            wrapper.classList.add(this.defaultFieldWrapperClass);

            const label = document.createElement('label');
            label.htmlFor = `${entityStructure.entity}_${attributeName}`;
            label.classList.add(this.defaultLabelClass);
            label.textContent = definition.label || attributeName;
            wrapper.appendChild(label);

            const fieldValue = tupleData[attributeName];
            const fieldElement = this.#buildField(attributeName, definition, action, fieldValue, entityStructure.entity);

            wrapper.appendChild(fieldElement);

            // Hook: attach field-level validation handlers here once validation logic is available.

            formElement.appendChild(wrapper);
        });

        const actionsContainer = document.createElement('div');
        actionsContainer.classList.add('form-actions');

        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.classList.add('boton', 'bordeado');
        submitButton.textContent = action;
        actionsContainer.appendChild(submitButton);

        const resetButton = document.createElement('button');
        resetButton.type = action === 'SEARCH' ? 'reset' : 'button';
        resetButton.classList.add('boton-secundario', 'bordeado');
        resetButton.textContent = action === 'SEARCH' ? 'Limpiar' : 'Cancelar';
        actionsContainer.appendChild(resetButton);

        // Hook: attach form-level validation and submit handlers here.

        formElement.appendChild(actionsContainer);
        containerElement.appendChild(formElement);
    }

    /**
     * Builds the correct HTML field based on the definition tag and options.
     *
     * @param {string} name - Attribute name.
     * @param {Object} definition - Attribute definition containing html and rules blocks.
     * @param {string} action - Action being rendered.
     * @param {*} value - Prefill value for the field.
     * @returns {HTMLElement}
     */
    #buildField(name, definition, action, value, entityName) {
        const { html = {} } = definition;
        const tag = (html.tag || 'input').toLowerCase();
        let element;

        switch (tag) {
            case 'textarea':
                element = document.createElement('textarea');
                if (html.rows) element.rows = html.rows;
                if (html.columns) element.cols = html.columns;
                element.value = value || '';
                element.id = `${entityName}_${name}`;
                element.name = name;
                break;
            case 'select':
                element = document.createElement('select');
                if (html.multiple) element.multiple = true;
                (html.options || []).forEach((optionValue) => {
                    const optionElement = document.createElement('option');
                    optionElement.value = optionValue;
                    optionElement.textContent = optionValue;
                    if (this.#isSelectedValue(value, optionValue, element.multiple)) {
                        optionElement.selected = true;
                    }
                    element.appendChild(optionElement);
                });
                element.id = `${entityName}_${name}`;
                element.name = name;
                break;
            case 'radio':
                element = document.createElement('div');
                element.classList.add('radio-group');
                (html.options || []).forEach((optionValue, index) => {
                    const radioId = index === 0 ? `${entityName}_${name}` : `${entityName}_${name}_radio_${index}`;
                    const radioWrapper = document.createElement('div');
                    radioWrapper.classList.add('radio-item');

                    const inputElement = document.createElement('input');
                    inputElement.type = 'radio';
                    inputElement.name = name;
                    inputElement.id = radioId;
                    inputElement.setAttribute('data-attribute-name', name);
                    inputElement.value = optionValue;
                    inputElement.checked = value === optionValue;

                    const optionLabel = document.createElement('label');
                    optionLabel.htmlFor = radioId;
                    optionLabel.textContent = optionValue;

                    radioWrapper.appendChild(inputElement);
                    radioWrapper.appendChild(optionLabel);
                    element.appendChild(radioWrapper);
                });
                break;
            case 'checkbox':
                element = document.createElement('div');
                element.classList.add('checkbox-group');
                const checkboxOptions = html.multiple ? html.options || [] : [definition.label || name];
                checkboxOptions.forEach((optionValue, index) => {
                    const checkboxId = index === 0 ? `${entityName}_${name}` : `${entityName}_${name}_checkbox_${index}`;
                    const checkboxWrapper = document.createElement('div');
                    checkboxWrapper.classList.add('checkbox-item');

                    const inputElement = document.createElement('input');
                    inputElement.type = 'checkbox';
                    inputElement.name = name;
                    inputElement.id = checkboxId;
                    inputElement.setAttribute('data-attribute-name', name);
                    inputElement.value = optionValue;
                    inputElement.checked = this.#isSelectedValue(value, optionValue, true);

                    const optionLabel = document.createElement('label');
                    optionLabel.htmlFor = checkboxId;
                    optionLabel.textContent = optionValue;

                    checkboxWrapper.appendChild(inputElement);
                    checkboxWrapper.appendChild(optionLabel);
                    element.appendChild(checkboxWrapper);
                });
                break;
            default:
                element = document.createElement('input');
                element.type = html.type || 'text';
                element.value = value || '';
                if (html.component_visible_size) {
                    element.size = html.component_visible_size;
                }
                element.id = `${entityName}_${name}`;
                element.name = name;
                break;
        }

        if (tag !== 'radio' && tag !== 'checkbox') {
            element.classList.add(this.defaultInputClass);
            element.setAttribute('data-attribute-name', name);
        }

        if (action === 'SHOWCURRENT') {
            element.readOnly = true;
            element.disabled = tag === 'select' || tag === 'radio' || tag === 'checkbox';
        }

        return element;
    }

    /**
     * Creates a data table for the given entity attributes and dataset.
     *
     * @param {HTMLElement} containerElement - Element where the table will be rendered.
     * @param {Object} entityStructure - Structure describing the entity fields.
     * @param {Array<Object>} dataArray - Data to populate the table rows.
     */
    createTable(containerElement, entityStructure, dataArray) {
        if (!containerElement || !entityStructure || !entityStructure.attributes) {
            return;
        }

        containerElement.innerHTML = '';

        const table = document.createElement('table');
        this.defaultTableClassList.forEach((cls) => table.classList.add(cls));

        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');

        const visibleAttributes = Object.keys(entityStructure.attributes);
        visibleAttributes.forEach((attributeName) => {
            const th = document.createElement('th');
            th.textContent = entityStructure.attributes[attributeName].label || attributeName;
            headerRow.appendChild(th);
        });

        const actionsHeader = document.createElement('th');
        actionsHeader.textContent = 'Acciones';
        headerRow.appendChild(actionsHeader);

        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        (dataArray || []).forEach((rowData, rowIndex) => {
            const row = document.createElement('tr');
            visibleAttributes.forEach((attributeName) => {
                const td = document.createElement('td');
                const cellValue = rowData[attributeName];
                td.textContent = cellValue !== undefined ? cellValue : '';
                row.appendChild(td);
            });

            const actionCell = document.createElement('td');
            actionCell.classList.add('action-cell');
            actionCell.appendChild(this.#buildActionButton('EDIT', rowIndex));
            actionCell.appendChild(this.#buildActionButton('SHOWCURRENT', rowIndex));
            actionCell.appendChild(this.#buildActionButton('DELETE', rowIndex));
            row.appendChild(actionCell);

            // Hook: attach row-level handlers for edit, detail, delete using data attributes.

            tbody.appendChild(row);
        });

        table.appendChild(tbody);
        containerElement.appendChild(table);
    }

    /**
     * Determines if an option should be considered selected.
     *
     * @param {*} currentValue - Current value in the tuple or form state.
     * @param {*} optionValue - Option being evaluated.
     * @param {boolean} isMultiple - True when multiple selections are allowed.
     * @returns {boolean}
     */
    #isSelectedValue(currentValue, optionValue, isMultiple) {
        if (isMultiple && Array.isArray(currentValue)) {
            return currentValue.includes(optionValue);
        }
        return currentValue === optionValue;
    }

    /**
     * Creates a placeholder action button so handlers can be attached externally.
     *
     * @param {string} action - Action identifier.
     * @param {number} rowIndex - Row index used as a marker.
     * @returns {HTMLButtonElement}
     */
    #buildActionButton(action, rowIndex) {
        const button = document.createElement('button');
        button.type = 'button';
        button.classList.add('boton-tabla', 'bordeado');
        button.textContent = action;
        button.setAttribute('data-action', action);
        button.setAttribute('data-row-index', rowIndex);
        // Hook: external code should assign onclick/keyboard handlers here.
        return button;
    }
}

export default DOMFormTableBuilder;

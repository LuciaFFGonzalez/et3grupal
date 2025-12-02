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
            languageManager = null,
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
        this.languageManager = languageManager || (typeof window !== 'undefined' ? window?.generalUIManager?.languageManager : null);
    }

    /**
     * Creates a form for the provided entity structure and action.
     *
     * @param {HTMLElement} containerElement - Element where the form will be rendered.
     * @param {Object} entityStructure - Structure describing the entity fields.
     * @param {string} action - Action to represent (ADD, EDIT, SEARCH, SHOWCURRENT).
     * @param {Object} [tupleData={}] - Optional tuple data to prefill the form.
     */
    createForm(containerElement, entityStructure, action, tupleData = {}, options = {}) {
        if (!containerElement || !entityStructure || !entityStructure.attributes) {
            return;
        }

        containerElement.innerHTML = '';

        const formElement = document.createElement('form');
        const {
            formId,
            formClasses = [],
            formAttributes = {},
            hiddenAttributes = [],
            readonlyAttributes = [],
            disabledAttributes = [],
            showActions = true,
            useEntityPrefix = true,
        } = options;

        formElement.id = formId || `form_${entityStructure.entity}_${action.toLowerCase()}`;
        [...this.defaultFormClassList, ...formClasses].forEach((cls) => formElement.classList.add(cls));
        formElement.setAttribute('data-entity', entityStructure.entity);
        formElement.setAttribute('data-action', action);

        Object.entries(formAttributes).forEach(([attr, value]) => {
            if (value !== undefined && value !== null) {
                formElement.setAttribute(attr, value);
            }
        });

        Object.entries(entityStructure.attributes).forEach(([attributeName, definition]) => {
            if (hiddenAttributes.includes(attributeName)) return;

            const wrapper = document.createElement('div');
            wrapper.classList.add(this.defaultFieldWrapperClass);

            const label = document.createElement('label');
            const labelForId = useEntityPrefix ? `${entityStructure.entity}_${attributeName}` : attributeName;
            label.htmlFor = labelForId;
            label.classList.add(this.defaultLabelClass);
            const labelKey = definition.label || `form.${entityStructure.entity}.${attributeName}.label`;
            this.#setTranslatedText(label, labelKey, definition.label || attributeName);
            wrapper.appendChild(label);

            const fieldValue = tupleData[attributeName];
            const fieldElement = this.#buildField(attributeName, definition, action, fieldValue, entityStructure.entity, {
                readonlyAttributes,
                disabledAttributes,
                useEntityPrefix,
            });

            wrapper.appendChild(fieldElement);

            // Hook: attach field-level validation handlers here once validation logic is available.

            formElement.appendChild(wrapper);
        });

        if (showActions) {
            const actionsContainer = document.createElement('div');
            actionsContainer.classList.add('form-actions');

            const submitButton = document.createElement('button');
            submitButton.type = 'submit';
            submitButton.classList.add('boton', 'bordeado');
            const submitKey = `action.${action.toLowerCase()}.button`;
            this.#setTranslatedText(submitButton, submitKey, action);
            actionsContainer.appendChild(submitButton);

            const resetButton = document.createElement('button');
            resetButton.type = action === 'SEARCH' ? 'reset' : 'button';
            resetButton.classList.add('boton-secundario', 'bordeado');
            const resetKey = action === 'SEARCH' ? 'action.search.reset.button' : 'action.cancel.button';
            const resetFallback = action === 'SEARCH' ? 'Limpiar' : 'Cancelar';
            this.#setTranslatedText(resetButton, resetKey, resetFallback);
            actionsContainer.appendChild(resetButton);

            // Hook: attach form-level validation and submit handlers here.

            formElement.appendChild(actionsContainer);
        }
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
    #buildField(name, definition, action, value, entityName, options = {}) {
        const { html = {} } = definition;
        const tag = (html.tag || 'input').toLowerCase();
        let element;
        const useEntityPrefix = options.useEntityPrefix !== false;
        const readonlyAttributes = options.readonlyAttributes || [];
        const disabledAttributes = options.disabledAttributes || [];
        const baseId = useEntityPrefix ? `${entityName}_${name}` : name;

        const isReadonly = readonlyAttributes.includes(name) || action === 'SHOWCURRENT';
        const isDisabled = disabledAttributes.includes(name);

        switch (tag) {
            case 'textarea':
                element = document.createElement('textarea');
                if (html.rows) element.rows = html.rows;
                if (html.columns) element.cols = html.columns;
                element.value = value || '';
                element.id = baseId;
                element.name = name;
                break;
            case 'select':
                element = document.createElement('select');
                if (html.multiple) element.multiple = true;
                (html.options || []).forEach((optionValue) => {
                    const optionElement = document.createElement('option');
                    optionElement.value = optionValue;
                    const optionKey = `form.${entityName}.${name}.option.${optionValue}`;
                    this.#setTranslatedText(optionElement, optionKey, optionValue);
                    if (this.#isSelectedValue(value, optionValue, element.multiple)) {
                        optionElement.selected = true;
                    }
                    element.appendChild(optionElement);
                });
                element.id = baseId;
                element.name = name;
                break;
            case 'radio':
                element = document.createElement('div');
                element.classList.add('radio-group');
                (html.options || []).forEach((optionValue, index) => {
                    const radioId = index === 0 ? baseId : `${baseId}_radio_${index}`;
                    const radioWrapper = document.createElement('div');
                    radioWrapper.classList.add('radio-item');

                    const inputElement = document.createElement('input');
                    inputElement.type = 'radio';
                    inputElement.name = name;
                    inputElement.id = radioId;
                    inputElement.setAttribute('data-attribute-name', name);
                    inputElement.value = optionValue;
                    inputElement.checked = value === optionValue;
                    inputElement.disabled = isDisabled || isReadonly;

                    const optionLabel = document.createElement('label');
                    optionLabel.htmlFor = radioId;
                    const optionKey = `form.${entityName}.${name}.option.${optionValue}`;
                    this.#setTranslatedText(optionLabel, optionKey, optionValue);

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
                    const checkboxId = index === 0 ? baseId : `${baseId}_checkbox_${index}`;
                    const checkboxWrapper = document.createElement('div');
                    checkboxWrapper.classList.add('checkbox-item');

                    const inputElement = document.createElement('input');
                    inputElement.type = 'checkbox';
                    inputElement.name = name;
                    inputElement.id = checkboxId;
                    inputElement.setAttribute('data-attribute-name', name);
                    inputElement.value = optionValue;
                    inputElement.checked = this.#isSelectedValue(value, optionValue, true);
                    inputElement.disabled = isDisabled || isReadonly;

                    const optionLabel = document.createElement('label');
                    optionLabel.htmlFor = checkboxId;
                    const optionKey = html.multiple
                        ? `form.${entityName}.${name}.option.${optionValue}`
                        : definition.label || `form.${entityName}.${name}.label`;
                    this.#setTranslatedText(optionLabel, optionKey, optionValue);

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
                element.id = baseId;
                element.name = name;
                break;
        }

        if (tag !== 'radio' && tag !== 'checkbox') {
            element.classList.add(this.defaultInputClass);
            element.setAttribute('data-attribute-name', name);
            if (isReadonly) {
                element.readOnly = true;
            }
            if (isDisabled) {
                element.disabled = true;
            }
        }

        if (tag === 'select' && (isDisabled || isReadonly)) {
            element.disabled = true;
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
    createTable(containerElement, entityStructure, dataArray, options = {}) {
        if (!containerElement || !entityStructure || !entityStructure.attributes) {
            return;
        }

        const { visibleAttributes, actions = ['SHOWCURRENT', 'EDIT'], onActionClick = null } = options;

        containerElement.innerHTML = '';

        const resolvedAttributes = Array.isArray(visibleAttributes) && visibleAttributes.length > 0
            ? visibleAttributes
            : Object.keys(entityStructure.attributes);

        const table = document.createElement('table');
        this.defaultTableClassList.forEach((cls) => table.classList.add(cls));

        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');

        resolvedAttributes.forEach((attributeName) => {
            const th = document.createElement('th');
            const headerKey = entityStructure.attributes[attributeName].label
                || `form.${entityStructure.entity}.${attributeName}.label`;
            this.#setTranslatedText(th, headerKey, entityStructure.attributes[attributeName].label || attributeName);
            headerRow.appendChild(th);
        });

        if (actions && actions.length > 0) {
            const actionsHeader = document.createElement('th');
            this.#setTranslatedText(actionsHeader, 'table.actions.header', 'Acciones');
            headerRow.appendChild(actionsHeader);
        }

        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement('tbody');

        if (!dataArray || dataArray.length === 0) {
            const emptyRow = document.createElement('tr');
            const emptyCell = document.createElement('td');
            emptyCell.colSpan = resolvedAttributes.length + (actions?.length ? 1 : 0);
            this.#setTranslatedText(emptyCell, 'table.empty.message', 'No hay resultados');
            emptyRow.appendChild(emptyCell);
            tbody.appendChild(emptyRow);
        }

        (dataArray || []).forEach((rowData, rowIndex) => {
            const row = document.createElement('tr');
            resolvedAttributes.forEach((attributeName) => {
                const td = document.createElement('td');
                const cellValue = rowData[attributeName];
                td.textContent = cellValue !== undefined ? cellValue : '';
                row.appendChild(td);
            });

            if (actions && actions.length > 0) {
                const actionCell = document.createElement('td');
                actionCell.classList.add('action-cell');
                actions.forEach((action) => {
                    const button = this.#buildActionButton(action, rowIndex);
                    if (typeof onActionClick === 'function') {
                        button.addEventListener('click', () => onActionClick(action, rowIndex, rowData));
                    }
                    actionCell.appendChild(button);
                });
                row.appendChild(actionCell);
            }

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
        const buttonKey = `action.${action.toLowerCase()}.table.button`;
        this.#setTranslatedText(button, buttonKey, action);
        button.setAttribute('data-action', action);
        button.setAttribute('data-row-index', rowIndex);
        // Hook: external code should assign onclick/keyboard handlers here.
        return button;
    }

    #setTranslatedText(element, key, fallbackText = '', property = 'textContent') {
        if (!element) return;
        const translation = this.languageManager?.getText?.(key);
        const resolvedText = translation && translation !== key ? translation : (fallbackText || key || '');
        element[property] = resolvedText;

        if (this.languageManager?.registerTranslationElement) {
            this.languageManager.registerTranslationElement(element, key, fallbackText, property);
        }
    }
}

if (typeof window !== 'undefined') {
    window.DOMFormTableBuilder = DOMFormTableBuilder;
}

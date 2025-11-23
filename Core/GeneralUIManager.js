/**
 * UIManager coordina la carga de entidades, lectura de estructuras y renderizado de vistas CRUD.
 *
 * Se apoya en clases ya existentes (entidades concretas, builder de formularios/tablas y validaciones)
 * y expone puntos de integración claros para el back y para renderizadores dinámicos.
 */
// Base seguro para evitar errores de carga cuando EntidadAbstracta aún no está disponible.
const GenericBaseEntity = typeof EntidadAbstracta === 'function' ? EntidadAbstracta : class {
    constructor(...args) {}
};

// Entidad “genérica” de fallback para cuando no exista una clase concreta para la entidad seleccionada.
// Hereda de EntidadAbstracta únicamente para reutilizar utilidades comunes (dom, validations, etc.).
// Se inicializa en modo test para que EntidadAbstracta no cree formularios automáticos ni ejecute SEARCH al instanciar.
class GenericStructureEntity extends GenericBaseEntity {
    constructor(entityName, structure = {}) {
        super('test');
        this.entityName = entityName;
        this.structure = structure;
    }

    getEntityName() {
        return this.entityName;
    }

    getStructure() {
        return this.structure;
    }
}

class UIManager {
    constructor({ formRenderer = null, validationManager = null, structures = {} } = {}) {
        this.formRenderer = formRenderer || (typeof DOMFormTableBuilder === 'function' ? new DOMFormTableBuilder() : null);
        this.validationManager = validationManager || (typeof Validations === 'function' ? new Validations() : null);
        this.registeredStructures = structures;
        this.currentEntity = null;
        this.currentStructure = null;
        this.currentAction = null;
    }

    /**
     * Punto de entrada principal desde el menú. Carga la entidad y muestra la vista de búsqueda.
     * @param {string} entityName Nombre lógico de la entidad.
     */
    loadEntity(entityName) {
        if (!entityName) return;

        this.currentEntity = this.instantiateEntity(entityName);
        window.entidad = this.currentEntity; // compatibilidad con botones existentes
        this.currentStructure = this.resolveStructure(entityName, this.currentEntity);

        this.refreshSearchView();
    }

    instantiateEntity(entityName) {
        const candidates = [entityName, this.capitalize(entityName)];
        for (const candidate of candidates) {
            const EntityClass = window[candidate];
            if (typeof EntityClass === 'function') {
                try {
                    return new EntityClass();
                } catch (error) {
                    console.warn(`No se pudo instanciar ${candidate}:`, error);
                }
            }
        }

        const fallbackStructure = this.getGeneralStructure(entityName);
        return new GenericStructureEntity(entityName, fallbackStructure);
    }

    resolveStructure(entityName, entityInstance) {
        if (entityInstance && typeof entityInstance.getStructure === 'function') {
            try {
                return entityInstance.getStructure();
            } catch (error) {
                console.warn('Error obteniendo la estructura de la entidad concreta:', error);
            }
        }

        return this.getGeneralStructure(entityName) || { entity: entityName, attributes: {} };
    }

    getGeneralStructure(entityName) {
        const key = `estructura_${entityName?.toLowerCase?.()}`;
        if (this.registeredStructures[key]) return this.registeredStructures[key];
        if (typeof window !== 'undefined' && window[key]) return window[key];
        return null;
    }

    capitalize(value) {
        if (!value) return '';
        return value.charAt(0).toUpperCase() + value.slice(1);
    }

    refreshSearchView(payload = null) {
        this.refreshAction('SEARCH', payload);
    }

    refreshAddView(payload = null) {
        this.refreshAction('ADD', payload);
    }

    refreshEditView(payload = null) {
        this.refreshAction('EDIT', payload);
    }

    refreshShowCurrentView(payload = null) {
        this.refreshAction('SHOWCURRENT', payload);
    }

    refreshAction(action, payload = null) {
        this.currentAction = action;

        const entityFormMethod = this.getEntityFormMethod(action);
        if (entityFormMethod) {
            entityFormMethod(payload);
        } else if (this.formRenderer && typeof this.formRenderer.renderAction === 'function') {
            this.formRenderer.renderAction(action, this.currentStructure, payload, this.currentEntity);
        } else if (!this.renderWithBuilder(action, payload)) {
            this.renderPlaceholder(action);
        }

        this.attachValidationHooks(action);
    }

    renderWithBuilder(action, payload = null) {
        if (!this.formRenderer || typeof this.formRenderer.createForm !== 'function') return false;
        const container = document.getElementById('contenedor_IU_form');
        if (!container) return false;

        this.formRenderer.createForm(container, this.currentStructure, action, payload || {});
        return true;
    }

    getEntityFormMethod(action) {
        if (!this.currentEntity) return null;
        const methodName = `createForm_${action}`;
        if (typeof this.currentEntity[methodName] === 'function') {
            return this.currentEntity[methodName].bind(this.currentEntity);
        }
        return null;
    }

    renderPlaceholder(action) {
        const container = document.getElementById('contenedor_IU_form');
        if (!container) return;

        const title = document.getElementById('class_contenido_titulo_form');
        if (title) {
            title.textContent = `${this.currentAction || action} - ${this.currentStructure?.entity || ''}`;
        }

        container.innerHTML = '';
        const info = document.createElement('div');
        info.className = 'ui-manager__placeholder';
        info.innerHTML = `
            <p>Render ${action} para <strong>${this.currentStructure?.entity || 'entidad sin nombre'}</strong>.</p>
            <p>Se usarán las estructuras dinámicas cuando estén disponibles.</p>
        `;
        container.appendChild(info);

        const form = document.createElement('form');
        form.id = 'form_iu';
        container.appendChild(form);
    }

    attachValidationHooks(action) {
        if (!this.validationManager) return;
        const form = document.querySelector('#contenedor_IU_form form') || document.getElementById('form_iu');
        if (!form) return;

        if (form.dataset.uiManagerValidationAttached === 'true') return;
        form.dataset.uiManagerValidationAttached = 'true';

        const formElements = form.querySelectorAll('input[data-attribute-name], select[data-attribute-name], textarea[data-attribute-name]');
        formElements.forEach((element) => {
            const attributeName = element.dataset.attributeName;
            const rulesForAction = this.currentStructure?.attributes?.[attributeName]?.rules?.validations?.[action];
            if (!rulesForAction) return;

            const handler = () => this.validateFieldOnEvent(element, attributeName, action);
            element.addEventListener('blur', handler);
            element.addEventListener('change', handler);
        });

        form.addEventListener('submit', (event) => {
            const validationResult = this.validateFormOnSubmit(form, action);
            if (!validationResult.isValid) {
                event.preventDefault();
                this.showGlobalErrorSummary(validationResult.errors, action);
                if (validationResult.firstInvalidElement) {
                    validationResult.firstInvalidElement.focus();
                }
                return;
            }

            event.preventDefault();

            this.hideGlobalErrorSummary();

            const formData = this.collectFormData(form);
            console.log(`Formulario válido para acción ${action}`, formData);
            this.showSuccessMessage(action);

            // Reenvía el submit nativo para ejecutar la acción definida en el formulario
            // (por ejemplo, javascript:entidad.ADD()). form.submit() no dispara de nuevo
            // los manejadores de submit, evitando recursión.
            form.submit();
        }, true);
    }

    validateFormOnSubmit(form, action) {
        const formElements = Array.from(form.querySelectorAll('input[data-attribute-name], select[data-attribute-name], textarea[data-attribute-name]'));
        const processedAttributes = new Set();
        const errors = [];
        let firstInvalidElement = null;

        formElements.forEach((element) => {
            const attributeName = element.dataset.attributeName;
            if (!attributeName || processedAttributes.has(attributeName)) return;

            processedAttributes.add(attributeName);
            const validationResult = this.validateFieldOnEvent(element, attributeName, action) || { isValid: true, errorCodes: [] };

            if (!validationResult.isValid) {
                errors.push({ attributeName, errorCodes: validationResult.errorCodes });
                if (!firstInvalidElement) {
                    firstInvalidElement = element;
                }
            }
        });

        return { isValid: errors.length === 0, errors, firstInvalidElement };
    }

    validateCurrentAction(form, action) {
        const structure = this.currentStructure;
        if (!structure || !structure.attributes) return true;

        let isValid = true;
        Object.entries(structure.attributes).forEach(([attributeName, config]) => {
            const actionRules = config?.rules?.validations?.[action];
            if (!actionRules) return;

            const field = form.elements[attributeName];
            const fieldId = field?.id || attributeName;

            Object.entries(actionRules).forEach(([ruleName, ruleValue]) => {
                if (ruleName === 'personalized') return;
                const validator = this.validationManager[ruleName];
                if (typeof validator !== 'function') return;

                const normalizedValue = Array.isArray(ruleValue)
                    ? ruleValue.map((rule) => rule[ruleName] ?? rule)
                    : ruleValue;

                const values = Array.isArray(normalizedValue) ? normalizedValue : [normalizedValue];
                values.forEach((singleRule) => {
                    const result = validator.call(this.validationManager, fieldId, singleRule);
                    if (result === false) {
                        isValid = false;
                    }
                });
            });

            if (actionRules.personalized && this.currentEntity?.hasSpecializedTest?.(attributeName)) {
                const value = field?.value;
                const specializedResult = this.currentEntity.runSpecializedTest(attributeName, action, value);
                if (!specializedResult) {
                    isValid = false;
                }
            }
        });

        return isValid;
    }

    validateFieldOnEvent(formElement, attributeName, action) {
        const rulesForAction = this.currentStructure?.attributes?.[attributeName]?.rules?.validations?.[action];
        if (!rulesForAction || !this.validationManager) return { isValid: true, errorCodes: [] };

        const value = this.extractFieldValue(formElement, attributeName);
        const validationResult = this.validationManager.validateValueAgainstRules(value, rulesForAction);

        this.showValidationResult(formElement, attributeName, validationResult.errorCodes);

        if (rulesForAction.personalized) {
            // TODO: invocar specialized_test_<atributo>(accion, valor) en la entidad concreta cuando esté disponible.
        }

        return validationResult;
    }

    extractFieldValue(formElement, attributeName) {
        const form = formElement.form || formElement.closest('form');
        const relatedElements = form?.querySelectorAll(`[data-attribute-name="${attributeName}"]`) || [formElement];
        const firstElement = relatedElements[0] || formElement;

        if (firstElement.type === 'radio') {
            const checked = Array.from(relatedElements).find((input) => input.checked);
            return checked ? checked.value : '';
        }

        if (firstElement.type === 'checkbox') {
            return Array.from(relatedElements)
                .filter((input) => input.checked)
                .map((input) => input.value);
        }

        if (firstElement.tagName === 'SELECT' && firstElement.multiple) {
            return Array.from(firstElement.selectedOptions).map((option) => option.value);
        }

        if (firstElement.type === 'file') {
            return firstElement.files?.[0] || null;
        }

        return firstElement.value;
    }

    showValidationResult(formElement, attributeName, errorCodes) {
        const form = formElement.form || formElement.closest('form');
        const relatedElements = form?.querySelectorAll(`[data-attribute-name="${attributeName}"]`) || [formElement];
        const fieldWrapper = formElement.closest('.form-group') || formElement.parentElement;
        let errorContainer = fieldWrapper?.querySelector('.field-error-messages');

        if (!errorContainer) {
            errorContainer = document.createElement('div');
            errorContainer.classList.add('field-error-messages');
            if (fieldWrapper) {
                fieldWrapper.appendChild(errorContainer);
            }
        }

        if (errorCodes.length > 0) {
            relatedElements.forEach((element) => {
                element.classList.add('input-error');
                element.classList.remove('input-ok');
            });
            errorContainer.textContent = errorCodes.join(', ');
        } else {
            relatedElements.forEach((element) => {
                element.classList.remove('input-error');
                element.classList.add('input-ok');
            });
            if (errorContainer) {
                errorContainer.textContent = '';
            }
        }
    }

    showGlobalErrorSummary(errors, action) {
        const modal = document.getElementById('error_action_modal');
        const overlay = document.getElementById('modal_action_overlay');
        const messageContainer = document.getElementById('error_action_msg');

        if (!modal || !overlay || !messageContainer) return;

        messageContainer.innerHTML = '';

        const title = document.createElement('p');
        title.textContent = `Se han encontrado errores al validar la acción ${action}.`;
        const list = document.createElement('ul');

        errors.forEach(({ attributeName, errorCodes }) => {
            const item = document.createElement('li');
            item.textContent = `${attributeName}: ${errorCodes.join(', ')}`;
            list.appendChild(item);
        });

        messageContainer.appendChild(title);
        messageContainer.appendChild(list);

        modal.style.display = 'block';
        overlay.style.display = 'block';
    }

    hideGlobalErrorSummary() {
        const modal = document.getElementById('error_action_modal');
        const overlay = document.getElementById('modal_action_overlay');
        const messageContainer = document.getElementById('error_action_msg');

        if (messageContainer) {
            messageContainer.innerHTML = '';
        }

        if (modal) modal.style.display = 'none';
        if (overlay) overlay.style.display = 'none';
    }

    collectFormData(form) {
        const data = {};
        const elements = Array.from(form.querySelectorAll('input[data-attribute-name], select[data-attribute-name], textarea[data-attribute-name]'));
        const processed = new Set();

        elements.forEach((element) => {
            const attributeName = element.dataset.attributeName;
            if (!attributeName || processed.has(attributeName)) return;

            processed.add(attributeName);
            data[attributeName] = this.extractFieldValue(element, attributeName);
        });

        return data;
    }

    showSuccessMessage(action) {
        const container = document.querySelector('#contenedor_IU_form .form-global-message') || document.createElement('div');
        container.className = 'form-global-message form-global-message--success';
        container.textContent = `Formulario válido para la acción ${action}.`;

        const wrapper = document.getElementById('contenedor_IU_form');
        if (wrapper && !wrapper.contains(container)) {
            wrapper.prepend(container);
        }
    }
}

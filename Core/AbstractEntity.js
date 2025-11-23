// Aviso: Clase experimental/no usada en el flujo oficial de ET3; la solución actual utiliza Base/EntidadAbstracta.js como base de entidades.
/**
 * Clase base abstracta para cualquier entidad gestionada por la aplicación.
 * Define el contrato mínimo que deben cumplir las entidades concretas.
 */
class AbstractEntity {
    constructor() {
        if (new.target === AbstractEntity) {
            throw new Error('AbstractEntity es abstracta y no puede instanciarse directamente.');
        }
    }

    /**
     * Obtiene el nombre lógico de la entidad.
     * Las subclases deben devolver el identificador que se usa para localizar su estructura.
     *
     * @returns {string} Nombre de la entidad.
     * @throws {Error} Si la clase concreta no implementa el método.
     */
    getEntityName() {
        throw new Error('Las clases hijas deben implementar getEntityName() para devolver el nombre de la entidad.');
    }

    /**
     * Devuelve la estructura completa de la entidad.
     * Debe incluir la definición del objeto con propiedades como entity, attributes y rules.
     *
     * @returns {Object} Estructura de la entidad.
     * @throws {Error} Si la clase concreta no implementa el método.
     */
    getStructure() {
        throw new Error('Las clases hijas deben implementar getStructure() para devolver la estructura de la entidad.');
    }

    /**
     * Genera el nombre del método de validación personalizada para un atributo.
     * Se usa para localizar funciones con formato specialized_test_nombreAtributo.
     *
     * @param {string} attributeName Nombre del atributo a validar.
     * @returns {string} Nombre del método esperado.
     * @throws {Error} Si no se proporciona un nombre de atributo.
     */
    getSpecializedTestMethodName(attributeName) {
        if (!attributeName) {
            throw new Error('Debe indicarse un nombre de atributo para construir el método de validación personalizada.');
        }
        return `specialized_test_${attributeName}`;
    }

    /**
     * Comprueba si existe una validación personalizada definida para un atributo.
     *
     * @param {string} attributeName Nombre del atributo a validar.
     * @returns {boolean} True si la subclase define el método specialized_test correspondiente.
     */
    hasSpecializedTest(attributeName) {
        const methodName = this.getSpecializedTestMethodName(attributeName);
        return typeof this[methodName] === 'function';
    }

    /**
     * Ejecuta la validación personalizada para un atributo cuando se solicita desde las reglas.
     *
     * @param {string} attributeName Nombre del atributo que requiere validación personalizada.
     * @param {string} action Acción actual (ADD, EDIT, SEARCH, etc.).
     * @param {*} value Valor a validar.
     * @returns {boolean} Resultado de la validación especializada.
     * @throws {Error} Si la subclase no implementa el método especializado solicitado.
     */
    runSpecializedTest(attributeName, action, value) {
        const methodName = this.getSpecializedTestMethodName(attributeName);
        if (typeof this[methodName] !== 'function') {
            throw new Error(`La clase ${this.constructor.name} debe implementar ${methodName} para validar ${attributeName}.`);
        }
        return this[methodName](action, value);
    }
}

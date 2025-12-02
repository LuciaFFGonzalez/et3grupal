class LanguageManager {
    constructor({ defaultLanguage = 'ES', translations = null, errorMessages = null } = {}) {
        this.defaultLanguage = defaultLanguage;
        this.translations = translations || this.buildDefaultTranslations();
        this.errorMessages = errorMessages || this.buildDefaultErrorMessages();
        this.currentLanguage = null;
        this.changeListeners = [];
        this.registeredElements = [];
    }

    buildDefaultTranslations() {
        return {
            ES: typeof textos_ES !== 'undefined' ? textos_ES : {},
            EN: typeof textos_EN !== 'undefined' ? textos_EN : {}
        };
    }

    buildDefaultErrorMessages() {
        return typeof textos_comunes !== 'undefined' ? textos_comunes : {};
    }

    getActiveLanguage() {
        if (this.currentLanguage) return this.currentLanguage;
        if (typeof getCookie === 'function') {
            const cookieLang = getCookie('lang');
            if (cookieLang) return cookieLang;
        }
        return this.defaultLanguage;
    }

    setLanguage(langCode) {
        const langToSet = langCode || this.defaultLanguage;
        if (typeof setLang === 'function') {
            setLang(langToSet);
        }
        this.currentLanguage = langToSet;
        this.refreshRegisteredTranslations();
        this.notifyLanguageChange(langToSet);
        return this.currentLanguage;
    }

    setLang(langCode) {
        return this.setLanguage(langCode);
    }

    registerTranslationElement(element, key, fallbackText = '', property = 'textContent') {
        if (!element || !key) return;

        const entry = { element, key, fallbackText, property };
        this.registeredElements.push(entry);
        this.applyTranslation(entry);
    }

    applyTranslation({ element, key, fallbackText, property }) {
        if (!element) return;
        const translated = this.getText(key);
        const resolvedText = translated === key && fallbackText ? fallbackText : translated;
        element[property] = resolvedText || fallbackText || key;
    }

    refreshRegisteredTranslations() {
        this.registeredElements = this.registeredElements.filter(({ element }) => element && element.isConnected);
        this.registeredElements.forEach((entry) => this.applyTranslation(entry));
    }

    onLanguageChange(callback) {
        if (typeof callback === 'function') {
            this.changeListeners.push(callback);
        }
    }

    notifyLanguageChange(langCode) {
        this.changeListeners.forEach((listener) => {
            try {
                listener(langCode);
            } catch (error) {
                console.warn('Error notifying language change', error);
            }
        });
    }

    getTranslations(langCode = null) {
        const lang = langCode || this.getActiveLanguage();
        return this.translations[lang] || this.translations[this.defaultLanguage] || {};
    }

    getText(key, langCode = null) {
        if (!key) return '';

        const activeTranslations = this.getTranslations(langCode || undefined);
        if (Object.prototype.hasOwnProperty.call(activeTranslations, key)) {
            return activeTranslations[key];
        }

        const defaultTranslations = this.getTranslations(this.defaultLanguage);
        if (Object.prototype.hasOwnProperty.call(defaultTranslations, key)) {
            return defaultTranslations[key];
        }

        return key;
    }

    getErrorMessage(errorCode) {
        if (!errorCode) return '';

        const lang = this.getActiveLanguage();
        const localizedCode = this.buildLocalizedErrorCode(errorCode, lang);
        const baseCode = this.stripLanguageSuffix(errorCode);
        const activeErrors = (this.errorMessages && this.errorMessages[lang]) || {};
        const defaultErrors = (this.errorMessages && this.errorMessages[this.defaultLanguage]) || {};

        const resolvedMessage = this.resolveErrorDictionaryMessage(
            localizedCode,
            baseCode,
            activeErrors,
            defaultErrors
        ) || this.resolveErrorFromTranslations(localizedCode, baseCode, lang);

        if (resolvedMessage) {
            return `${localizedCode}: ${resolvedMessage}`;
        }

        return localizedCode;
    }

    formatErrorMessage(errorCode, langCode = null) {
        if (!errorCode) return '';

        const lang = langCode || this.getActiveLanguage();
        const localizedCode = this.buildLocalizedErrorCode(errorCode, lang);
        const translation = this.getText(localizedCode) || this.getText(errorCode);
        const resolvedMessage = translation && translation !== localizedCode && translation !== errorCode
            ? translation
            : errorCode;

        return `${localizedCode}: ${resolvedMessage}`;
    }

    buildLocalizedErrorCode(errorCode, langCode = null) {
        const lang = (langCode || this.getActiveLanguage() || this.defaultLanguage || 'ES').toUpperCase();
        const baseCode = this.stripLanguageSuffix(errorCode);
        return `${baseCode}-${lang}`;
    }

    stripLanguageSuffix(errorCode) {
        if (!errorCode) return '';
        const match = `${errorCode}`.match(/^(.*?)(-[A-Za-z]{2})$/);
        return match ? match[1] : `${errorCode}`;
    }

    resolveErrorDictionaryMessage(localizedCode, baseCode, activeErrors, defaultErrors) {
        if (Object.prototype.hasOwnProperty.call(activeErrors, localizedCode)) {
            return activeErrors[localizedCode];
        }
        if (Object.prototype.hasOwnProperty.call(activeErrors, baseCode)) {
            return activeErrors[baseCode];
        }
        if (Object.prototype.hasOwnProperty.call(defaultErrors, localizedCode)) {
            return defaultErrors[localizedCode];
        }
        if (Object.prototype.hasOwnProperty.call(defaultErrors, baseCode)) {
            return defaultErrors[baseCode];
        }
        return '';
    }

    resolveErrorFromTranslations(localizedCode, baseCode, lang) {
        const translationFromTexts = this.getText(localizedCode, lang);
        if (translationFromTexts && translationFromTexts !== localizedCode) {
            return translationFromTexts;
        }

        const fallbackFromBase = this.getText(baseCode, lang);
        if (fallbackFromBase && fallbackFromBase !== baseCode) {
            return fallbackFromBase;
        }
        return '';
    }
}

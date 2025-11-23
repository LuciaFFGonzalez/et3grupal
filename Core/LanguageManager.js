class LanguageManager {
    constructor({ defaultLanguage = 'ES', translations = null, errorMessages = null } = {}) {
        this.defaultLanguage = defaultLanguage;
        this.translations = translations || this.buildDefaultTranslations();
        this.errorMessages = errorMessages || this.buildDefaultErrorMessages();
        this.currentLanguage = null;
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
        return this.currentLanguage;
    }

    getTranslations(langCode = null) {
        const lang = langCode || this.getActiveLanguage();
        return this.translations[lang] || this.translations[this.defaultLanguage] || {};
    }

    getText(key) {
        if (!key) return '';
        const activeTranslations = this.getTranslations();
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
        const activeErrors = (this.errorMessages && this.errorMessages[lang]) || {};
        const defaultErrors = (this.errorMessages && this.errorMessages[this.defaultLanguage]) || {};

        if (Object.prototype.hasOwnProperty.call(activeErrors, errorCode)) {
            return activeErrors[errorCode];
        }
        if (Object.prototype.hasOwnProperty.call(defaultErrors, errorCode)) {
            return defaultErrors[errorCode];
        }

        const fallbackFromTexts = this.getText(errorCode);
        if (fallbackFromTexts && fallbackFromTexts !== errorCode) {
            return fallbackFromTexts;
        }

        return `${errorCode}-${lang}`;
    }
}

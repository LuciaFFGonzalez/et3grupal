// Clase general de gestión de la interfaz para ET3.
// Se encarga de coordinar el idioma y de inicializar bloques dinámicos comunes.
class GeneralUIManager {
    constructor(defaultLanguage = 'ES') {
        this.defaultLanguage = defaultLanguage;
        this.languageManager = typeof LanguageManager === 'function'
            ? new LanguageManager({ defaultLanguage })
            : null;
    }

    initDefaultLanguage(language) {
        const langToSet = language || this.defaultLanguage;
        if (this.languageManager && typeof this.languageManager.setLanguage === 'function') {
            this.languageManager.setLanguage(langToSet);
        } else if (typeof setLang === 'function') {
            setLang(langToSet);
        }
    }

    renderTeamData(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const dataset = typeof def_datos_NombreEquipo !== 'undefined' ? def_datos_NombreEquipo : [];
        // La tabla se genera dinámicamente desde def_datos_NombreEquipo para cumplir el requisito ET3.
        if (!Array.isArray(dataset) || dataset.length === 0) {
            container.innerHTML = '<p class="team-data__empty">No hay datos del equipo disponibles.</p>';
            return;
        }

        const table = document.createElement('table');
        table.className = 'team-data__table bordeado';

        const headerRow = document.createElement('tr');
        ['Entrega', 'Nombre', 'DNI', 'Horas'].forEach((label) => {
            const th = document.createElement('th');
            th.textContent = label;
            headerRow.appendChild(th);
        });
        table.appendChild(headerRow);

        dataset.forEach(({ entrega, nombre, dni, horas }) => {
            const row = document.createElement('tr');

            [entrega, nombre, dni, horas].forEach((value) => {
                const td = document.createElement('td');
                td.textContent = value ?? '';
                row.appendChild(td);
            });

            table.appendChild(row);
        });

        container.innerHTML = '';
        container.appendChild(table);
    }

    hideInitialSections() {
        const sectionsToHide = [
            'div-menu',
            'Div_IU_form',
            'IU_Test_result_nofile',
            'IU_Test_result_file',
            'Div_IU_Test',
            'IU_manage_entity'
        ];

        sectionsToHide.forEach((sectionId) => {
            const section = document.getElementById(sectionId);
            if (!section) return;

            if (section.classList) {
                section.classList.add('hidden');
            }

            if (sectionId === 'div-menu') {
                section.style.removeProperty('display');
            } else {
                section.style.display = 'none';
            }
        });
    }
}

// Controla la visibilidad del menú lateral.
// Si el menú tiene la clase "hidden" se elimina; en caso contrario, se añade,
// logrando el efecto de mostrar u ocultar el bloque.
function menu_work() {
    const menuElement = document.getElementById('div-menu');
    if (!menuElement || !menuElement.classList) return;

    if (menuElement.classList.contains('hidden')) {
        menuElement.classList.remove('hidden');
    } else {
        menuElement.classList.add('hidden');
    }
}

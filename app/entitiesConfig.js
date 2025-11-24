// Lista centralizada de entidades disponibles en la aplicación.
// Permite añadir nuevas entidades sin tocar el HTML principal.
const entitiesConfig = [
    'persona',
];

// Exponemos también en window para compatibilidad con scripts inline.
if (typeof window !== 'undefined') {
    window.entitiesConfig = entitiesConfig;
}

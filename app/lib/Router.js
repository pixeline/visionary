/* Route configuration */
Router.configure({
    layoutTemplate: 'MasterLayout',
    loadingTemplate: 'Loading',
    notFoundTemplate: 'NotFound'
});

/* Homepage of the application */
Router.route('/', {
    name: 'Home',
    template: 'Home'
});
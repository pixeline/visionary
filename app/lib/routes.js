/* Route configuration */
Router.configure({
    layoutTemplate: 'MasterLayout',
    loadingTemplate: 'Loading',
    notFoundTemplate: 'NotFound'
});

/* Homepage of the application */
Router.route('/', {
    name: 'Index',
    template: 'Index'
});
/* Homepage of the application */
Router.route('/test1', {
    name: 'Test1',
    template: 'Test1'
});
/* Homepage of the application */
Router.route('/test2', {
    name: 'Test2',
    template: 'Test2'
});
/* Homepage of the application */
Router.route('/test3', {
    name: 'Test3',
    template: 'Test3'
});
/* Homepage of the application */
Router.route('/test4', {
    name: 'Test4',
    template: 'Test4'
});
/* Homepage of the application */
Router.route('/test5', {
    name: 'Test5',
    template: 'Test5'
});
/* Homepage of the application */
Router.route('/test6', {
    name: 'Test6',
    template: 'Test6'
});
/* Homepage of the application */
Router.route('/outro', {
    name: 'Outro',
    template: 'Outro'
});
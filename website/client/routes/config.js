/**
 * Created by wrightjt on 10/12/2015.
 */
Router.configure({
    layoutTemplate: 'nav-bar',
    notFoundTemplate: 'notfound',
    loadingTemplate: 'loading'
});

Router.onBeforeAction('dataNotFound');



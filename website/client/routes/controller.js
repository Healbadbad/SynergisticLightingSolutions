Router.route('/', {
        name: 'home',
        template: 'home'
    }
);

Router.route('/test', function() {
    this.render('test');
});

Router.route('/dashboard', {
    name: 'dash',
    template: 'dashboard'
});

Router.route('/guides', {
    name: 'guides',
    template: 'guides'
});

Router.route('/playlist', {
    name: 'playlist',
    template: 'playlist'
});

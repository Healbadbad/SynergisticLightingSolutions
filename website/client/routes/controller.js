Router.route('/', {
        name: 'home',
        template: 'home',
        onBeforeAction: function() {
            if(Meteor.user()) {
                this.layout('navBarLoggedIn');
                Router.go('dash');
                this.next();
            }
            else {
                this.layout('navBar');
            }
            this.next();
        }
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

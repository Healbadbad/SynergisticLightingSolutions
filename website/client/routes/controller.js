Router.route('/', {
        name: 'home',
        template: 'home',
        onBeforeAction: function () {
            if (Meteor.user()) {
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

Router.route('/test', function () {
    this.render('test');
});

Router.route('/homepage', {
    name: 'homepage',
    template: 'homepage',
    layoutTemplate: 'homepageNavbar',

    waitOn: function() {
        Session.set('activeSong', null);
      return [Meteor.subscribe('allPlaylists'), Meteor.subscribe('allSongs')];
    },
    action: function() {
        if(this.ready()) {
            this.render('homepage');
        }
    }
});


Router.route('/dashboard', {
    name: 'dash',
    template: 'dashboard',
    waitOn: function() {
        return Meteor.subscribe('allPlaylists');
    },
    action: function() {
        if(this.ready()) {
            this.render('dashboard');
        }
    }
});



Router.route('/guides', {
    name: 'guides',
    template: 'guides'
});

Router.route('/users', {
    name: 'users',
    template: 'users'
});

Router.route('/playlist/:_id', {
        name: 'playlist',
        template: 'playlist',
        waitOn: function() {
          return [Meteor.subscribe('getPlaylistById', this.params._id),
                  Meteor.subscribe('allSongs')];
        },
        data: function() {
            return {id: this.params._id};
        }
    }
);

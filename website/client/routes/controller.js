Router.plugin('dataNotFound', {notFoundTemplate: 'notfound'});

Router.route('/', function() {
   this.render('home');
});

Router.route('/test', function() {
    this.render('test');
});

Router.route('/dashboard', function() {
    this.render('dashboard')
});

Router.route('/guides', function() {
    this.render('guides');
});

Router.route('/playlist', function() {
   this.render('playlist')
});
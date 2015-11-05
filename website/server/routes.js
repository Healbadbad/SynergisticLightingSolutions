var fs = Npm.require('fs');

Router.route('/songs/:name', function() {

        var path = Npm.require('path');
        var dir = path.resolve("..\\..\\..\\..\\..\\uploads");
        var name = this.params.name;
        var filePath = dir + '\\' + name;
        var data = fs.readFileSync(filePath);
    
        this.response.writeHead(200, {
            'Content-Type': 'audio/mpeg3'
        });
        this.response.write(data);
        this.response.end();

    }, {where: 'server'});

Router.route('/jsondocs/:file', function() {
        var path = Npm.require('path');
        var dir = path.resolve("..\\..\\..\\..\\..\\jsonDocs");
        var file = this.params.file;
        var filePath = dir + '\\' + file;
        var data = fs.readFileSync(filePath);

        //this.response.writeHead(200, {
        //        'Content-Type': ''
        //});
        this.response.write(data);
        this.response.end();

}, {where: 'server'});

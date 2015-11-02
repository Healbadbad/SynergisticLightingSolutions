/**
 * Created by Jeremy on 10/28/2015.
 */
//Router.route('/songs/:mp3', function() {
//    var mp3 = this.params.mp3;
//
//    console.log("HOLY");
//    var fs = Npm.require('fs');
//    console.log(process.env.PWD);
//    this.response.end(fs.readFileSync(process.env.PWD + '/uploads/mp3s-SkfovEDoYAKXRcTNh-Baby Baby Goodbye.mp3'));
//
//}, {where: 'server'});
var fs = Npm.require('fs');
Router.map(function() {
    this.route('serverFile', {
        where: 'server',
        path: /^\/songs\/(.*)$/,
        action: function() {
            var path = Npm.require('path');
            var dir = path.resolve("..\\..\\..\\..\\..\\uploads");
            var filePath = dir + '\\' + 'Butterfly.mp3';//this.params[1];
            var data = fs.readFileSync(filePath);
            this.response.writeHead(200, {
                'Content-Type': 'audio/mpeg3'
            });
            this.response.write(data);
            this.response.end();
        }
    });
});
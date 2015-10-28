/**
 * Created by Jeremy on 10/28/2015.
 */
Router.route('/songs/:mp3', function() {
    var mp3 = this.params.mp3;

    console.log("HOLY");
    var fs = Npm.require('fs');
    console.log(process.env.PWD);
    this.response.end(fs.readFileSync(process.env.PWD + '/uploads/mp3s-SkfovEDoYAKXRcTNh-Baby Baby Goodbye.mp3'));

}, {where: 'server'});
///**
// * Created by Jeremy on 11/4/2015.
// */
//var opc_client = Npm.require('open-pixel-control');
//
//
////var sys = require('sys');
////var exec = require('child_process').exec;
////function puts(error, stdout, stderr) { sys.puts(stdout)
////sys.puts(stderr)}
//
//
//
//var client = new opc_client({address:'192.168.7.2',port:7890});
//client.on('connected',function(){
//    var strip = client.add_strip({length:600});
//});
//
//
//
//client.connect();
//var pixels_main = [];
//var pixels_temp = [];
//for(var i=0;i<600;i++){
//    pixels_main[i]  = [180,255,255];
//    pixels_temp[i]  = [180,255,255];
//}
//
////setTimeout(function(){client.put_pixels(0,pixels_main);},1000)
//
//
////Refresh rate of the LED's
////setInterval(function(){client.put_pixels(0,pixels_main)},16)
////
////function fade(r1,g1,b1,r,g,b,t){
////        console.log("fade being called %d %d %d %d %d %d",r1,g1,b1,r,g,b)
////        var temp = [r,g,b]
////        //for(var i=0; i<600;i++){
////        //      pixels_temp[i] = [r,g,b]
////        //}
////
////        dr = r-r1;
////        dg = g-g1;
////        db = b-b1;
////        console.log("Changes: %d %d %d",dr,dg,db)
////        mag = Math.max(Math.abs(dr),Math.abs(db),Math.abs(dg));
////        console.log(mag)
////        var colors_temp =[]
////        var tr,tg,tb
////        for(var i =0;i<mag;i++){
////                //increment the colors every timestep
////                tr = parseInt(r1+(dr*i*1.0/mag))
////                tg = parseInt(g1+(dg*i*1.0/mag))
////                tb = parseInt(b1+(db*i*1.0/mag))
////                colors_temp[i] = i
////                //console.log(colors_temp)
////                timeoutColors(tr,tg,tb,i*t*1000.0/mag)
////        }
////        setTimeout(function(){setColorSolid(r,g,b);console.log("fade complete")},t*1000);
//////      console.log("fade complete")
////}
////
////function timeoutColors(r,g,b,t){
////        setTimeout(function(){setColorSolid(r,g,b)},t)
////}
//
//
////set all of the LED's to a single color
//Meteor.methods({
//    setColorSolid: function (r, g, b) {
//
//        //        console.log("setting solid color: %d %d %d",r,g,b)
//        var temp = [r, g, b];
//        for (var i = 0; i < 600; i++) {
//            pixels_main[i][0] = temp[0];
//            pixels_main[i][1] = temp[1];
//            pixels_main[i][2] = temp[2];
//
//        }
//        client.put_pixels(0, pixels_main);
//
//    }
//});
////module.exports.setColorSolid = setColorSolid;

var express = require('express'); var app = express();
var opc_client = require('open-pixel-control');


var sys = require('sys')
var exec = require('child_process').exec; 
function puts(error, stdout, stderr) { sys.puts(stdout)
sys.puts(stderr)}
//setTimeout(function(){
//	exec("cd /opt/LEDscape")
//	exec("/opt/LEDscape/./opc-server --strip-count 2 --count 300 --mode ws281x -D none", puts)
//	exec("cd /home/leds/")
//},3000);



var client = new opc_client({address:'192.168.7.2',port:7890});
client.on('connected',function(){
	var strip = client.add_strip({length:600})
});



client.connect();
var pixels_main = [];
var pixels_temp = [];
for(var i=0;i<600;i++){
	pixels_main[i]  = [180,255,255]
	pixels_temp[i]  = [180,255,255]
	//console.log(pixels.length)
}

setTimeout(function(){client.put_pixels(0,pixels_main);},1000)


//Fulfill GET requests, UI maybe?
app.get('/:color', function(req,res){
	//console.log('get req')
	console.log(req.params)
	//console.log(req.params.color)	
	var command = req.params.color;

//Set Solid Color
	if(command[0] == '$'){
		console.log("Change them all!");
		var temp =[ parseInt(command.slice(1,3),16),
		parseInt(command.slice(3,5),16),
		parseInt(command.slice(5,7),16)]
		setColorSolid(temp[0],temp[1],temp[2])
/*		for(var i =0;i<600;i++){
			pixels_main[i][0] = temp[0]
			pixels_main[i][1] = temp[1]
			pixels_main[i][2] = temp[2]
		}*/
		console.log(temp)
	}

//Color Fading back to current
	if(command[0] == '&'){
		
                console.log("Fade them all!");
                var temp =[ parseInt(command.slice(1,3),16),
                parseInt(command.slice(3,5),16),
                parseInt(command.slice(5,7),16)]
                fade(temp[0],temp[1],temp[2],
		pixels_main[0][0],pixels_main[0][1],pixels_main[0][2],2)
                console.log(temp)
        }


	var response = "lights are: "+command;
	res.status(200).send(response)
	
});


//bullshit
app.post('/',function(req,res){
	console.log('post req')
	console.log(req.body);
	console.log(req.params);
	console.log(req.query);
	res.sendStatus(200);
});


var server = app.listen(666, function(){
	var host = server.address().address
	var port = server.address().port
	
	console.log('App listening on LIES:%s',port);

	
})
//console.log('do we run here?')
//console.log(client)


//Refresh rate of the LED's
setInterval(function(){client.put_pixels(0,pixels_main)},16)

function fade(r1,g1,b1,r,g,b,t){
	console.log("fade being called %d %d %d %d %d %d",r1,g1,b1,r,g,b)
	var temp = [r,g,b]
	//for(var i=0; i<600;i++){
	//	pixels_temp[i] = [r,g,b]
	//}

	dr = r-r1;
	dg = g-g1;
	db = b-b1;
	console.log("Changes: %d %d %d",dr,dg,db)
	mag = Math.max(Math.abs(dr),Math.abs(db),Math.abs(dg));
	console.log(mag)
	var colors_temp =[]
	var tr,tg,tb
	for(var i =0;i<mag;i++){
		//increment the colors every timestep
		tr = parseInt(r1+(dr*i*1.0/mag))
		tg = parseInt(g1+(dg*i*1.0/mag))
		tb = parseInt(b1+(db*i*1.0/mag))
		colors_temp[i] = i
		//console.log(colors_temp)
		timeoutColors(tr,tg,tb,i*t*1000.0/mag)
	}	
	setTimeout(function(){setColorSolid(r,g,b);console.log("fade complete")},t*1000);
//	console.log("fade complete")	
}

function timeoutColors(r,g,b,t){
	setTimeout(function(){setColorSolid(r,g,b)},t)
}


//set all of the LED's to a single color
function setColorSolid(r,g,b){
//	console.log("setting solid color: %d %d %d",r,g,b)
	var temp = [r,g,b]
        for(var i=0; i<600;i++){
                pixels_main[i][0] = temp[0]
                pixels_main[i][1] = temp[1]
                pixels_main[i][2] = temp[2]

        }
}

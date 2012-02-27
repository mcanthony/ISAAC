//IMPORTANT
//Distance = Mm (Megameter = 1000Km)

//Correct place for declarations?
var earthOrbit = {
	"semiMajor" = 149598.261,//Remove the tail?
	"semiMinor" = 148343.009,//Remove the Tail?
	"pointSize" = 5000
};
var angularStep = pi/360;

function makePoint(x, y){
	var thing = Sphere();
	thing.motion.position = [x,y,0];
	thing.physical.radius = earthOrbit.pointSize;
	Queue.add(thing);
}

function drawEarthOrbit(){
	var x,y;
	for(var i=0;i<2*pi;i+=angularStep){
		x=earthOrbit.semiMajor * i;
		y=earthOrbit.semiMinor * i;
		markPoint(x,y);
	}
};

//For testing purposes
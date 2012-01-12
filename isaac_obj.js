if (typeof Object.create !== 'function') {
	Object.create = function (o) {
		var F = function () {};
		F.prototype = o;
		return new F();
	};
};

var PhysicalObject = {
	"motion": {
		"position": [0,0,0], //Will vector be created as a new object that contains an array? or will it simply be an array, and the only new stuff will be vector manipulation methods that use arrays?
		"velocity": [0,0,0],
		"acceleration": [0,0,0]
		
		// J (12/01/12): Vectors right now are arrays, unless we want them to be otherwise.
	},
	"switches": {
		"in_contact": false,
		"motion_enabled": false,
		"acceleration_enabled": false,
		"friction_enabled": this.in_contact //Correct syntax? Logically correct?
		//in_contact and friction_enabled have been linked because MOST PROBABLY the (presence of friction)
		//and (contact with another body) are equivalent, but it MAY NOT BE THE CASE
		
		// J: this.in_contact looks OK. My interpretation of the code is that the current scope is the "switches"
		// object, so "this" should refer to it. Needs testing to be sure, though.
	}
};



/////////////////////////
//TEST OBJECTS
/////////////////////////

var MovableBall = Object.create(PhysicalObject);
MovableBall.motion.position = [1,2,3];
MovableBall.motion.acceleration = [1,2,3];
MovableBall.switches.motion_enabled = true;
MovableBall.switches.acceleration_enabled = true;

var FixedBall = Object.create(PhysicalObject);
FixedBall.motion.velocity = [100,2,3];

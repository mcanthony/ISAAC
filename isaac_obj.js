if (typeof Object.create !== 'function') {
	Object.create = function (o) {
		var F = function () {};
		F.prototype = o;
		return new F();
	};
};

function Force (name, vector) {
	return {
		"name" : name,
		"act" : function (obj) {
			if (typeof obj.forceStore[name] !== 'object') {
				obj.forceStore[name] = vector;
				obj.switches.forceChanged = true;
			}
		},
		"stop" : function (obj) {
			if (typeof obj.forceStore[name] === 'object') {
				delete obj.forceStore[name];
				obj.switches.forceChanged = true;
			}
		}
	};
}

function PhysicalObject () {
	return {
		// Physical properties relating to the object.
		"physical" : {
			"mass" : 1 // Mass of the object, in kilograms.
		},
		"forceStore" : {
			// External forces on the object will be kept here.
		},
		
		// The resultant force on the object. Calculated at runtime.
		"resultantForce" : [0, 0, 0],
		
		"motion": {
			"position" : [0, 0, 0], //Will vector be created as a new object that contains an array? or will it simply be an array, and the only new stuff will be vector manipulation methods that use arrays?
			"velocity" : [0, 0, 0],
			
			// The acceleration vector of the object, including gravity (if enabled).
			"acceleration": [0, 0, 0]
			
			
			// J (12/01/12): Vectors right now are arrays, unless we want them to be otherwise.
		},
		"switches": {
			"inContact" : false,
			"motionEnabled" : false,
			"accelerationEnabled" : false,
			"gravityEnabled" : false,
			"frictionEnabled" : this.inContact,
			"forceChanged" : false
		}
	};
};
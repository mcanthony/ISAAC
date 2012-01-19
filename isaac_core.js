// Move this to a configuration script file.
var timeStep = 1.0; // Time in seconds.
var gravityForce = Force("Gravity", [0, 0, -9.8]); // Force of gravity within the environment, in Newtons per Kilogram.

// Main logic module for ISAAC Physics.

function displayProperties (obj) {
	for(name in obj) {
		console.log("Property: " + name + " Value: " + obj[name]);
	}
	console.log("\n");
}

// Movement Module.
// Calls all other modules to modify an object's properties with regard to motion.
function movementModule (obj) {
	if(obj.switches.motionEnabled) {
		var gravityChanged = gravityModule(obj);
		var forceChanged = forceModule(obj);
		var accelerationChanged = accelerationModule(obj);
		var velocityChanged = velocityModule(obj);
		if (velocityChanged || accelerationChanged || gravityChanged || forceChanged) {
			return true;
		}
	}
	return false;
}

// Velocity Module.
// Adjusts the position of the object, based on the velocity vector.
function velocityModule (obj) {
	if (obj.switches.motionEnabled) {
//		obj.Position.posX += (obj.Position.velX * timeStep);
//		obj.Position.posY += (obj.Position.velY * timeStep);
//		obj.Position.posZ += (obj.Position.velZ * timeStep);
		obj.motion.position = addVector(obj.motion.position, scaleVector(obj.motion.velocity, timeStep));
		return true;
	}
	return false;
}

// Acceleration Module.
// Adjusts the velocity of the object, based on the acceleration vector.
function accelerationModule (obj) {
	if (obj.switches.accelerationEnabled) {
//		obj.Position.velX += (obj.Position.accelX * timeStep);
//		obj.Position.velY += (obj.Position.accelY * timeStep);
//		obj.Position.velZ += (obj.Position.accelZ * timeStep);
		obj.motion.velocity = addVector(obj.motion.velocity, scaleVector(obj.motion.acceleration, timeStep));
		return true;
	}
	return false;
}

// Gravity Module.
// Adjusts the acceleration vector of the object to reflect the force of gravity.
// For the object to be affected by gravity, both gravityEnabled and accelerationEnabled must be true.
function gravityModule (obj) {
	if(obj.switches.gravityEnabled) {
		gravityForce.act(obj);
	}
	return true;
}

// Force Module.
// Calculates the acceleration of an object based on the resultant forces on it.
function forceModule (obj) {
	if (obj.switches.motionEnabled && obj.switches.forceChanged) {
		// Create a blank array for the resultant force.
		var newResultant = [0, 0, 0];
		
		// Iterate through the forces acting on the object and add them
		// to the resultant force.
		for(force in obj.forceStore) {
			for(var i = 0; i < 3; i++) {
				newResultant[i] += obj.forceStore[force][i];
			}
		}
		
		// Set the resultant force.
		obj.resultantForce = newResultant;
		
		// Adjust the object's acceleration based on the resultant force.
		for(var i = 0; i < 3; i++) {
			obj.motion.acceleration[i] = obj.resultantForce[i] / obj.physical.mass;
		}
		
		// Reset the forceChanged switch.
		obj.switches.forceChanged = false;
		return true;
	}
	return false;
}

// Contact function
// Given two objects, determines whether or not they are in contact
function contactBetween (obj1, obj2) {
	var distance = obj1.motion.position - obj2.motion.position;
	var radiiSum = obj1.physical.maxRadius + obj2.physical.maxRadius;
	if (distance > radiiSum)
		return false;
	if (obj1.physical.shape + obj2.physical.shape === 2) // Both are spheres
		return true; // If the sum of radii is <= distance between spheres, they are in contact
	if (obj1.physical.shape + obj2.physical.shape === 8) { // Both are cuboids
		for (var i = 0; i < 6; i++) {
			if(obj2.physical.containsPoint(obj1.physical.corners[i]) ||
				obj1.physical.containsPoint(obj2.physical.corners[i])) {
				return true;
		}
		return false;
	}
}

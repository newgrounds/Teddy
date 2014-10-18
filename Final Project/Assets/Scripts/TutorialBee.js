var Speed = 3;
var wayPoint : Vector3;
var trans : Transform;
var smooth = true;
var damping = 0.6;

function Start(){
   //initialize the target way point
   trans = this.transform;
   Wander();
}

function FixedUpdate() {
	// moves the enemy
	trans.position += trans.TransformDirection(Vector3.forward)*Speed*Time.deltaTime;
	
	Looker(wayPoint);
	
	if((trans.position - wayPoint).magnitude < 1) {
	    // when the distance between us and the target is less than 1
	    // create a new way point target
	    Wander();
	}
}

// creates a new wayPoint
function Wander() {
	wayPoint.x = Random.Range(trans.position.x-12.0, trans.position.x+12.0);
	wayPoint.z = Random.Range(trans.position.z-12.0, trans.position.z+12.0);
	wayPoint.y = 1;
}

// look at Teddy
function Looker(target : Vector3) {
	if (smooth) {
		// Look at and dampen the rotation
		var rotation = Quaternion.LookRotation(target - trans.position);
		trans.rotation = Quaternion.Slerp(trans.rotation, rotation, Time.deltaTime * damping);
	}
	else {
		// Just lookat
	    trans.LookAt(target);
	}
}
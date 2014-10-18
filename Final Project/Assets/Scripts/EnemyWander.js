var speed = 5;
var alertedSpeed = 8;
var wayPoint : Vector3;
var trans : Transform;
var smooth = true;
var damping = 6.0;
var range = 50;
var damage = 1;
var alerted = false;

var alertRange = 50;
var seekTarget : Transform;

var hiveTrans : Transform;
var hit : RaycastHit;
var startRayPos = new Vector3(0, 500, 0);
var distance = 600;
var heightAboveGround = 2;

function Start (){
   //initialize the target way point
   trans = this.transform;
   seekTarget = GameObject.FindGameObjectWithTag("Player").transform;
   Wander();
}

function FixedUpdate () {
	var oldPos = trans.position;

	// Check if the enemy should be alerted
	if (alertRange > (trans.position - seekTarget.position).magnitude) {
		alerted = true;
	}

	// Seek if alerted
	if (alerted)
		Seek();
	
	// Otherwise, Wander
	else {
		Looker(wayPoint);

		// moves the enemy
		trans.position += trans.TransformDirection(Vector3.forward)*speed*Time.deltaTime;
		
		if (oldPos == trans.position) {
			Wander();
		}
		
		if((trans.position - wayPoint).magnitude < 5) {
		    // when the distance between us and the target is less than 3
		    // create a new way point target
		    Wander();
		}
	}

	var mag = (hiveTrans.position - trans.position).magnitude;

	// Move them back to a normal position if they somehow get away
	if (mag > 250 && !alerted) {
		wayPoint = hiveTrans.position + new Vector3(1,1,1);
	}
}

// creates a new wayPoint and makes sure it's above the terrain
function Wander () { 
	wayPoint = Random.insideUnitSphere * range + hiveTrans.position;
	wayPoint.y = heightAboveGround;

	if (Physics.Raycast(wayPoint + startRayPos, Vector3.down, hit, distance)) {
	 	if (hit.transform.tag == "ground") {
			// this keeps the position above the ground
	 		wayPoint.y = hit.point.y + heightAboveGround;
	 	}
	}
}

// seeks out Teddy and attacks him
function Seek () {
	Looker(seekTarget.position);

	trans.position += trans.TransformDirection(Vector3.forward)*alertedSpeed*Time.deltaTime;

	yield WaitForSeconds(5);
	if (alertRange < (trans.position - seekTarget.position).magnitude) {
		alerted = false;
	}
}

// look at Teddy
function Looker (target : Vector3) {
	if (smooth) {
		// Look at and dampen the rotation
		var rotation = Quaternion.LookRotation(target - trans.position);
		trans.rotation = Quaternion.Lerp(trans.rotation, rotation, Time.deltaTime * damping);
	}
	else {
		// Just lookat
	    trans.LookAt(target);
	}
}

function OnCollisionEnter (collision : Collision) {
	var col = collision.collider;
	if (col.tag == "Player") {
		var winScript = col.gameObject.GetComponent(WinScript);
		winScript.ApplyDamage(damage);
	}
	else if (col.tag == "Hive") {
		Wander();
	}
}

@script RequireComponent(CapsuleCollider)
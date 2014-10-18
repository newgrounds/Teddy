#pragma strict

var health = 100;
var dropDist = 5;
var dropRot = Quaternion(0,0,90,1);
var trans : Transform;
var smooth = 0.6;
var rotSmooth = 0.08;
var wanderScript : EnemyWander;
var col : CapsuleCollider;
var destroy = false;

function Start() {
	trans = this.transform;
	wanderScript = this.GetComponent(EnemyWander);
	col = this.GetComponent(CapsuleCollider);
}

function Update() {
	if (health <= 0) {
		wanderScript.enabled = false;
		col.enabled = false;
		Drop();
	}
}

// make the enemy fall before disappearing
function Drop() {
	var dropPos = new Vector3(trans.position.x, trans.position.y-dropDist, trans.position.z);
	trans.position = Vector3.Slerp(trans.position, dropPos, Time.deltaTime * smooth);
	trans.rotation = Quaternion.Slerp(trans.rotation, dropRot, Time.deltaTime * rotSmooth);
	yield WaitForSeconds(3);
	destroy = true;
}
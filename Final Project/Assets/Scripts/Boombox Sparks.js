#pragma strict
var boombox : Transform;
var sparks : Transform;

function Start () {
	boombox = this.transform;
}

function OnTriggerEnter (col : Collider) {
	var controller : CharacterController = col.GetComponent(CharacterController);
	if(controller != null) {
		boombox.audio.Stop();
		sparks.active = true;
	}
}

@script RequireComponent(BoxCollider)
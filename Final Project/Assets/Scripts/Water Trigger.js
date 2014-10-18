#pragma strict
var sandSound : GameObject;
var waterSound : GameObject;

function Start () {
	sandSound = GameObject.Find("Sand Sound");
	waterSound = GameObject.Find("Water Sound");
}

function OnTriggerEnter (col : Collider) {
	var controller : CharacterController = col.GetComponent(CharacterController);
	if(controller != null) {
		sandSound.active = false;
		waterSound.active = true;
	}
}

function OnTriggerExit (col : Collider) {
	var controller : CharacterController = col.GetComponent(CharacterController);
	if(controller != null) {
		waterSound.active = false;
		sandSound.active = true;
	}
}

@script RequireComponent(MeshCollider)
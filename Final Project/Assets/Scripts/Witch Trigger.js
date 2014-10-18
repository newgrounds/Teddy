#pragma strict

var witchSound : AudioSource;
var guiScript : GUIScript;
var witchCam : GameObject;

function Start () {
	witchCam.active = false;
	witchSound = this.GetComponent(AudioSource);
	guiScript = GameObject.FindGameObjectWithTag("MainCamera").GetComponent(GUIScript);
}

function Update () {
	if (guiScript.win)
		witchCam.active = true;
}

function OnTriggerEnter (col : Collider) {
	var controller : CharacterController = col.GetComponent(CharacterController);
	if(controller != null) {
		witchSound.Play();

		if (guiScript.win)
			Application.LoadLevel(3);
		
		guiScript.showWitch = true;
		yield WaitForSeconds(5);
		guiScript.showWitch = false;
	}
}

@script RequireComponent(BoxCollider)
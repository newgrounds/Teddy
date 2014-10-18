#pragma strict

var closeup = true;
var movementAllowed = false;
var spellsAllowed = false;
var end : Vector3 = new Vector3(1,1,-47);
var trans : Transform;
var smooth = 0.6;
var sfScript : SmoothFollow;
var teddy : GameObject;
var charMotor : CharacterMotor;
var platController : PlatformInputController;

function Start () {
	trans = this.transform;
	sfScript = this.GetComponent(SmoothFollow);
	teddy = GameObject.FindGameObjectWithTag("Player");
	charMotor = teddy.GetComponent(CharacterMotor);
	platController = teddy.GetComponent(PlatformInputController);
}

function Update () {
	if (closeup) {
		MoveToTeddy();
	}
	if (movementAllowed) {
		this.camera.farClipPlane = 2500;
		sfScript.enabled = true;
		charMotor.enabled = true;
		platController.enabled = true;
	}
}

function MoveToTeddy() {
	trans.position = Vector3.Lerp(trans.position, end, Time.deltaTime * smooth);
	yield WaitForSeconds(12);
	closeup = false;
	yield WaitForSeconds(41);
	movementAllowed = true;
}
#pragma strict
var sandSound : GameObject;
var waterSound : GameObject;

function Start () {
	// By default loop all animations
	animation.wrapMode = WrapMode.Loop;
	
	animation["walk"].layer = -1;
	animation["idle"].layer = -1;
	animation.SyncLayer(-1);
	
	sandSound = GameObject.Find("Sand Sound");
	waterSound = GameObject.Find("Water Sound");
	waterSound.active = false;
}

function Update () {
	var charMotor : CharacterMotor = GetComponent(CharacterMotor);
	var vel = charMotor.movement.velocity;
	
	if (Vector3.Magnitude(vel) > 0) {
		animation.CrossFade("walk");
		// Make all animations in this character play at normal speed
		for (var state : AnimationState in animation) {
		    state.speed = 2;
		}
		sandSound.audio.volume = 1;
		waterSound.audio.volume = 1;
	}
	else {
		// Make all animations in this character pause
		for (var state : AnimationState in animation) {
		    state.speed = 0;
		}
		sandSound.audio.volume = 0;
		waterSound.audio.volume = 0;
	}
}
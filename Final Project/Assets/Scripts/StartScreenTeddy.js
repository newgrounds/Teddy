#pragma strict

var play = true;

function Start () {
}

function Update () {
	if (play)
		Animate();
}

function Animate() {
	play = false;
	animation.Play(animation.clip.name);
	yield WaitForSeconds(animation.clip.length + 10);
	play = true;
}
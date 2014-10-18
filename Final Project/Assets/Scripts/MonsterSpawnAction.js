#pragma strict

var capCol : CapsuleCollider;
var monScript : MonsterScript;
var parts : ParticleSystem;
var trans : Transform;
var speed = 10;

function Start () {
	capCol = gameObject.GetComponent(CapsuleCollider);
	monScript = gameObject.GetComponent(MonsterScript);
	parts = gameObject.GetComponent(ParticleSystem);
	capCol.enabled = false;
	monScript.enabled = false;
	trans = gameObject.transform;
	Spawn();
}

function Update () {
	trans.position += Vector3.up * speed * Time.deltaTime;
}

function Spawn () {
	yield WaitForSeconds(3);
	capCol.enabled = true;
	monScript.enabled = true;
	parts.Stop();
	this.enabled = false;
}
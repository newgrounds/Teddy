#pragma strict

var hive : Transform;
var trans : Transform;
var offset = Vector3(3,3,0);
var smooth = 0.6;

function Start () {
	trans = this.transform;
}

function Update () {
	trans.position = Vector3.Slerp(trans.position, hive.position+offset, Time.deltaTime * smooth);
}
#pragma strict

var monster : Transform;
var teddyTrans : Transform;
var spawnDelay = false;

function Start () {
	teddyTrans = GameObject.FindGameObjectWithTag("Player").transform;
}

function OnTriggerStay (col : Collider) {
	if (col.tag == "Player") {
		if (!spawnDelay)
			SpawnMonster();
	}
}

function SpawnMonster () {
	spawnDelay = true;
	var loc : Vector3 = Random.insideUnitSphere * 30;
	loc.y = -2;
	Instantiate(monster, teddyTrans.position + loc, Quaternion.identity);
	yield WaitForSeconds(5);
	spawnDelay = false;
}
#pragma strict

var spawnDist = 20;
var beesPerSpawn = 5;
var bee : GameObject;
var beeList : Array;
var trans : Transform;
var collectible : Transform;
var complete = false;
var beehiveCam : GameObject;
var beesDestroyed = 0;
var collectPos = new Vector3(3.5,-6.3,2.6);
var collectScale = new Vector3(0.3,0.3,0.3);
var teddy : GameObject;
var teddyTrans : Transform;
var range = 50;

function Start () {
	beehiveCam.active = false;
	trans = this.transform;
	beeList = new Array(beesPerSpawn);
	SpawnBees();
	teddy = GameObject.FindGameObjectWithTag("Player");
	teddyTrans = teddy.transform;
}

function Update () {
	// Iterate through the list of bees
	for (var b : Transform in beeList) {
		// Check to make sure bee is still alive
		if (b != null) {
			// Check if the bee should be alerted
			if ((trans.position - teddyTrans.position).magnitude < range) {
				var eWander : EnemyWander = b.GetComponent(EnemyWander);
				eWander.alerted = true;
			}

			// Check if the bee should be destroyed
			var beeHealth : EnemyHealth = b.GetComponent(EnemyHealth);
			if (beeHealth.destroy) {
				Destroy(b.gameObject);
				beesDestroyed++;
			}
		}
	}

	if (beesDestroyed == beeList.length && !complete) {
		SpawnCollectible();
		complete = true;
	}
}

function SpawnBees () {
	for (var i = 0; i < beesPerSpawn; i++) {
		SpawnBee(i);
	}
}

function SpawnBee (index) {
	var beePos = trans.position + Random.insideUnitSphere * spawnDist;
	beePos.y = trans.position.y + 2;

	var newBee = Instantiate(bee, beePos, Quaternion.identity);
	var wander = newBee.GetComponent(EnemyWander);
	wander.hiveTrans = this.transform;
	beeList[index] = newBee.transform;
}

function SpawnCollectible() {
	//show collectible with secondary camera
	beehiveCam.active = true;
	//spawn collectible, parent to hive, set correct position
	var collect = Instantiate(collectible, Vector3.zero, Quaternion.identity);
	collect.parent = trans;
	collect.localPosition = collectPos;
	collect.localRotation = Quaternion.identity;
	collect.localScale = collectScale;

	yield WaitForSeconds(5);
	beehiveCam.active = false;
}
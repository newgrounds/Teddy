var speed = 15;
var trans : Transform;
var smooth = true;
var damping = 6.0;
var damage = 1;
var seekTarget : Transform;
var health = 50;
var hit = false;
var attacking = false;
var explosion : Transform;
var walkSound : GameObject;

function Start (){
   //initialize the target way point
   trans = this.transform;
   seekTarget = GameObject.FindGameObjectWithTag("Player").transform;

   // By default loop all animations
	animation.wrapMode = WrapMode.Loop;
	
	animation["attack"].layer = -1;
	animation["gothit"].layer = -1;
	animation.SyncLayer(-1);
}

function FixedUpdate () {
	if (health <= 0) {
		Die();
		return;
	}
	
	if (!hit && !attacking)
		Seek();
	else
		walkSound.audio.volume = 0;
}

// seeks out Teddy and attacks him
function Seek () {
	Looker(seekTarget.position);

	animation.CrossFade("attack");
	walkSound.audio.volume = 1;
	trans.position += trans.TransformDirection(Vector3.forward)*speed*Time.deltaTime;
}

// look at Teddy
function Looker (target : Vector3) {
	if (smooth) {
		// Look at and dampen the rotation
		var rotation = Quaternion.LookRotation(target - trans.position);
		trans.rotation = Quaternion.Lerp(trans.rotation, rotation, Time.deltaTime * damping);
	}
	else {
		// Just lookat
	    trans.LookAt(target);
	}
}

function OnCollisionEnter (collision : Collision) {
	var col = collision.collider;
	if (col.tag == "Player") {
		Attack(col);
	}
}

function Attack (col : Collider) {
	attacking = true;
	var winScript = col.gameObject.GetComponent(WinScript);
	winScript.ApplyDamage(damage);
	attacking = false;
}

function Damage (damage : int) {
	hit = true;
	animation.CrossFade("gothit");
	health -= damage;
	yield WaitForSeconds(animation["gothit"].length);
	hit = false;
}

function Die () {
	animation.Stop();
	var deathParticle = Instantiate(explosion, trans.position, Quaternion.identity);
	deathParticle.parent = trans;
	yield WaitForSeconds(2);
	Destroy(gameObject);
}

@script RequireComponent(CapsuleCollider)
#pragma strict

var damage = 10;
var health : EnemyHealth;
var monsterHealth : MonsterScript;

function OnTriggerEnter (col : Collider) {
	health = col.GetComponent(EnemyHealth);
	if(health != null) {
		health.health -= damage;
	}
	monsterHealth = col.GetComponent(MonsterScript);
	if (monsterHealth != null) {
		monsterHealth.Damage(damage);
	}
}

@script RequireComponent(CapsuleCollider)
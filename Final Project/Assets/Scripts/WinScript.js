#pragma strict

var health = 5;

var numberToCollect = 3;
var collected = 0;

function ApplyDamage (damage : int)
{
	health -= damage;
	if (health <= 0)
	{
		Application.LoadLevel(2);
	}
}
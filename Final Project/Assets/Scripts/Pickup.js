#pragma strict

var collected = false;

function OnTriggerEnter (col : Collider) {
	if (collected)
		return;

	if (col.tag == "Player") {
		collected = true;

		var winScript = col.gameObject.GetComponent(WinScript);
		winScript.collected++;

		Destroy(gameObject);
	}
}
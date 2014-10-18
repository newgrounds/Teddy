#pragma strict

var dist = 80;
var spells : GameObject[];
var selectedSpell = 0;
var layerMask = 1 << 9;

function Update () {

	var ray = Camera.main.ScreenPointToRay(Input.mousePosition);
	
	var hit : RaycastHit;
	
	if (Physics.Raycast(ray, hit, dist, layerMask) && Input.GetMouseButtonDown(0)) {
		Instantiate(spells[selectedSpell], hit.point, Quaternion.identity);
	}
}
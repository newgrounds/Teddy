#pragma strict

var castScript : CastSpells;

var selGridInt : int = 0;
var selImages : Texture[];
var show = false;

function Start () {
	castScript = GameObject.FindGameObjectWithTag("Player").GetComponent(CastSpells);
}

function OnGUI () {
	if (show) {
		castScript.enabled = false;
		selGridInt = GUI.SelectionGrid(Rect(Screen.width/2-100, Screen.height/2, 200, 50), selGridInt, selImages, 2);
	}
	else
		castScript.enabled = true;
}

function Update () {
	if (Input.GetKeyDown("tab")) {
		show = !show;
	}
	
	if (GUI.changed) {
		show = !show;
	}
	
	castScript.selectedSpell = selGridInt;
}
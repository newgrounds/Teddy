#pragma strict

var customGuiStyle : GUIStyle;
var showWitch = false;
var teddy : GameObject;
var winScript : WinScript;
var witchText = "Come back when you have\nall of the honey jars.";
var tHealthTexture : Texture;
var hJarTexture : Texture;
var hSmallTexture : Texture;
var win = false;

function Start () {
	teddy = GameObject.FindGameObjectWithTag("Player");
	winScript = teddy.GetComponent(WinScript);
}

function OnGUI () {
	// Display health on screen
	var screenPlacementX = Screen.width * 0.0417;
	var screenPlacementY = Screen.height * 0.0741;
	for (var i = 0; i < winScript.health; i++) {
		GUI.Label(Rect(Screen.width-((i+1)*screenPlacementX),0,screenPlacementX,screenPlacementY),tHealthTexture);
	}

	// Display collectibles on screen
	var disp = winScript.collected;
	for (var j = 0; j < winScript.numberToCollect; j++) {
		if (disp > 0) {
			disp--;
			GUI.Label(Rect(j*screenPlacementX,0,screenPlacementX,screenPlacementY), hJarTexture);
		}
		else
			GUI.Label(Rect(j*screenPlacementX,0,screenPlacementX,screenPlacementY), hSmallTexture);
	}

	var GuiPlacement = Screen.height * 0.111;
	// Show witch text when triggered within range
	if (showWitch) {
		GUI.Label(Rect(0, Screen.height-GuiPlacement, Screen.width, GuiPlacement), witchText, customGuiStyle);
		ShowWitch();
	}

	// Show witch text when you've got all the collectibles
	if (winScript.collected == winScript.numberToCollect) {
		win = true;
		witchText = "Bring me those honey jars!";
		GUI.Label(Rect(0, Screen.height-GuiPlacement, Screen.width, GuiPlacement), witchText, customGuiStyle);
	}
}

function ShowWitch () {
	yield WaitForSeconds(5);
	showWitch = false;
}
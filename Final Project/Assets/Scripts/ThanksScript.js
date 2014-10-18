#pragma strict

var customGuiStyle : GUIStyle;

function OnGUI () {
	GUI.Label(Rect(Screen.width/2-(Screen.width * 0.0417), Screen.height/2-(Screen.height * 0.037),
					Screen.width * 0.0833, Screen.height * 0.037),
	 "You win! Thanks for playing!", customGuiStyle);

	 if (GUI.Button(Rect(Screen.width/2-(Screen.width * 0.03125), Screen.height-(Screen.height * 0.037),
	 					Screen.width * 0.0625, Screen.height * 0.037),"Return"))
	 	Application.LoadLevel(0);
}
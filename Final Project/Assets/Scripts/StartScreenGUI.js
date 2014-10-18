#pragma strict

var logoTexture : Texture;

function OnGUI () {
	GUI.DrawTexture(Rect(Screen.width/2-(Screen.width * 0.108), Screen.height * 0.037,
										 Screen.width * 0.216, Screen.height * 0.167),
		logoTexture, ScaleMode.ScaleToFit, true, 0.0);
	
	if (GUI.Button(Rect(Screen.width/2-(Screen.width * 0.09375), Screen.height * 0.694,
						Screen.width * 0.0625, Screen.height * 0.037), "Tutorial"))
		Application.LoadLevel(1);
	if (GUI.Button(Rect(Screen.width/2+(Screen.width * 0.03125), Screen.height * 0.694, 
						Screen.width * 0.0625, Screen.height * 0.037), "Level 1"))
		Application.LoadLevel(2);
}
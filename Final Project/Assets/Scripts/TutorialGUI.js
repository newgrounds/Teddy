#pragma strict

var customGuiStyle : GUIStyle;
var showCredits = true;
var showRest = false;
var showTut = false;
var showed = false;
var labelText = "This is Teddy.";
var tutText = "Use WASD/arrow keys to move around.";
var moved = false;
var casted = false;
var selected = false;
var killed = false;
var teddy : GameObject;
var ssScript : SpellSelection;
var csScript : CastSpells;
var bee : Transform;
var b : Transform;
var beeHealth : EnemyHealth;

function Start () {
	teddy = GameObject.FindGameObjectWithTag("Player");
	csScript = teddy.GetComponent(CastSpells);
	ssScript = this.GetComponent(SpellSelection);
}

function OnGUI () {
	// Shows the intro credit
	if (showCredits) {
		GUI.Label(Rect(Screen.width/2-(Screen.width * 0.0417), Screen.height/2-(Screen.height * 0.0185),
						Screen.width * 0.0833, Screen.height * 0.037), "An Adam Gressen Creation");
		ShowCredits();
	}

	// Shows the story
	if (showRest) {
		GUI.Label(Rect(0, Screen.height-(Screen.height * 0.111), 
						Screen.width, Screen.height * 0.111), labelText, customGuiStyle);
		ChangeText();
	}

	// The tutorial actions
	if (showTut) {
		GUI.Label(Rect(0, Screen.height-(Screen.height * 0.111),
						 Screen.width, Screen.height * 0.111), tutText, customGuiStyle);

		// Makes sure the player moves
		if (!moved &&
		(Input.GetKeyDown("w") || Input.GetKeyDown("a") || 
		Input.GetKeyDown("s") || Input.GetKeyDown("d") || 
		Input.GetKeyDown(KeyCode.UpArrow) || Input.GetKeyDown(KeyCode.DownArrow) || 
		Input.GetKeyDown(KeyCode.LeftArrow) || Input.GetKeyDown(KeyCode.RightArrow))) {
			moved = true;
			csScript.enabled = true;
			tutText = "Now try casting a spell\nby clicking anywhere.";
		}

		// Makes sure the player casts a spell
		if (!casted && moved && Input.GetMouseButtonDown(0)) {
			casted = true;
			ssScript.enabled = true;
			tutText = "Try selecting a different\nspell with Tab.";
		}

		// Makes sure the player selects the fire spell
		if (!selected && casted && ssScript.selGridInt == 0) {
			selected = true;
			b = Instantiate(bee, teddy.transform.position+new Vector3(1,0,1), Quaternion.identity);
			beeHealth = b.GetComponent(EnemyHealth);
			tutText = "This is an enemy bee.\nCast a spell at him to take him out.";
		}

		// Makes sure the player kills the bee
		if (!killed && selected && beeHealth.destroy) {
			Destroy(b.gameObject);
			killed = true;
		}
		
		// Display the button so the game can start
		if (killed) {
			tutText = "Nice, now click Start to begin.";
			if (GUI.Button(Rect(Screen.width/2-(Screen.width * 0.0417), Screen.height/2-(Screen.height * 0.037),
								Screen.width * 0.0417, Screen.height * 0.037), "Start")) {
				Application.LoadLevel(2);
			}
		}
	}
}

function ShowCredits () {
	yield WaitForSeconds(10);
	showCredits = false;
	yield WaitForSeconds(5);
	showRest = true;
}

function ChangeText () {
	if (!showed) {
		showed = true;
		yield WaitForSeconds(4);
		labelText = "He used to be an adventurer.";
		yield WaitForSeconds(4);
		labelText = "A witch sent him on a quest to\ndeliver an important parcel of potions.";
		yield WaitForSeconds(6);
		labelText = "When the parcel was accidentally\neaten by bears the witch was furious.";
		yield WaitForSeconds(6);
		labelText = "In her anger she turned Teddy\ninto a teddy bear.";
		yield WaitForSeconds(6);
		labelText = "He must now collect various\ningredients to regain her favor.";
		yield WaitForSeconds(6);
		labelText = "Now lets make sure that\nwe're ready to take on this task.";
		yield WaitForSeconds(6);
		showRest = false;
		showTut = true;
	}
}
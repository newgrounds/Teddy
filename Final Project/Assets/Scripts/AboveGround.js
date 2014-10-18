#pragma strict
var hit : RaycastHit;
var startRayPos = new Vector3(0, 500, 0);
var distance = 600;
var mTransform : Transform;
var sfScript : SmoothFollow;
var tedTrans : Transform;

function Start () {
	mTransform = Camera.main.transform;
	tedTrans = GameObject.Find("Teddy").transform;
	sfScript = GetComponent(SmoothFollow);
}

function LateUpdate () {
	if(Physics.Raycast(mTransform.position + startRayPos,
	 Vector3.down, hit, distance)) {
	 	if(hit.transform.tag == "ground") {
	 		//print("Cam: " + mTransform.position.y);
	 		//print("Hit: " + hit.point.y);
	 		
 			// this keeps the height of the camera at 3 above Teddy
	 		// by adding 3 to the ground hit height and subtracting
	 		// Teddy's height
	 		sfScript.height = hit.point.y + 3 - tedTrans.position.y;
	 	}
	 }
}
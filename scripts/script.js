		
function updateBalance(){
	var i;
	userInfo.balance =100;
	for(i=0;i<userInfo.team.length;i++){
		userInfo.balance-=userInfo.team[i].price;
	}
	document.getElementById("balance").innerHTML = userInfo.balance;
}

// Helper to add a player DOM element to a formation row enforcing per-row limits
function addPlayerToRow(rowId, playerDiv) {
	const row = document.getElementById(rowId);

	// Rules per row
	const limits = {
		"goal-row": 1,
		"def-row": 2,
		"mid-row": 2,
		"for-row": 3
	};

	const currentCount = row.children.length;

	if (currentCount >= limits[rowId]) {
		alert("This row is full!");
		return false;
	}

	row.appendChild(playerDiv);
	return true;
}

function updateComposition(){
	// Compute composition counts from starters only
	var limits = { 'GoalKeeper':1, 'Defender':2, 'Midfielder':2, 'Forward':3 };
	userInfo.composition = { GoalKeeper:0, Defender:0, Midfielder:0, Forward:0 };
	for(var i=0;i<userInfo.starters.length;i++){
		var r = userInfo.starters[i].role;
		if(userInfo.composition[r] !== undefined) userInfo.composition[r]++;
	}

	// Enable Save only when starters exactly match limits
	var ok = true;
	for(var k in limits){ if(userInfo.composition[k] !== limits[k]) ok = false; }
	if(ok && userInfo.balance >= 0){
		document.getElementById("team-submit").style.backgroundColor = "#2ec866";
		document.getElementById("team-submit").disabled = false ;
		document.getElementById("team-submit").style.cursor = "pointer";
	} else {
		document.getElementById("team-submit").style.backgroundColor = "#555";
		document.getElementById("team-submit").disabled = true;
		document.getElementById("team-submit").style.cursor = 'not-allowed';
	}

	document.getElementById("composition-banner").innerHTML = userInfo.composition.GoalKeeper+" GK "+userInfo.composition.Defender+" DEF "+userInfo.composition.Midfielder+" MID "+userInfo.composition.Forward+" FWD";
}

function displayNotif(message){
	var notif =document.createElement('div');
	notif.className = "notification";
	notif.id = "notification";
	notif.innerHTML = message;
	document.body.appendChild(notif);
	$(notif).fadeIn();
	$(notif).fadeOut(4000);

}

function searchTeam(playerId){
	for(var i=0;i<userInfo.team.length;i++){
		if(userInfo.team[i].playerId == playerId){
			return i;
		}
	}
	return -1;
}

function playerInfo(playerId,playerList){
	for(var i=0;i< playerList.length;i++){
		if(playerList[i].playerId == playerId)
			return playerList[i];
	}
	
}
// Starter limits
var STARTER_LIMITS = { 'GoalKeeper':1, 'Defender':2, 'Midfielder':2, 'Forward':3 };

function countStarters(role){
	var c=0;
	if(!userInfo.starters) return 0;
	for(var i=0;i<userInfo.starters.length;i++) if(userInfo.starters[i].role === role) c++;
	return c;
}

function removeFromStarterOrBench(playerId){
	// remove from starters if present
	for(var i=0;i<userInfo.starters.length;i++){
		if(userInfo.starters[i].playerId == playerId){ userInfo.starters.splice(i,1); return; }
	}
	for(var j=0;j<userInfo.bench.length;j++){
		if(userInfo.bench[j].playerId == playerId){ userInfo.bench.splice(j,1); return; }
	}
}
function addToPlayerBox(playerObj){
	// Render players as photo cards in the players panel
	var node = document.createElement('div');
	node.className = "player-profile player-box";
	node.style.backgroundImage = "url("+playerObj.imageUrl+")";
	node.id = playerObj.playerId;

	var banner = document.createElement('span');
	banner.className = "heading-banner";
	banner.innerHTML = playerObj.name+"<br>"+playerObj.role+" $"+playerObj.price+"mn";
	banner.style.fontSize = "12px";
	banner.style.backgroundColor = "rgba(0,0,0,0.6)";
	banner.style.position = "absolute";
	banner.style.bottom = "0px";
	banner.style.right = "0px";
	node.appendChild(banner);

	var addPlayer = document.createElement('img');
	addPlayer.id = "add";
	addPlayer.style.position = "absolute";
	addPlayer.style.top = "4px";
	addPlayer.style.right = "4px";
	addPlayer.style.width = "22px";
	addPlayer.style.height = "22px";
	addPlayer.setAttribute("src","/Fantasy/images/add.png");
	node.appendChild(addPlayer);

	var playersBox = document.getElementById("players-box");
	playersBox.appendChild(node);

	addPlayer.addEventListener("click", function(event){
		event.stopPropagation();
		var pid = parseInt(event.target.parentNode.id);
		var p = playerInfo(pid , playerList);
		if(!p) return;
		// add to overall team list
		userInfo.team.push(p);
		// Decide whether to place in starters or bench based on limits
		if(countStarters(p.role) < (STARTER_LIMITS[p.role] || 0)){
			userInfo.starters.push(p);
			// remove from players box and add to formation starter row
			document.getElementById("players-box").removeChild(event.target.parentNode);
			addToTeamBox(p);
		} else {
			userInfo.bench.push(p);
			document.getElementById("players-box").removeChild(event.target.parentNode);
			addToBenchBox(p);
		}
		updateBalance();
		updateComposition();
	});
}
function addToTeamBox(playerObj){
	var node = document.createElement('div');
	node.className = "player-profile player-box";
	node.style.backgroundImage = "url("+playerObj.imageUrl+")";
	node.id = playerObj.playerId;

	var banner = document.createElement('span');
	banner.className = "heading-banner";
	banner.innerHTML = playerObj.name+"<br>"+playerObj.role+" $"+playerObj.price+"mn";
	banner.style.fontSize = "12px";
	banner.style.backgroundColor = "rgba(0,0,0,0.6)";
	banner.style.position = "absolute";
	banner.style.bottom = "0px";
	banner.style.right = "0px";
	node.appendChild(banner);

	var removePlayer = document.createElement('img');
	removePlayer.id = "close";
	removePlayer.style.position = "absolute";
	removePlayer.style.top = "4px";
	removePlayer.style.left = "4px";
	removePlayer.style.width = "22px";
	removePlayer.style.height = "22px";
	removePlayer.setAttribute("src","/Fantasy/images/remove.png");
	node.appendChild(removePlayer);

	// Choose row based on role
	var targetRowId = 'mid-row';
	if(playerObj.role === 'GoalKeeper') targetRowId = 'goal-row';
	else if(playerObj.role === 'Defender') targetRowId = 'def-row';
	else if(playerObj.role === 'Midfielder') targetRowId = 'mid-row';
	else if(playerObj.role === 'Forward') targetRowId = 'for-row';

	var target = document.getElementById(targetRowId) || document.getElementById('team-box');
	// Use helper to enforce per-row limits. If row is full, put player on bench instead.
	var addedToRow = false;
	try{
		addedToRow = addPlayerToRow(targetRowId, node);
	} catch(e){
		// fallback: append directly if helper fails for any reason
		target.appendChild(node);
		addedToRow = true;
	}
	if(!addedToRow){
		// row was full, put player on bench instead
		// Ensure player isn't duplicated in bench
		var alreadyBench = false;
		for(var b=0;b<userInfo.bench.length;b++) if(userInfo.bench[b].playerId == playerObj.playerId) { alreadyBench = true; break; }
		if(!alreadyBench) userInfo.bench.push(playerObj);
		addToBenchBox(playerObj);
		return;
	}

	removePlayer.addEventListener("click",function(event){
		var pid = event.target.parentNode.id;
		// remove from overall team
		var idx = searchTeam(pid);
		if(idx > -1) userInfo.team.splice(idx,1);
		// remove from starters or bench
		removeFromStarterOrBench(pid);
		updateBalance();
		updateComposition();

		event.target.parentNode.parentNode.removeChild(event.target.parentNode);
		addToPlayerBox(playerObj);
	});
}

function addToBenchBox(playerObj){
	var node = document.createElement('div');
	// bench-box gives a smaller card size for substitutes
	node.className = "player-profile player-box bench-box";
	node.style.backgroundImage = "url("+playerObj.imageUrl+")";
	node.id = playerObj.playerId;

	var banner = document.createElement('span');
	// use heading-banner for consistent look but make it compact
	banner.className = "heading-banner";
	banner.innerHTML = playerObj.name+"<br>"+playerObj.role+" $"+playerObj.price+"mn";
	banner.style.fontSize = "10px";
	banner.style.backgroundColor = "rgba(0,0,0,0.6)";
	banner.style.position = "absolute";
	banner.style.bottom = "0px";
	banner.style.right = "0px";
	node.appendChild(banner);

	var removePlayer = document.createElement('img');
	removePlayer.id = "close";
	removePlayer.style.position = "absolute";
	removePlayer.style.top = "4px";
	removePlayer.style.left = "4px";
	removePlayer.style.width = "18px";
	removePlayer.style.height = "18px";
	removePlayer.setAttribute("src","/Fantasy/images/remove.png");
	node.appendChild(removePlayer);

	document.getElementById('subs-row').appendChild(node);

	removePlayer.addEventListener("click",function(event){
		var pid = event.target.parentNode.id;
		var idx = searchTeam(pid);
		if(idx > -1) userInfo.team.splice(idx,1);
		removeFromStarterOrBench(pid);
		updateBalance();
		updateComposition();

		event.target.parentNode.parentNode.removeChild(event.target.parentNode);
		addToPlayerBox(playerObj);
	});
}

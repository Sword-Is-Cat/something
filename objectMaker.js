function newTerm(raidCnt) {
	let term = new Object();
	term.entry = new Set();
	term.raids = [];
	while (raidCnt-- > 0){
		var raid = newRaid();
		term.raids.push(raid);
		raid.term = term;
	}
	return term;
}

function newRaid() {
	let raid = new Object();
	raid.partys = [];
	let ptCnt = 2;
	while(ptCnt-->0){
		var party = newParty();
		raid.partys.push(party);
		party.raid = raid;
	}
	return raid;
}

function newParty() {
	let party = new Object();
	party.members = [];

	return party;
}

function newChara(_charaid, _name, _power) {
	
	let chara = new Object();
	chara.charaid = _charaid;
	chara.name = _name;
	chara.power = _power;
	chara.entry = false;
	
	return chara;
}
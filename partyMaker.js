	function charactorList() {
		
		if(debug)console.log('charactorList make');
		charalist = [];

		$('.chara').each(function(idx, chara) {

			let charaName = $(chara).children('input[type=text]').val();
			let charaId = $(chara).attr('id');
			let power = $('input[type=radio][name='+charaId+'po]:checked').val();
			
			if(power){
				let charaObject = newChara(charaId, charaName, power);
				charalist.push(charaObject);
			}

		});
		
		charalist.sort((a,b)=>b.power-a.power);
		if(debug)console.log(charalist);
		
		if(charalist.length>0){
			$('#resultDiv').show();
			// $('#charaDiv').hide();
		}
	}
	
let raids;

function makeParty(){
	
	if(debug)console.log('makeParty');
	raids = [];
	
	let cntMember = charalist.length;
	let cntRaid = cntMember/6;
	
	while(cntRaid-->0){
		raids.push(newRaid());
	}
	
	if(debug)console.log(raids);
	
}

let strong;
let weak;

function match(){
	
	if(debug)console.log('party match');
	let partys = [];
	
	for(let i = 0 ; i<raids.length ; i++){
		partys.push(raids[i].partys[0]);
	}
	
	for(let i = raids.length-1 ; i>=0 ; i--){
		partys.push(raids[i].partys[1]);
	}
	
	if(debug)console.log(partys);
	strong = 0;
	weak = charalist.length-1;
	
	let idx = 0;
	
	// 1번멤버 배정
	// for(let idx = 0 ; idx<partys.length ; idx++){
	while(idx<partys.length){
		let mem = partys[idx++].members;
		mem.push(getStrong());
		
	}
	
	// 2번멤버 배정 역순으로 돌면서 1번멤버 확인하여 버스기사면 약한사람, 아니면 센사람 배정
	// for(let idx = partys.length-1 ; idx>=0 ; idx--){
	while(idx>0){
		let mem = partys[--idx].members;
		if(mem[0] && mem[0].power == overCutLine)
			mem.push(getWeak());
		else
			mem.push(getStrong());
		
	}
	
	// 마지막 멤버 배정
	// for(let idx = 0 ; idx<partys.length ; idx++){
	while(idx<partys.length){
		let mem = partys[idx++].members;
		if(mem[0] && mem[0].power == overCutLine)
			mem.push(getWeak());
		else
			mem.push(getStrong());
		
	}
	
	if(debug)console.log('result raids');
	if(debug)console.log(raids);
}

function getStrong(){
	return strong>weak?null:charalist[strong++];
}

function getWeak(){
	return strong>weak?null:charalist[weak--];
}
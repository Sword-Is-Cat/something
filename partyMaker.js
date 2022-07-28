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
			//$('#charaDiv').hide();
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

let strong = 0;
let weak = -1;

function match(){
	
	if(debug)console.log('party match');
	let partys = [];
	raids.forEach(function(raid){
		partys.push(...raid.partys);
	});
	
	if(debug)console.log(partys);
	strong = 0;
	weak = charalist.length-1;
	
	//1번멤버 배정
	partys.forEach(function(party){
		party.members.push(getStrong());
	});
	
	//나머지 멤버 배정
	partys.forEach(function(party){
		if(party.members[0]!=null && party.members[0].power == 10){
			//1번멤버가 버스기사면 아래에서 2명퍼옴
			party.members.push(getWeak());
			party.members.push(getWeak());
		}else{
			//버스기사 아니면 남은쎈사람에서 1명퍼옴
			party.members.push(getStrong());
		}
	});
	//빈자리 채우기
	partys.forEach(function(party){
		if(party.members.length < 3){
			//풀파티(3명)이 아니면 한명씩 넣어줌
			party.members.push(getStrong());
		}
	});
	
	if(debug)console.log('result raids');
	if(debug)console.log(raids);
}

function getStrong(){
	return strong>weak?null:charalist[strong++];
}

function getWeak(){
	return strong>weak?null:charalist[weak--];
}
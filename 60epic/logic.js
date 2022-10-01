/**
 * 
 */

$(function(){
	
	drawScreen();
	
	
});

function drawScreen(){
	
	let $body = document.getElementById('content');
	
	let details, summary, div;
	
	for(let idx = 0 ; idx<array.length ; idx++){
		
		details = document.createElement('details');
		summary = document.createElement('summary');
		div = document.createElement('div');
		
		summary.innerText = array[idx];
		div.classList.add('bg');
		div.classList.add('type'+idx);
		
		$body.appendChild(details);
		details.appendChild(summary);
		details.appendChild(div);
		
	}
	
}

function openAll(){
	document.querySelectorAll('details').forEach( details => details.open = true );
}

function closeAll(){
	document.querySelectorAll('details').forEach( details => details.open = false );
}

const array = [
	'불꽃방패 세트',
	'아이작의 강화복 세트',
	'지배자 셰이드 세트',
	'스테이시의 암살복 세트',
	'천년 나무의 목피 세트',
	
	'플레임 헐크의 화갑 세트',
	'달리아 스콧의 무투복 세트',
	'찬란한 명예 세트',
	'초중력 세트',
	'유적 수호자 세트',
	
	'크롬의 흡혈 세트',
	'흑철피갑 세트',
	'간극의 승부사 세트',
	'미지로의 항해 세트',
	'엘리의 외출복 세트',
	
	'전율의 심해 세트',
	'황야의 사냥꾼 세트',
	'트윙클 레이디 세트',
	'불타는 마녀 세트',
	'칠흑의 예언자 세트'
	];
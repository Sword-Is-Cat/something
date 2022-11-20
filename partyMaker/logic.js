/**
 * 
 */

$(function() {

	draw_screen();

});

function draw_screen() {

	const body = document.querySelector('body');
	let element;

	let title = appendElement('div', body, 'base title');
	let content = appendElement('div', body, 'base content');
	let footer = appendElement('div', body, 'base footer');

	// [1] title
	element = appendElement('p', title, 'tcenter');
	element.style.padding = '60px 0';
	element = appendElement('strong', element, 'font30');
	element.innerText = 'Raid Party Maker';

	// [2] footer
	element = appendElement('p', footer, 'tright');
	element.style.padding = '20px 0 30px 0';
	element = appendElement('strong', element, 'font20');
	element.style.marginRight = '100px';
	element.innerText = 'KoRuNoKe';

	// [3] content
	draw_content(content);
}

let inputArea, errorArea, entryArea, optionArea, partyArea;
let textArea, errList, entryList, resultList;
let cntEntry, cntRaid, driver;
const driverCut = 38000;

function draw_content(content) {
	
	content = appendElement('div', content, 'content_wrapper');

	inputArea = appendElement('div', content);
	errorArea = appendElement('div', content, 'hide');
	entryArea = appendElement('div', content, 'hide');
	optionArea = appendElement('div', content, 'hide');
	partyArea = appendElement('div', content, 'hide');
	
	let element, temp;
	
	// [1] inputArea
	textArea = appendElement('textArea', inputArea, 'input_text textArea');
	textArea.placeholder += '항마력(3.2) 직업(남크루) 캐릭명(쥰내개구몽)\n';
	textArea.placeholder += '직업(남크루) 캐릭명(쥰내개구몽) 항마력(3.2)\n';
	textArea.placeholder += '직업명을 캐릭명보다 먼저 적어야 하며, 띄어쓰기 해야합니다';
	element = appendElement('button', inputArea, 'wideBtn');
	element.innerText = '엔트리추가';
	element.onclick = function(){
		textToEntry();
	}
	
	// [2] errorArea
	element = appendElement('details', errorArea, 'details');
	appendElement('summary', element).innerText = 'ErrorCase';
	errList = appendElement('ul', element);
	
	// [3] entryArea
	element = appendElement('div', entryArea);
	element = appendElement('p', element, 'tcenter');
	appendElement('strong', element, 'font20').innerText = 'Entry';
	element = appendElement('div', entryArea, 'entryDiv');
	entryList = appendElement('ul', element);
	
	// [4] optionArea
	// [4-1] title
	element = appendElement('div', optionArea);
	element = appendElement('p', element, 'tcenter');
	appendElement('strong', element, 'font20').innerText = 'Options';
	// [4-2] counters
	element = appendElement('div', optionArea, 'optionPanel');
	appendElement('p', element, 'w20 tcenter').innerText = '인원수';
	cntEntry = appendElement('p', element, 'w20 tright');
	appendElement('p', element, 'w10 tcenter').innerText = '명';
	appendElement('p', element, 'w20 tcenter').innerText = '공대수';
	temp = appendElement('p', element, 'w20 tright');
	cntRaid = appendElement('input', temp, 'w50 input_text');
	cntRaid.type = 'number';
	appendElement('p', element, 'w10 tcenter').innerText = '개';
	// [4-3] bus driver
	element = appendElement('div', optionArea, 'optionPanel');
	appendElement('p', element, 'w50 tcenter').innerText = '버스기사 항마력';
	temp = appendElement('p', element, 'w30 tright');
	driver = appendElement('input', temp, 'w80 input_text');
	driver.type = 'number';
	driver.value = driverCut;
	appendElement('p', element, 'w20 tcenter').innerText = '이상';
	// [4-4] action btn
	element = appendElement('button', optionArea, 'wideBtn');
	element.innerText = '파티구성';
	element.onclick = function(){
		partyArea.classList.remove('hide');
		makeUp();
	}
	
	// [5] partyArea
	// [5-1] title
	element = appendElement('div', partyArea);
	element = appendElement('p', element, 'tcenter');
	appendElement('strong', element, 'font20').innerText = 'Result';
	// [5-2] resultTable
	element = appendElement('div', partyArea);
	let table = appendElement('table', element, 'resultTable');
	table.setAttribute('cellspacing', '0');
	table.setAttribute('cellpadding', '0');
	table.setAttribute('cellborder', '0');
	let colgroup = appendElement('colgroup', table);
	appendElement('col',colgroup).width='50%';
	appendElement('col',colgroup).width='50%';
	resultList = appendElement('tbody', table);
	
}

function textToEntry(){
	let str = textArea.value;
	textArea.value = '';
	if(str){
		str.split('\n').forEach((text)=>parseText(text));
	}
}

const synergyArr = ['소울', '넨마', '크루', '마도', '암제'];

function parseText(text){
	
	let data = text.trim().split(/[^a-zA-Zㄱ-힣0-9. ]/g);
	data = data[data.length-1].trim();
	if(!data)
		return;
	
	let name, job, synergy = false, power;
	let arr = data.trim().replace(/[^a-zA-Zㄱ-힣0-9.]+/g, ' ').split(' ');

	arr.forEach(function(item){

		let parsed = parseFloat(item);

		if (parsed) {
			power = parsed;
		} else {
			if (item) {
				
				job = name;
				name = item;
				
			}
		}
		
	});
	
	
	if(name && job && power){
		synergyArr.forEach(function(syJob){
			if(job.indexOf(syJob)!=-1)
				synergy = true;
		});
		entryArea.classList.remove('hide');
		optionArea.classList.remove('hide');
		insertEntryCard(name, job, power, synergy);
	}else{
		errorArea.classList.remove('hide');
		appendElement('li', errList).innerText = data;
	}

}

function insertEntryCard(name, job, power, synergy){
	
	while(power<10000)
		power*=10;
	power = Math.round(power);
	
	let li = appendElement('li', entryList);
	let div = appendElement('div', li, 'entry');
	
	let table = appendElement('table', div, 'entryTable');
	table.setAttribute('cellspacing', '0');
	table.setAttribute('cellpadding', '0');
	table.setAttribute('cellborder', '0');
	
	let colgroup = appendElement('colgroup', table);
	appendElement('col',colgroup).width='30%';
	appendElement('col',colgroup).width='50%';
	appendElement('col',colgroup).width='20%';
	
	let body = appendElement('tbody', table);
	let tr, td, input;
	
	// [1] 캐릭명
	tr = appendElement('tr', body);
	appendElement('th', tr).innerText = '캐릭명';
	td = appendElement('td', tr);
	td.setAttribute('colspan', '2');
	input = appendElement('input', td, 'input_text w80');
	input.type = 'text';
	input.value = name;
	
	// [2] 항마력
	tr = appendElement('tr', body);
	appendElement('th', tr).innerText = '항마';
	td = appendElement('td', tr);
	td.setAttribute('colspan', '2');
	input = appendElement('input', td, 'input_text w80');
	input.type = 'number';
	input.value = power;
	
	// [3] 직업/시너지여부
	tr = appendElement('tr', body);
	appendElement('th', tr).innerText = '직업';
	td = appendElement('td', tr);
	input = appendElement('input', td, 'input_text w80');
	input.type = 'text';
	input.value = job;
	td = appendElement('td', tr);
	td.innerText = '시';
	input = appendElement('input', td);
	input.type = 'checkbox';
	input.checked = synergy;
	
	td.onclick = function(event){
		event.stopPropagation();
		input.checked = !input.checked;
	}
	
	let cnt = document.querySelectorAll('table.entryTable').length;
	cntEntry.innerText = cnt;
	cntRaid.value = Math.ceil(cnt/6);
}

function makeUp(){
	
	// [1] Entry Data화
	let fullMember = new Array(), sngMember = new Array();
	document.querySelectorAll('table.entryTable>tbody').forEach(function(tbody){
		let member = new Object();
		member.name = tbody.childNodes[0].childNodes[1].childNodes[0].value;
		member.power = Number(tbody.childNodes[1].childNodes[1].childNodes[0].value);
		member.job = tbody.childNodes[2].childNodes[1].childNodes[0].value;
		member.synergy = tbody.childNodes[2].childNodes[2].childNodes[1].checked;
		member.driver = member.power >= driver.value;
		fullMember.push(member);
		if(member.synergy)
			sngMember.push(member);
	});
	// [1-1] Entry power 내림차순 정렬
	fullMember.sort( ( a , b ) => b.power - a.power );
	sngMember.sort( ( a , b ) => b.power - a.power );
	// [2] Raids, Partys 생성
	let raids = new Array(), partys = new Array();
	for(let idx = 0 ; idx<cntRaid.value ; idx++){
		raids.push(new Array());
		let party = new Array();
		raids[idx].push(party);
		partys.push(party);
	}
	for(let idx = cntRaid.value-1 ; idx>=0 ; idx--){
		let party = new Array();
		raids[idx].push(party);
		partys.push(party);
	}
	// [3] Member 배치
	// [3-1] 1번자리는 덮어놓고 고항마
	for(let idx = 0 ; idx<partys.length ; idx++){
		let member = fullMember.length>0?fullMember[0]:null;
		partys[idx].push(member);
		removeElement(fullMember, sngMember, member);
	}
	// [3-2] 2번자리는 리더가 버스기사면 약한사람, 딜러면 시너지, 시너지면 아무나
	for(let idx = partys.length-1 ; idx>=0 ; idx--){
		let member = null, leader = partys[idx].length>0?partys[idx][0]:null;
		if(leader){
		
			if(leader.driver){
				member = fullMember.length>0?fullMember[fullMember.length-1]:null;
			}else if(!leader.synergy){
				member = sngMember.length>0?sngMember[0]:fullMember.length>0?fullMember[0]:null;
			}else{
				member = fullMember.length>0?fullMember[0]:null;
			}
			
		}
		partys[idx].push(member);
		removeElement(fullMember, sngMember, member);
	}
	// [3-3] 3번자리는 리더가 버스기사면 약한사람, 아니면 센사람
	for(let idx = partys.length-1 ; idx>=0 ; idx--){
		let member = null, leader = partys[idx].length>0?partys[idx][0]:null;
		
		if(leader){
			if(leader.driver){
				member = fullMember.length>0?fullMember[fullMember.length-1]:null;
			}else{
				member = fullMember.length>0?fullMember[0]:null;
			}
		}
		
		partys[idx].push(member);
		removeElement(fullMember, sngMember, member);
	}
	// [4] 결과 출력
	render_result(raids);
}

function render_result(raids){
	
	while(resultList.childElementCount>0){
		resultList.removeChild(resultList.childNodes[0]);
	}
	selected = null;
	
	let cnt = raids.length;
	let tr, th, td;
	
	for(let idx = 0 ; idx<cnt ; idx++){
		tr = appendElement('tr', resultList);
		th = appendElement('th', tr);
		th.setAttribute('colspan', '2');
		th.innerText = (idx+1)+' 공대';
		tr = appendElement('tr', resultList);
		appendElement('th', tr).innerText = '1 파티';
		appendElement('th', tr).innerText = '2 파티';
		tr = appendElement('tr', resultList);
		memberCard(raids[idx][0][0], appendElement('td', tr));
		memberCard(raids[idx][1][0], appendElement('td', tr));
		tr = appendElement('tr', resultList);
		memberCard(raids[idx][0][1], appendElement('td', tr));
		memberCard(raids[idx][1][1], appendElement('td', tr));
		tr = appendElement('tr', resultList);
		memberCard(raids[idx][0][2], appendElement('td', tr));
		memberCard(raids[idx][1][2], appendElement('td', tr));
	}
}

function memberCard(member, td){
	
	let div = appendElement('div', td, 'w100');
	if(member){
		div.innerText = member.name + ' / ' + member.job + ' / ' + member.power;
		if(member.driver)
			div.classList.add('driver');
		else if(member.synergy)
			div.classList.add('synergy');
	}
	td.onclick = function(){
		tdSwitch(this);
	}
	return div;
}

let selected = null;

function tdSwitch(td){
	
	let div = td.childNodes[0];
	
	if(selected){
		toggleClass(selected.parentElement, 'selected');
		let td1 = selected.parentElement, td2 = div.parentElement;
		while(td1.childElementCount>0)
			td1.removeChild(td1.childNodes[0]);
		while(td2.childElementCount>0)
			td2.removeChild(td2.childNodes[0]);
		td1.appendChild(div);
		td2.appendChild(selected);
		selected = null;
	}else{
		selected = div;
		toggleClass(selected.parentElement, 'selected');
	}
	
}

function removeElement(array1, array2, element){
	if(array1.indexOf(element)>-1)
		array1.splice(array1.indexOf(element), 1);
	if(array2.indexOf(element)>-1)
		array2.splice(array2.indexOf(element), 1);
}

function toggleClass(element, className) {
	let classList = element.classList;
	if (classList.contains(className))
		classList.remove(className);
	else
		classList.add(className);
}

function appendElement(tagName, parent, className) {
	let element = document.createElement(tagName);
	if (parent)
		parent.appendChild(element);
	if (className)
		element.className = className;
	return element;
}

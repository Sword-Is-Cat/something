let accCnt = 1;
let charaCnt = 1;

function newAccountHtml(accName, charaStr) {

	let accId = 'ACC' + (accCnt++);

	let html = '<li id="' + accId + '" class="acc">' + '<span>계정명</span>'
			+ '<input id="' + accId
			+ 'name" type="text" class="input_text" value="'
			+ (accName ? accName : '') + '"/>'
			+ '<button onclick="addChara(this)">캐릭터추가</button>'
			+ '<ol class="charalist">';

	if (charaStr) {
		charaStr.split('/').forEach(function(str) {
			let arr = str.split(',');
			html += newCharaHtml(arr[0], arr[1]);
		});
	} else
		html += newCharaHtml();

	html += '</ol></li>';

	return html;
}

function newCharaHtml(charaName, power) {

	let charaId = 'CHARA' + (charaCnt++);
	let powerArr = [ false, false, false, false, false, false ];
	let valueArr = [ 0, 1.5, 1.6, 1.7, 1.8, 1.9 ];
	let textArr = [ '응애', '1.5', '1.6', '1.7', '1.8', 'over' ];

	if (power) {
		/*
		if (power < 1.5)
			powerArr[0] = true;
		else if (power > 1.8)
			powerArr[5] = true;
		else
			for (let i = 0; i < textArr.length; i++) {
				if (power == textArr[i])
					powerArr[i] = true;
			}
		*/
		let idx = 0;
		for (let i = 0; i < valueArr.length; i++) {

			if (power >= valueArr[i]) {
				idx = i;
			} else {
				break;
			}
		}
		powerArr[idx] = true;
	}

	let html = '<li id="' + charaId + '" class="chara '+(power?'':'power')+'">' + '<span>캐릭명</span>'
			+ '<input id="' + charaId
			+ 'name" type="text" class="input_text" value="'
			+ (charaName ? charaName : '') + '"/>' + '<span>항마력</span>';

	for (let i = 0; i < textArr.length; i++)
		html += '<label><input type="radio" name="' + charaId + 'po" onchange="radioChange(this)" value="'
				+ valueArr[i] + '" ' + (powerArr[i] ? 'checked' : '') + '>'
				+ textArr[i] + '</label>';

	html += '</li>';

	return html;
}

function buildTermHtml(terms) {

	let html = '';

	terms.forEach(function(term, idx) {

		let raidCnt = term.raids.length * 2;
		html += '<tr>' + '<th rowspan="' + raidCnt + '">' + (idx + 1) + '회차'
				+ '</th>' + '</tr>';

		html += buildRaidHtml(term.raids);

	});

	return html;
}

function buildRaidHtml(raid, idx) {

	let html = '';

	html += '<tr>';
	html += '<th colspan="4">' + (idx + 1) + '공대</th>';
	html += '</tr>';
	html += '<tr>';
	html += '<th colspan="2">1파티</th>';
	html += '<th colspan="2">2파티</th>';
	html += '</tr>';
	html += '<tr>';
	html += buildMemberHtml(raid.partys[0].members[0]);
	html += buildMemberHtml(raid.partys[1].members[0]);
	html += '</tr>';
	html += '<tr>';
	html += buildMemberHtml(raid.partys[0].members[1]);
	html += buildMemberHtml(raid.partys[1].members[1]);
	html += '</tr>';
	html += '<tr>';
	html += buildMemberHtml(raid.partys[0].members[2]);
	html += buildMemberHtml(raid.partys[1].members[2]);
	html += '</tr>';

	return html;

}

function buildMemberHtml(member) {

	let html = '';

	if (member) {
		html += '<td>' + (member.name == '' ? member.charaid : member.name)
				+ '</td>';
		html += '<td>'
				+ (member.power == overCutLine ? '버스기사' : member.power == 0 ? '응애': member.power) 
				+ '</td>';

	} else {
		html += '<td colspan="2">빈자리</td>';
	}

	return html;

}

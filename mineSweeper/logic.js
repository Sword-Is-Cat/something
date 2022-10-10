/**
 * 
 */

let mapData;

$(function() {

	drawScreen();
	mapData = getMapData();

});

function drawScreen() {

	let body = document.body;

	let bgVideo = appendElement('video', body, 'bgVideo');
	setBgVideo(bgVideo);

	let bodyWrapper = appendElement('div', body, 'bodyWrapper');

	let lnb = appendElement('div', bodyWrapper, 'lnb');
	bindLnbData(lnb);

	let contentsBody = appendElement('div', bodyWrapper, 'contentsBody');

	let contents = appendElement('div', contentsBody, 'contents');

	let iframeWrapper = appendElement('div', contents, 'iframeWrapper');

	let iframe = appendElement('iframe', iframeWrapper, 'videoPlayer');
	setYoutubeIframe(iframe);

	let miniMapWrapper = appendElement('div', contents, 'miniMapWrapper');
	miniMapWrapper.setAttribute('id', 'miniMapWrapper');
	miniMapWrapper.onclick = function() {
		miniMapSize()
	};

}

function bindLnbData(lnb) {

	let root = getData();

	let ul = appendElement('ul', lnb);

	drawDataMenu(root, ul, 0);
	ul.children[0].children[0].style.display = 'none';

}

function drawDataMenu(node, ul, depth) {

	if (node.name) {

		let li = document.createElement('li');
		ul.appendChild(li);
		ul.className = 'depth_' + depth;

		let $a = document.createElement('a');
		$a.innerText = node.name;

		li.appendChild($a);

		if (node.id) {
			$a.href = 'javascript:setYoutubeSrc(\'' + node.id + '\', \''
					+ node.type + '\')';
		} else {
			$a.href = 'javascript:void(0)';
		}

		if (node.child.length > 0) {

			$a.onclick = function() {
				toggleSibling(this)
			};
			let $ul = appendElement('ul', li);
			node.child.forEach(function(childNode) {
				drawDataMenu(childNode, $ul, depth + 1);
			});

			$ul.style.display = 'none';
		}
	}
}

function toggleSibling(element) {

	let next = element.nextElementSibling;

	if (next.tagName == 'UL') {

		if (next.style.display == 'none')
			next.style.display = '';
		else
			next.style.display = 'none';

	}

}

function setBgVideo(element) {
	element.autoplay = true;
	element.loop = true;
	element.muted = true;
	element.src = '../info_01.mp4';
	element.load();
}

function setYoutubeIframe(iframe) {
	iframe.width = 940;
	iframe.height = 540;
	iframe.title = 'YouTube embed player';
	iframe.frameborder = 0;
	iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
	iframe.setAttributeNode(document.createAttribute('allowfullscreen'));
	iframe.style.display = 'none';
}

function setYoutubeSrc(ytbId, type) {
	if (!ytbId)
		ytbId = 'Y4DHoqZbKpM';
	let ytb = document.querySelector('iframe');
	ytb.src = 'https://www.youtube.com/embed/' + ytbId;
	ytb.style.display = 'block';
	document.querySelector('.contents').classList.add('on');

	ytb.className = 'videoPlayer';

	if (type == 'null') {
		ytb.classList.add('single');
		document.getElementById('miniMapWrapper').classList.remove('on');
	} else {
		ytb.classList.add('double');
		drawMiniMap(type);
		document.getElementById('miniMapWrapper').classList.add('on');
	}

}

function drawMiniMap(type) {

	let miniMapWrapper = document.getElementById('miniMapWrapper');

	while (miniMapWrapper.children.length > 0) {
		miniMapWrapper.removeChild(miniMapWrapper.children[0]);
	}

	let miniMap = appendElement('table', miniMapWrapper, 'miniMap');
	let mapGrid = mapData[type], length = mapGrid.length;
	let tr, td;

	for (let row = 0; row < length; row++) {

		tr = appendElement('tr', miniMap);

		for (let col = 0; col < length; col++) {

			let cln = mapGrid[row][col];
			td = appendElement('td', tr, cln == ' ' ? null : cln);

		}

	}

}

function miniMapSize() {

	let miniClass = document.getElementById('miniMapWrapper').classList, small = 'small';
	if (miniClass.contains(small))
		miniClass.remove(small);
	else
		miniClass.add(small);

}

function appendElement(tagName, parent, className) {
	let element = document.createElement(tagName);
	if (parent)
		parent.appendChild(element);
	if (className)
		element.className = className;
	return element;
}

function newNode(name, id, type) {
	let node = new Object();
	node.name = name;
	node.child = new Array();
	node.id = id;
	node.type = type || 'null';
	return node;
}

function getData() {

	let root = newNode('root');

	let bingo = newNode('길드빙고');
	let ujang = newNode('유적지쟁탈전');

	root.child.push(bingo);
	root.child.push(ujang);

	for (let idx = 0; idx < 8; idx++) {
		bingo.child.push(newNode(idx == 0 ? null : idx + "단계"));
	}

	// 빙고 idx단계 (세부설명, ytbId)
	bingo.child[5].child.push(newNode('221001', 'hLSQ6BcD0oU', 'BINGO_5'));
	bingo.child[5].child.push(newNode('221001', 'dfc5sn_SbB8', 'BINGO_5'));
	bingo.child[5].child.push(newNode('221002', 'q5VOW0LBhsM', 'BINGO_5'));

	bingo.child[6].child.push(newNode('221009', 'vVXNkmBvoBM', 'BINGO_6'));
	bingo.child[6].child.push(newNode('221010', '7kUqqwDtxdc', 'BINGO_6'));

	bingo.child[7].child.push(newNode('맵작업중', '7kUqqwDtxdc', 'BINGO_7'));
	
	// 유적지쟁탈전
	let ujangDate;

	ujangDate = newNode('허허벌판');
	ujang.child.push(ujangDate);
	// ujangDate.child.push(newNode('220709_허허벌판(1인)', '2-rr9JbFgwA', 'EMPTY'));
	// ujangDate.child.push(newNode('220716_허허벌판(1인)', 'iBwSjhuhM5E', 'EMPTY'));
	// ujangDate.child.push(newNode('220716_허허벌판(1인)', 'hzAMLDzX6VY', 'EMPTY'));
	// ujangDate.child.push(newNode('220716_허허벌판(1인)', 'c9tv_VFdHBo', 'EMPTY'));
	// ujangDate.child.push(newNode('220716_허허벌판(1인)', 'DFlNuB2f9bc', 'EMPTY'));
	// ujangDate.child.push(newNode('220723_허허벌판(1인)', 'aqOBftmHP-E', 'EMPTY'));
	ujangDate.child.push(newNode('220723_허허벌판(1인)', '6HnILzCW69s', 'EMPTY'));
	ujangDate.child.push(newNode('220723_허허벌판(1인)', 'lLNdQhIsKdc', 'EMPTY'));
	ujangDate.child.push(newNode('220730_허허벌판(1인)', 'CjHi_7En9wg', 'EMPTY'));

	ujangDate = newNode('누운Y자');
	ujang.child.push(ujangDate);
	// ujangDate.child.push(newNode('220709_누운Y자(1인)', 'EIDqQqLDTAA', 'TURNY'));
	// ujangDate.child.push(newNode('220716_누운Y자(1인)', 'eqqIOD9YF1Y', 'TURNY'));
	// ujangDate.child.push(newNode('220723_누운Y자(1인)', 'ggQue0YNFWw', 'TURNY'));
	// ujangDate.child.push(newNode('220723_누운Y자(1인)', 'QxwQ0N4wkRg', 'TURNY'));
	// ujangDate.child.push(newNode('220723_누운Y자(1인)', '_zNvWzw5Pq8', 'TURNY'));
	ujangDate.child.push(newNode('220723_누운Y자(1인)', 'EMGFbQ-DpUs', 'TURNY'));
	ujangDate.child.push(newNode('220730_누운Y자(1인)', '2nLQy-z1ckI', 'TURNY'));
	ujangDate.child.push(newNode('220730_누운Y자(1인)', 'kMt4YZiGMSA', 'TURNY'));

	ujangDate = newNode('능선');
	ujang.child.push(ujangDate);
	ujangDate.child.push(newNode('220709_능선(1인)', 'eAWszz0Jk6o', 'VALLEY'));
	ujangDate.child.push(newNode('220716_능선(1인)', 'fV3OF8xRooI', 'VALLEY'));

	ujangDate = newNode('4개의방');
	ujang.child.push(ujangDate);
	ujangDate.child.push(newNode('220709_4개의방(1인)', 'VfX1WRhdBIE', 'FOUR'));
	ujangDate.child.push(newNode('220709_4개의방(1인)', 'DDkUYm6qZpU', 'FOUR'));
	ujangDate.child.push(newNode('220716_4개의방(1인)', 'HUwzl3uqNGs', 'FOUR'));

	ujangDate = newNode('고블린보너스');
	ujang.child.push(ujangDate);
	// ujangDate.child.push(newNode('220709_고블린보너스(1인)', 'Hm9U4T3TUlc',
	// 'FUCK'));
	// ujangDate.child.push(newNode('220716_고블린보너스(1인)', 'y4ZXU0526zU',
	// 'FUCK'));
	// ujangDate.child.push(newNode('220730_고블린보너스(1인)', 'Mc0cRThGFNs',
	// 'FUCK'));
	ujangDate.child.push(newNode('220730_고블린보너스(1인)', 'hfXU95PTh4w', 'FUCK'));
	ujangDate.child.push(newNode('220730_고블린보너스(1인)', 'RMoWi0Q-NDE', 'FUCK'));
	ujangDate.child.push(newNode('220730_고블린보너스(1인)', 'w5fa6f7j5X8', 'FUCK'));

	ujangDate = newNode('닫힌십자가');
	ujang.child.push(ujangDate);
	ujangDate.child.push(newNode('220723_닫힌십자가(1인)', 'wwD0MKH2rF8', 'CROSSCL'));
	ujangDate.child.push(newNode('220730_닫힌십자가(1인)', '0PQTPYK1BfQ', 'CROSSCL'));

	ujangDate = newNode('열린십자가');
	ujang.child.push(ujangDate);
	ujangDate.child.push(newNode('220709_열린십자가(1인)', 'nmjlTr3iTm0', 'CROSSOP'));
	ujangDate.child.push(newNode('220730_열린십자가(1인)', 'I8CJ11VLw9w', 'CROSSOP'));

	ujangDate = newNode('나이테');
	ujang.child.push(ujangDate);
	ujangDate.child.push(newNode('220716_나이테(1인)', 'Yt-QFUd8xfI', 'RING'));
	ujangDate.child.push(newNode('220723_나이테(1인)', 'IIMInz3mpGM', 'RING'));
	ujangDate.child.push(newNode('220730_나이테(1인)', '56Eri_jpWvE', 'RING'));

	ujangDate = newNode('출구앞문');
	ujang.child.push(ujangDate);
	ujangDate.child.push(newNode('220716_출구앞문(1인)', '-Tk_GZlCVgY', 'EXIT'));

	ujangDate = newNode('20분 풀영상');
	ujang.child.push(ujangDate);
	ujangDate.child.push(newNode('221008', '_G_3AIJjMWc'));

	return root;
}

function getMapData() {

	let mapData = new Object();

	let EMPTY = [
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'G',
					'G', ' ', 'E' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'G',
					'J', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'G',
					'J', 'J', 'G' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'G',
					'G', 'G', 'G' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ] ];

	let FUCK = [
			[ ' ', ' ', ' ', ' ', 'K', 'W', 'J', 'G', 'G', 'G', 'J', 'W', 'K',
					' ', ' ', 'E' ],
			[ ' ', ' ', ' ', ' ', ' ', 'W', ' ', 'G', 'G', 'G', ' ', 'W', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', 'W', ' ', 'G', 'G', 'G', ' ', 'W', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', 'W', ' ', ' ', ' ', ' ', ' ', 'W', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', 'W', ' ', ' ', ' ', ' ', ' ', 'W', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', 'W', ' ', ' ', ' ', ' ', ' ', 'W', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', 'W', 'W', 'W', 'O', 'W', 'W', 'W', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'W', 'G', 'W', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'W', 'G', 'W', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'W', 'G', 'W', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'W', 'S', 'W', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ] ];

	let TURNY = [
			[ ' ', ' ', 'W', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
					' ', ' ', 'E' ],
			[ ' ', ' ', 'W', 'W', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', 'W', 'W', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', 'W', 'W', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', 'W', 'W', ' ', ' ', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', 'W', 'W', ' ', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'W', 'W', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'W', 'W', 'W', 'W', 'S',
					'W', 'W', 'W' ],
			[ 'K', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'S', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'W', 'W', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', 'W', 'W', ' ', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', 'W', 'W', ' ', ' ', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', 'W', 'W', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', 'W', 'W', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', 'W', 'W', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', 'W', 'K', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ] ];

	let VALLEY = [
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
					' ', ' ', 'E' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'W', 'W', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'W', 'W', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'W', 'W', ' ', ' ',
					' ', ' ', ' ' ],
			[ 'W', 'W', 'W', 'W', 'W', 'W', ' ', ' ', ' ', ' ', 'W', 'W', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'W', 'W',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'W',
					'W', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'W', 'W', ' ', ' ', ' ', ' ',
					'W', 'W', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', 'W', 'W', ' ', ' ', ' ', ' ', ' ',
					' ', 'W', 'W' ],
			[ ' ', ' ', ' ', ' ', ' ', 'W', 'W', ' ', ' ', ' ', ' ', ' ', ' ',
					' ', ' ', 'W' ],
			[ ' ', ' ', ' ', ' ', 'W', 'W', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', 'W', 'W', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', 'W', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ] ];

	let FOUR = [
			[ ' ', ' ', ' ', 'K', 'W', ' ', ' ', ' ', ' ', ' ', 'K', 'W', 'K',
					' ', ' ', 'E' ],
			[ ' ', ' ', ' ', ' ', 'W', ' ', ' ', ' ', ' ', ' ', ' ', 'W', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', 'W', ' ', ' ', ' ', ' ', ' ', ' ', 'W', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', 'W', ' ', ' ', ' ', ' ', ' ', ' ', 'W', ' ',
					' ', ' ', ' ' ],
			[ 'W', 'W', 'W', 'S', 'W', ' ', ' ', ' ', ' ', ' ', ' ', 'W', 'S',
					'W', 'W', 'W' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ 'W', 'W', 'W', 'S', 'W', ' ', ' ', ' ', ' ', ' ', ' ', 'W', 'S',
					'W', 'W', 'W' ],
			[ ' ', ' ', ' ', ' ', 'W', ' ', ' ', ' ', ' ', ' ', ' ', 'W', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', 'W', ' ', ' ', ' ', ' ', ' ', ' ', 'W', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', 'W', ' ', ' ', ' ', ' ', ' ', ' ', 'W', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', 'W', ' ', ' ', ' ', ' ', ' ', ' ', 'W', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', 'K', 'W', ' ', ' ', ' ', ' ', ' ', ' ', 'W', 'K',
					' ', ' ', ' ' ] ];

	let CROSSOP = [
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'W', ' ', ' ', ' ', ' ', ' ',
					' ', ' ', 'E' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'W', ' ', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'W', ' ', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'W', ' ', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'W', ' ', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'W', ' ', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ 'W', 'W', 'W', 'W', 'W', 'W', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'W', 'W', 'W',
					'W', 'W', 'W' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'W', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'W', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'W', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'W', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'W', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'W', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ] ];

	let RING = [
			[ ' ', ' ', ' ', ' ', ' ', 'W', ' ', 'K', ' ', 'W', ' ', ' ', ' ',
					'W', ' ', 'E' ],
			[ ' ', ' ', ' ', ' ', ' ', 'W', ' ', ' ', ' ', 'W', ' ', ' ', ' ',
					'W', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', 'W', ' ', ' ', ' ', 'W', ' ', ' ', ' ',
					'W', 'S', 'W' ],
			[ ' ', ' ', ' ', ' ', ' ', 'W', ' ', ' ', ' ', 'W', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', 'W', ' ', ' ', ' ', 'W', ' ', ' ', ' ',
					' ', ' ', 'K' ],
			[ ' ', ' ', ' ', ' ', ' ', 'W', ' ', ' ', ' ', 'W', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', 'W', ' ', ' ', ' ', 'W', 'S', 'W', 'W',
					'W', 'W', 'W' ],
			[ ' ', ' ', ' ', ' ', ' ', 'W', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', 'W', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', 'W', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', 'W', 'S', 'W', 'W', 'W', 'W', 'W', 'W',
					'W', 'W', 'W' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'K', ' ', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ] ];

	let EXIT = [
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'W',
					' ', ' ', 'E' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'W',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'W',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'W',
					'S', 'W', 'W' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'K', ' ', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ] ];

	let CROSSCL = [
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'W', ' ', ' ', ' ', ' ', ' ',
					' ', ' ', 'E' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'W', ' ', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'W', ' ', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', 'K', ' ', ' ', ' ', 'W', ' ', ' ', ' ', ' ', 'K',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'W', ' ', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'W', ' ', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'S', ' ', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ 'W', 'W', 'W', 'W', 'W', 'W', 'S', 'W', 'W', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'W', 'W', 'S', 'W', 'W', 'W',
					'W', 'W', 'W' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'S', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'W', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'W', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', 'K', ' ', ' ', ' ', ' ', 'W', ' ', ' ', ' ', 'K',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'W', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'W', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'W', ' ', ' ', ' ', ' ',
					' ', ' ', ' ' ] ];

	let BINGO_1;

	let BINGO_2;

	let BINGO_3;

	let BINGO_4;

	let BINGO_5 = [
		['K',' ',' ',' ',' ',' ','S',' ',' ',' ',' ',' ','K'],
		[' ',' ',' ',' ',' ','W','W','W',' ',' ',' ',' ',' '],
		[' ',' ',' ',' ','W','W','E','W','W',' ',' ',' ',' '],
		[' ',' ',' ','W','W','W','S','W','W','W',' ',' ',' '],
		[' ',' ','W','W',' ',' ',' ',' ',' ','S',' ',' ',' '],
		[' ','W','W',' ',' ',' ',' ',' ',' ','W','W','W',' '],
		['S','W',' ',' ',' ',' ',' ',' ',' ',' ',' ','W','W'],
		[' ','W','W',' ',' ',' ',' ',' ',' ',' ','W','W','K'],
		[' ',' ','W','W',' ',' ',' ',' ',' ','W','W',' ',' '],
		[' ',' ',' ','W','W',' ',' ',' ','W','W',' ',' ',' '],
		[' ',' ',' ',' ','W','W','K','W','W',' ',' ',' ',' '],
		[' ',' ',' ',' ',' ','W','W','W',' ',' ',' ',' ',' '],
		['K',' ',' ',' ',' ',' ','S',' ',' ',' ',' ',' ',' ']
	];

	let BINGO_6 = [
		[' ',' ','S',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','S','E'],
		[' ',' ','W','W',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','W','W'],
		[' ',' ',' ','W','W',' ',' ',' ',' ',' ',' ',' ',' ','W','W','K'],
		[' ',' ',' ',' ','W','W',' ',' ',' ',' ',' ',' ','W','W',' ',' '],
		[' ',' ',' ',' ',' ','W','W',' ',' ',' ',' ','W','W',' ',' ',' '],
		[' ',' ',' ',' ',' ',' ','W','W','K',' ','W','W',' ',' ',' ',' '],
		[' ',' ',' ',' ',' ',' ',' ','W','W','W','W',' ',' ',' ',' ',' '],
		[' ',' ',' ',' ',' ',' ',' ','S',' ',' ',' ',' ',' ',' ','W','S'],
		[' ',' ',' ',' ',' ',' ','W','W',' ',' ',' ',' ',' ','W','W',' '],
		[' ',' ',' ',' ',' ','W','W','W','W',' ',' ',' ','W','W',' ',' '],
		[' ',' ',' ',' ','W','W',' ','K','W','W',' ','W','W',' ',' ',' '],
		[' ',' ',' ','W','W',' ',' ',' ',' ','W','W','W','K',' ',' ',' '],
		[' ',' ','W','W',' ',' ',' ',' ',' ',' ','W','W',' ',' ',' ',' '],
		['K','W','W',' ',' ',' ',' ',' ',' ',' ',' ','W','W',' ',' ',' '],
		['W','W',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','W',' ',' ',' '],
		[' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','S',' ',' ',' ']
	];

	let BINGO_7 = [
		[' ',' ',' ',' ',' ',' ',' ',' ',' ','W',' ',' ',' ',' ',' ',' ',' ',' ',' '],
		[' ',' ',' ',' ',' ',' ',' ',' ',' ','W',' ',' ',' ',' ',' ',' ',' ',' ',' '],
		[' ',' ',' ',' ',' ',' ',' ',' ',' ','W',' ',' ',' ',' ',' ',' ',' ',' ',' '],
		[' ',' ',' ',' ',' ',' ',' ',' ',' ','S',' ',' ',' ',' ',' ',' ',' ',' ',' '],
		[' ',' ',' ',' ',' ',' ',' ',' ',' ','W',' ',' ',' ',' ',' ',' ',' ',' ',' '],
		[' ',' ',' ',' ',' ',' ',' ',' ',' ','W',' ',' ',' ',' ',' ',' ',' ',' ',' '],
		[' ',' ',' ',' ',' ',' ',' ',' ',' ','W',' ',' ',' ',' ',' ',' ',' ',' ',' '],
		[' ',' ',' ',' ',' ',' ',' ',' ',' ','W',' ',' ',' ',' ',' ',' ',' ',' ',' '],
		[' ',' ',' ',' ',' ',' ',' ',' ','W','W','W',' ',' ',' ',' ',' ',' ',' ',' '],
		['W','W','W','S','W','W','W','W','W','E','W','W','W','W','W','S','W','W','W'],
		[' ',' ',' ',' ',' ',' ',' ',' ','W','S','W',' ',' ',' ',' ',' ',' ',' ',' '],
		[' ',' ',' ',' ',' ',' ',' ',' ','W','S','W',' ',' ',' ',' ',' ',' ',' ',' '],
		[' ',' ',' ',' ',' ',' ',' ',' ','W','S','W',' ',' ',' ',' ',' ',' ',' ',' '],
		[' ',' ',' ',' ',' ',' ',' ',' ','W','S','W',' ',' ',' ',' ',' ',' ',' ',' '],
		[' ',' ',' ',' ',' ',' ',' ',' ','W','S','W',' ',' ',' ',' ',' ',' ',' ',' '],
		[' ',' ',' ',' ',' ',' ',' ',' ','W',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
		[' ',' ',' ',' ',' ',' ',' ',' ','W',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
		[' ',' ',' ',' ',' ',' ',' ',' ','W',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
		[' ',' ',' ',' ',' ',' ',' ',' ','W',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ']
	];

	mapData['EMPTY'] = EMPTY;
	mapData['FUCK'] = FUCK;
	mapData['TURNY'] = TURNY;
	mapData['VALLEY'] = VALLEY;
	mapData['CROSSCL'] = CROSSCL;
	mapData['FOUR'] = FOUR;
	mapData['RING'] = RING;
	mapData['EXIT'] = EXIT;
	mapData['CROSSOP'] = CROSSOP;

	mapData['BINGO_1'] = BINGO_1;
	mapData['BINGO_2'] = BINGO_2;
	mapData['BINGO_3'] = BINGO_3;
	mapData['BINGO_4'] = BINGO_4;
	mapData['BINGO_5'] = BINGO_5;
	mapData['BINGO_6'] = BINGO_6;
	mapData['BINGO_7'] = BINGO_7;

	return mapData;

}
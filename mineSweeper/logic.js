/**
 * 
 */

let mapData;

$(function() {

	mapData = getMapData();
	drawScreen();

});

function drawScreen() {

	let body = document.body;

	let bgVideo = appendElement('video', body, 'bgVideo');
	setBgVideo(bgVideo);

	let bodyWrapper = appendElement('div', body, 'bodyWrapper');

	let lnb = appendElement('div', bodyWrapper, 'lnb');

	let lnbContent = appendElement('div', lnb, 'lnbContent');
	bindLnbData(lnbContent);

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

	let miniMapAll = appendElement('div', contents, 'miniMapAll');
	miniMapAll.setAttribute('id', 'miniMapAll');

	drawAllminiMap(miniMapAll);

}

function bindLnbData(lnb) {

	let root = getData();

	let ul = appendElement('ul', lnb);

	drawDataMenu(root, ul, 0);
	ul.children[0].children[0].style.display = 'none';

}

function drawDataMenu(node, ul, depth) {

	if (node.name && (node.child.length > 0 || node.id)) {

		let li = document.createElement('li');
		ul.appendChild(li);
		ul.className = 'depth_' + depth;

		let $a = appendElement('a', li);
		$a.innerText = node.name;

		if (node.id) {

			if (node.id == 'maps') {
				$a.onclick = function() {
					showMaps();
				}
			} else {
				$a.onclick = function() {
					setYoutubeSrc(node.id, node.type);
				}
			}
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

function showMaps() {

	document.querySelector('iframe').src = '';
	document.querySelector('.contents').classList.add('on');
	document.querySelector('.contents').classList.add('maps');

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
	document.querySelector('.contents').classList.remove('maps');

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

	let tableElement = appendElement('table', miniMapWrapper, 'miniMap');

	drawOneMiniMap(tableElement, mapData[type]);
}

function drawAllminiMap(wrapper) {

	const keys = [ 'EMPTY', 'EXIT', 'FUCK', 'TURNY', 'CROSSCL', 'CROSSOP', 'VALLEY', 'FOUR', 'RING' ];
	const name = [ '허허벌판', '출구앞문', '고블린보너스', '누운Y', '닫힌십자가', '열린십자가', '능선', '4개의방', '나이테' ];

	let $ul = appendElement('ul', wrapper);
	let $li, $title, $body, $table;

	for (let idx = 0; idx < keys.length; idx++) {

		let key = keys[idx], text = name[idx];

		$li = appendElement('li', $ul);

		$title = appendElement('div', $li, 'mapTitle');
		$title.innerText = text;

		$body = appendElement('div', $li, 'mapBody');
		$table = appendElement('table', $body, 'miniMap');
		drawOneMiniMap($table, mapData[key]);
	}

}

function drawOneMiniMap(tableElement, mapGrid) {

	let tr, td, length = mapGrid.length;

	for (let row = 0; row < length; row++) {

		tr = appendElement('tr', tableElement);

		for (let col = 0; col < length; col++) {

			appendElement('td', tr, mapGrid[row][col].trim());
		}
	}

}

function miniMapSize() {

	toggleClass(document.getElementById('miniMapWrapper'), 'small');

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

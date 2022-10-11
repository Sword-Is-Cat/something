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

		let $a = document.createElement('a');
		$a.innerText = node.name;

		li.appendChild($a);

		if (node.id) {
			// $a.href = 'javascript:setYoutubeSrc(\'' + node.id + '\', \'' +
			// node.type + '\')';
			$a.onclick = function() {
				setYoutubeSrc(node.id, node.type);
			}
		} else {
			// $a.href = 'javascript:void(0)';
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
			appendElement('td', tr, cln == ' ' ? null : cln);
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

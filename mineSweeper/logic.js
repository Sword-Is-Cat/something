/**
 * 
 */

$(function() {

	drawScreen();

});

function drawScreen() {

	let body = document.body;

	let bgVideo = appendElement('video', body, 'bgVideo');
	setBgVideo(bgVideo);

	let bodyWrapper = appendElement('div', body, 'bodyWrapper');

	let lnb = appendElement('div', bodyWrapper, 'lnb');
	bindLnbData(lnb);

	let contentsBody = appendElement('div', bodyWrapper, 'contentsBody');

	let header = appendElement('div', contentsBody, 'header');
	let contents = appendElement('div', contentsBody, 'contents');
	let footer = appendElement('div', contentsBody, 'footer');

	let iframeWrapper = appendElement('div', contents, 'iframeWrapper');

	let iframe = appendElement('iframe', iframeWrapper, 'videoPlayer');
	setYoutubeIframe(iframe);

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
			$a.href = 'javascript:setYoutubeSrc(\'' + node.id + '\')';
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
	element.src = '../info_01.mp4';
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

function setYoutubeSrc(ytbId) {
	if (!ytbId)
		ytbId = 'Y4DHoqZbKpM';
	let ytb = document.querySelector('iframe');
	ytb.src = 'https://www.youtube.com/embed/' + ytbId;
	ytb.style.display = 'block';
	document.querySelector('.contents').classList.add('on');
}

function appendElement(tagName, parent, className) {
	let element = document.createElement(tagName);
	if (parent)
		parent.appendChild(element);
	if (className)
		element.className = className;
	return element;
}

function newNode(name, id) {
	let node = new Object();
	node.name = name;
	node.child = new Array();
	node.id = id;
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
	
	//빙고 idx단계 (세부설명, ytbId)
	bingo.child[5].child.push(newNode('휴게소-검은고냥', 'hLSQ6BcD0oU'));
	bingo.child[5].child.push(newNode('쉘터-수라고냥', 'dfc5sn_SbB8'));
	bingo.child[5].child.push(newNode('휴게소-검은고냥', 'q5VOW0LBhsM'));
	
	bingo.child[6].child.push(newNode('휴게소-검은고냥', 'vVXNkmBvoBM'));
	
	//유적지쟁탈전
	let ujangDate;
	ujangDate = newNode('220709');
	ujang.child.push(ujangDate);
	ujangDate.child.push(newNode('검은고냥(1인)', '2-rr9JbFgwA'));
	ujangDate.child.push(newNode('검은고냥(1인)', 'EIDqQqLDTAA'));
	ujangDate.child.push(newNode('검은고냥(1인)', 'eAWszz0Jk6o'));
	ujangDate.child.push(newNode('검은고냥(1인)', 'VfX1WRhdBIE'));
	ujangDate.child.push(newNode('검은고냥(1인)', 'DDkUYm6qZpU'));
	ujangDate.child.push(newNode('검은고냥(1인)', 'Hm9U4T3TUlc'));
	ujangDate.child.push(newNode('검은고냥(1인)', 'nmjlTr3iTm0'));
	
	ujangDate = newNode('220716');
	ujang.child.push(ujangDate);
	ujangDate.child.push(newNode('검은고냥(1인)', 'Yt-QFUd8xfI'));
	ujangDate.child.push(newNode('검은고냥(1인)', 'y4ZXU0526zU'));
	ujangDate.child.push(newNode('검은고냥(1인)', 'iBwSjhuhM5E'));
	ujangDate.child.push(newNode('검은고냥(1인)', 'HUwzl3uqNGs'));
	ujangDate.child.push(newNode('검은고냥(1인)', 'eqqIOD9YF1Y'));
	ujangDate.child.push(newNode('검은고냥(1인)', 'hzAMLDzX6VY'));
	ujangDate.child.push(newNode('검은고냥(1인)', '-Tk_GZlCVgY'));
	ujangDate.child.push(newNode('검은고냥(1인)', 'fV3OF8xRooI'));
	ujangDate.child.push(newNode('검은고냥(1인)', 'c9tv_VFdHBo'));
	ujangDate.child.push(newNode('검은고냥(1인)', 'DFlNuB2f9bc'));
	
	ujangDate = newNode('220723');
	ujang.child.push(ujangDate);
	ujangDate.child.push(newNode('검은고냥(1인)', 'ggQue0YNFWw'));
	ujangDate.child.push(newNode('검은고냥(1인)', 'aqOBftmHP-E'));
	ujangDate.child.push(newNode('검은고냥(1인)', 'QxwQ0N4wkRg'));
	ujangDate.child.push(newNode('검은고냥(1인)', 'IIMInz3mpGM'));
	ujangDate.child.push(newNode('검은고냥(1인)', 'wwD0MKH2rF8'));
	ujangDate.child.push(newNode('검은고냥(1인)', '6HnILzCW69s'));
	ujangDate.child.push(newNode('검은고냥(1인)', '_zNvWzw5Pq8'));
	ujangDate.child.push(newNode('검은고냥(1인)', 'EMGFbQ-DpUs'));
	ujangDate.child.push(newNode('검은고냥(1인)', 'lLNdQhIsKdc'));

	ujangDate = newNode('220730');
	ujang.child.push(ujangDate);
	ujangDate.child.push(newNode('검은고냥(1인)', 'Mc0cRThGFNs'));
	ujangDate.child.push(newNode('검은고냥(1인)', 'I8CJ11VLw9w'));
	ujangDate.child.push(newNode('검은고냥(1인)', 'hfXU95PTh4w'));
	ujangDate.child.push(newNode('검은고냥(1인)', 'CjHi_7En9wg'));
	ujangDate.child.push(newNode('검은고냥(1인)', 'RMoWi0Q-NDE'));
	ujangDate.child.push(newNode('검은고냥(1인)', '2nLQy-z1ckI'));
	ujangDate.child.push(newNode('검은고냥(1인)', 'kMt4YZiGMSA'));
	ujangDate.child.push(newNode('검은고냥(1인)', '0PQTPYK1BfQ'));
	ujangDate.child.push(newNode('검은고냥(1인)', '56Eri_jpWvE'));
	ujangDate.child.push(newNode('검은고냥(1인)', 'w5fa6f7j5X8'));
	
	ujangDate = newNode('221008');
	ujang.child.push(ujangDate);
	ujangDate.child.push(newNode('20분 풀영상', '_G_3AIJjMWc'));
	
	return root;
}
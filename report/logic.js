let idx = 0;
let data = new Object();
let text;

function addRow(){
	
	let html;
	idx++;
	
	data['mem'+idx] = new Object();
	
	html = `
		<li id='mem${idx}'>
			<input type='text'/ oninput='texting(this)'>
			<br/>
			항마력
			<label><input type='radio' name='power${idx}' key='power' onchange='radioChng(this)' value='16000'>16000</input></label>
			<label><input type='radio' name='power${idx}' key='power' onchange='radioChng(this)' value='17000'>17000</input></label>
			<label><input type='radio' name='power${idx}' key='power' onchange='radioChng(this)' value='18000'>18000</input></label>
			<label><input type='radio' name='power${idx}' key='power' onchange='radioChng(this)' value='19000'>19000</input></label>
			<label><input type='radio' name='power${idx}' key='power' onchange='radioChng(this)' value='20000'>20000</input></label>
			<br/>
			전시즌
			<label><input type='radio' name='prerank${idx}' key='prerank' onchange='radioChng(this)' value='달인'>달인</input></label>
			<label><input type='radio' name='prerank${idx}' key='prerank' onchange='radioChng(this)' value='명인'>명인</input></label>
			<label><input type='radio' name='prerank${idx}' key='prerank' onchange='radioChng(this)' value='소패'>소패</input></label>
			<label><input type='radio' name='prerank${idx}' key='prerank' onchange='radioChng(this)' value='패왕'>패왕</input></label>
			<label><input type='radio' name='prerank${idx}' key='prerank' onchange='radioChng(this)' value='투신'>투신</input></label>
			<br/>
			현시즌
			<label><input type='radio' name='currank${idx}' key='currank' onchange='radioChng(this)' value='달인'>달인</input></label>
			<label><input type='radio' name='currank${idx}' key='currank' onchange='radioChng(this)' value='명인'>명인</input></label>
			<label><input type='radio' name='currank${idx}' key='currank' onchange='radioChng(this)' value='소패'>소패</input></label>
			<label><input type='radio' name='currank${idx}' key='currank' onchange='radioChng(this)' value='패왕'>패왕</input></label>
			<label><input type='radio' name='currank${idx}' key='currank' onchange='radioChng(this)' value='투신'>투신</input></label>
		</li>`;
	
	$('#inputSection').append(html);
	
}

function download(){
	
	text = '';
	
	Object.keys(data).forEach(function(rowname){
		let row = data[rowname];
		if(text!=='')
			text+='\n';
		text += row.name+" / "+row.power+" / 전: "+(row.prerank||'-')+" / 현: "+(row.currank||'-');
	});
	
	
	 let element = document.createElement('a'); 
	 element.setAttribute('href','data:text/plain;charset=utf-8,' + encodeURIComponent(text)); 
	 element.setAttribute('download', 'result.txt');
	  
	  element.style.display = 'none'; document.body.appendChild(element);
	 
	  element.click();
	  
	  document.body.removeChild(element);
	 
}

function radioChng(oThis){
	let key = $(oThis).attr('key');
	let val = $(oThis).val();
	let id = $(oThis).parent().parent().attr('id');
	data[id][key] = val;
}

function texting(oThis){
	
	let id = $(oThis).parent().attr('id');
	data[id].name = $(oThis).val();
	
}
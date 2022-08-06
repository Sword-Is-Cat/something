let idx = 0;

function addRow(){
	
	let html;
	idx++;
	
	html = `
		<li>
			<input type='text'/>
			<br/>
			항마력
			<label><input type='radio' name='power${idx}'>16000</input></label>
			<label><input type='radio' name='power${idx}'>17000</input></label>
			<label><input type='radio' name='power${idx}'>18000</input></label>
			<label><input type='radio' name='power${idx}'>19000</input></label>
			<label><input type='radio' name='power${idx}'>20000</input></label>
			<br/>
			전시즌
			<label><input type='radio' name='prerank${idx}'>달인</input></label>
			<label><input type='radio' name='prerank${idx}'>명인</input></label>
			<label><input type='radio' name='prerank${idx}'>소패</input></label>
			<label><input type='radio' name='prerank${idx}'>패왕</input></label>
			<label><input type='radio' name='prerank${idx}'>투신</input></label>
			<br/>
			현시즌
			<label><input type='radio' name='currank${idx}'>달인</input></label>
			<label><input type='radio' name='currank${idx}'>명인</input></label>
			<label><input type='radio' name='currank${idx}'>소패</input></label>
			<label><input type='radio' name='currank${idx}'>패왕</input></label>
			<label><input type='radio' name='currank${idx}'>투신</input></label>
		</li>`;
	
	$('#inputSection').append(html);
	
}

function download(){
	
	let data = '';
	
	$('li').each(function(element){
		
		console.log($(element).child('input:text').val());
		console.log($(element).child('input:checked').val());
		
		data += ``;
		
	});
	
	/*
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(codes.homecode + codes.datacode));
    element.setAttribute('download', 'save.dat');

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
	*/
}
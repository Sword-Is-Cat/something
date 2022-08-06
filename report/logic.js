let idx = 0;

function addRow(){
	
	let html;
	idx++;
	
	html = `
		<li>
			<input type='text'/>
			<br/>
			<label><input type='radio' name='power${idx}'>16000</input></label>
			<label><input type='radio' name='power${idx}'>17000</input></label>
			<label><input type='radio' name='power${idx}'>18000</input></label>
			<label><input type='radio' name='power${idx}'>19000</input></label>
			<label><input type='radio' name='power${idx}'>20000</input></label>
			<br/>
			<label><input type='radio' name='prerank${idx}'>달인</input></label>
			<label><input type='radio' name='prerank${idx}'>명인</input></label>
			<label><input type='radio' name='prerank${idx}'>소패</input></label>
			<label><input type='radio' name='prerank${idx}'>패왕</input></label>
			<label><input type='radio' name='prerank${idx}'>투신</input></label>
			<br/>
			<label><input type='radio' name='currank${idx}'>달인</input></label>
			<label><input type='radio' name='currank${idx}'>명인</input></label>
			<label><input type='radio' name='currank${idx}'>소패</input></label>
			<label><input type='radio' name='currank${idx}'>패왕</input></label>
			<label><input type='radio' name='currank${idx}'>투신</input></label>
		</li>`;
	
	$('#inputSection').append(html);
	
}
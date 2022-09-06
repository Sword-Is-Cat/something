/**
 * 
 */
const copy = (text) => {
	
  // 임시의 textarea 생성
  const $textarea = document.createElement("textarea");

  // body 요소에 존재해야 복사가 진행됨
  document.body.appendChild($textarea);
  
  // 복사할 특정 텍스트를 임시의 textarea에 넣어주고 모두 셀렉션 상태
  $textarea.value = text;
  $textarea.select();
  
  // 복사 후 textarea 지우기
  document.execCommand('copy');
  document.body.removeChild($textarea);
  
  alert('복사되었습니다');
}

const btn_click = () =>{
	
	let text = 
		'${name} / ${job} / ${power}';
	
	let name = document.getElementById('name').value;
	let job = document.getElementById('job_2').value;
	let power = document.getElementById('power').value;
	
	if(name && job && power && job!='null'){
		
		text = text.replace('${name}', name).replace('${job}', job).replace('${power}', power);
		copy(text);
		
	}else{
		
		alert('입력이 부족합니다');
		
	}
	
	
	
}

const jobChange = (value) => {
	
	console.log('jc:'+value);
	
	let $select = document.getElementById('job_2');
	let $jobName = document.getElementById('job');
	
	if(!value){
		
		$select = document.getElementById('job_1');
		
		while($select.options.length>0)
			$select.remove(0);
		
		//$select.add(new Option('-'));
		
		jobs.all.forEach(arr => {
			$select.add(new Option(arr[1], arr[0]));
		});
		
	}else if(Object.keys(jobs).indexOf(value)!=-1){
		
		while($select.options.length>0)
			$select.remove(0);
		
		$select.add(new Option('-', null));
		
		jobs[value].forEach(job => {
			$select.add(new Option(job));
		});
		
	}
	
}
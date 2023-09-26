document.addEventListener("DOMContentLoaded", () => {

    submitBtnEvent("submit");
    document.getElementById("inputLevel").value = defaultLv;
    document.getElementById("inputSkill").value = defaultSp;
    drawTable();

});

const defaultLv = 40;
const defaultSp = 350;

const submitBtnEvent = (btnId) => {
    const btn = document.getElementById(btnId);
    btn.addEventListener("click", () => {
        let lvVal = document.getElementById("inputLevel").value;
        let spVal = document.getElementById("inputSkill").value;
        if(isNaN(Number(lvVal))){
            lvVal = defaultLv;
            document.getElementById("inputLevel").value = defaultLv;
        }
        if(isNaN(Number(spVal))){
            spVal = defaultSp;
            document.getElementById("inputSkill").value = defaultSp;
        }
        if(spVal%5>0){
            spVal -= spVal%5;
            document.getElementById("inputSkill").value = spVal;
        }
        drawTable(Number(lvVal), Number(spVal));
    });
}

const drawTable = (st_lv, st_sp) => {
    st_lv = st_lv || defaultLv;
    st_sp = st_sp || defaultSp;
    const step = 5;
    /** table 초기화 */
    const $table = document.getElementById("dataTable");
    while($table.children.length>0)
        $table.removeChild($table.children[0]);
    /** thead 셋팅 */
    const $thead = appendElement("thead", $table);
    let $tr, $th, $td;
    $tr = appendElement("tr", $thead);
    appendElement("th", $tr);
    for(let i = 0, sp = st_sp ; i<=20 ; i++, sp+=step){
        $th = appendElement("th", $tr);
        $th.classList.add("sp"+sp);
        $th.innerText = sp;
        addCustomClickEvent($th, "cSelect");
        
    }
    /** tbody data insert */
    const $tbody = appendElement("tbody", $table);
    for(let i = 0, lv = st_lv ; i<=20 ; i++, lv++){
        $tr = appendElement("tr", $tbody);
        $th = appendElement("th", $tr);
        $th.classList.add("lv"+lv);
        $th.innerText = lv;
        addCustomClickEvent($th, "rSelect");
        for(let j = 0, sp = st_sp ; j<=20 ; j++, sp+=step){
            $td = appendElement("td", $tr);
            let time = (((9.7+(0.3*lv)) * (100+sp))|0) / 100;
            $td.innerText = time;
            if(time>=120)
            $td.classList.add("on");
            $td.classList.add("lv"+lv);
            $td.classList.add("sp"+sp);
        }
    }
}

const addCustomClickEvent = (element, className) => {
    element.addEventListener("click", () =>{
        const myClassName = element.className;
        Array.from(document.querySelectorAll("."+className)).forEach(e => e.classList.remove(className));
        Array.from(document.querySelectorAll("."+myClassName)).forEach(e => e.classList.add(className));
    });
}

const appendElement = (tagName, parent) => {
    let element = document.createElement(tagName);
    if(parent)
        parent.appendChild(element);
    return element;
}
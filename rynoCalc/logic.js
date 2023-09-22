document.addEventListener("DOMContentLoaded", () => {

    drawTable();

});

const drawTable = (st_lv, ed_lv, st_sp, ed_sp) => {
    st_lv = st_lv || 30;
    ed_lv = ed_lv || 50;
    st_sp = st_sp || 300;
    ed_sp = ed_sp || 500;
    /** table 초기화 */
    const $table = document.getElementById("dataTable");
    while($table.children.length>0)
        $table.removeChild($table.children[0]);
    /** thead 셋팅 */
    const $thead = appendElement("thead", $table);
    let $tr, $th, $td;
    $tr = appendElement("tr", $thead);
    appendElement("th", $tr);
    for(let sp = st_sp ; sp<=ed_sp ; sp+=10){
        $th = appendElement("th", $tr);
        $th.classList.add("sp"+sp);
        $th.innerText = sp;
        addCustomClickEvent($th, "cSelect");
    }
    /** tbody data insert */
    const $tbody = appendElement("tbody", $table);
    for(let lv = st_lv ; lv<=ed_lv ; lv++){
        $tr = appendElement("tr", $tbody);
        $th = appendElement("th", $tr);
        $th.classList.add("lv"+lv);
        $th.innerText = lv;
        addCustomClickEvent($th, "rSelect");
        for(let sp = st_sp ; sp<=ed_sp ; sp+=10){
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
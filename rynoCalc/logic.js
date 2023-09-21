document.addEventListener("DOMContentLoaded", () => {

    const st_lv = 30, ed_lv = 60, st_sp = 300, ed_sp = 600;

    const $thead = document.getElementById("dataTable").querySelector("thead");
    let $tr, $td;
    $tr = appendElement("tr", $thead);
    appendElement("th", $tr);
    for(let sp = st_sp ; sp<=ed_sp ; sp+=10){
        $td = appendElement("th", $tr);
        $td.classList.add("sp"+sp);
        $td.innerText = sp;
    }

    const $tbody = document.getElementById("dataTable").querySelector("tbody");
    for(let lv = st_lv ; lv<=ed_lv ; lv++){
        $tr = appendElement("tr", $tbody);
        $td = appendElement("th", $tr);
        $td.classList.add("lv"+lv);
        $td.innerText = lv;
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
});

const appendElement = (tagName, parent) => {
    let element = document.createElement(tagName);
    if(parent)
        parent.appendChild(element);
    return element;
}
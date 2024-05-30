document.addEventListener('DOMContentLoaded', () => {

    let $tr;
    let temp = '', prefix = '', cnt = 0;

    const weapone_table = document.getElementById('weapone_table').querySelector('tbody');
    let weapone_keys = Object.keys(weapone);
    for (var i = 0; i < weapone_keys.length; i++) {
        if (i % 4 == 0) {
            $tr = document.createElement('tr');
            weapone_table.appendChild($tr);
        }
        let $td = document.createElement('td'), itemName = weapone_keys[i];
        $td.addEventListener('click', () => {
            toStuffs(weapone, itemName);
        });
        $tr.appendChild($td);

        let $p = document.createElement('p');
        $td.appendChild($p);
        $p.innerText = itemName;
    }

    const armor_table = document.getElementById('armor_table').querySelector('tbody');
    let armor_keys = Object.keys(armor);
    for (var i = 0; i < armor_keys.length; i++) {
        prefix = armor_keys[i].substring(0, 2);
        if (temp != prefix || cnt > 3) {
            cnt = 0;
            temp = prefix;
            $tr = document.createElement('tr');
            armor_table.appendChild($tr);
        }
        cnt++;
        let $td = document.createElement('td'), itemName = armor_keys[i];
        $td.addEventListener('click', () => {
            toStuffs(armor, itemName);
        });
        $tr.appendChild($td);

        let $p = document.createElement('p');
        $td.appendChild($p);
        $p.innerText = itemName;
    }

})

const stuffName = [];
const stuffCnts = [];

const equipName = [];
const equipCnts = [];

const toStuffs = (recipes, itemName) => {

    if (Object.keys(weapone).indexOf(itemName) != -1 || Object.keys(armor).indexOf(itemName) != -1) {
        if (equipName.indexOf(itemName) == -1) {
            equipName.push(itemName);
            equipCnts.push(0);
        }
        equipCnts[equipName.indexOf(itemName)] += 1;
    }
    drawListTable();

    let multi = 1;
    if (stuffName.indexOf(itemName) != -1) {
        multi = stuffCnts[stuffName.indexOf(itemName)];
        stuffCnts[stuffName.indexOf(itemName)] = 0;
    }
    let recipe = recipes[itemName];
    if (recipe) {
        for (var i = 0; i < recipe.length; i++) {
            var stuff = Object.keys(recipe[i])[0], stuffCnt = recipe[i][stuff];
            if (stuffName.indexOf(stuff) == -1) {
                stuffName.push(stuff);
                stuffCnts.push(0);
            }
            stuffCnts[stuffName.indexOf(stuff)] += stuffCnt * multi;
        }
    }
    drawMaterialTable();
};

const drawListTable = () => {
    const list_table = document.getElementById('list_table').querySelector('tbody');
    list_table.innerHTML = '';
    let $tr, $td, $p;
    for (var i = 0; i < equipName.length; i++) {
        if (i % 2 == 0) {
            $tr = document.createElement('tr');
            list_table.appendChild($tr);
        }
        $td = document.createElement('td');
        $p = document.createElement('p');
        $tr.appendChild($td);
        $td.appendChild($p);
        $p.className = 'tcenter';
        $p.innerText = equipName[i];
        $td = document.createElement('td');
        $p = document.createElement('p');
        $tr.appendChild($td);
        $td.appendChild($p);
        $p.className = 'tcenter';
        $td.style.width = '5%';
        $p.innerText = equipCnts[i];
    }
}

const drawMaterialTable = () => {
    const material_table = document.getElementById('material_table').querySelector('tbody');
    const text_zone = document.getElementById('textzone');
    material_table.innerHTML = '';
    text_zone.innerText = '';
    let $tr, $td, $p, flag = true, textFlag = true;
    for (var i = 0; i < stuffName.length; i++) {
        if (flag) {
            $tr = document.createElement('tr');
        }
        flag = !flag;
        material_table.appendChild($tr);

        $td = document.createElement('td');
        $tr.appendChild($td);
        $p = document.createElement('p');
        $p.style.paddingLeft = '5%';
        $td.appendChild($p);
        $p.innerText = stuffName[i];

        $td = document.createElement('td');
        $td.style.width = '5%';
        $tr.appendChild($td);
        $p = document.createElement('p');
        $p.className = 'tcenter';
        $td.appendChild($p);
        $p.innerText = stuffCnts[i];

        $td = document.createElement('td');
        $td.style.width = '5%';
        $tr.appendChild($td);
        $p = document.createElement('p');
        $td.appendChild($p);
        if (Object.keys(materials).indexOf(stuffName[i]) != -1) {
            let itemName = stuffName[i];
            $td.addEventListener('click', () => {
                toStuffs(materials, itemName);
                window.scrollTo(0, document.body.scrollHeight);
            });
            $td.className = 'stuff_button';
            $p.innerText = '재료보기';
        }

        if (textFlag) {
            textFlag = false;
        } else {
            text_zone.innerText += ', ';
        }
        text_zone.innerText += stuffName[i] + ':' + stuffCnts[i];

    }
};
'use strict';

const TITLE = 'Ruokalista';

let editing = -1;

function setEditing(value) {
    editing = value;
    refresh();
}

function lisaa(nimi, hinta) {
    if(nimi.length >= 1 && hinta.length >= 1) {
        $.ajax('/rs', {
               contentType: 'application/json',
               data: JSON.stringify({
                   "nimi": nimi,
                   "hinta": hinta
                   
            }),
           method: 'POST'});
    }
    setEditing(-1)
    refresh();
}

function muokkaa(id, nimi, hinta) {
    if(nimi.length >= 1 && hinta.length >= 1) {
        $.ajax('/rs', {
               contentType: 'application/json',
               data: JSON.stringify({
                   "id": id,
                   "nimi": nimi,
                   "hinta": hinta
                   
            }),
           method: 'PUT'});
    }
    setEditing(-1)
    refresh();
}

function poista(id) {
    $.ajax(`/rs/${id}`, {method: 'DELETE'});
    setEditing(-1)
    refresh();
}

function refresh() {
    $.get('/rs', ruoat => {
		let html = '';
		ruoat.forEach(ruoka => {
            html = html.concat(`<tr><td>${ruoka.id}</td>`);
            if(editing !== ruoka.id) {
                html = html.concat(`<td>${ruoka.nimi}</td>`,
                    `<td>${ruoka.hinta}</td>`);
            } else {
                html = html.concat(`<td><input id="nimi" type="text" value="${ruoka.nimi}"></input></td>`,
                    `<td><input id="hinta" type="text" value="${ruoka.hinta}"></input></td>`,
                    `<td><button id="lopeta" class="w3-button w3-yellow w3-round" onclick="setEditing(-1);">Lopeta muokkaus</button></td>`,
                    `<td><button id="tallenna" class="w3-button w3-blue w3-round" onclick="muokkaa(${ruoka.id}, $('#nimi').val(), $('#hinta').val());">Tallenna</button></td>`);
            }
            if(editing < 0) {
                html = html.concat(`<td><button id="muokkaa" class="w3-button w3-blue w3-round" ` +
                `onclick="setEditing(${ruoka.id})">Muokkaa</button></td>`,
                                   `<td><button id="poista" class="w3-button w3-red w3-round" onclick="poista(${ruoka.id});">Poista</button></td>`);
            }
            html = html.concat(`</tr>`);
		});
        if(editing < 0) {
            html = html.concat(`<tr><td/><td><input id="nimi" type="text"></input></td>`,
                    `<td><input id="hinta" type="text"></input></td>`,
                    `<td><button id="lisaa" class="w3-button w3-blue w3-round" onclick="lisaa($('#nimi').val(), $('#hinta').val());">Lisää</button></td>`,
                    `</tr>`);
        }
		$('tbody#ruoat').html(html);
	});
}

function main() {
	document.title = TITLE;
	$('h1#otsikko').html(TITLE);
    refresh();
    $('body').keydown(e => {
        if(e.which === 13) {
            $('button#lisaa').click();
            $('button#tallenna').click();
        } else if(e.which === 27) {
            $('button#lopeta').click();
        }
    });
}

$(main);

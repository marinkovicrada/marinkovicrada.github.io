$(document).ready(function () {
    let parfemi = proizvodiUKorpi();
    console.log(parfemi.length);
    if(!parfemi.length)
     praznaKorpa();
    else
    prikaziProizvodeUKorpi();

});
function prikaziProizvodeUKorpi() {
    let parfemi = proizvodiUKorpi();

    $.ajax({
        url : "assets/data/proizvodi.json",
        method: "GET",
        type:"json",
        success : function(data) {
            data = data.filter(p => {
                for(let parfem of parfemi)
                {
                    if(p.id == parfem.id) {
                        p.kolicina = parfem.kolicina;
                        return true;
                    }
                }
                return false;
            });
            tabelaKorpa(data)
        }
    });
}

function tabelaKorpa(parfemi) {
    let html = `
            <table class="text-center col-12">
				<thead>
					<tr class="text-center">
						<th class="p-1 p-sm-4">Parfem</th>
						<th class="p-1 p-sm-4">Naziv</th>
                        <th class="p-1 p-sm-4">Cena</th>
                        <th class="p-1 p-sm-4">Kolicina</th>
						<th class="p-1 p-sm-4">Ukupno</th>
						<th class="p-1 p-sm-4">Ukloni</th>
					</tr>
				</thead>
				<tbody>`;
                
    for(let p of parfemi) {
        html += `<tr class="text-center">
        <td class="p-1 p-sm-4">
            <img src="${p.slika.putanja}" alt="${p.slika.alt}" class="img-fluid" style='height:100px; width:100px'>
        </td>
        <td class="p-1 p-sm-4">${p.naziv}</td>
        <td class="p-1 p-sm-4">${p.cene.cena} RSD</td>
        <td class="p-1 p-sm-4">${p.kolicina}</td>
        <td class="p-1 p-sm-4">${p.cene.cena * p.kolicina} RSD</td>
        <td class="p-1 p-sm-4">
        <div>
            <button class="bg-transparent" onclick='ukloniIzKorpe(${p.id})'>Ukloni</button>
        </div>
        </td>
    </tr>`;}
    html+=`
    </tbody>
            </table>`;
    $("#korpa").html(html);
}
function praznaKorpa() {
    $("#korpa").html("<h3 class='col-12 text-center'>Nema proizvoda u korpi</h3>");
}
function proizvodiUKorpi() {
    return JSON.parse(localStorage.getItem("parfemi"));
}
function ukloniIzKorpe(id) {
    let parfemi = proizvodiUKorpi();
    let filtrirani = parfemi.filter(p => p.id != id);
    localStorage.setItem("parfemi", JSON.stringify(filtrirani));
    if(!proizvodiUKorpi().length){
     praznaKorpa();}
    else{
    prikaziProizvodeUKorpi();
}
praznaKorpa();
}
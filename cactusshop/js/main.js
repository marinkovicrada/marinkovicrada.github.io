// GALERIJA
var slike=['k4.jpg','s2.jpg','k3.jpg','k8.jpg','s4.jpg']
var opisi=['Saguaro Cactus','Echeveria elegans','Star Cactus',' Aloe Vera',' Cryptostephanus']
var slide_content = document.getElementById("drzac");
var i=slike.length;
var j=opisi.length;
document.getElementById("next").addEventListener("click", sledeci );
    function sledeci(){
    if(i<slike.length && j<opisi.length){
        i=i+1;
        j=j+1;
    }
    else{
        i=1;
        j=1;
    }
    slide_content.innerHTML="<img src=img/"+slike[i-1]+">";
    document.getElementById("opis").innerHTML="<p>"+ opisi[j-1]+"</p>";
}
document.getElementById("prew").addEventListener("click", prethodni );
    function prethodni(){
    if(i<slike.length+1 && i>1){
        i=i-1;
    }
    else{
        i=slike.length;
    }
    slide_content.innerHTML="<img src=img/"+slike[i-1]+">";
}
function KaktusiIspisivanje() {

    var nizSlike = [['g1.jpg','Echinopsis','Cena: 2.500 rsd'],['g2.jpg','Parodia','Cena: 7.890 rsd'],['k3.jpg','Star Cactus','Cena: 3.400 rsd'],
    ['k4.jpg','Saguaro Cactus','Cena: 1.500 rsd'],['k5.jpg','Bunny Ear Cactus','Cena: 5.500 rsd'],['k6.jpg','Barrel Cactus','Cena: 3.000 rsd'],
    ['k7.jpg','Sedum Sielboldii','Cena: 7.990 rsd'],['k8.jpg','Aloe Vera','Cena: 2.590 rsd']];

    for(var i = 0 ; i < nizSlike.length ; i++) {

        document.querySelector('#kaktusiDrzac').innerHTML += `<div class="svi"> <div class="slikaDiv"><img src="img/${nizSlike[i][0]}" alt="Kaktus"/></div><p>${nizSlike[i][1]}</p><p>${nizSlike[i][2]}</p></div>`;
    }
    document.getElementsByClassName("svi")[1].innerHTML+=`<div class="ribbon"><span>novo</span></div>`;
    document.getElementsByClassName("svi")[3].innerHTML+=`<div class="ribbon"><span>novo</span></div>`;
    document.getElementsByClassName("svi")[6].innerHTML+=`<div class="ribbon"><span>novo</span></div>`;

}

function SukulentiIspisivanje() {

    var niz = [['s1.jpg','Haworthia retusa','Cena: 2.290 rsd'],['s2.jpg','Echeveria elegans','Cena: 1.890 rsd'],['s3.jpg','Massonia','Cena: 5.480 rsd'],
    ['s4.jpg','Cryptostephanus','Cena: 1.540 rsd'],['s5.jpg','Clivia','Cena: 3.790 rsd'],['s6.jpg','Beschorneria','Cena: 7.000 rsd'],
    ['s7.jpg','Eucomis','Cena: 5.990 rsd'],['s8.jpg','Crasuláceas','Cena: 2.000 rsd']];

    for(var m = 0 ; m < niz.length ; m++) {

        document.querySelector('#sukulentiDrzac').innerHTML += `<div class="artikli"> <div class="slikaDiv"><img src="img/${niz[m][0]}" alt="Sukulent"/></div><p>${niz[m][1]}</p><p>${niz[m][2]}</p></div>`;
    }
    document.getElementsByClassName("artikli")[1].innerHTML+=`<div class="ribbon"><span>novo</span> </div>`
    document.getElementsByClassName("artikli")[3].innerHTML+=`<div class="ribbon"><span>novo</span> </div>`
    document.getElementsByClassName("artikli")[6].innerHTML+=`<div class="ribbon"><span>novo</span> </div>`

}

// SLAJDER
window.onload = function(){
    slajder();
    
    KaktusiIspisivanje();
    SukulentiIspisivanje();
    document.getElementsByName("brisanje")[0].addEventListener("click", function () {  
        ispisPoruke.innerHTML="";
        for (let i = 0; i < brisanje.length; i++) {
            brisanje[i].value=""
            brisanje[i].classList.remove("crvena");
            }
            document.getElementsByClassName("drop")[0].selected=true; 
            document.getElementsByClassName("sifraDrop")[0].selected=true; 
            for(var i = 0; i < radio.length; i++) {
                radio[i].checked=false;
            }
    });

}

var indeks=0;
var images=["img/slajder1.jpg","img/slajder2.jpg", "img/slajder3.jpg", "img/slajder4.jpg"]
function slajder(){
    var slika = document.getElementById("slide").src=images[indeks];
    if(indeks<images.length-1){
        indeks++;
    }
    else{
        indeks=0;
    }
    setTimeout("slajder()", 3000)    
}

// FORMA
var radio=document.getElementById("radio");
var brisanje=document.getElementsByClassName("brisanje");
var ispisPoruke=document.getElementById("ispisTacnePoruke");
var nizGradovi=[
   { "value": "BG","tekst": "Beograd"},
   { "value": "NS","tekst": "Novi Sad"},
   { "value": "KG","tekst": "Kragujevac"},
   { "value": "NI","tekst": "Niš"},
   { "value": "UE","tekst": "Užice"},
   { "value": "SU","tekst": "Subotica"},
   { "value": "KR","tekst": "Kraljevo"},
]

let ispis=`<option value="0">Izaberite...</option>`;
    nizGradovi.forEach(function (deo) {
      ispis += `<option value="${deo.value}" class="drop">${deo.tekst}</option>`;
    });
    document.getElementById("grad").innerHTML=ispis;

var Sifre=['Echinopsis','Parodia','Star Cactus','Saguaro Cactus','Bunny Ear Cactus','Barrel Cactus','Sedum Sielboldii','Aloe Vera',
'Haworthia retusa','Echeveria elegans','Massonia','Cryptostephanus','Clivia','Beschorneria','Eucomis','Crasuláceas']
let sifreIspis=`<option value="0">Izaberite...</option>`;
    for(let i =0 ; i< Sifre.length;i++) {
      sifreIspis += `<option value="${i}" class="sifraDrop">${Sifre[i]}</option>`;
    };
    document.getElementById("ddl").innerHTML=sifreIspis;

document.getElementById("posalji").addEventListener("click", provera);

function provera() {

        var validno = true;
        var reIme = /^[A-ZĐČĆŽŠ][a-zđčćžš]{2,11}$/;
        var rePrezime = /^([A-ZĐŠŽĆČ][a-zđšžćč]{2,15})+$/;
        var reAdresa = /^[A-ZĐŠŽĆČ][a-zđšžćč]{1,14}(\s[A-ZĐŠŽĆČ][a-zđšžćč]{1,19})+[\s\d]{1,3}$/;
        var reTelefon =  /^06[01234569]\/[\d]{3}\-[\d]{3,4}$/;    
        var reEmail = /^\w+([\.\-]\w+)*@\w+([\.\-]\w+)*(\.\w{2,4})+$/;
        var ime = document.getElementById("ime").value.trim();
        var prezime = document.getElementById("prezime").value.trim();
        var adresa = document.getElementById("adresa").value.trim();
        var telefon = document.getElementById("telefon").value.trim();
        var email = document.getElementById("email").value.trim();
        
        if(ime == ""){
            validno = false;
            document.getElementById("imeGreska").innerHTML = "Polje ime je prazno."
            document.getElementById("ime").classList.add("crvena");
        }
        else{
            if(!reIme.test(ime)){
                validno = false;
                document.getElementById("imeGreska").innerHTML = "Ime nije u dobrom formatu...";
                document.getElementById("ime").classList.add("crvena");
            }
            else{
                document.getElementById("imeGreska").innerHTML = "";
                document.getElementById("ime").classList.remove("crvena");            }
        }
        if(prezime == ""){
            validno = false;
            document.getElementById("prezimeGreska").innerHTML = "Polje prezime je prazno."
            document.getElementById("prezime").classList.add("crvena");
        }
        else{
            if(!rePrezime.test(prezime)){
                validno = false;
                document.getElementById("prezimeGreska").innerHTML = "Prezime nije u dobrom formatu...";
                document.getElementById("prezime").classList.add("crvena");
            }
            else{
                document.getElementById("prezimeGreska").innerHTML = "";
                document.getElementById("prezime").classList.remove("crvena");
            }
        }
        if(adresa == ""){
            validno = false;
            document.getElementById("adresaGreska").innerHTML = "Polje adresa je prazno."
            document.getElementById("adresa").classList.add("crvena");
        }
        else{
            if(!reAdresa.test(adresa)){
                validno = false;
                document.getElementById("adresaGreska").innerHTML = "Adresa nije u dobrom formatu...";
                document.getElementById("adresa").classList.add("crvena");
            }
            else{
                document.getElementById("adresaGreska").innerHTML = "";
                document.getElementById("adresa").classList.remove("crvena");
            }
        }
        if(telefon == ""){
            validno = false;
            document.getElementById("telefonGreska").innerHTML = "Polje telefon je prazno."
            document.getElementById("telefon").classList.add("crvena");
        }
        else{
            if(!reTelefon.test(telefon)){
                validno = false;
                document.getElementById("telefonGreska").innerHTML = "Telefon nije u dobrom formatu...";
                document.getElementById("telefon").classList.add("crvena");
            }
            else{
                document.getElementById("telefonGreska").innerHTML = "";
                document.getElementById("telefon").classList.remove("crvena");
            }
        }
        if(email == ""){
            validno = false;
            document.getElementById("emailGreska").innerHTML = "Polje email je prazno."
            document.getElementById("email").classList.add("crvena");
        }
        else{
            if(!reEmail.test(email)){
                validno = false;
                document.getElementById("emailGreska").innerHTML = "Email nije u dobrom formatu...";
                document.getElementById("email").classList.add("crvena");
            }
            else{
                document.getElementById("emailGreska").innerHTML = "";
                document.getElementById("email").classList.remove("crvena");
            }
        }
        var kolicina = document.getElementsByName("rb");
        let kolIzbor = "";
        for(let i = 0; i < kolicina.length; i++) {
            if(kolicina[i].checked) {
                kolIzbor=kolicina[i].value;
                break;
            }
        }
        if(kolIzbor==""){
            validno = false;
            document.getElementById("kolicinaGreska").innerHTML="Morate izabrati kolicinu";
        }
        else{
            document.getElementById("kolicinaGreska").innerHTML="";
        }
        var ddlGrad = document.getElementById("grad").value;
        
        if(ddlGrad == "0"){
            document.getElementById("gradGreska").innerHTML="Morate izabrati drugacije od Izaberite";
            document.getElementById("grad").classList.add("crvena");
            validno = false;  
        }
        else{   
            document.getElementById("gradGreska").innerHTML="";
            document.getElementById("grad").classList.remove("crvena");
        }
        var sif = document.getElementById("ddl").value;
        
        if(sif == "0"){
            document.getElementById("sifraGreska").innerHTML="Morate izabrati drugacije od Izaberite";
            document.getElementById("ddl").classList.add("crvena");
            validno = false;  
        }
        else{   
            document.getElementById("sifraGreska").innerHTML="";
            document.getElementById("ddl").classList.remove("crvena");
        }

        if(validno){
            ispisPoruke.innerHTML="Uspesno ste narucili!";
            ispisPoruke.style.fontSize="25px";  
        }
}

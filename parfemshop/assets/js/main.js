$(document).ready(function(){
  $.ajax({
        url: "assets/data/meni.json",
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            // console.log(data);
            ispisMenija(data);
        },
        error: function (err) {
          console.error(err);
        }
  });
  $("#search").blur(pretrazi); 
  $.ajax({
        url: "assets/data/proizvodi.json",
        method: 'GET',
        dataType: 'json',
        success: function (proizvodi) {
            // console.log(proizvodi);
            snizeniProizvodi(proizvodi);
            najnovijiProizvodi(proizvodi);
        },
        error: function (err) {
          console.error(err);
        }
  });   
  dohvatiProizvode();
  $.ajax({
        url: "assets/data/oNama.json",
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            // console.log(data);
            ispisONama(data);
        },
        error: function (err) {
          console.error(err);
        }
  });   
  $.ajax({
        url: "assets/data/kategorije.json",
        method: 'GET',
        dataType: 'json',
        success: function (data) {
          console.log(data);
            let ispis="";
            data.forEach(p => {
              ispis+=`
              <li class="nav-item">
                       <a class="nav-link filter-kategorija" data-id="${p.id}" href="#">${p.naziv} 
                   </a></li>
              `;
            });
            $("#kategorije").html(ispis);
            $('.filter-kategorija').click(filtriraj);
        },
        error: function (err) {
          console.error(err);
        }
  }); 

  $.ajax({
        url: "assets/data/brendovi.json",
        method: 'GET',
        dataType: 'json',
        success: function (data) {
          console.log(data);
            let ispis="<option value='0'> Izaberite </option>";
            data.forEach(p => {
              ispis+=`
              <option value="${p.id}">
                       <a href="#" class="filter-brend data-id=${p.id}">${p.naziv}</a>
                   </option>
              `;
            });
            $("#brendovi").html(ispis);
            $("#brendovi").change(filtrirajPoBrendu);
            
        },
        error: function (err) {
          console.error(err);
        }
  }); 
  $.ajax({
    url: "assets/data/brendovi.json",
    method: 'GET',
    dataType: 'json',
    success: function (data) {
      console.log(data);
        let ispis="";
        data.forEach(p => {
          ispis+=`
          <div class="col-4 col-md-3">
            <figure class="text-center">
              <img src="${p.slika}" alt="${p.naziv}" class="img-fluid"/>
            </figure>
          </div>
          `;
        });
        $("#brendDiv").html(ispis);        
    },
    error: function (err) {
      console.error(err);
    }
}); 
  $(window).bind('scroll', function() {
            if($(window).scrollTop()>300){
            $('nav').css({'background-color':'white','padding':'5px 0px'});
        }
        else{
          $('nav').css({'background-color':'','padding': '15px 0px'});
      
        }
  });    
  $("#sort").change(function(){
          let val= Number(this.value); 

          if(val==0){
            dohvatiProizvode();
          }
          else{
            sortiraj();
          }
          ;
  });
});
function sortiraj(){
  let sortId = document.querySelector("#sort").options[document.querySelector("#sort").selectedIndex].value;    
  console.log(sortId);
  $.ajax({
         url : "assets/data/proizvodi.json",
         method : "GET",
         type : "json",
         success : function(data) {
            if(sortId== '2'){
               data.sort(function(a,b) {
                if(a.cene.cena == b.cene.cena)
                return 0;
                return a.cene.cena < b.cene.cena ? -1 : 1;
            })
}
if(sortId== '1'){
  data.sort(function(a,b) {
   if(a.cene.cena == b.cene.cena)
   return 0;
   return a.cene.cena > b.cene.cena ? -1 : 1;
})}
if(sortId== '3'){
  data.sort(function(a,b) {
    if(a.datum == b.datum)
    return 0;
    return a.datum > b.datum ? -1 : 1;
})
}          
             ispisiProizvode(data);
         },
         error : function(xhr, error, status) {
             alert(status);
         }
      });
}

function pretrazi(){
  let uneto = this.value;
  console.log(uneto);
  $.ajax({
    url: "assets/data/proizvodi.json",
    method: 'GET',
    dataType: 'json',
    success: function (parfemi) {
        const pretraga = parfemi.filter(el=>{
          if(el.naziv.toLowerCase().indexOf(uneto.toLowerCase())!==-1)
          return true;
        })
        ispisiProizvode(pretraga);
    },
    error: function (err) {
      console.error(err);
    }
  });
}
function ispisMenija(data) {
    let ispisM = "";
    data.forEach(element => {
        ispisM += `<li class="nav-item">
                       <a class="nav-link" href="${element.href}">${element.tekst}</a>
                   </li>`;
    });
    $("#meni").html(ispisM);
}
function dohvatiProizvode(){
  $.ajax({
    url: "assets/data/proizvodi.json",
    method: 'GET',
    dataType: 'json',
    success: function (parfemi) {
        console.log(parfemi);
        ispisiProizvode(parfemi);
    },
    error: function (err) {
      console.error(err);
    }
  });
}
function ispisiProizvode(parfemi){
  let html = "";
  if(parfemi.length > 0){
      for(let parfem of parfemi){
          html += ispisiParfem(parfem);
      }
  } else {
      html += "<h3 class='block-4 mx-auto'>Nema trazenih proizvoda</h3>";
  }
  
  $("#proizvodi").html(html);
  $(".dodaj").click(dodajUKorpu);
}
function proizvodiUKorpi() {
  return JSON.parse(localStorage.getItem("parfemi"));
}
function dodajUKorpu() {
  let id = $(this).data("id");
  var parfemi = proizvodiUKorpi();
  if(parfemi) {
      if(daLiIma()) {
          uvecaj();
      } else {
          dodajUKorpu();
      }
  } else {
      dodajPrviProizvodUKorpu();
  }
  function daLiIma() {
      return parfemi.filter(p => p.id == id).length;
  }

  function dodajUKorpu() {
      let parfemi = proizvodiUKorpi();
      parfemi.push({
          id : id,
          kolicina : 1
      });
      localStorage.setItem("parfemi", JSON.stringify(parfemi));
  }

  function uvecaj() {
      let parfemi = proizvodiUKorpi();
      for(let j in parfemi)
      {
          if(parfemi[j].id == id) {
              parfemi[j].kolicina++;
              break;
          }      
      }
      localStorage.setItem("parfemi", JSON.stringify(parfemi));
  }

  function dodajPrviProizvodUKorpu() {
      let parfemi = [];
      parfemi[0] = {
          id : id,
          kolicina : 1
      };
      localStorage.setItem("parfemi", JSON.stringify(parfemi));
  }
}
function ukloniIzKorpe() {
  localStorage.removeItem("parfemi");
}
function ispisONama(data) {
  let ispis = "";
  data.forEach(element => {
      ispis += `<div class="col-sm-6 col-lg-3 pt-4">
      <div class="ikonica text-center">
        <i class="${element.ikonica}" aria-hidden="true"></i>
      </div>
      <div class="naziv text-center font-weight-bold p-5">${element.naziv}</div>
      <div class="opis">${element.opis}</div>
    </div>
`;
  });
  $("#oNama").html(ispis);
}
function filtriraj(e){
  e.preventDefault();
  let kategorijaId = $(this).data('id');
  $.ajax({
      url: "assets/data/proizvodi.json",
      method: "GET",
      success: function(parfemi){
          parfemi = filtrirajPoKategoriji(parfemi, kategorijaId);
          ispisiProizvode(parfemi);
      }
  });
}
function filtrirajPoBrendu(){
  let brendId = document.querySelector("#brendovi").options[document.querySelector("#brendovi").selectedIndex].value;    
  $.ajax({
      url : "assets/data/proizvodi.json",
      method : "GET",
      type : "json",
      success : function(parfemi) {
        if(brendId !='0'){

        parfemi = filtrirajBrend(parfemi, brendId);
        ispisiProizvode(parfemi);
      }
      else{
        ispisiProizvode(parfemi);
      }
    },
      error : function(xhr, error, status) {
          alert(status);
      }
  });
}
function filtrirajPoKategoriji(parfemi, kategorijaId){
  return parfemi.filter(x => x.kategorija.id == kategorijaId);
}
function filtrirajBrend(parfemi, brendId){
  return parfemi.filter(x => x.brend.id == brendId);
}
function ispisiParfem(parfem){
  // console.log(parfem);
  return `<div class=" col-12 col-md-4 col-lg-3 card border-0">
      <img src="${parfem.slika.putanja}" class="card-img-top" alt="${parfem.slika.alt}">
      <div class="card-body text-center">
        <h5 class="card-title font-weight-bold">${parfem.brend.naziv}</h5>
        <p class="card-text fontTekst">${parfem.naziv}</p>
        <p>${parfem.cene.cena} RSD</p>
        <p>${parfem.datum}</p>
        <input type="button" data-id=${parfem.id} value="Dodaj u korpu" data-toggle="modal" data-target="#popup" class="pozadinaDugme btn dodaj" />
        <div class="modal fade" id="popup" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              Uspesno ste dodali proizvod u korpu
            </div>
          </div>
        </div>
      </div>
        </div>
    </div>`;    
}
function snizeniProizvodi(proizvodi){
        
        proizvodi = proizvodi.filter(p => p.cene.snizenje == true);
                // console.log(proizvodi);
        prikaziSnizene(proizvodi);
}  
function najnovijiProizvodi(proizvodi){
        
        proizvodi = proizvodi.filter(p => p.najnoviji == true);
                console.log(proizvodi);
        prikaziNajnovije(proizvodi);
}  
function prikaziSnizene(prod){
    // console.log(prod);    
    document.querySelector("#snizenje").innerHTML = pripremiDiv();
    function pripremiDiv() {
            let html = "";
            for(let p of prod){
                html += `
                <div>
                    <img src="${p.slika.putanja}" class="card-img-top" alt="${p.slika.alt}">
                    <div class="card-body text-center">
                        <h5 class= "card-title font-weight-bold">${p.brend.naziv}</h5>
                        <p class="card-text fontTekst">${p.naziv}</p>
                        <p>${p.cene.cena-p.cene.cena*p.cene.procenat/100} RSD</p>
                        <p class=" text-center"><del>${p.cene.cena} RSD</del></p>
                </div></div>`;    
                  }
            return html;
            
    }
    $('#snizenje').slick({
        dots: true,
        infinite: false,
        speed: 300,
        slidesToShow: 5,
        slidesToScroll: 2,
        responsive: [
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 576,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
    });
}
function prikaziNajnovije(prod){
    console.log(prod);    
    document.querySelector("#najnoviji").innerHTML = pripremiDiv();
    function pripremiDiv() {
            let html = "";
            for(let p of prod){
                html += `
                <div>
                    <img src="${p.slika.putanja}" class="card-img-top" alt="${p.slika.alt}">
                    <div class="card-body text-center">
                        <h5 class= "card-title font-weight-bold">${p.brend.naziv}</h5>
                        <p class=" card-text fontTekst">${p.naziv}</p>
                        <p>${p.cene.cena} RSD</p>
                </div></div>`;    
                  }
            return html;
    }
      $('#najnoviji').slick({
        dots: true,
        infinite: false,
        speed: 300,
        slidesToShow: 5,
        slidesToScroll: 5,
        responsive: [
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 576,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      });
    
}
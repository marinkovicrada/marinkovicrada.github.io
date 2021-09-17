window.onload = function(){
    document.getElementById("posalji").addEventListener("click" , provera);
}

function provera(){
    let validno = true;
    let ime = document.getElementById("ime").value;
    let reIme = /^[A-Z][a-z]{2,19}$/; 
    let email = document.getElementById("email").value;
    let reEmail = /^\w+[.\d\w]*\@[a-z]{2,10}(\.[a-z]{2,3})+$/;
    var poruka = document.getElementById("poruka").value;
    let rePoruka = /^[a-zA-Z0-9?!,:.*%\s]+$/; 
    if(ime == ""){
        document.getElementById("greskaIme").innerHTML = "Polje ime je prazno.";
        document.getElementById("ime").classList.add("crveno");
        validno = false;
    }
    else{
        if(!reIme.test(ime)){
            document.getElementById("greskaIme").innerHTML = "Ime nije u dobrom formatu...";
            document.getElementById("ime").classList.add("crveno");
            validno = false;
        }
        else{
            document.getElementById("greskaIme").innerHTML = "";
            document.getElementById("ime").classList.remove("crveno");
        }
    }
    
    if(email == ""){
        document.getElementById("greskaEmail").innerHTML = "Polje email je prazno.";
        document.getElementById("email").classList.add("crveno");
        return false;
    }
    else{
        if(!reEmail.test(email)){
            document.getElementById("greskaEmail").innerHTML = "Email nije u dobrom formatu...";
            document.getElementById("email").classList.add("crveno");
            return false;
        }
        else{
            document.getElementById("greskaEmail").innerHTML = "";
            document.getElementById("email").classList.remove("crveno");
        }
    }
    
    if(poruka == ""){
        document.getElementById("porukaGreska").innerHTML = "Niste uneli poruku";
        document.getElementById("poruka").classList.add("crveno");
        return false;
    }
    else{
        if(!rePoruka.test(poruka)){
            document.getElementById("porukaGreska").innerHTML = "Poruka sadrzi nedozvoljene karaktere";
            document.getElementById("poruka").classList.add("crveno");
            return false;
        }
        else{
            document.getElementById("porukaGreska").innerHTML = "";
            document.getElementById("poruka").classList.remove("crveno");
        }
    }
    if(validno){
        uspesnaPoruka.innerHTML="Uspesno ste poslali poruku.";
    }
}
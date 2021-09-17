$(document).ready(function(){
    $("header").hide();
    $("header").fadeToggle(3000);

    $('#pocetna').click(function() {
        $('html, body').animate({
           scrollTop: $("#prvi").offset().top -50
       }, 1000);});
       $('#kontakt').click(function() {
        $('html, body').animate({
           scrollTop: $("#cetvrti").offset().top - 50
       }, 1000);});
       $('#ponuda').click(function(e) {
        e.preventDefault();
    });
       $('#autor').click(function() {
        $('html, body').animate({
           scrollTop: $("#peti").offset().top
       }, 1000);});
       $('#kak').click(function(e) {
        e.preventDefault();
        $('html, body').animate({
           scrollTop: $("#prK").offset().top-50
       }, 1000);});
       $('#suk').click(function(e) {
        e.preventDefault();
        $('html, body').animate({
           scrollTop: $("#prS").offset().top-50
       }, 1000);});

    // Procitaj vise
    $(".dodatno").hide();
    $(".button").click(function(e){
        e.preventDefault();
        $(this).parent().prev().slideToggle(1000);
    })

    // Navigacija - click
    $("#meni ul li").click(function(e){
        e.preventDefault();
       if($(this).find("ul").is(":visible")){
        $(this).find("ul").hide(1000);
       }
       else{
        $(this).find("ul").show(1000);
       }
    })
    // Navigacija - boja
    $(window).scroll(function(){
        if($(document).scrollTop()>450){
            $('header').addClass('boja');
            $('#meni ul li a,#logo p').addClass('crna');
        }
        else{
            $('header').removeClass('boja');
            $('#meni ul li a, #logo p').removeClass('crna');

        }
    })
    $("#btn").click(function(){
        if($('#meni ul').is(':visible')) { 
             $('#meni ul').slideUp("slow");                  
        } 
        else {
            $('#meni ul').slideDown("slow");
            $('#meni1 ul').css("display", "none");           
             }         
     }); 
}); 
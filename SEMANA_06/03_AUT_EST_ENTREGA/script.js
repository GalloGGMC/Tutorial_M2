$(document).ready(function(){
    $(".head").click(function(){
      $(".subtitulo").slideToggle("slow");
      $(".texto").slideToggle("slow");
    });
    $("#intro1").click(function(){
        $('img',this).toggle();
      });
  });



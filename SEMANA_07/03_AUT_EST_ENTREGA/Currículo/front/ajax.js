function read(){
    $.ajax({
        url: '/curriculo',
        type: 'GET',
        success: data => {
            var tx = '';
            data.forEach(element => {

                tx+=`<div class="subtitulo">${element.nome_da_realizacao}, ${element.anos}</div><div class="texto">${element.descricao}</div>`
            })
            $('#real').html(tx);
        }
    })
    
}
$(document).ready(function () {
    read();
    console.log("oi")
});
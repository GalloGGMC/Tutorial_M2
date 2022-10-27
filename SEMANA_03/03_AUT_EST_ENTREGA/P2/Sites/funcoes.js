function lancamento(){
    var v = Number(document.getElementById('vel').value);
    if (v>0){
        document.getElementById('t').innerHTML = v/10;
        document.getElementById('hmax').innerHTML = (v*v)/20;
    }
}

function mami(){
    var a = Number(document.getElementById('a').value);
    var b = Number(document.getElementById('b').value);
    var c = Number(document.getElementById('c').value);
    document.getElementById('xv').innerHTML = -(b/(2*a));
    document.getElementById('yv').innerHTML = -((b*b - 4*a*c)/(4*a))

}

function conversor(a){
    var temp = Number(document.getElementById('temp').value);
    if(a==0){
        document.getElementById('c').innerHTML = temp
        document.getElementById('f').innerHTML = ((temp*9)/5) + 32
    } else {
        document.getElementById('c').innerHTML = ((temp - 32)/9)*5
        document.getElementById('f').innerHTML = temp
    }
}

function conta(){
    var kwh = Number(document.getElementById('kwh').value);
    var u = Number(document.getElementById('unit').value);
    if (kwh <= 100){
        document.getElementById('result').innerHTML = kwh*u
    } else if (100 < kwh & kwh<=200){
        document.getElementById('result').innerHTML = kwh*u*1.25
    } else if (kwh > 200) {
        document.getElementById('result').innerHTML = kwh*u*1.5
    }
}
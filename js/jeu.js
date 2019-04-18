var precedente = -1;
var attente = 0;
var img;
var imgp;
//       invisibilité images          //
function cachephotos () {
img.style.visibility = 'hidden';
imgp.style.visibility = 'hidden';
attente = 0;
}
//        compatibilité image          //
function clic (n) {
if (attente != 1) {
img = document.getElementById('img'+n);
img.style.visibility = 'visible';
if (precedente<0) {
precedente = n;
}else {
imgp = document.getElementById('img'+precedente);
if (imgp.src==img.src) {
} else {
attente = 1;
setTimeout('cachephotos();',800);
}
precedente = -1;
}
}
}
//             Initialisation jeu           //
function initgame () {
for (var i=1 ; i<=200 ; i++) {
var n1 = Math.ceil(16*Math.random());
var n2 = Math.ceil(16*Math.random());
var img1 = document.getElementById('img'+n1);
var img2 = document.getElementById('img'+n2);
var src1 = img1.src;
var src2 = img2.src;
img1.src = src2;
img2.src = src1;
}
}

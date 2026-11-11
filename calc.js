// Same math as the free Excel versions (verified 2026-11-07).
function $(id){return document.getElementById(id)}
function up(x){return Math.ceil(Math.round(x*1e6)/1e6)}
function fmt(x,d){return x.toLocaleString(undefined,{minimumFractionDigits:d,maximumFractionDigits:d})}
function calcEN(){
  var sys=$('sys').value,L=+$('L').value,W=+$('W').value,T=+$('T').value,w=(+$('waste').value)/100;
  var imp=sys==='imperial';
  $('uL').textContent=$('uW').textContent=imp?'ft':'m';$('uT').textContent=imp?'in':'mm';
  var vol=0; if(L>0&&W>0&&T>0){vol=L*W*T/(imp?12:1000)*(1+w)/(imp?27:1)}
  var ft3=vol*(imp?27:35.3147);
  $('vol').textContent=fmt(vol,2);$('volu').textContent=imp?'cubic yards (yd³)':'cubic meters (m³)';
  $('b40').textContent=vol>0?up(ft3/0.3):0;$('b60').textContent=vol>0?up(ft3/0.45):0;$('b80').textContent=vol>0?up(ft3/0.6):0;
}
var MIX={'175':[317,0.528,0.740,204],'210':[375,0.501,0.752,230]};
function calcES(){
  var L=+$('L').value,W=+$('W').value,T=+$('T').value,w=(+$('waste').value)/100,m=MIX[$('fc').value]||MIX['210'],bag=+$('bag').value||50;
  var vol=(L>0&&W>0&&T>0)?L*W*T/1000*(1+w):0;
  $('vol').textContent=fmt(vol,2);$('cem').textContent=vol>0?up(vol*m[0]/bag):0;
  $('are').textContent=fmt(vol*m[1],2);$('pie').textContent=fmt(vol*m[2],2);$('agu').textContent=fmt(Math.round(vol*m[3]),0);
}
document.addEventListener('input',function(){(window.ES?calcES:calcEN)()});
document.addEventListener('DOMContentLoaded',function(){(window.ES?calcES:calcEN)()});

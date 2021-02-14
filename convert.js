function arabictohangul(){
var result = document.getElementById('arabic').value;
result = result.replace(/(ض|د|ذ)/g,'ㄷ');
result = result.replace(/(س|ش|ص|ث)/g,'ㅅ');
result = result.replace(/(ق)/g,'ㄲ');
result = result.replace(/(ف)/g,'ㅍ');
result = result.replace(/(غ)/g,'ㄱ');
result = result.replace(/(ه|ح)/g,'ㅎ');
result = result.replace(/(خ)/g,'ㅋㅅ');
result = result.replace(/(ج|ز)/g,'ㅈ');
result = result.replace(/(ي|ی|إ|ئ)/g,'ㅣ');
result = result.replace(/(ب)/g,'ㅂ');
result = result.replace(/(ل|ر)/g,'ㄹ');
result = result.replace(/(ا|ع|أ)/g,'ㅏ');
result = result.replace(/(ط|ت|ظ)/g,'ㅌ');
result = result.replace(/(ن)/g,'ㄴ');
result = result.replace(/(م)/g,'ㅁ');
result = result.replace(/(ك)/g,'ㅋ');
result = result.replace(/(ة)/g,'ㅏ트');
result = result.replace(/(و)/g,'ㅜ');
result = result.replace(/(.{1})ّ/g,'$1$1');
result = Hangul.assemble(result.split(''))
result = result.replace(/(ㅏ|ㅓ|ㅑ|ㅕ|ㅗ|ㅜ|ㅛ|ㅠ|ㅣ|ㅔ|ㅖ|ㅐ|ㅒ)/g,'ㅇ$1');
result = Hangul.assemble(result.split(''))
document.getElementById('arabictext').innerHTML = result;
}
function hangultoarabic(){
// 한글->아랍문자 변환함수
var text = document.getElementById('arabic').value;
var abjd1 = document.getElementById('abjd1').checked;
var abjd2 = document.getElementById('abjd2').checked;
var abjd3 = document.getElementById('abjd3').checked;
// 통상적 변환
text = text.replace(/알라/g,'الله');
text = text.replace(/알/g,'ال');
text = Hangul.disassemble(text,true);
var result = '';
for (var i = 0; i < text.length; i++) { // 음절별 변환
var arabic = '';
for (var ia = 0; ia < text[i].length; ia++) {
arabic = arabic + text[i][ia];
}
// 종성 변환
arabic = arabic.replace(/(ㅋ|ㄲ|(.{2,3})ㄱ)/g,'$2ك');
arabic = arabic.replace(/(ㄴ|(.{2,3})ㅇ)/g,'$2ن');
arabic = arabic.replace(/(ㅌ|ㄸ|(.{2,3})(ㅅ|ㅆ|ㅈ))/g,'$2ت');

// 자음 변환
arabic = arabic.replace(/ㄱ/g,'غ');
arabic = arabic.replace(/ㄷ/g,'د');
arabic = arabic.replace(/ㄹ/g,'ر');
arabic = arabic.replace(/ㅁ/g,'م');
arabic = arabic.replace(/(ㅂ|ㅃ)/g,'ب');
arabic = arabic.replace(/(ㅅ|ㅆ)/g,'س');
arabic = arabic.replace(/(ㅈ|ㅉ)/g,'ج');
arabic = arabic.replace(/ㅊ/g,'ق');
arabic = arabic.replace(/ㅍ/g,'ف');
arabic = arabic.replace(/ㅎ/g,'ه');

// 모음 변환
if(abjd2 && text[i][0] != 'ㅇ'){ // 모음 소거
arabic = arabic.replace(/(ㅏ|ㅓ|ㅑ|ㅕ|ㅗ|ㅜ|ㅛ|ㅠ|ㅣ|ㅔ|ㅖ|ㅐ|ㅒ)/g,'');
}else if(abjd3 && text[i][0] != 'ㅇ'){ // 모음 기호 변환
arabic = arabic.replace(/(ㅏ|ㅓ)/g,'َ');
arabic = arabic.replace(/(ㅑ|ㅕ)/g,'يَ');
arabic = arabic.replace(/(ㅗ|ㅜ|ㅇㅡ)/g,'ُ');
arabic = arabic.replace(/(ㅛ|ㅠ)/g,'يُ');
arabic = arabic.replace(/(ㅣ|ㅔ|ㅖ|ㅐ|ㅒ)/g,'ِ');
}else{
arabic = arabic.replace(/(ㅏ|ㅓ)/g,'ا');
arabic = arabic.replace(/(ㅑ|ㅕ)/g,'يا');
arabic = arabic.replace(/(ㅗ|ㅜ|ㅇㅡ)/g,'و');
arabic = arabic.replace(/(ㅛ|ㅠ)/g,'يو');
arabic = arabic.replace(/(ㅣ|ㅔ|ㅖ|ㅐ|ㅒ)/g,'ي');
}
arabic = arabic.replace(/(ㅇ|ㅡ)/g,'');
result = result + arabic;
}
//최종 변환
result = result.replace(/رر/g,'ل');
result = result.replace(/يي/g,'ي');
result = result.replace(/يا/g,'ية');
// 표시
document.getElementById('arabictext').innerHTML = result;
}function arabictranslate(){
var sel = document.getElementById("t_type");
var val = sel.options[sel.selectedIndex].value;
if(val == "hta"){
if(document.getElementById("abjd").style.display == 'none'){
document.getElementById("abjd").style.display = '';
document.getElementById("arabictext").dir = 'rtl';
document.getElementById("arabictext").lang = 'ar';
document.getElementById("arabic").dir = '';
document.getElementById("arabic").lang = '';
}
hangultoarabic();
}else{
if(document.getElementById("abjd").style.display == ''){
document.getElementById("abjd").style.display = 'none';
document.getElementById("arabictext").dir = '';
document.getElementById("arabictext").lang = '';
document.getElementById("arabic").dir = 'rtl';
document.getElementById("arabic").lang = 'ar';
}
arabictohangul();
}
}

var Quiz= function(ques, opts, ans){
this.ques=ques;
this.options=opts;
this.ans=ans;
}
Quiz.startQuiz=function(){
Quiz.nextQuiz();
}
Quiz.loadQuiz=function(){
var json_obj = [
{"ques" :"Expand HTML" , "options":["HyperTrimMarkUpLang", "HiTextMarkUpLanguage", "HyperTextMarkUpLanguage", "HyperTextMarkUpLang"], "ans":2},
{"ques" :"Expand XML" , "options":["HyperTrimMarkUpLang", "HiTextMarkUpLanguage", "ExtensibleMarkUpLanguage", "HyperTextMarkUpLang"], "ans":2},
{"ques" :"Expand TCP" , "options":["No idea", "Transmission control protocol", "ExtensibleMarkUpLanguage", "HyperTextMarkUpLang"], "ans":1},
{"ques" :"Expand FTP" , "options":["No idea", "Transmission control protocol", "File transmission Protocol", "HyperTextMarkUpLang"], "ans":2},
{"ques" :"Expand UDP" , "options":["User Datagram Protocol", "Transmission control protocol", "File transmission Protocol", "HyperTextMarkUpLang"], "ans":0}];
var quesArr=new Array();
for(var i=0;i<json_obj.length;i++){
quesArr[i]=new Quiz(json_obj[i].ques,json_obj[i].options,json_obj[i].ans);
}
var quesDiv= document.createElement("div");
quesDiv.id="quesDiv";
var quesTxt = document.createElement("label");
quesTxt.id="quesTxt";
var optDiv= document.createElement("div");
optDiv.id="optDiv";
quesDiv.appendChild(quesTxt);
var ins=new Array();
var optLabel=new Array();
for(var i=0;i<4;i++){
ins[i] = document.createElement("input");
ins[i].type="radio";
ins[i].name="rad";
ins[i].className="radioBut";
optLabel[i] = document.createElement("label");
optLabel[i].innerHTML="<br/>";
optDiv.appendChild(ins[i]);
optDiv.appendChild(optLabel[i]);
}
var but = document.createElement("input");
but.type="Button";
but.id="proceedBtn";
but.value="Proceed";
quesDiv.appendChild(optDiv);
quesDiv.appendChild(but);
document.body.appendChild(quesDiv);
return quesArr;
}
Quiz.nextQuiz=function(){
Quiz.nextQuiz.count++;
if(Quiz.nextQuiz.count<quesArr.length) quesArr[Quiz.nextQuiz.count].show();
else document.writeln("Quiz completed");
}//nextQuiz
Quiz.nextQuiz.count=-1;
Quiz.prototype={
show: function(){
var that = this;
document.getElementById("quesTxt").innerHTML="Question : "+this.ques;
var opt_div = document.getElementById("optDiv");
var optLabel = opt_div.getElementsByTagName("label");
var ins =document.getElementsByClassName("radioBut");
for(var i=0;i<4;i++){
ins[i].checked=false;
optLabel[i].innerHTML= this.options[i]+"<br/>";
}
var but = document.getElementById("proceedBtn");
var isChecked=false;
but.onclick=function checkAnswer(){
for(var j =0; j<ins.length; j++){
if(ins[j].checked == true){
isChecked=true;
break;
}
}//for
if(isChecked){
if(that.ans==j) alert("Your Answer Is Correct");
else alert("Your Answer Is InCorrect.");
}//if isChecked
Quiz.nextQuiz();
}//checkAnswer ends
}//show
}


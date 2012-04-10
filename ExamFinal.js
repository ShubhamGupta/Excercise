var Quiz= function(ques, opts, ans){
this.ques=ques;
this.options=opts;
this.ans=ans;
}
Quiz.startQuiz=function(){
//Quiz.loadQuiz();
Quiz.nextQuiz();
}
Quiz.loadQuiz=function(){
var quesArr=new Array();
var q1_opt=["o1","o2","o3","o4"];
var q1 = new Quiz("quest1", q1_opt, 1);
var q2_opt=["oo1","oo2","oo3","oo4"];
var q2 = new Quiz("quest2", q2_opt, 0);
var q3_opt=["o1","o2","o3","o4"];
var q3 = new Quiz("quest3", q3_opt, 3);
var q4_opt=["o1","o2","o3","o4"];
var q4 = new Quiz("quest4", q4_opt, 2);
var q5_opt=["o1","o2","o3","o4"];
var q5 = new Quiz("quest5", q5_opt, 4);
quesArr[0]=q1;
quesArr[1]=q2;
quesArr[2]=q3;
quesArr[3]=q4;
quesArr[4]=q5;
return quesArr;
}
Quiz.nextQuiz=function(){
Quiz.nextQuiz.count++;
if(Quiz.nextQuiz.count<quesArr.length){
quesDiv.innerHTML="";
quesArr[Quiz.nextQuiz.count].show();
}
else{
document.writeln("Quiz completed");
}
}//nextQuiz
Quiz.nextQuiz.count=-1;
Quiz.prototype={
show: function(){
var that = this;
var txt = document.createTextNode("Quiz : "+this.ques);
quesDiv.appendChild(txt);
var opt_div = document.createElement("div");
quesDiv.appendChild(opt_div);
var optLabel = new Array();
var ins = new Array();
for(var i=0;i<4;i++){
ins[i] = document.createElement("input");
ins[i].type="radio";
ins[i].name="rad";
optLabel[i] = document.createElement("label");
optLabel[i].innerHTML= this.options[i]+"<br/>";
opt_div.appendChild(ins[i]);
opt_div.appendChild(optLabel[i]);
}
var but = document.createElement("input");
but.type="button";
but.value="Next";
var isChecked=false;
but.onclick=function checkAnswer(){
for(var j =0; j<ins.length; j++){
if(ins[j].checked == true){
isChecked=true;
break;
}
}//for
if(isChecked){
if(that.ans==j){
alert("Your Answer Is Correct");
}
else{
alert("Your Answer Is InCorrect.");
}
}//if isChecked
Quiz.nextQuiz();
}//checkAnswer ends
quesDiv.appendChild(but);
}//show
}

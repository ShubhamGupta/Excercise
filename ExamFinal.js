var Quiz= function(json_obj){
this.quesArr=json_obj;
}
Quiz.checkCount=function(){
Quiz.checkCount.count++;
return Quiz.checkCount.count;
}//nextQuiz
Quiz.checkCount.count=-1;
Quiz.prototype={
showQues:function(){
var count = Quiz.checkCount();
if(count<this.quesArr.length) this.show();
else document.writeln("Quiz completed");
},
show: function(){
var that = this;
var currCount =Quiz.checkCount.count;
document.getElementById("quesTxt").innerHTML="Question : "+this.quesArr[currCount].ques;
var opt_div = document.getElementById("optDiv");
var optLabel = opt_div.getElementsByTagName("label");
var ins =document.getElementsByClassName("radioBut");
for(var i=0;i<4;i++){
ins[i].checked=false;
optLabel[i].innerHTML= this.quesArr[currCount].options[i]+"<br/>";
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
if(that.quesArr[currCount].ans==j) alert("Your Answer Is Correct");
else alert("Your Answer Is InCorrect.");
}//if isChecked
that.showQues();
}//checkAnswer ends
}//show
}

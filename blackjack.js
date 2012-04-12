var Card = function(val, suite, name){
this.value=val;
this.suite=suite;
this.name=name;
}
Card.prototype={
toString:function(){
str=this.name+" Of "+this.suite+"  ";
return str;
}}
var Deck = function(){
var suites = ["Heart", "Spade", "Brick", "Club"];
var card_names={
"Two":2,
"Three":3,
"Four":4,
"Five":5,
"Six":6,
"Seven":7,
"Eight":8,
"Nine":9,
"Ten":10,
"Jack":10,
"Queen":10,
"King":10,
"Ace":[1,11]
}
var packArr = new Array();//pack of 52 cards
var count=0;
for(var i in card_names){
	for(var j in suites){
		var card_temp = new Card(card_names[""+i], suites[j],i);
		packArr[count]=card_temp;
		count++;
	}
}
this.cards = packArr;
}
Deck.prototype={
removeCard:function(idx){
this.cards.splice(idx,1);
},//removeCard
getCard:function(){//getCard allocates a card from the deck and returns it
var rand = parseInt(Math.random()*this.cards.length);
var card = this.cards[rand];
this.removeCard(rand);
return card;
}}
var Dealer = function(){
var cards;
this.isBusted=false;
this.total=0;
}
Dealer.prototype={
startGame: function(player,deck){//Startgame method gives two cards to both player and the dealer initially.
var arr1=new Array();
var arr2=new Array();
for(var i=0;i<2;i++){
arr1[i]=deck.getCard();
arr2[i]=deck.getCard();
}
player.cards=arr1;
this.cards=arr2;
},//shuffle
getCards:function(){//getCards return the cards currently held.
return this.cards;
}
}//Dealer.prototype
var Player = function(name, amt){
this.name=name;
this.money=amt;
this.isBusted=false;
this.total=0;
var cards;
}
Player.prototype={
getCards:function(){
return this.cards;
}}
var Game = function(){
var name = prompt("Enter Your Name.");
this.player = new Player(name, 1000);
var mainDiv = document.getElementById("main");
var txtNode = document.createTextNode("Hi "+this.player.name+"! Lets play Black Jack..\n");
txtNode.id="text";
mainDiv.appendChild(txtNode);
this.initialize();
}
Game.prototype={
initialize:function(){
main.innerHTML="";
var amt = prompt("You have "+this.player.money+". How much would you like to bet ? ");
while (!(typeof parseInt(amt) == "number" && amt <= this.player.money && amt>=100)){
	var amt = prompt("Don't act like a fool. Place a real bet");
}
this.bet=amt;
this.player.isBusted=false;
this.player.money-=amt;
this.myDeck = new Deck();
this.dealer = new Dealer();
this.dealer.startGame(this.player,this.myDeck);//Dealer starts the game with a player and deck of cards.
this.checkTotal(this.player, this.dealer);
this.begin();
},//initialize
checkTotal:function(player,dealer){
var player_count=0;
var isAce=false;
var aceCnt=0;
var aceVal=0;
for(var i=0;i<player.cards.length;i++){
if(player.cards[i].name=="Ace"){
isAce=true;
aceCnt++;
}
else{
player_count += player.cards[i].value
}
}
if(isAce){
	for(var i=0;i<aceCnt;i++){
		(player_count+11)<=21?aceVal=11:aceVal=1;
		player_count += aceVal;
	}
}
var dealer_count=0;
var isAce=false;
var aceCnt=0;
var aceVal=0;
for(var i=0;i<dealer.cards.length;i++){
if(dealer.cards[i].name=="Ace"){
isAce=true;
aceCnt++;
}
else dealer_count += dealer.cards[i].value
}
if(isAce){
	for(var i=0;i<aceCnt;i++){
		(dealer_count+11)<=21?aceVal=11:aceVal=1;
		dealer_count += aceVal;
	}
}
player.total=player_count;
dealer.total=dealer_count;
player.total>21?player.isBusted=true:player.isBusted=false;
dealer.total>21?dealer.isBusted=true:dealer.isBusted=false;
},//setAce
begin:function(){
var that = this;
var str_player="";
for(var i=0;i<this.player.getCards().length;i++){
str_player+= this.player.getCards()[i].toString()+"<br/>";
}
var str2 = this.dealer.getCards()[0].toString();
var main = document.getElementById("main");
var span_player = document.createElement("span");
var span_dealer = document.createElement("span");
span_player.innerHTML="<br/>Your Cards are :<br/>"+str_player+"<br/><br/>";
span_dealer.innerHTML= "Dealer's face up Card : <br/>"+str2+"<br/>";
main.appendChild(span_player);
main.appendChild(span_dealer);
var div_opt=document.createElement("div");
div_opt.id="divOpt";
var butHit=document.createElement("input");
butHit.type="button";
butHit.value ="HIT";
butHit.onclick=function(){
that.player.cards[that.player.cards.length]=that.myDeck.getCard();
that.checkTotal(that.player, that.dealer);
var player_span=document.getElementsByTagName("span")[0];
var str_player="";
for(var i=0;i<that.player.getCards().length;i++){
str_player+= that.player.getCards()[i].toString()+"<br/>";
}
span_player.innerHTML="<br/>Your Cards are :<br/>"+str_player+"<br/><br/>";
var dealerPlays=parseInt(Math.random()*2);
if(dealerPlays!=0 && that.dealer.total<=17){
that.dealer.cards[that.dealer.cards.length]=that.myDeck.getCard();
that.checkTotal(that.player, that.dealer);
}
if(that.player.isBusted){
that.endGame(that.dealer);//Dealer wins
}
if(!(that.player.isBusted) && (that.dealer.isBusted)){
that.player.money += (that.bet*3);//You Won
that.endGame(that.player);
}
if((that.player.total==21) && that.dealer.total != 21){
that.player.money += (that.bet*3);//you won black jack
that.endGame(that.player);
}}
var butStand=document.createElement("input");
butStand.type="button";
butStand.value ="Stand";
butStand.onclick=function(){
var dealerPlays=parseInt(Math.random()*2);
if(dealerPlays!=0 && that.dealer.total<=17){
that.dealer.cards[that.dealer.cards.length]=that.myDeck.getCard();
that.checkTotal(that.player, that.dealer);
}
if(that.dealer.isBusted){
that.player.money += (that.bet*3);//You won
that.endGame(that.player);
}
else{
	if(that.player.total > that.dealer.total){
		that.player.money += (that.bet*3);//You won
		that.endGame(that.player);
	}
	else{
		if(that.player.total < that.dealer.total){
			that.endGame(that.dealer);//dealer won
		}
		else{
		that.player.money += that.bet;//drawn
		that.endGame(null);
		}
	}
}
}
var butSurrender=document.createElement("input");
butSurrender.type="button";
butSurrender.value ="Surrender";
butSurrender.onclick=function(){
	that.player.money += that.bet/2;
		that.endGame(null);
}
div_opt.appendChild(butHit);
div_opt.appendChild(butStand);
div_opt.appendChild(butSurrender);
main.appendChild(div_opt);
},
endGame:function(winner){
var that=this;
var spanStr="";
if(winner !=null){
	var result ="";
	winner instanceof Player?result="<br/>You have Won":result="<br/>You have lost"; 
	var spanStr=result+"<br/>";
}
if(this.player.money>0){
spanStr+="You Still have "+this.player.money+" Rs left. Do You want to play again ?</br>";
var div_opt = document.getElementById("divOpt");
var but=document.getElementsByTagName("input");
div_opt.innerHTML="";
var but_yes = document.createElement("input");
but_yes.type="button";
but_yes.value="Yes";
but_yes.onclick=function(){that.initialize();}
var but_no = document.createElement("input");
but_no.type="button";
but_no.value="No";
but_no.onclick=function(){
document.body.innerHTML="See you again....";
}
div_opt.appendChild(but_yes);
div_opt.appendChild(but_no);
}
else{
spanStr+="Better luck next time..</br>";
}
var spans=document.getElementsByTagName("span");
spans[0].innerHTML=spanStr;
spans[1].parentNode.removeChild(spans[1]);
}
}

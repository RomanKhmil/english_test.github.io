text = "21.11[винагороджувати-to award,спадок-heritage,стеля-ceiling,широкий-vast,різьблена рамка-gilt frame,вимагати-to demand,зображати-to depict,присвячувати-to dedicate,уважно розглядати-to stare at,штучний-artificial,надмірний-excessive,прости або грубий-crude,посуд-tableware,вибачатися за-to apologize for sth,бути винним-to awe,обмежений-scarec]30.11[Прагнення-endeavour,Вимірювальний пристрій-gauge,попередник-forerunner,перебульшення-exaggeration,спричиняти-to cause,отримати з...-to infer from,дієтична клітковина-dietary fibre,стипендія-scholarship,вільно надавати-to grant,внагороджувати-to award,спадок-heritage,стеля-ceiling]23.04[Ваша Величність-Your Majesty,простягатися-to stretch,просування вперед-to advance,'залишатися в темі'-to stay tuned,крізь-through,мудрість-wisdom,натхнення-inspiration,видатний композитор-outstanding composer]27.02[відатний політ-famous flight,розсіяний або неуважний-absent,милий або коханий-sweetheart,подолати-overcome,вибори в конгрес-congressional race,індуїзм-hindu,приймати ванну-to take a bath,вдовольняти-to satisfy,трохи або деякий час-for a while,стежка(щоб повернутися)-the path to return,сваритися або сперечатися-to arque,розійтися-get distant]01.03[рідна мова-mother tongue,іноземна мова-foreign language,включати-to include,неправильно написати-to misspel,підходящий-suitable,декада-decade,над(чимось)-above,ні...ні...-neither...nor,чи...чи...-either...or,середньовічний-medieval,за годинниковою стрілкою-clock wise,загарбник-intruder,перевага-good point,недолік-bad point];";
i = 0;
main_i = 0;
word_i = 0;
selector_i = 0;
tr_i = 0;
free_array = [];//[date[[words-translates]]
buffer = [];
array = [];
function solid_group_adder(){
	//If in date selecting we have mistake)
	if (text[tr_i] == "]"){
		tr_i = tr_i + 1;
		if(text[tr_i] == ";"){
			//console.log("done bleat")
			return;
		}
	}
	// tr_i+5 should be at " [ "
	free_array.push( text.substr(tr_i,5) );
	tr_i = tr_i + 5;
	word_scan(1);
}
function word_scan(type){
	//when text[ tr_i + 5 == " [ " ]
	if(type == 1){
		if (text[tr_i + selector_i] != "-"){
			selector_i = selector_i + 1;
			word_scan(1);
		}
		else{
			free_array.push([text.substr(tr_i + 1 ,selector_i - 1)]);
			tr_i = tr_i + selector_i;
			selector_i = 0;
			i = i + 1;
			//console.log(free_array);
			word_scan(2);
		}
	}
	//when we have word but it has not been translate
	if(type == 2){
		if(tr_i == text.lengh - 1){
			return 
		}
		//Next word
		if(text[tr_i + selector_i] == ","){
			free_array[i].push(text.substr(tr_i + 1,selector_i - 1));
			tr_i = tr_i + selector_i;
			selector_i = 0;
			//console.log(text[tr_i + selector_i]);
			//console.log("word done");
			word_scan(1);
		}
		//end of date
		if(text[tr_i + selector_i] == "]"){
			free_array[i].push(text.substr(tr_i + 1,selector_i - 1));
			array.push(free_array);
			tr_i = tr_i + selector_i;
			i = 0;
			selector_i = 0;
			free_array = [];
			if(tr_i == text.lengh - 1){
				return ;
			}
			solid_group_adder();
		}
		//Timer
		else{
			selector_i = selector_i + 1;
			word_scan(2);
		}
	}

}
solid_group_adder();
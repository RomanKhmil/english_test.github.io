// i tr_i array already locked
var input;
var array_of_mistakes = [];
var array_of_true_answear = [];
var id = 0;
//random
var random_array = [];
var random_num = 0;
var random_num_index = 0;
//test
var test_variant_length = 0;
var test_started = 0;
var test_timer = 0;
var test_timer_stringlines = -1;
//Short select
var container = document.getElementById("pj");
var links;
//Show all dates and make links
function test_start(){
	links = document.getElementsByClassName("day_link");
	container.className = "day_link_collector";
	while (test_timer < array.length){
		if(test_timer % 10){
			test_timer_stringlines = test_timer_stringlines + 1;
		}
		var new_link = document.createElement("div");
		var new_link_text = document.createElement("p");
		new_link_text.innerHTML = array[test_timer][0];
		new_link.className = "day_link";
		new_link.id = test_timer.toString();
		new_link.setAttribute( "onClick", "javasicript: day_start (" + test_timer.toString() + ");");
		new_link.appendChild(new_link_text);
		container.appendChild(new_link);
		test_timer = test_timer + 1;
	}
	container.style.height = 68 * test_timer_stringlines;
	container.style.top = 68 * test_timer_stringlines;
}
function day_start(test_id,result){
	id = test_id;

	//if test has been started
	if(test_started == 1){
		var next = document.getElementById("test_button_next");
		var word = document.getElementById("test_word");
		var answear = document.getElementById("test_answear");
		if (random_array.length == 1){
			random_num_index = 0;
		}
		if (random_array.length > 1){
			random_num_index = Math.floor(Math.random() * 100 / (100 / random_array.length));
		}
		random_num = random_array[random_num_index];
		word.innerHTML = array[id][random_num][0];
		random_array.splice(random_num_index,1);
	}
	//if test wasn't started
	if(test_started == 0){
		
		//NEW OBJECTS
		var new_word = document.createElement('div');
		var new_answear = document.createElement('input');
		var new_next = document.createElement('button');
//ID OF OBJECTS


		new_next.id = "test_button_next";
		new_word.id = "test_word";
		new_answear.id = "test_answear";
		//ADD BUTTON PARAMETR


		new_next.setAttribute("onClick","javasicript: test_answear_check();");
		//CLASSNAME


		new_next.className = "test_question_button";
		new_answear.className = "test_question_answear";
		new_word.className = "test_question_words";
		//BUTTON AND WORD innerHTML


		new_word.innerHTML = "Blya Blya";
		new_next.innerHTML = "NEXT!";
		//APENDCHILD FOR CONTAINER


		container.appendChild(new_word);
		container.appendChild(new_answear);
		container.appendChild(new_next);
		//SWICH PHASE


		test_started = 1;
		//MAKE FLAXIBLE OBJECTS


		test_variant_length = array[id].length;


		for(i = 1; i < (test_variant_length);i++){
			random_array.push(i);
		}

		$('.day_link').remove();
		container.className = "test_question_container";
		/*document.getElementById('test_button_next').onkeydown = function(event) {
    		if (event.keyCode == 13) {
    			test_answear_check();
    		}
    	}*/

    	$("#test_answear").keypress(function(e) {
		    if(e.which == 13) {
		        //alert('You pressed enter!');

		    $("#test_button_next").click();
		    }
		});
		day_start(id);
	}
}
function test_answear_check(){
	input = document.getElementById("test_answear").value;
	document.getElementById("test_answear").value = "";
	//FALSE
	if(input != array[id][random_num][1]){
		alert("false");
		array_of_mistakes.push([array[id][random_num][0],array[id][random_num][1]]);
	}
	//TRUE
	if(input == array[id][random_num][1]){
		alert("true");
		array_of_true_answear.push([array[id][random_num][0],array[id][random_num][1]]);
	}
	if(random_array.length == 0){
		test_result(id);
		return
	}
	day_start(id);
}
function test_result(id)
{
	$('#test_word').remove();
	$('#test_answear').remove();
	$('#test_button_next').remove();
	
	var new_test_container_true = document.createElement("ul");
	var new_test_container_false = document.createElement("ul");
	

	new_test_container_false.id = "false";
	new_test_container_true.id = "true";
	

	container.appendChild(new_test_container_true);
	container.appendChild(new_test_container_false);
	container.style.overflowY = "scroll";
	

	var container_false = document.getElementById("false");
	var container_true = document.getElementById("true");
	var array_title_false = document.createElement("li");
	array_title_false.id = "false_title";
	container_false.appendChild(array_title_false);
	

	for(i = 0;i < array_of_mistakes.length;i++)
	{
		var answear_false = document.createElement("li");
		container_false.appendChild(answear_false);
		answear_false.className = "false";
		answear_false.innerHTML = array_of_mistakes[i][0].toString() + " - " + array_of_mistakes[i][1].toString();
	}
	

	var array_title_true = document.createElement("li");
	array_title_true.id = "true_title";
	container_true.appendChild(array_title_true);
	

	for(i = 0;i < array_of_true_answear.length;i++){
		var answear_true = document.createElement("li");
		container_true.appendChild(answear_true);
		answear_true.className = "true";
		answear_true.innerHTML = array_of_true_answear[i][0].toString() + " - " + array_of_true_answear[i][1].toString();
	}
	array_title_false.innerHTML = "FALSE";
	array_title_true.innerHTML = "TRUE";
	

	var button_retry = document.createElement("button");
	button_retry.id = "retry";
	button_retry.innerHTML = "retry";
	container.appendChild(button_retry);
	button_retry.setAttribute("onClick","javasicript: restart_object_remove('full')");
	

	var button_mistake_retry = document.createElement("button")
	button_mistake_retry.id = "eretry";
	button_mistake_retry.innerHTML = "rewrite mistakes";
	container.appendChild(button_mistake_retry);
	button_mistake_retry.setAttribute("onClick","javasicript: restart_object_remove('mistakes')")
	alert("done");
}


function restart_object_remove(type){
	$("#retry").remove();
	$(".false").remove();
	$(".true").remove();
	$("#true").remove();
	$("#false").remove();
	$("#false_title").remove();
	$("#true_title").remove();
	$("#eretry").remove();
	if (type == "full"){
		restart_value_reset();
	}
	if(type == "mistakes"){
		array_of_true_answear = [];
		random_array = [];
		restart_test_of_mistakes();
	}
}

function restart_value_reset(){

	input = "";
	array_of_mistakes = [];
	array_of_true_answear = [];
	id = 0;
	random_array = [];
	random_num = 0;
	random_num_index = 0;
	test_variant_length = 0;
	test_started = 0;
	test_timer = 0;
	test_timer_stringlines = -1;
	test_start();
}
function restart_test_of_mistakes(){
	
}
test_start();

(function() {
	'use strict';

    var $ = function(id) { return document.getElementById(id); };
    var qs = function(sel) { return document.querySelector(sel); };
    var qsa = function(sel) { return document.querySelectorAll(sel); };
	
    window.onload = function() {
        $("signinbutton").onclick = loginfunc;
        var updatebtn = document.createElement("div");
		var addbtn = document.createElement("div");
		updatebtn.innerHTML = "update";
		addbtn.innerHTML = "add";
		updatebtn.className = "button center";
		addbtn.className = "button";
		addbtn.id = "add-button";
		updatebtn.style.marginTop = "50px";
		document.getElementById("menu-manager").appendChild(addbtn);
		document.getElementById("menu-manager").appendChild(updatebtn);
		addbtn.onclick = newLine;
		updatebtn.onclick = updateall;
    };
	
    function loginfunc() {
        console.log("it is clikced");
	    var username = $("username").value;
	    var password = $("password").value;
	    var ajaxPromise = new AjaxPostPromise(
	    	"admin.php",
	    	{"username": username, "password" : password});
	    ajaxPromise
	    	.then(JSON.parse)
	        .then(verify)
	        .catch(function( errorMsg ) { alert( "ERROR: " + errorMsg ); } );
	}
	
	function verify(response) {
		var message = response.response;
		if (message == "confirmed") {
			console.log("lalalal");
			openmenumanager();
		}
		$("errormessage").innerHTML = message;
	}
	
	function openmenumanager() {
		qs(".login-page").classList.add("hidden");
		$("menu-manager").classList.remove("hidden");
		var contents = qsa("tr");
		for (var i = 1; i < contents.length; i++) {
			contents[i].parentNode.removeChild(contents[i]);
		}
		var ajaxPromise = new AjaxGetPromise("select.php");
		ajaxPromise
			.then(JSON.parse)
			.then(display)
			.catch(function( errorMsg ) { alert( "ERROR: " + errorMsg ); } );
	}
	
	function display(response) {
		update(response);

		var xbuttons = qsa(".xbutton");
		for (var i = 0; i < xbuttons.length; i++) {
			xbuttons[i].onclick = remove;
		}
	}
	
	function remove() {
		alert(this.value);
		var ajaxPromise = new AjaxPostPromise(
	    	"delete.php",
	    	{"id": this.value});
	    ajaxPromise
	        .then(openmenumanager)
	        .catch(function( errorMsg ) { alert( "ERROR: " + errorMsg ); } );
	}
	
	function edit() {
		this.contentEditable = true;
		this.parentNode.classList.add("contentEditable");
	}
	
	function newLine() {
		var param = {"name": "default", "description" : "description", "price" : "price"};
		add(param);
	}
	
	function add(param) {
		console.log("it is clikced");
	    var ajaxPromise = new AjaxPostPromise(
	    	"insert.php",
	    	param);
	    ajaxPromise
	        .then(openmenumanager)
	        .catch(function( errorMsg ) { alert( "ERROR: " + errorMsg ); } );
	}
	
	function update(response) {
		var category = qsa("th");
		for(var i = 0; i < response.length; i++) {
			var food = response[i];
			var tr = document.createElement("tr");
			qs("tbody").appendChild(tr);
			for (var j = 0; j <food.length + 1; j++) {
				var td = document.createElement("td");
				tr.id = (food[0]);
				tr.appendChild(td);
				if (j == food.length) {
					var xbutton = document.createElement("input");
					xbutton.type = "checkbox";
					td.appendChild(xbutton);
					xbutton.onclick = remove;
					xbutton.value = food[0];
				} else {
					td.innerHTML = food[j];
				}
				if (j > 0 && j <food.length) {
					td.onclick = edit;
					td.classList.add(category[j].innerHTML);
				}
			}
		}
	}
	
	function updateall() {
		var changed = qsa(".contentEditable > td");
		for (var i = 0; i < changed.length - 1; i+=4) {
			updateDB({"id": changed[i].innerHTML, "name" : changed[i+1].innerHTML, 
			"description" : changed[i+2].innerHTML, "price" : changed[i+3].innerHTML});
		}
	}
	
	function updateDB(param) {
		var ajaxPromise = new AjaxPostPromise(
	    	"update.php",
	    	param);
	    ajaxPromise
	        .then(openmenumanager)
	        .catch(function( errorMsg ) { alert( "ERROR: " + errorMsg ); } );
	}
})();
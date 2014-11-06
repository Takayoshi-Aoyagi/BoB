"use strict";

var App = function () {

    var ta1 = new FormBase.TextInput({
	el: "#ta1",
	text: "default"
    });
    
    var ta2 = new FormBase.TextInput({
	el: "#ta2",
	text: "initial"
    });
    
    var btn1 = new FormBase.Button({
	el: "#btn1",
	text: "Button1",
	onClick: function () {
	    console.log("Clicked");
	}
    });

    var btn2 = new FormBase.Button({
	el: "#btn2",
	text: "Button2",
	onClick: function () {
	    console.log("Clicked");
	}
    });

    setTimeout(function () {
	btn1.disable();
	btn1.text("Button1: disabled");
    }, 5000);

    setTimeout(function () {
	btn1.enable();
	btn1.text("Button1");
    }, 10000);

    setTimeout(function () {
	ta1.reset();
	ta2.reset();
    }, 12000);
};

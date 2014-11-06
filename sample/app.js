"use strict";

var App = function () {

    var btn1 = new FormBase.Button({
	el: "#btn1",
	label: "Button1",
	onClick: function () {
	    console.log("Clicked");
	}
    });

    setTimeout(function () {
	btn1.disable();
	btn1.label("Button1: disabled");
    }, 5000);

    setTimeout(function () {
	btn1.enable();
	btn1.label("Button1");
    }, 10000);
};

"use strict";

var App = function () {

    var ta1 = new FormBase.TextInput({
	el: "#ta1",
	text: "default"
    });

    var btn1 = new FormBase.Button({
	el: "#btn1",
	text: "Button1",
	onClick: function () {
	    console.log("Clicked");
	}
    });

    var ta2 = new FormBase.TextInput({
	el: "#ta2",
	text: "initial"
    });

    var pw = new FormBase.TextInput({
	el: "#pw"
    });

    var btn2 = new FormBase.Button({
	el: "#btn2",
	text: "Button2",
	onClick: function () {
	    console.log("Clicked");
	}
    });

    var cb = new FormBase.Checkbox({
	el: "#cb",
	onClick: function () {
	    console.log(this.isChecked());
	}
    });

    var select = new FormBase.Select({
	el: "#select",
	opts: [
	    {val: 1, text: "いち"},
	    {val: 2, text: "にい", selected: true},
	    {val: 3, text: "さん"}
	]
    });

    setInterval(function () {
	console.log(select.getSelected());
    }, 3000);

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

    setTimeout(function () {
	var text = pw.text();
	ta2.text(text);
    }, 14000);
};

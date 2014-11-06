"use strict";

var App = function () {

    var array = [];
    var ta1 = new BoB.Form.TextInput({
	el: "#ta1",
	text: "default"
    });
    array.push(ta1);

    var btn1 = new BoB.Form.Button({
	el: "#btn1",
	text: "Button1",
	onClick: function () {
	    console.log("Clicked");
	}
    });
    array.push(btn1);

    var ta2 = new BoB.Form.TextInput({
	el: "#ta2",
	text: "initial"
    });
    array.push(ta2);
    
    var pw = new BoB.Form.TextInput({
	el: "#pw"
    });
    array.push(pw);

    var btn2 = new BoB.Form.Button({
	el: "#btn2",
	text: "Button2",
	onClick: function () {
	    console.log("Clicked");
	}
    });
    array.push(btn2);

    var cb = new BoB.Form.Checkbox({
	el: "#cb",
	onClick: function () {
	    console.log(this.isChecked());
	}
    });
    array.push(cb);

    var select = new BoB.Form.Select({
	el: "#select",
	opts: [
	    {val: 1, text: "いち"},
	    {val: 2, text: "にい", selected: true},
	    {val: 3, text: "さん"}
	]
    });
    array.push(select);

    setTimeout(function () {
	array.forEach(function (elm) {
	    elm.hide();
	});
    }, 1500);

    setTimeout(function () {
	array.forEach(function (elm) {
	    elm.show();
	});
    }, 3000);
    
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

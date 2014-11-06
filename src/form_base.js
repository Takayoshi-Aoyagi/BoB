(function () {

    "use strict";

    /**
     * Super class of HTML form element
     */
    var AbstractForm = Backbone.View.extend({

	events: {
	    "click": "_onClick"
	},

	/**
	 * Replace callback function of on click event
	 *
	 * @param callback callback function
	 */
	setOnClick: function (callback) {
	    this._onClick = callback;
	},

	/**
	 * Initialize common objects.
	 */
	_init: function (options) {
	    var msg;
	    // el (required)
	    if (!options.el) {
		msg = this._PREFIX + "el is NOT set.";
		new Error(msg);
	    }
	    this.el = options.el;

	    // on click
	    this.setOnClick(options.onClick);
	},

	/**
	 * Returns tag type.
	 * @example "INPUT", "BUTTON" ...
	 */
	_getTagType: function () {
	    return this.$el[0].tagName;
	},
	
	/**
	 * default behavior of click event (throws Error!)
	 */ 
	_onClick: function () {
	    var msg = this._PREFIX + "Click event is NOT implemented yet.";
	    throw new Error(msg);
	},

	/**
	 * enable disabled element
	 */
	enable: function () {
	    this.$el.removeAttr("disabled");
	},

	/**
	 * disable element
	 */
	disable: function () {
	    this.$el.attr("disabled", "disabled");
	}
    });

    /**
     * Button
     */
    var Button = AbstractForm.extend({
	
	_PREFIX: "FormBase.Button: ",

	/**
	 * initialize button
	 *
	 * @param options.el id (required)
	 * @param options.text label text of this button.
	 * @param options.onClick callback function of click event (required)
	 */
	initialize: function (options) {
	    this._init(options);
	    //
	    this._text = options.text;
	    this.text(this._text);
	},
    
	/**
	 * Get text if argument is null.
	 * Set text if argument exists.
	 *
	 * @param text label text
	 */
	text: function (str) {
	    if (!str) {
		return this._text;
	    }
	    var tagType = this._getTagType();

	    switch (tagType) {
	    case "INPUT":
		var type = this.$el.attr("type");
		switch (type) {
		case "button":
		    this.$el.val(str);    // when <input type="button">
		    break;
		default:
		    throw new Error("text(): Invalid type (" + type + ")");
		}
		break;
	    case "BUTTON":
		this.$el.text(str); // when <button>
		break;
	    default:
		throw new Error("text(): Invalid tagType (" + tagType + ")");
	    }
	    this._text = str
	}
    });

    /**
     * Text area or text box
     */
    var TextInput = AbstractForm.extend({
	
	_PREFIX: "FormBase.TextArea: ",

	/**
	 * initialize button
	 *
	 * @param options.el id (required)
	 * @param options.text default text
	 * @param options.onClick callback function of click event
	 */
	initialize: function (options) {
	    this._init(options);
	    //
	    this._defaultText = options.text;
	    this._text = this._defaultText;
	    this.text(this._text);
	},
    
	/**
	 * Get text if the argument is null.
	 * Set text if the argument exists.
	 *
	 * @param str label text
	 */
	text: function (str) {
	    if (!str) {
		return this._text;
	    }
	    this.$el.val(str);
	    this._text = str;
	},

	/**
	 * reset to default text.
	 */
	reset: function () {
	    this.text(this._defaultText);
	}
    });

    // Aggregate functions to FormBase
    var FormBase = function () {};
    FormBase.Button = Button;
    FormBase.TextInput = TextInput;
	
    // export FormBase
    window.FormBase = FormBase;
    
})();

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
	 * Get text if argument is null.
	 * Set text if argument exists.
	 *
	 * @param text label text
	 */
	text: function (str) {
	    var tagType = this._getTagType(),
		type = this.$el.attr("type");
	    if (!str) {
		this._text = this.$el.val();
		return this._text;
	    }
	    
	    switch (tagType) {
	    case "INPUT":
		
		switch (type) {
		case "button": // fall throwgh
		case "text":
		    this.$el.val(str);
		    break;
		default:
		    throw new Error("text(): Invalid type (" + type + ")");
		}
		break;
	    case "BUTTON":
		this.$el.text(str);
		break;
	    case "TEXTAREA":
		this.$el.val(str);
		break;
	    default:
		throw new Error("text(): Invalid tagType (" + tagType + ")");
	    }
	    this._text = str
	},

	/**
	 * reset to default text.
	 */
	reset: function () {
	    this.text(this._defaultText);
	},

	/**
	 * Check parameters
	 */
	_init: function (options, flags) {
	    var msg;

	    // this._PREFIX
	    if (!this._PREFIX) {
		msg = "this._PREFIX is NOT set.";
		throw new Error(msg);
	    }
	    
	    // el (required)
	    if (!options.el) {
		msg = this._PREFIX + "el is NOT set.";
		throw new Error(msg);
		
	    }
	    this.el = options.el;

	    // text
	    this._defaultText = options.text;
	    this.text(options.text);

	    // on click
	    if (flags.onClick && !options.onClick) {
		msg = this._PREFIX + "onClick is NOT set.";
		throw new Error(msg);
	    }
	    this.setOnClick(options.onClick);
	},

	/**
	 * Returns tag type.
	 * @example "INPUT", "BUTTON" ...
	 */
	_getTagType: function () {
	    if (this.$el[0]) {
		return this.$el[0].tagName;
	    }
	    return undefined
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
	},

	hide: function () {
	    this.$el.hide();
	},

	show: function() {
	    this.$el.show();
	}
    });

    /**
     * Button
     */
    var Button = AbstractForm.extend({
	
	_PREFIX: "BoB.Button: ",

	/**
	 * initialize button
	 *
	 * @param options.el id (required)
	 * @param options.onClick callback function of click event (required)
	 * @param options.text label text of this button.
	 */
	initialize: function (options) {
	    this._init(options, {
		onClick: true
	    });
	}
    });

    /**
     * Text area or text box
     */
    var TextInput = AbstractForm.extend({
	
	_PREFIX: "BoB.TextArea: ",

	/**
	 * initialize button
	 *
	 * @param options.el id (required)
	 * @param options.text default text
	 * @param options.onClick callback function of click event
	 */
	initialize: function (options) {
	    this._init(options, {});
	},
    });

    var Checkbox = AbstractForm.extend({

	_PREFIX: "BoB.Checkbox: ",

	initialize: function (options) {
	    this._init(options, {});
	},

	check: function (flag) {
	    this.$el.prop('checked', flag);
	},

	isChecked: function () {
	    return this.$el.prop('checked');
	}	
    });

    var Select = AbstractForm.extend({

	_PREFIX: "BoB.Select: ",

	initialize: function (options) {
	    var that = this;
	    this._init(options, {});
	    this.opts = options.opts;
	    if (this.opts) {
		this.opts.forEach(function (opt) {
		    if (opt.selected) {
			that.selected = opt;
			that.$el.append("<option value='" + opt.val + "' selected>" + opt.text + "</option>");
		    } else {
			that.$el.append("<option value='" + opt.val + "'>" + opt.text + "</option>");
		    }
		});
	    }
	},

	getSelected: function () {
	    var dom = this.$el.first('option:selected'),
		selectedIndex = dom.val() - 1;
	    return this.opts[selectedIndex];
	}
    });
				     
    // Aggregate functions to BoB
    var Form = function () {};
    Form.Button = Button;
    Form.TextInput = TextInput;
    Form.Checkbox = Checkbox;
    Form.Select = Select;

    var BoB = function () {};
    BoB.Form = Form;
    
    // export BoB
    
    window.BoB = BoB;
    
})();

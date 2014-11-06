(function () {

    "use strict";

    /**
     * Super class of HTML form element
     */
    var AbstractForm = Backbone.View.extend({

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
	
	PREFIX: "FormBase.Button: ",

	/**
	 * initialize button
	 *
	 * @param options.el id (required)
	 * @param options.label label text of this button.
	 * @param options.onClick callback function of click event (required)
	 */
	initialize: function (options) {
	    var msg;
	    if (!options.el) {
		msg = PREFIX + "el is NOT set.";
		new Error(msg);
	    }
	    this.el = options.el;

	    this.labelName = options.label;
	    this.label(this.labelName);
	
	    if (options.onClick) {
		this.onClick = options.onClick;
	    }
	},
    
	events: {
	    "click": "onClick"
	},

	/**
	 * default behavior of click event (throws Error!)
	 */ 
	onClick: function () {
	    var msg = PREFIX + "Click event is NOT implemented yet.";
	    throw new Error(msg);
	},

	/**
	 * Get label text if argument is null.
	 * Set label if argument is exist.
	 *
	 * @param label label text
	 */
	label: function (label) {
	    if (!label) {
		return this.labelName;
	    }
	    this.labelName = label;
	    this.$el.text(this.labelName);
	},

	/**
	 * Replace callback function of on click event
	 *
	 * @param callback callback function
	 */
	setOnClick: function (callback) {
	    this.onClick = callback;
	}
    });

    // Aggregate functions to FormBase
    var FormBase = function () {};
    FormBase.Button = Button;
	
    // export FormBase
    window.FormBase = FormBase;
    
})();

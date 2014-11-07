# -*- coding: utf-8 -*-

class JSGenerator:
    
    def __init__(self, config, file):
        self.config = config
        self.file = file
        self.js = []

    def generate(self):
        self.js.append("$(document).ready(function(){");
        self.js.append('"use strict";')
        self.searchChildren(self.config["children"])
        self.js.append('});');
        script = "\n".join(self.js)
        file = open('app.js', 'w')
        file.write(script)
        file.close()

    def searchChildren(self, children):
        for child in children:
            self.searchChild(child)

    def searchChild(self, child):
        type = child["type"]
        if type == "view":
            id = child["id"]
            self.appendView(id)
        elif type == "button":
            id = child["id"]
            value = child["value"]
            self.appendButton(id, value)
        elif type == "text":
            id = child["id"]
            self.appendText(id)

        if "children" in child.keys():
            nextChildren = child["children"]
            self.searchChildren(nextChildren)

    def appendView(self, id):
        print ""
            
    def appendButton(self, id, value):
        self.js
        self.js.append('');
        self.js.append('var ' + id + ' = new BoB.Form.Button({')
        self.js.append('  el: "#' + id + '_button",')
        self.js.append('  text: "' + value + '",')
        self.js.append('  onClick: function () {')
        self.js.append('    // Write your code here !')
        self.js.append('    console.log("clicked");')
        self.js.append('  }')
        self.js.append('});');

    def appendText(self, id):
        self.js.append('');
        self.js.append('var ' + id + ' = new BoB.Form.TextInput({')
        self.js.append('  el: "#' + id + '_text",')
        self.js.append('  text: ""')
        self.js.append('});');

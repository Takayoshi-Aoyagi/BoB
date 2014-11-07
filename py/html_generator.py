# -*- coding: utf-8 -*-

import json
from pprint import pprint
from pyh import *

class HtmlGenerator:

    # JSON keys
    TITLE = "title"
    JS = "js"
    CSS = "css"
    TYPE = "type"
    ID = "id"
    CHILDREN = "children"
    LABEL = "label"
    TEXT = "text"
    VALUE = "value"
    
    
    # JSON value
    VIEW = "view"
    BUTTON = "button"
        
    def __init__(self, config, file):
        self.config = config
        self.file = file
        
    def appendJS(self):
        jss = self.config["js"]
        for js in jss:
            self.page.addJS(js)

    def appendCSS(self):
        csss = self.config["css"]
        for css in csss:
            self.page.addCSS(css)

    def appendChildren(self, parent, children):
        for child in children:
            self.appendChild(parent, child)

    def appendChild(self, parent, child):
        type = None
        id = None
        nextChildren = None
        for key in child.keys():
            if key == HtmlGenerator.TYPE:
                type = child[HtmlGenerator.TYPE]
            elif key == HtmlGenerator.ID:
                id = child[HtmlGenerator.ID]
            elif key == HtmlGenerator.CHILDREN:
                nextChildren = child[HtmlGenerator.CHILDREN]

        element = self.getTypedElement(child)
        parent << element

        if nextChildren == None:
            return

        self.appendChildren(element, nextChildren)

    def getTypedElement(self, child):
        type = child[HtmlGenerator.TYPE]
        id = child[HtmlGenerator.ID]
        _div = div(id = id)
        if type == HtmlGenerator.BUTTON:
            value = child[HtmlGenerator.VALUE]
            #_div << input(id = id + "_button", type = "button", value=value)
            _div << input(id = id + "_button", type = "button")
        elif type == HtmlGenerator.TEXT:
            label = child[HtmlGenerator.LABEL]
            _div << p(label)
            _div << input(id = id + "_text", type = "text")
        return _div
    
    def generate(self):
        self.page = PyH(self.config["title"])
        self.appendJS()
        self.appendCSS()

        children = self.config[HtmlGenerator.CHILDREN]
        self.appendChildren(self.page, children)

        # output to file
        self.page.printOut(file=self.file)

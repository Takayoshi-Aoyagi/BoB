# -*- coding: utf-8 -*-

import json
from html_generator import HtmlGenerator
from js_generator import JSGenerator

class ApplicationGenerator:

    def generate(self):
        default = self.loadConfig('./default.json')
        config = self.loadConfig('./config.json')
        self.mergeConfig(default, config)
        #
        jsGen = JSGenerator(config, 'app.js')
        jsGen.generate()
        #
        htmlGen = HtmlGenerator(config, 'index.html')
        htmlGen.generate()

    def mergeConfig(self, default, config):
        djs = default["js"]
        cjs = config["js"]
        for js in cjs:
            djs.append(js)
        config["js"] = djs
        
    def loadConfig(self, fname):
        file = open(fname)
        config = json.load(file)
        file.close()
        return config

app = ApplicationGenerator()
app.generate()

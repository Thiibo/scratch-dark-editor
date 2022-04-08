#!/usr/bin/env python3
from os import listdir
from os.path import isfile, join, dirname

def getSettings():
    # Setup
    cd = dirname(__file__)

    # Load themes
    themeFiles = [f for f in listdir(cd + "/../style/themes/") if isfile(join(cd + "/../style/themes/", f))]
    themes = dict()
    for themeFile in themeFiles:
        themeId = themeFile.split('.')[0]
        with open(cd + '/../style/themes/' + themeFile) as f:
            themeLines = f.readlines()
        themeName = themeLines[0][3:-4]
        themeLines.pop(0)

        themes[themeId] = {
            "title": themeName,
            "content": ''.join(themeLines)
        }
    
    # Load custom theme colors css
    with open(cd + '/../style/customthemecolorsenabled.css') as f:
        customthemecolorsContent = f.read()

    # Setup settings
    settings = {
        "theme": {
            "title": "Theme",
            "type": "dropdown",
            "options": themes,
            "default": "classic",
        },
        "customthemecolorsCSS": {
            "title": "Enable custom theme colors?",
            "type": "dropdown",
            "options": {
                "no": {
                    "title": "No",
                    "content": '/* Custom colors disabled */'
                },
                "yes": {
                    "title": "Yes",
                    "content": customthemecolorsContent
                }
            },
            "default": "no"
        },
        "primaryColor": {
            "title": "Primary color",
            "type": "color",
            "default": "#4C97FF"
        },
        "secundaryColor": {
            "title": "Secundary color",
            "type": "color",
            "default": "#FF8C1A"
        }
    }
    return settings
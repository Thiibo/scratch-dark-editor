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

    # Load background image css
    with open(cd + '/../style/backgroundimageenabled.css') as f:
        backgroundImageContent = f.read()

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
        },
        "backgroundImageCSS": {
            "title": "Enable background image?",
            "type": "dropdown",
            "options": {
                "no": {
                    "title": "No",
                    "content": "/* Background image disabled */"
                },
                "yes": {
                    "title": "Yes",
                    "content": backgroundImageContent
                }
            },
            "default": "no"
        },
        "backgroundImage": {
            "title": "Background image",
            "type": "image",
            "options": {
                "space1": {
                    "title": "Space 1",
                    "content": "https://cdn.pixabay.com/photo/2016/10/20/18/35/earth-1756274_960_720.jpg" # Credit to https://pixabay.com/users/qimono-1962238/
                },
                "space2": {
                    "title": "Space 2",
                    "content": "https://cdn.pixabay.com/photo/2011/12/14/12/21/orion-nebula-11107_960_720.jpg" # Credit to https://pixabay.com/users/wikiimages-1897/
                },
                "cat1": {
                    "title": "Cat 1",
                    "content": "https://cdn.pixabay.com/photo/2022/03/24/14/42/animal-7089224_960_720.jpg" # Credit to https://pixabay.com/users/bambi2192-13359725/
                },
                "cat2": {
                    "title": "Cat 2",
                    "content": "https://cdn.pixabay.com/photo/2016/11/19/17/33/animal-1840495_960_720.jpg" # Credit to https://pixabay.com/users/pexels-2286921/
                },
                "dog1": {
                    "title": "Dog 1",
                    "content": "https://cdn.pixabay.com/photo/2018/01/09/11/04/dog-3071334_960_720.jpg" # Credit to https://pixabay.com/users/moshehar-7046690/
                },
                "dog2": {
                    "title": "Dog 2",
                    "content": "https://cdn.pixabay.com/photo/2016/05/09/10/42/weimaraner-1381186_960_720.jpg" # Credit to https://pixabay.com/users/elvisclth-448505/
                },
                "horse": {
                    "title": "Horse",
                    "content": "https://cdn.pixabay.com/photo/2018/06/21/20/50/horse-3489428_960_720.jpg" # Credit to https://pixabay.com/users/christels-3741991/
                },
                "wolf": {
                    "title": "Wolf",
                    "content": "https://cdn.pixabay.com/photo/2017/09/24/18/15/wolf-2782626_960_720.jpg" # Credit to https://pixabay.com/users/christels-3741991/
                },
                "venice": {
                    "title": "Venice",
                    "content": "https://cdn.pixabay.com/photo/2016/12/27/09/24/grand-canal-1933559_960_720.jpg" # Credit to https://pixabay.com/users/12019-12019/
                },
                "redrose": {
                    "title": "Red rose",
                    "content": "https://cdn.pixabay.com/photo/2018/01/29/07/11/flower-3115353_960_720.jpg" # Credit to https://pixabay.com/users/moshehar-7046690/
                },
                "chess": {
                    "title": "Chess",
                    "content": "https://cdn.pixabay.com/photo/2016/11/21/17/50/king-1846807_960_720.jpg" # Credit to https://pixabay.com/users/pexels-2286921/
                },
                "minecraft": {
                    "title": "Minecraft",
                    "content": "https://wallpapers.com/images/high/4d-minecraft-cube-gyq5l01m2bzys58p.jpg" # Credit to valeravenegretvv at https://wallpapers.com/wallpapers/4d-minecraft-cube-gyq5l01m2bzys58p.html
                },
                "roblox": {
                    "title": "Roblox",
                    "content": "https://wallpapers.com/images/high/cool-3d-roblox-avatar-e5o3rq8aiudhydd6.jpg" # Credit to svettyk86 at https://wallpapers.com/wallpapers/cool-3d-roblox-avatar-e5o3rq8aiudhydd6.html
                }
            },
            "default": "space"
        }
    }
    return settings
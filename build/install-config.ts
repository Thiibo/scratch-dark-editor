import files from "./modules/files";

export default {
    "theme": {
        "title": "Theme",
        "type": "dropdown",
        "options": files.themes.map(theme => theme.name),
        "default": "classic",
    },
    "customthemecolorsCSS": {
        "title": "Enable custom theme colors?",
        "type": "dropdown",
        "options": {
            "no": {
                "title": "No",
                // "content": customthemecolorsContentDisabled
            },
            "yes": {
                "title": "Yes",
                // "content": customthemecolorsContentEnabled
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
                // "content": backgroundImageContent
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
                "content": "https://cdn.pixabay.com/photo/2016/10/20/18/35/earth-1756274_960_720.jpg" // Credit to https://pixabay.com/users/qimono-1962238/
            },
            "space2": {
                "title": "Space 2",
                "content": "https://cdn.pixabay.com/photo/2011/12/14/12/21/orion-nebula-11107_960_720.jpg" // Credit to https://pixabay.com/users/wikiimages-1897/
            },
            "cat1": {
                "title": "Cat 1",
                "content": "https://cdn.pixabay.com/photo/2022/03/24/14/42/animal-7089224_960_720.jpg" // Credit to https://pixabay.com/users/bambi2192-13359725/
            },
            "cat2": {
                "title": "Cat 2",
                "content": "https://cdn.pixabay.com/photo/2016/11/19/17/33/animal-1840495_960_720.jpg" // Credit to https://pixabay.com/users/pexels-2286921/
            },
            "dog1": {
                "title": "Dog 1",
                "content": "https://cdn.pixabay.com/photo/2018/01/09/11/04/dog-3071334_960_720.jpg" // Credit to https://pixabay.com/users/moshehar-7046690/
            },
            "dog2": {
                "title": "Dog 2",
                "content": "https://cdn.pixabay.com/photo/2016/05/09/10/42/weimaraner-1381186_960_720.jpg" // Credit to https://pixabay.com/users/elvisclth-448505/
            },
            "horse": {
                "title": "Horse",
                "content": "https://cdn.pixabay.com/photo/2018/06/21/20/50/horse-3489428_960_720.jpg" // Credit to https://pixabay.com/users/christels-3741991/
            },
            "wolf": {
                "title": "Wolf",
                "content": "https://cdn.pixabay.com/photo/2017/09/24/18/15/wolf-2782626_960_720.jpg" // Credit to https://pixabay.com/users/christels-3741991/
            },
            "venice": {
                "title": "Venice",
                "content": "https://cdn.pixabay.com/photo/2016/12/27/09/24/grand-canal-1933559_960_720.jpg" // Credit to https://pixabay.com/users/12019-12019/
            },
            "redrose": {
                "title": "Red rose",
                "content": "https://cdn.pixabay.com/photo/2018/01/29/07/11/flower-3115353_960_720.jpg" // Credit to https://pixabay.com/users/moshehar-7046690/
            },
            "chess": {
                "title": "Chess",
                "content": "https://cdn.pixabay.com/photo/2016/11/21/17/50/king-1846807_960_720.jpg" // Credit to https://pixabay.com/users/pexels-2286921/
            },
            "soccer": {
                "title": "Soccer/Football",
                "content": "https://cdn.pixabay.com/photo/2017/08/25/16/15/ball-2680595_960_720.jpg" // Credit to https://pixabay.com/users/coxinhafotos-3726685/
            },
            "hacking": {
                "title": "Hacking",
                "content": "https://cdn.pixabay.com/photo/2017/05/29/18/22/matrix-2354492_960_720.jpg" // Credit to https://pixabay.com/users/gdj-1086657/
            },
            "ufo": {
                "title": "UFO",
                "content": "https://cdn.pixabay.com/photo/2016/03/18/15/02/ufo-1265186_960_720.jpg" // Credit to https://pixabay.com/users/tombud-1908037/
            },
            "minecraft": {
                "title": "Minecraft",
                "content": "https://wallpapers.com/images/high/4d-minecraft-cube-gyq5l01m2bzys58p.jpg" // Credit to valeravenegretvv at https://wallpapers.com/wallpapers/4d-minecraft-cube-gyq5l01m2bzys58p.html
            },
            "roblox": {
                "title": "Roblox",
                "content": "https://wallpapers.com/images/high/cool-3d-roblox-avatar-e5o3rq8aiudhydd6.jpg" // Credit to svettyk86 at https://wallpapers.com/wallpapers/cool-3d-roblox-avatar-e5o3rq8aiudhydd6.html
            }
        },
        "default": "space1"
    },
    "optimiseCSS": {
        "title": "Optimise install for",
        "type": "dropdown",
        "options": {
            "chromium": {
                "title": "Chrome/Brave/Edge/Opera",
                // "content": customthemecolorsContentEnabledChromium
            },
            "gecko": {
                "title": "Firefox/Waterfox",
                // "content": customthemecolorsContentEnabledGecko
            }
        },
        "default": "chromium"
    }
}

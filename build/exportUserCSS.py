#!/usr/bin/env python3
from settings import getSettings
from os.path import dirname

def main():
    # Get current directory
    cd = dirname(__file__)

    # Get settings
    settings = getSettings()

    # Get base and header
    with open(cd + '/../style/base.css') as f:
        base = f.read()
    with open(cd + '/../style/header.txt') as f:
        header = f.read()

    # Write userCSS header
    userCSS = "/* ==UserStyle==\n" + header + "\n"
    userCSSSettings = ""
    
    for settingId, settingVal in settings.items():
        match settingVal['type']:
            case ('dropdown' | 'image'):
                userCSSSettings += f"@advanced dropdown {settingId} \"{settingVal['title']}\" {{\n"
                for optionId, optionVal in settingVal['options'].items():
                    userCSSSettings += f"\t{settingId}--{optionId} \"{optionVal['title']}{'*' if settingVal['default'] == optionId else ''}\" <<<EOT {optionVal['content']} EOT;\n"
                userCSSSettings += "}\n"

            case 'color':
                userCSSSettings += f"@advanced color {settingId} \"{settingVal['title']}\" {settingVal['default']}\n"

            case _:
                print(f"Error: Setting '{settingId}' has unknown type '{settingVal['type']}'")
                exit()

    userCSS += userCSSSettings.replace('*/', '*\\/')
    userCSS += "\n==/UserStyle== */\n\n"

    # Append base
    userCSS += base

    # Save
    with open(cd + '/../dist/style.user.css', 'w+') as f:
        f.write(userCSS)


if __name__ == "__main__":
    main()
#!/usr/bin/env python3
import sys
from os.path import dirname
import re
from settings import getSettings

def main(args):
    # Setup
    localVars = dict()
    cd = dirname(__file__)

    # Get settings
    settings = getSettings()

    if len(args) > 0 and args[0].startswith('--'):
        command = args[0][2:]
        if command == 'help' or command == 'h':
            if len(args) == 1:
                print("Please provide a list of arguments to adjust the settings of the userstyle for export")
                print("To use the default value, specify 'null' or '.'")
                print(f"The following settings are available: <{'> <'.join(settings.keys())}>")
                print("To easily get the avaiable settings, use '--list'")
                print("To get more info about a setting, use '--help <settingName>'.")
            elif len(args) == 2:
                if args[1] in settings.keys():
                    settingType = settings[args[1]]['type']
                    print(f"Info about setting '{args[1]}':")
                    print("-----")
                    print(f"Type: {settingType}")
                    if settingType == 'dropdown' or settingType == 'image': print(f"Options: <{'|'.join(settings[args[1]]['options'].keys())}>")
                    print(f"Default: {settings[args[1]]['default']}")
                else:
                    print(f"Error: Unknown setting '{args[1]}'.")
                    print(f"The following settings are available: <{'> <'.join(settings.keys())}>")
            else:
                print("Please use only one argument for help. Syntax: '--help <settingName>'")

        elif command == 'list' or command == 'l':
            print(f"The following settings are available: <{'> <'.join(settings.keys())}>")
        else:
            print(f"Error: unrecognized command '{command}'")
        return

    # Get base
    with open(cd + '/../style/base.css') as f:
        base = f.read()

    # Select values for settings
    for i, (settingId, settingVal) in enumerate(settings.items()):
        if i >= len(args) or args[i] == 'null' or args[i] == '.':
            val = settingVal['default']
        else:
            val = args[i]
        
        if settingVal['type'] == 'dropdown' or settingVal['type'] == 'image' :
            if val not in settingVal['options']:
                print(f"Error: '{val}' is not recognized as a possible option for the {'image' if settingVal['type'] == 'image' else '(regular)'} dropdown '{settingId}'")
                print(f"Possible options are: <{'|'.join(settingVal['options'].keys())}>")
                exit()
            localVars[settingId] = settingVal['options'][val]['content']

        elif settingVal['type'] == 'color':
            if not re.match(r"^#[\dabcdef]{6}$", val, re.IGNORECASE):
                print(f"Error: '{val}' is not recognized as a legal HEX color for color select '{settingId}'.")
                print("Please use the format '#rrggbb'.")
                exit()
            localVars[settingId] = val

    # Put local variables in baseplate and other CSS files
    def handle_local_var(var):
        localVar = var.group()
        localVarName = localVar[4:-4]
        if not localVarName in localVars:
            print(f"Error: '{localVarName}' is not recognized as a local variable (setting id) in CSS code")
            exit()
        return localVars[localVarName]

    regex = r"\/\*\[\[([^\]\]\*\/]+)\]\]\*\/"
    export = re.sub(regex, handle_local_var, base)
    while re.search(regex, export):
        export = re.sub(regex, handle_local_var, export)

    # Save
    with open(cd + '/../dist/static.css', 'w+') as f:
        f.write(export)

if __name__ == "__main__":
    main(sys.argv[1:])
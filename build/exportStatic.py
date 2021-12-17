#!/usr/bin/env python3
import sys
from os.path import dirname
import re
from settings import getSettings

def main(args):
    # Setup
    localVars = dict()
    cd = dirname(__file__)

    # Get base
    with open(cd + '/../style/base.css') as f:
        base = f.read()

    # Get settings
    settings = getSettings()

    # Select values for settings
    for i, (settingId, settingVal) in enumerate(settings.items()):
        if i >= len(args) or args[i] == 'null' or args[i] == '.':
            val = settingVal['default']
        else:
            val = args[i]
        
        if settingVal['type'] == 'dropdown':
            if val not in settingVal['options']:
                print(f"Error: '{val}' is not recognized as a possible option for the dropdown '{settingId}'")
                exit()
            localVars[settingId] = settingVal['options'][val]['content']

        elif settingVal['type'] == 'color':
            if not re.match(r"^#[\dabcdef]{6}$", val, re.IGNORECASE):
                print(f"Error: '{val}' is not recognized as a legal HEX color for color select '{settingId}'")
                exit()
            localVars[settingId] = val

    # Put local variables in baseplate and other CSS files
    def handle_local_var(var):
        localVar = var.group()
        localVarName = localVar[4:-4]
        if not localVarName in localVars:
            print(f"Error: '{localVarName}' is not recognized as a local variable (setting id) in CSS code'")
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
#!/usr/bin/env python3
import webbrowser
from os import system as run
from os.path import dirname
from os.path import realpath

def main():
    cd = dirname(__file__)
    run(f"python {cd}/exportUserCSS.py")
    webbrowser.open('file://' + realpath(cd + '/openUserCSS.html'))

if __name__ == "__main__":
    main()
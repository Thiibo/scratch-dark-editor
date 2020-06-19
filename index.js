const VERSION = "2.9";

Element.prototype.index = function() {
  let i = 0;
  while (this.parentNode.children[i] != this) i++;
  return i;
}

async function getData(url) {
    const response = await fetch(url);

    return response.text();
}

document.addEventListener("DOMContentLoaded", function() {
  const $options = document.getElementById('options');
  const $code = document.getElementById('code');
  const $output = document.getElementById('output');

  const $getcss = document.getElementById('getcss');
  const $getuserjs = document.getElementById('getuserjs');

  let theme = 1;
  const $customthemecol = document.getElementById('customthemecolor');
  const $customthemecolors = [
      document.getElementById('primarycolor'),
      document.getElementById('secundarycolor')
  ]

  $customthemecolors[0].value = "#4d97ff";
  $customthemecolors[1].value = "#ff8c1a";


  const $selecthead = document.getElementsByClassName('select-head');
  for (var i = 0; i < $selecthead.length; i++) {
    $selecthead[i].addEventListener('click', function() {
      this.classList.toggle('open');
    });
  }
  const $selectoptions = document.getElementsByClassName('select-option');
  for (var i = 0; i < $selectoptions.length; i++) {
    $selectoptions[i].addEventListener('click', function() {
      this.parentElement.previousElementSibling.innerHTML = this.innerHTML;
      theme = this.index();
      this.parentElement.previousElementSibling.classList.toggle('open');
    });
  }

  let $colorpickers = document.getElementsByClassName('colorinput')
  let colorpickers = [];
  for (var i = 0; i < $colorpickers.length; i++) colorpickers.push(new CP($colorpickers[i], {color: 'HEX'}));

  for (var i = 0; i < $colorpickers.length; i++) {
    $colorpickers[i].addEventListener('click', function(e) {
      e.preventDefault();
    }, false);
    colorpickers[i].on('change', function(r, g, b) {
      this.source.value = this.color(r, g, b, 1);
      let $cHex = document.getElementsByClassName('color-picker:hex');
      if ($cHex.length > 0) $cHex[0].firstChild.value = this.source.value;
      this.source.style.background = this.source.value;
    });
  }

  $customthemecol.addEventListener('click', function() {
    this.checked ? this.nextElementSibling.classList.add('open') : this.nextElementSibling.classList.remove('open');
  });
  $customthemecol.checked ? $customthemecol.nextElementSibling.classList.add('open') : $customthemecol.nextElementSibling.classList.remove('open');

  $getuserjs.addEventListener('click', async function() {
    let final = `// ==UserScript==
// @name          Dark Scratch Editor
// @namespace     https://thiibo.github.io
// @description   Want to code with Scratch, but the editor is too bright? This style applies a dark theme to the online Scratch (3) editor so you can code in peace.
// @author        Thiibo
// @homepage      https://thiibo.github.io/dark-scratch-editor/
// @include       /^((https?:\\/\\/)?scratch\\.mit\\.edu\\/projects\\/(\\d*\\/)?(editor|fullscreen).*)$/
// @run-at        document-start
// @version       ` + VERSION + `
// ==/UserScript==

// --- DARK SCRATCH EDITOR USERJS ---
// Author: Thiibo
// Version: ` + VERSION + `
// Website: https://thiibo.github.io/
// Generated using: https://thiibo.github.io/dark-scratch-editor
// License: CC BY 3.0 - Creative Commons Attribution

(function() {var css = "";
    if (false || (new RegExp("^((https?:\\/\\/)?scratch\\.mit\\.edu\\/projects\\/(\\d*\\/)?(editor|fullscreen).*)$")).test(document.location.href))
    	css += [
    `
    // --- FETCH CSS ---
    let themelink;
    switch (theme) {
      case 0:
        themelink = "./themes/classic.css"
        break;
      case 1:
        themelink = "./themes/seablue.css"
        break;
      case 2:
        themelink = "./themes/deepblack.css"
        break;
      default:
        themelink = "./themes/classic.css"
    }
    let themecss = await getData(themelink);
    console.log($customthemecolors[0].style.backgroundColor)
    themecss = themecss.replace("%s", $customthemecolors[0].style.backgroundColor).replace("%s", $customthemecolors[1].style.backgroundColor);
    let style = await getData("./userstyle.css");
    style = style.replace(/\"/g, '\\"').split(/\r?\n/);
    final += "\"" + themecss.replace(/\"/g, '\\"').replace(/\r?\n/g, '",\n"');
    final = final.substring(0, final.length - 1);
    let customcolorscss;
    if ($customthemecol.checked) {
      customcolorscss = await getData("./customcolors.css");
      customcolorscss = customcolorscss.replace(/\"/g, '\\"').replace(/\r?\n/g, '",\n"');
    } else {
      customcolorscss = ["// Custom theme colors disabled"];
    }

    for (var i = 0; i < style.length; i++) final += '"' + style[i].replace("%s", customcolorscss) + '"' + (i < style.length - 1 ? ',\n' : '');

    final += `].join("\\n");
if (typeof GM_addStyle != "undefined") {
  GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
  PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
  addStyle(css);
} else {
  var node = document.createElement("style");
  node.type = "text/css";
  node.appendChild(document.createTextNode(css));
  var heads = document.getElementsByTagName("head");
if (heads.length > 0) {
  heads[0].appendChild(node);
} else {
  // no head yet, stick it whereever
  document.documentElement.appendChild(node);
}
}
})();`

    console.log(final);
    $code.firstElementChild.value = final;
    // Show output
    $options.style.display = "none";
    $code.style.display = "block";
  });
  $code.getElementsByClassName('return')[0].addEventListener('click', function() {
    $code.style.display = "none";
    $options.style.display = "block";
  });
  $code.getElementsByClassName('copy')[0].addEventListener('click', function() {
    $output.select();
    $output.setSelectionRange(0, 99999);
    document.execCommand("copy");
  });
  $getcss.addEventListener('click', async function() {
    let final = `@-moz-document regexp("^((https?:\\/\\/)?scratch\\.mit\\.edu\\/projects\\/(\\d*\\/)?(editor|fullscreen).*)$")
{
/* --- DARK SCRATCH EDITOR USERSTYLE ---
Author: Thiibo
Version: ` + VERSION + `
Website: https://thiibo.github.io/
Generated using: https://thiibo.github.io/dark-scratch-editor
License: CC BY 3.0 - Creative Commons Attribution */

`;
    // --- FETCH CSS ---
    let themelink;
    switch (theme) {
      case 0:
        themelink = "./themes/classic.css"
        break;
      case 1:
        themelink = "./themes/seablue.css"
        break;
      case 2:
        themelink = "./themes/deepblack.css"
        break;
      default:
        themelink = "./themes/classic.css"
    }
    let themecss = await getData(themelink);
    themecss = themecss.replace("%s", $customthemecolors[0].style.backgroundColor).replace("%s", $customthemecolors[1].style.backgroundColor);
    let style = await getData("./userstyle.css");
    style = style.split(/\r?\n/);
    final += themecss;
    let customcolorscss;
    if ($customthemecol.checked) {
      customcolorscss = await getData("./customcolors.css");
    } else {
      customcolorscss = ["// Custom theme colors disabled"];
    }

    for (var i = 0; i < style.length; i++) final += style[i].replace("%s", customcolorscss) + (i < style.length - 1 ? '\n' : '');
    final += "}"
    $code.firstElementChild.value = final;
    // Show output
    $options.style.display = "none";
    $code.style.display = "block";
  });
});

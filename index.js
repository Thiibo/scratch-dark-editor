Element.prototype.index = function() {
  let i = 0;
  while (this.parentNode.children[i] != this) i++;
  return i;
}

function open(text) {
  let a = document.createElement('a');
  a.href = 'data:text/javascript;charset=utf-8,' + encodeURIComponent(text);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  delete a;
}

const $install = document.getElementById('install');

let theme = 1;
const $customthemecol = document.getElementById('customthemecolor');
const $customethemecolors = [
    document.getElementById('primarycolor'),
    document.getElementById('secundarycolor')
]

document.addEventListener("DOMContentLoaded", function() {
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

  let $colorpickers = document.querySelectorAll('input[type="color"]');
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
    });
  }

  $customthemecol.addEventListener('click', function() {
    this.checked ? this.nextElementSibling.classList.add('open') : this.nextElementSibling.classList.remove('open');
  });
  $customthemecol.checked ? $customthemecol.nextElementSibling.classList.add('open') : $customthemecol.nextElementSibling.classList.remove('open');


  $install.addEventListener('click', function() {
    let final = `
    // ==UserScript==
    // @name          Dark Scratch Editor
    // @namespace     https://thiibo.github.io
    // @description   Want to code with Scratch, but the editor is too bright? This style applies a dark theme to the online Scratch (3) editor so you can code in peace.
    // @author        Thiibo
    // @homepage      https://thiibo.github.io/dark-scratch-editor/
    // @run-at        document-start
    // @version
    // ==/UserScript==
    (function() {var css = "";
    if (false || (new RegExp("^((https?:\\/\\/)?scratch\\.mit\\.edu\\/projects\\/(\\d*\\/)?(editor|fullscreen).*)$")).test(document.location.href))
    	css += [
    `
    // FETCH CSS
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
    let themecss;
    fetch(themelink)
    .then( response => response.text() )
    .then( text => themecss = text.split(/\r?\n/); );
    let style;
    fetch("./userstyle.css")
    .then( response => response.text() )
    .then( text => style = text.split(/\r?\n/); );
    let customcolorscss;
    if ($customthemecol.checked) {
      fetch("./customcolors.css")
      .then( response => response.text() )
      .then( text => customcolorscss = text.split(/\r?\n/); );
    } else {
      customcolorscss = "// Custom theme colors disabled";
    }

    let j = 0;
    for (var i = 0; i < themecss.length; i++) {
      if (themecss[i].trim() == '%s') {
        final += '"' + $customethemecolors[j].value + '",';
        j++;
      } else {
        final += '"' + themecss[i] + '",';
      }
    }


    for (var i = 0; i < style.length; i++) final += '"' + (style[i].trim() == '%s' ? customcolorscss : style[i]) + '"' + (i < style.length - 1 ? ',' : '');

    final += `].join("\n");
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
    open(final);
  });
});

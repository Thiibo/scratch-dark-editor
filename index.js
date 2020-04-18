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
    fetch(themelink)
    .then( response => response.text() )
    .then( text => console.log(text) )
    console.log(final);
    //open(final);
  });
});

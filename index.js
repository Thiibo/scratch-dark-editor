Element.prototype.index = function() {
  let i = 0;
  while (this.parentNode.children[i] != this) i++;
  return i;
}

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
  for (var i = 0; i < $colorpickers.length; i++) colorpickers.push(new CP($colorpickers[i]));

  for (var i = 0; i < $colorpickers.length; i++) {
    $colorpickers[i].addEventListener('click', function(e) {
      e.preventDefault();
    }, false);
    colorpickers[i].on('change', function(r, g, b) {
      this.source.value = this.color(r, g, b, 1);
    });
  }

  $customthemecol.addEventListener('click', function() {
    this.checked ? this.nextElementSibling.classList.add('open') : this.nextElementSibling.classList.remove('open');
  })
});

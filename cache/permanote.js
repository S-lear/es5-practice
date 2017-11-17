console.log('.......permanote.js')

var editor, statusline, savebutton, idletimer;
window.onload = function(){
  if(localStorage.note == null) localStorage.note = '';
  if(localStorage.lastModified == null) localStorage.lastModified = 0;
  if(localStorage.lastSaved == null) localStorage.lastSaved = 0;
  editor = document.getElementById('editor');
  statusline = document.getElementById('statusline');
  savebutton = document.getElementById('savebutton');
  editor.value = localStorage.note;
  editor.disabled = true;
  editor.addEventListener('input', function(e) {
    localStorage.note = editor.value;
    localStorage.lastModified = Date.now();
    if(idletimer) clearTimeout(idletimer);
    idletimer = setTimeout(save, 5000);
    savebutton.disabled = false;
  }, false)
  sync()
}

function async() {
  if(navigator.online){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/note')
    xhr.send();
    xhr.onload = function() {
      var remoteModTime = 0;
      if(xht.status == 200) {
        var remoteModTime = xhr.getResponseHeader('Last-Modified');
        remoteModTime = new Date(remoteModTime).getTime();
      }
      if(remoteModTime > localStorage.lastModified) {}
    }
  }
}
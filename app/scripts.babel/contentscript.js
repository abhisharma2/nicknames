'use strict';

// all variables
var n, obj, keys, text, xhr, json, regex;

//replacing matching names
function selector() {
  var e = document.querySelectorAll('body *');
  var r = [];
  var c;
  for(var i = 0; i < e.length; i++) {
    c = e[i].childNodes[0];
    if(e[i].hasChildNodes() && c.nodeType === 3) {
      r.push(c);
    }
  }
  return r;
}
n = selector();
function replace(rn, nn) {
  for (var i = 0, l = n.length; i<l; i++){
    var nv = n[i].nodeValue;
    n[i].nodeValue = nv.replace(rn,nn);
  }
}
// load data
json = chrome.extension.getURL('data/nicknames.json');
text = document.getElementsByTagName('body')[0].innerText;
xhr = new XMLHttpRequest();
xhr.open('GET', json, true);
xhr.onload = function () {
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      obj = JSON.parse(xhr.responseText);
      keys = Object.getOwnPropertyNames(obj);
      keys.forEach(function(name){
        regex = new RegExp(name, 'g');
        if (text.search(regex) !== -1) {
          replace(name, obj[name]);
        }
      });
    } else {
      console.error(xhr.statusText);
    }
  }
};
xhr.onerror = function () {
  console.error(xhr.statusText);
};
xhr.send(null);

// ==UserScript==
// // @name           SmugmugTest
// // @namespace      http://lukebaker.org/smugmug/admin-rating
// // @include        http://*.smugmug.com/*
// // ==/UserScript==
var scripts = [
    'http://lukebaker.org/smugmug/admin-rating.js',
];
body = document.getElementsByTagName('body')[0];
for (var i = 0; i < scripts.length; i++) {
    var newScript = document.createElement('script');
    newScript.type = "text/javascript";
    newScript.src = scripts[i];
    body.appendChild(newScript);
}

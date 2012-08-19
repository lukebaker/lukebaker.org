--- 
layout: post
title: Firefox Setup
wordpress_id: 13
wordpress_url: http://lukebaker.org/archives/2004/09/15/firefox-setup/
date: 2004-09-15 13:36:04 -04:00
---
After updating to <a href="http://getfirefox.com/">Firefox 1.0PR,</a> I re-tooled my <a href="http://www.spreadfirefox.com/?q=affiliates&amp;id=14194">Firefox</a> startup script.  The script accepts a URL and if there is no Firefox process running, it will start one and go to the URL that was the input.  If there already is a Firefox process running it will open the URL in a new tab in the already running Firefox window.  Previously, I used it every time I launched Firefox.  This is not necessary anymore, now it is only used when I click on links from other applications.  This is probably only useful for those using Linux.

I also had to change my <a href="http://texturizer.net/firefox/edit.html#css">userChrome.css</a> file so that I could change the width of my search-bar.  Unfortunately, the <a href="http://texturizer.net/firefox/tips.html#app_searchbarsize">directions</a> which I had previously used were old and didn't quite work.
<!--more-->
To change the width of the search bar, the following needs to be in you userChrome.css file:
<code>
/* Make the Search box flex wider
   (in this case 400 pixels wide) */
#search-container {
   -moz-box-flex: 400 !important;
}
#searchbar {
-moz-box-flex: 400 !important;
}
</code>

And here's my newly updated startup script:
<code>
#!/bin/bash
FF=/usr/local/firefox
url=$1
[ -z $url ] && url=about:blank
## Run Firebird remotely if there's an existing process running...
if [ -x $FF/firefox ] ; then
$FF/firefox -remote 'ping()'
if [ $? -eq 0 ]; then # Already running -> new-tab
$FF/firefox -remote "openURL($url,new-tab)" &
else
$FF/firefox $url &
fi
fi
</code>

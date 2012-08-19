--- 
layout: post
title: Persistent Persistent Searches
wordpress_id: 26
wordpress_url: http://lukebaker.org/archives/2005/05/25/persistent-persistent-searches/
date: 2005-05-25 14:24:04 -04:00
---
Introducing persistent searches in <a href="http://gmail.google.com/">Gmail</a> that are...persistent.  First off, props to <a href="http://persistent.info/">Mihai Parparita</a> who did all the hard work for <a href="http://persistent.info/archives/2005/03/01/gmail-searches">adding persistent searches to Gmail.</a>  I've added to Mihai's script, so that the saved searches are stored in a special Gmail contact.  Previously they were stored in a cookie.  The advantages are two fold:
<ol>
	<li>You can access your saved searches (and only yours) from any computer as long as your <a href="http://getfirefox.com/">browser</a> has this script installed.</li>
	<li>Multiple people can use the same computer and browser while their saved searches remain separate and distinct from the other person's.</li>
</ol>
<strong>Installation Instructions:</strong>
<ul>
	<li>Install <a href="http://greasemonkey.mozdev.org/">Greasemonkey</a> (only works with <a href="http://getfirefox.com/">Firefox</a>).</li>
	<li>Open up <a href="/upload/powergmail.user.js">this user script</a> (in Firefox).</li>
	<li>From the "Tools" menu, select "Install User Script.." and confirm all of the various prompts.</li>
	<li>Logout of Gmail and log back in.</li>
</ul>
FWIW, I hope to eventually add a few more unrelated features to Gmail via this script.  For an overview of how my modifications work see my post on <a href="http://lukebaker.org/archives/2005/05/25/cookies-and-contacts/">Cookies and Contacts</a>.

<strong>Update:</strong> Gmail apparently changed a few things in their code this evening.  I've updated one of the regex's to work with this change.  If you see that your saved searches aren't being saved or restored properly, you'll want to reinstall <a href="/upload/powergmail.user.js">the script.</a>

<strong>Update (December 1, 2005):</strong> The script has been updated to work with <a href="http://getfirefox.com/">Firefox 1.5</a> and <a href="http://greaseblog.blogspot.com/2005/11/greasemonkey-064_30.html">Greasemonkey 0.6.4.</a>

--- 
layout: post
title: Gmail Changes Breaking Stuff
wordpress_id: 31
wordpress_url: http://lukebaker.org/archives/2005/06/21/gmail-changes-breaking-stuff/
date: 2005-06-21 17:56:25 -04:00
---
Google decided to change the domain and URL syntax of Gmail:
<ol>
	<li>gmail.google.com redirects to mail.google.com</li>
	<li>instead of URLs like /gmail?param they look like /mail/?param</li>
</ol>
<a href="/upload/powergmail.user.js">My persistent searches script</a> has been updated to work with these changes. I would recommend uninstalling the original script and then installing the updated version.

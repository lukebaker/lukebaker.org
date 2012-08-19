--- 
layout: post
title: SmugMug Tweaks
wordpress_id: 77
wordpress_url: http://lukebaker.org/archives/2007/12/17/smugmug-tweaks/
date: 2007-12-17 13:02:02 -05:00
---
<img src="/upload/screenshot7.png" alt="SmugMug Admin Rating Sample" align="right" />

Lately, I've been working on some <a href="http://www.smugmug.com/">SmugMug</a> tweaks to take advantage of their <a href="http://blogs.smugmug.com/don/2007/04/20/lifetime-free-pro-accounts-to-developers/">offer of a free lifetime account for developers who use their API</a>.  The first one was a quick hack which uploads some recent SmugMug photos to your <a href="http://flickr.com/">Flickr</a> account.  This allows people who switched to SmugMug to still keep up with their Flickr network.  More information is available on the <a href="/projects/smugmug-tweaks/smugmug-upload-recent-to-flickr/">project's page</a>.
<p align="left">The second and more interesting one is some JavaScript that adds the ability for SmugMug users to rate their own photos.  This is the first of two projects to aid my work flow.  Eventually I want to be able to upload a bunch of photos in a private album, rate them, and then in one fell swoop move all photos with a rating higher than X to a public album.</p>
I provide two installation options which both pull the script from my server and inject it into the pages.  This should allow for invisible upgrades.  Savvy or cautious users can install it other ways.

Another interesting aspect of this project is its integration with SmugMug's API.   First, we're using the API on SmugMug's own site.  This isn't the typical use case of a photo site's API.  Secondly, the script gets proper API authorization behind the scenes, without asking the user for any information.  Provided that the user is already logged in to SmugMug's site, then my script gains that user's credentials when interacting with API.  This is not evident in the API docs and requires a bit of a hack.

Any users should be aware of security concerns whenever external JavaScript is inserted into your page.  Protect yourself as you see fit.

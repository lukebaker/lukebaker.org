--- 
layout: post
title: "Nutch patch #1"
wordpress_id: 11
wordpress_url: http://lukebaker.org/archives/2004/09/06/nutch-patch-1/
date: 2004-09-06 17:09:10 -04:00
---
At <a href="http://www.gospelcom.net/">work</a> I was told to investigate other options for a search engine that would search just the sites that we host.  While I was doing that I came across <a href="http://www.nutch.org/">Nutch.</a>  It looked pretty sweet but not quite something that would fit our current needs.  We needed a few more features.  Currently at work we're looking at a <a href="http://www.google.com/appliance/">Google Search Appliance.</a>  It costs a pretty penny, but would be nice because hopefully that would be something we could just <a href="http://www.ronco.com/products/rotisserie_std.di4?productID=1">"set it and forget it."</a>

Lately in my spare time, I've started trying to add the features to Nutch that would allow us to use it.  It's fun.  I recently <a href="http://sourceforge.net/mailarchive/forum.php?thread_id=5515493&forum_id=13068">submitted</a> my first <a href="/upload/RegexUrlNormalizer.patch">patch</a> to the Nutch developers list.  Hopefully I did everything well enough to get it commited to CVS.  This patch allows users to specify Perl 5 regular expressions, which will get applied to all URLs that Nutch encounters.  It's useful for stuff like stripping out session IDs in URLs.

I've got a few more features that need to be added.  I found another drawback to the way the crawler for Nutch was written.  You can specify any number of threads to be running at the same time.  However, currently it won't allow two different threads to download from the same IP simultaneously.  This is not good considering all of our websites look to the crawler as just 1 IP.  I'll probably have to make some changes there.  Hopefully it'll be relatively straightforward and easy.

<em>Cool use of Nutch: <a href="http://creativecommons.org/weblog/entry/4388">Creative Commons Search</a> (via: <a href="http://www.nutch.org/blog/2004_09_01_cutting_archive.html">Doug</a>)</em>

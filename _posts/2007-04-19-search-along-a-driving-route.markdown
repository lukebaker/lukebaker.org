--- 
layout: post
title: Search Along A Driving Route
wordpress_id: 63
wordpress_url: http://lukebaker.org/archives/2007/04/19/search-along-a-driving-route/
date: 2007-04-19 15:23:14 -04:00
---
I recently went on a 3000 mile road trip, and as I was preparing for the trip, I wanted to know the answer to questions like "Where are all the Speedway gas stations that are within a mile of my route?".  I couldn't find anything that would allow me to search for businesses near a given driving route, instead I could only search for things near a given point or city.  I decided to build a mashup using Yahoo! Pipes and Google Maps that would allow me to do just what I wanted.

<strong>How to use it:</strong>
<ol>
	<li>Install the <a href="javascript:location.href='http://lukebaker.org/search-route/gm.php?v=0.1&url='+encodeURIComponent(document.getElementById('link').href)">search-route</a> bookmarklet.</li>
	<li>Go to <a href="http://maps.google.com/">Google Maps</a> and create route.</li>
	<li>Click the search-route bookmarklet you installed in step #1.</li>
	<li>Search!</li>
</ol>

If you don't want to bother installing the bookmarklet and want to try out the searching, you can test <a href="http://lukebaker.org/search-route/gm.php?id=4b3a3039001b32ff9d9ca05a00b786a7">a local driving route</a> or <a href="http://lukebaker.org/search-route/gm.php?id=feac388d1fb95d0ab262b87cbf1263ec">a long distance driving route.</a>

<strong>How it Works:</strong>

After the user creates the route on Google Maps, clicking the bookmarklet sends the URL of their Google Maps page to a script on my site.  This script will download the URL from Google Maps and parse out the encoded route in that page.  Once we have this, we can give the user a search page with their route and map using Google Maps' API.  When the user searches, we call a Yahoo! Pipe which is passed the search parameters and a special id referencing this user's route.  The Yahoo! Pipe will download a specially crafted Atom feed for this route from my server.  This Atom feed contains a list of <em>some</em> of the latitude and longitude points of the route.  The Yahoo! Pipe then does a Yahoo! Local search on each point using the search parameters the user specified.  Searches on particularly long routes can take several seconds to complete.

--- 
layout: post
title: How to stop an Ajax DDOS
wordpress_id: 56
wordpress_url: http://lukebaker.org/archives/2006/03/06/how-to-stop-an-ajax-ddos/
date: 2006-03-06 22:23:46 -05:00
---
The real title should be "How to stop a Javascript or Flash distributed denial of service attack", but that's way too long of a title.  As nifty client-side browser tricks are being propogated to the masses, they are also causing a few problems along the way.

Say you're writting a Javascript or Flash enabled web application that has the browser send off HTTP requests occasionally.  What can you do when a bug in your application causes clients to send a constant stream of HTTP requests to your poor server?

I recently ran into this type of problem and had to figure out how keep our servers from being overloaded by a number of clients that were sending a constant stream of requests to our servers.  Lucky for us, the URLs that were being requested by these "rogue" clients were easily distinguished from "valid" requests.

The first step is finding some way to intercept the requests and do something different with just those requests.  For my case, these rogue requests were all being handled by a 404 page, which was a PHP script.  My first idea was to delay the response sent to these rouge clients, by just adding a sleep of a few minutes to this PHP page.  This worked as advertised since the rouge clients were waiting until the each request was completed before sending another request, but I was still looking for something a bit better.

My second idea was to try altering the response for these requests to be a <a title="HTTP/1.1 Status Code Definitions" href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.3.2">'301 Moved Permanently'</a> response instead of a <a title="HTTP/1.1 Status Code Definitions" href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5">'404 Not Found'</a>.  My hope was that if I specified a location of say 'http://localhost/' that all subsequent requests destined for these rouge URLs would instead be sent to the localhost, thereby no longer bothering our servers with these silly requests.  Unfortunately, this didn't seem to work for me in my tests.

My final and satisfactory solution was to send some special cache headers in response to these rogue requests.  I added a few lines found in an <a href="http://www.php.net/header#61883">example in the ever useful PHP documentation.</a>  These lines told the Flash script to cache the URL they just requested for 30 days.  Subsequent requests for these URLs were just looked up in the local cache by the Flash script, stopping the steady stream of requests sent to our servers for these worthless URLs.  Success!

--- 
layout: post
title: Google Talk
wordpress_id: 15
wordpress_url: http://lukebaker.org/archives/2004/10/13/google-talk/
date: 2004-10-13 16:43:43 -04:00
---
I went to visit <a href="http://www.definingterms.com/">Adam</a> yesterday at <a href="http://umich.edu">umich</a> to go to a Google Seminar by a googler.  It was fun and interesting.  A bunch of the information was similar to a <a href="http://www.uwtv.org/programs/displayevent.asp?rid=1680">talk given by a different googler a couple years ago.</a>  I think the most notable new subject discussed was a technology Google employs to easily develop and run programs that analyze their huge stores of data.  It was called MapReduce, I think.  It sounded pretty slick.  Along with this he talked more about how Google manages these types of jobs and how it interacts closely with <a href="http://www.cs.rochester.edu/sosp2003/papers/p125-ghemawat.pdf">Google File System.</a>  

This MapReduce stuff allowed them to write simpler programs that would compute stuff over their entire dataset without worrying about stuff dying along the way.  He showed some sample C++ code of a MapReduce program of maybe 20 lines that would sum up the number of links Google indexed per domain.  I believe based on the numbers he mentioned that would have taken less than 20 minutes.  Crazy talk!  Maybe I'll try to describe this a bit more in a different post.  I'm not sure I remember everything exactly.

It was some good stuff.   My favorite quote was when he said how early on in Google's history, "We got really good at moving out of bankrupt data centers."  This is in regards to them putting 88(?) servers per rack and squeezing them in tight, which hurt the data centers who at that time charged per square feet (I think for stuff like power and cooling and not network usage).

This talk kind of renewed my thought that really there should be a good, open source implmentation of a Google File System type thinger.  It seems GFS has some optimizations that would limit its applications.  However, I wonder if we could sacrafice some of these optimizations to make it more flexible, but yet still maintain something that is worthwhile.  Maybe sometime I'll get around to solidfying some thoughts on this and how it should work and what features it should have.

<strong>Update:</strong> <a href="http://labs.google.com/papers/mapreduce.html">MapReduce</a>
<strong>Update 2: </strong> Looks like a very similar <a href="http://norfolk.cs.washington.edu/htbin-post/unrestricted/colloq/details.cgi?id=274">talk</a> given by someone else (Jeff Dean).

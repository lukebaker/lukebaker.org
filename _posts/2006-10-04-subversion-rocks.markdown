--- 
layout: post
title: Subversion Rocks
wordpress_id: 57
wordpress_url: http://lukebaker.org/archives/2006/10/04/subversion-rocks/
date: 2006-10-04 09:33:32 -04:00
---
I&#39;ve been using <a href="http://en.wikipedia.org/wiki/Subversion">Subversion</a> for a project I recently started at work.  The project is a web application in PHP.  Having enjoyed using <a href="http://www.rubyonrails.org/">Ruby on Rails</a> on a different project, I wanted to setup a simple framework that borrows some ideas from Rails, like <a href="http://en.wikipedia.org/wiki/Model-view-controller">MVC</a>, a test infrastructure, and a general directory layout that makes sense.  I want this framework to be reusable for other projects, but I also want to be able to make changes to the framework from within the individual projects that use it and then port those changes over to my vanilla framework.  Here&#39;s where Subversion comes into action.

FWIW, the process I use here is pretty much the same process you&#39;d use for <a href="http://svnbook.red-bean.com/nightly/en/svn.branchmerge.html">branches</a>.  Pretend I have the framework at /php_framework in Subversion.  To start a new project using the framework, I issue the following command:
<blockquote>svn copy svn+ssh://svn_server/php_framework \
snv+ssh://svn_server/new_project -m &quot;Creating new_project&quot;</blockquote>
Then I can check out a copy of /new_project and work on it as I please.  If I end up making a change to things that belong in the framework, I&#39;ll want to port those changes back into the framework.  For simplicity, in most cases I&#39;ll want all the changes that affect the framework to be in a changeset of their own.  This way a particular revision will contain only changes to the framework and not any changes to the application itself.  If I go this route, I can port the changes with the following commands:
<blockquote>svn checkout svn+ssh://svn_server/php_framework
svn merge -r 135:136 svn+ssh://svn_server/new_project \
php_framework/
svn commit php_framework/ -m &#39;ported r136 from new_project&#39;</blockquote>
The first command gets a working copy of the framework.  The merge command takes the diff between revision 135 and 136 of /new_project and applies it to the php_framework directory.  Then we commit the changes to the framework.

If this revision has some changes to files that don&#39;t belong in the framework, we can specify the file(s) that changed that we want ported to the framework in the merge statement like the following:
<blockquote>svn merge -r 135:136 \
svn+ssh://svn_server/new_project/blah/somefile.php \
php_framework/blah/somefile.php</blockquote>
I was pleased with how simple this process turned out to be.  For more information, the <a href="http://svnbook.red-bean.com/">Subversion book is online</a>.

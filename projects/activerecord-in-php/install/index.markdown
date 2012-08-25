---
layout: post
---
<div class="alert">
    This page has been moved here: <a href="{{site.url}}/activerecord-php">{{site.url}}/activerecord-php</a>
</div>
## ActiveRecord In PHP
<ul class="breadcrumb">
  <li><a href="/projects/activerecord-in-php/documentation/">Documentation</a> <span class="divider">|</span></li>
  <li><a href="/projects/activerecord-in-php/example/">Example</a> <span class="divider">|</span></li>
  <li class="active">Install</li>
</ul>
**Installation Steps**

1.  Create your database and tables, if you haven’t already. (remember
    use Rails’ conventions for table and column names)
2.  Download [recent ActiveRecord release][] or

        svn co http://lukebaker.org/svn/repos/activerecord/trunk/ activerecord

3.  Untar into a models/ directory within your project or move checked
    out directory activerecord/ into your models/ directory.
4.  There should now be a models/activerecord/ directory, edit
    models/activerecord/config.php to your liking.
5.  Run models/activerecord/generate.php
6.  This should have have generated model stubs inside your models/
    directory. Edit these model files to tell ActiveRecord about the
    relationships between tables. Do not edit \*Base.php files as they
    get overwritten every time you run generate.php
7.  Use ActiveRecord, by including the models that you want to use:

        require_once ‘models/Post.php’;

  [recent ActiveRecord release]: http://lukebaker.org/svn/repos/activerecord/releases/

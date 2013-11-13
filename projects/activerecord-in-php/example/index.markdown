---
layout: post
---
<div class="alert">
    This page has been moved here: <a href="http://code.lukebaker.org/activerecord-php">http://code.lukebaker.org/activerecord-php</a>
</div>
## ActiveRecord In PHP
<ul class="breadcrumb">
  <li><a href="/projects/activerecord-in-php/documentation/">Documentation</a> <span class="divider">|</span></li>
  <li class="active">Example <span class="divider">|</span></li>
  <li><a href="/projects/activerecord-in-php/install/">Install</a></li>
</ul>
**Create**

{% highlight php %}
$p = new Post(array('title' => 'First Post!11!', 'body' => 'This is the body of my post'));
$p->save(); # saves this post to the table
 
$p2 = new Post();
$p2->title = "Second Post";
$p2->body = "This is the body of the second post";
$p2->save(); # save yet another post to the db
{% endhighlight %}

**Retrieve**

{% highlight php %}
$p = Post::find(1); # finds the post with an id = 1
$p->title; # title of this post
$p->body;  # body of this post
 
# returns the 10 most recent posts in an array, assuming you have a column called "timestamp"
$posts = Post::find('all', array('order' => 'timestamp DESC', 'limit' => 10));
{% endhighlight %}

**Update**

{% highlight php %}
$p = Post::find(1);
$p->title = "Some new title";
$p->save(); # saves the change to the post
 
# alternatively, the following is useful when a form submits an array
$_POST['post'] = array('title' => 'New Title', 'body' => 'New body here!');
$p = Post::find(1);
$p->update_attributes($_POST['post']); # saves the object with these attributes updated
{% endhighlight %}

**Destroy**

{% highlight php %}
$p = Post::find(1);
$p->destroy();
{% endhighlight %}

**Relationships**

{% highlight php %}
$p = Post::find(1);
# call to $p->comments results in query to get all comments for this post
# a subsequent call to $p->comments would not result in a query, but use results from previous query
foreach ($p->comments as $comment) {
  echo $comment->content;
}
{% endhighlight %}

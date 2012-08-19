--- 
layout: post
title: PHP and Named Parameters
wordpress_id: 61
wordpress_url: http://lukebaker.org/archives/2007/03/01/php-and-named-parameters/
date: 2007-03-01 20:51:11 -05:00
---
Since working with Ruby on Rails, I've become much more conscious about how my code looks.  Occasionally, when working with PHP there are things that are a part of the language that tend to make my code look ugly or just not very clear and succinct.

One such case is when defining arrays, particularly nested associative arrays.  PHP makes working with arrays fairly handy, however I always shudder when I have to create / populate an array explicitly.  Some of the code I'm working with lately uses associative arrays as a way to have named parameters in PHP.  Here's some example code that uses associative arrays in this way:
{% highlight php %}
$p1 = new Person('Luke Baker', 
     array('home_phone' => '555-5555', 'cell_phone' => '555-5551'));
$p2 = new Person('John Doe', 
     array('cell_phone' => '555-5531', 'email' => 'john@doe.com');
{% endhighlight %}

Named parameters let us accept lots of different types of information, without splitting them up into individual parameters and having to remember which order the parameters are in.  I can handle home_phone, cell_phone, and email in the person constructor and the call to the constructor doesn't have to worry about the order of parameters or filling in null values for information it doesn't have.

The above example doesn't look too ugly, but we also aren't stretching the named parameters very much.  Here's a slightly messier example:
{% highlight php %}
$p3 = new Person("John Calvin", array('dates' => array('birth' => 'July 10, 1509', 'death' => 'May 27, 1564')));
{% endhighlight %}

We could break it into different lines, which doesn't look too shabby:
{% highlight php %}
$p3 = new Person("John Calvin", array(
    'dates' => array(
        'birth' => 'July 10, 1509',
        'death' => 'May 27, 1564'
    )));
{% endhighlight %}

Another option, might be to use <a href="http://json.org/">JSON</a> to represent that associative array.  We could have our constructor decode the second parameter from JSON if it looks like it might be JSON.  Once it is decoded, we're back to an array representation in PHP, which is what we started with.  In other words, we can easily allow our constructor to accept either JSON or an array as the second parameter.  Then we could write the call the to constructor as follows:
{% highlight php %}
$p3 = new Person("John Calvin",
    '{"dates" : {"birth" : "July 10, 1509", "death" : "May 27, 1564"}}');
{% endhighlight %}

Maybe I'm silly, but I like the look of the JSON example a bit better.  I certainly won't be using JSON everywhere I declare arrays, but here and there I find it useful.  What do you think, is it worthwhile to support JSON in this way?

--- 
layout: post
title: The static keyword in PHP5
wordpress_id: 59
wordpress_url: http://lukebaker.org/archives/2007/02/11/the-static-keyword-in-php5/
date: 2007-02-11 22:01:44 -05:00
---
With PHP5, PHP introduced some more robust object oriented capabilities to the language.  I've been diving into this quite a bit lately and learning a lot.  I figured all the stuff I discovered about the static keyword would be enough fodder for a post.  Most of this information can probably be gleamed <a href="http://www.php.net/manual/en/language.oop5.static.php">straight from the docs</a>, but I for one didn't really soak up the denseness of the documentation my first few times around.

<strong>Static Members</strong>

What isn't immediately obvious, is that static members are shared among all the instances of the class that has the static member.  In other words, it is like a global variable for that class and instances of that class.  While you can't access a static member directly from an instantiation of the class, you can create methods that access or manipulate the static member.  Time for a quick example.

{% highlight php %}
class Foo {
  static $var = 0;
  function increment() { self::$var++; }
  function get() { return self::$var; }
}

$f1 = new Foo();
$f1->get();  // returns 0
Foo::$var; // returns 0
$f1->increment();
$f2 = new Foo();
$f2->get();  // returns 1
$f2->increment();
$f1->get();  // returns 2
Foo::$var; // returns 2
{% endhighlight %}

Now, the other interesting find is that the static member is global not only to that class and instances of that class, but also all sub-classes and instances of those sub-classes.  You can prevent this propagation down inheritance tree, by declaring the static member as private or by redeclaring that static member inside the sub-classes, as well as the methods that work on the static method.

{% highlight php %}
class Foo {
  static $var = 0;
  function increment() { self::$var++; }
  function get() { return self::$var; }
}
class Bar extends Foo { }
Foo::$var++;
Bar::$var;  // returns 1
{% endhighlight %}

<strong>Static Methods</strong>

The main area that I got hung up with static methods was using inherited static method calls.  For the work I was doing, I wanted to be able to call a static method and within the static method know which class this method was called on.  Unfortunately, everything I tried didn't work.

{% highlight php %}
class Foo {
  static function get_my_class() { return get_class(); }
  function get_my_class2() { return get_class($this); }
}
class Bar extends Foo {}
Bar::get_my_class();  // returns 'Foo'
$b = new Bar();
$b->get_my_class2();  // returns 'Bar'
{% endhighlight %}

It turns out that static methods belong to the class in which they're defined and they have no clue where they got called from.  Similarly, the same idea can be applied when thinking about static members.  The class that has the actual code, determines what variable is affected.  Consider one last example:

{% highlight php %}
class Foo {
  static $var = 0;
  function increment() { self::$var++; }
  function get() { return self::$var; }
}
class Bar extends Foo {
  static $var = 23;
  function increment() { self::$var++; }
}
$f = new Foo();
$b = new Bar();
$b->get(); // returns 0 (Foo)
$b->increment();  // increment Bar's $var
Bar::$var; // returns 24 (Bar)
$b->get(); // returns 0
{% endhighlight %}

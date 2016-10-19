---
layout: page
technologies: [PHP, JavaScript, Backbone.js, jQuery, CodeIgniter, HTML, CSS, MySQL]
---
# Bible Search

[![screenshot of Bible Search](/assets/images/bible-search.png)](/assets/images/bible-search.png)

## About the project

[Bible Search](http://bibles.org/) is a project of [American Bible Society](http://www.americanbible.org/) that provides access to over 1,000 Bible translations online. Users can browse, read, search, and create their own notes and tags.

## My role

In order to offer a richer user experience, we kicked off a project with the goal of revamping the interface to lean more heavily on JavaScript to power the interface. I worked closely with another developer to plan the architecture for these changes as well as the implementation. We chose [Backbone.js](http://backbonejs.org/) to be a key component in these changes. At the time, in early 2011, Backbone.js was only a few months old and one of the better options that we had available.

We were keen to support users and search engines that did not support JavaScript. However, we did limit that support to the core components of the site: browsing, reading, and searching. Users without JavaScript would not have the ability to create notes and tags. As such, the initial page load would be rendered on the server via the CodeIgniter application and the Backbone.js application would take as the page load completed.

I implemented the interface for the note and tag creation portions of the site using Backbone.js. As part of this work, I also had to add the appropriate API calls to the CodeIgniter application that would allow the Backbone.js components to create, update, and remove notes and tags on the server.

As part of this user experience update, there were a couple feature additions to the passage reading area. The first was infinite scrolling of the passage. As the user would near the end of the chapters that were currently loaded, the Backbone.js application would fetch another batch of chapters and append them to the view. Secondly, I worked on adding synced scrolling when viewing two separate translations side-by-side. When the user would scroll one of the translations, the synced scrolling feature would ensure that the other translation in the separate viewing area would also scroll to a similar location in the Bible. This proved to be an interesting challenge in processing and triggering scroll events.

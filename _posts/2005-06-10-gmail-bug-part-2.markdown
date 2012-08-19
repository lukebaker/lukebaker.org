--- 
layout: post
title: Gmail Bug Part 2
wordpress_id: 30
wordpress_url: http://lukebaker.org/archives/2005/06/10/gmail-bug-part-2/
date: 2005-06-10 11:06:56 -04:00
---
It appears that the issue is that behind the scenes (or at least relating to search and filters), labels apply to individual messages. Apparently when a filter is set to add a label, it will add that label to the message, and not to the conversation that the message is a part of. This is the only way that different messages in the same conversation may be labeled differently. Every other interface that Gmail provides to the label functionality relates to conversations, not messages. This turns out to be annoying. :-/

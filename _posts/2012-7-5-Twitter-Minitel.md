---
layout: post
title: My Twitter timeline on a Minitel
---

A few months ago, I hacked a Twitter client to read my timeline on a vintage Minitel.<!--more-->

It’s fairly easy to do. The Minitel modem is bypassed by an Arduino that connect, via ethernet, to a Java based proxy running on the network. This proxy does all the heavy-lifting, i.e. it connects to Twitter using Twitter4J, it gets the timeline, it filters out a lot of stuff (eg. don’t try to use unicode on a Minitel!).

Here’s the result…

<iframe src="https://player.vimeo.com/video/29616755" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
<p><a href="https://vimeo.com/29616755">My Twitter Timeline on a 1980 Minitel</a> from <a href="https://vimeo.com/user2058566">David Delabassee</a> on <a href="https://vimeo.com">Vimeo</a>.</p>

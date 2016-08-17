---
layout: default
title: Computational Neuroscience Journal Club
permalink: /journalclub/
---
### Computational Journal Club

As the tools in experiments neuroscience are rapidly developing, this is an important time to consider the broad trends and aims of the computational/theoretical works that are born alongside them.  Our aim is to present and discuss papers that reflect these modern directions so that we may better understand how our own work fits into a global neuroscience picture. Some themes and topics that we hope to cover are:

* computational models of neural systems
* novel analysis tools for understanding neural recordings
* recent advances in theoretical neuroscience
* popular theories in neuroscience

Journal club meetings take place on Tuesdays at 1pm in the Life Sciences Building, room LSB 575

## Join the club [here](mailto:david.hocker@stonybrook.edu)!

# Schedule
August 23: David Hocker

August 30: Luca Mazzucato

September 6: Gregory Kirschen

September 13: Luisa Le Donne

September 20: Jonathan Beck

September 27: Giancarlo La Camera

October 4: Yuan Zhao

October 11: Gulce Nazli Dikecligil 

October 18: Sriram Ganeshan

October 25: Jin Wang

November 1: Shaohua Wang


# Papers

<div class="posts">
  {% for post in site.posts %}
	{% if post.categories contains 'journalclub' %}
    <article class="post">
	<h3> {{post.olddate}} </h3>
      <h3><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></h3>


    </article>
	{% endif %}
  {% endfor %}
</div>






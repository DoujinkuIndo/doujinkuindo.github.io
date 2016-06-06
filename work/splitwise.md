---
layout: default
title: Work - Splitwise Redesign
permalink: /work/splitwise/
---
<section class="card">

  <h1>Splitwise Redesign</h1>

  <figure>
    <img src="/images/splitwise-users.jpg" alt="Splitwise Users Adding a Bill">
  </figure>

  <p class="readable"><strong>Prompt: </strong>Choose an existing iOS or Android mobile experience you feel can be improved, and propose a new direction for it.</p>

  <p class="readable"><strong>The Problem: </strong>Splitwise for Android has awesome functionality but it's obscured behind an outdated UI and not so friendly UX.</p>

  <p class="readable"><strong>The Solution: </strong>The app's functionality isn’t perfect but it works. Success can be achieved by adding a layer of clarity to make the experience easier and more pleasant to use. Much of the UI has been updated to reflect the experience. It's been simplified and made to something more familiar, <a href="https://www.google.com/design/spec/material-design/introduction.html">Google's Material Design</a>. I focused on keeping priority content easily visible and accessible.</p>

  <p class="readable annotation">* It’s worth noting that I did not do a full analysis of the Splitwise Android app. I have limited my focus to the home page, slide-out navigation menu, and the add bill page as these are the most frequently used parts of the app.</p>

  <h3>Identifying Problems & Brainstorming</h3>
  <p class="readable">The home page needed work. Since this is where users land, we want them to know exactly what actions are available and what they do/mean (provide context).</p>

  <p class="readable">Splitwise’s current add bill page further demonstrates the of lack of clarity: the text input fields are not labeled well, the bottom half of this screen is comprised of a series of unlabeled buttons that don’t look like buttons, and the verbiage is overall confusing (a common problem throughout the app).</p>

  <figure class="full">
    <img src="/images/splitwise_old.png" alt="Old Splitwise Screens">
  </figure>
  <p class="caption">Current Splitwise UI. Names and images grayed out.</p>

  <h3>Low Fidelity Wireframes</h3>
  <p class="readable">I used Balsamiq Mockups to create wireframes based on a distilled and refined list of improvements I initially brainstormed.</p>
  <figure class="full">
    <img src="/images/splitwise_wireframe-home.png" alt="Splitwise Wireframes: Home Page and FAB Overlay">
  </figure>
  <p class="caption">Left to right: Home page v1, Home page v2, and FAB Overlay</p>

  <p class="readable">I stripped redundant information out (like the tab bar below the app bar), created a “summary” and “breakdown” sections to organize information, and moved the actions in the app bar into a floating action button.</p>

  <p class="readable">The FAB button is great because it is a call to action that stands out, is always visible, and expands to reveal more information to provide context.</p>

  <p class="readable">In the breakdown section I decided to modify the copy to sound a bit more like a natural sentence. This way users are able to read it clearly without their eyes jumping from margin to margin and easily identify who owes who. Additionally, this particular sentence structure allows for the convention of keeping the dollar amount at the end. The profile pictures associated with each bill listed belong to whomever owes the money. Keeping consistency and conventions like these make the app easy to use and remember.</p>

  <figure class="full">
    <img src="/images/splitwise_wireframe-nav&addbill.png" alt="Splitwise Wireframe: Nav Bar & Add Bill Page">
  </figure>
  <p class="caption">Left to right: Navbar, Add Bill page v1, and Add Bill page v2</p>

  <p class="readable">The navbar includes the user’s list of friends and list of groups he/she is a part of.  Aside from cosmetic updates, the navbar needs to have collapsible and expandable lists.</p>

  <p class="readable">A common complaint from some current Splitwise users is the lack of a defaulted group when adding a bill. Users often forgot to specify a group when creating a bill, and, there is no editing of the bill once it has been posted an entirely new bill has to be created. If the user is in at least one group, that becomes defaulted. If they are in multiple, the most active becomes defaulted. I also cleaned up the text fields simplified placeholders, and increased the size of the bill name and bill total fields to assert their significance.</p>

  <h3>High Fidelity Visual Design</h3>
  <p class="readable">To further express my ideas and demonstrate flow through the application I decided to implement visual design using Sketch and <a href="https://invis.io/2F618CMXC" target="\_blank">a clickable prototype using InVision.</a></p>

  <figure class="full">
    <img src="/images/splitwise_mockup-home&fab.png" alt="Splitwise Mockup: Home Page & Navbar">
  </figure>
  <p class="caption">Left to right: Home page, Navbar, and FAB Overlay</p>

  <figure class="full">
    <img src="/images/splitwise_mockup-addbill.png" alt="Splitwise Mockup: Add Bill Page">
  </figure>
  <p class="caption">Left to right: Add Bill page, Split Type Dialogue, and Split Type Dropdown</p>

  <h3>Onboarding</h3>
  <p class="readable">Upon completing this redesign I stood back and tried to think of ways to increase a first-time user’s comprehension, speed, and “learnability”. The first thing that came to me was obvious, onboarding! Onboarding is very helpful by explaining the core features of an application. The onboarding process I have created goes through the most important feature of Splitwise, adding a bill.</p>

  <figure class="full">
    <img src="/images/splitwise_onboarding.png" alt="Splitwise Onboarding Process">
  </figure>

  <h3>Conclusion</h3>
  <p class="readable">In summation, I chose to add a layer of clarity to the Splitwise app with the intention of make it easier and more pleasant to use. Splitwise is a great app but it’s functionality is not unique. It can be cloned or built from scratch fairly easily. What would really help them as a company, would be to hone in on simplifying the user experience. What keeps people coming back is that the product fills a void and is simple and pleasant to use.</p>

</section>

<section class="change-case clearfix">
<div id="prev">
  <div class="case-wrapper">
    <div class="prev-wrapper clearfix">
      <a href="/work/forecaster" title="Previous Project">
        <p>Forecaster</p>
        <p class="change-case-txt">Previous Project</p>
      </a>
    </div>
  </div>
</div>

  <div id="push"></div>

	<div id="next">
		<div class="case-wrapper">
			<div class="next-wrapper clearfix">
        <a href="/work/chefsteps">
          <p>ChefSteps Redesign</p>
					<p class="change-case-txt">Next Project</p>
				</a>
			</div>
		</div>
	</div>
</section>

<div class="to-top-container elevator">
  <div class="to-top-btn">
    <img src="/images/cd-top-arrow.svg" alt="" />
  </div>
</div>

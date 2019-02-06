---
layout: post
title: URL Anatomy Dissection
tags: [web]
keywords: [url anatomy, url]
---

One of the most successful affiliate programs is the --- program. This encourages websites not owned by --- to link to various parts of ---. However, if you've ever paid attention to your address bar while browsing ---, you'll notice that the URL gets quite long and confusing. Since I couldn't find any official documentation of ---'s URL anatomy, I decided to dissect it to see what I could find.

So what exactly is in this lengthy --- URL? What is the minimum information required to display a certain page on ---'s site? As a blogger, I prefer to keep my URLs short and tidy - both internal URLs and external URLs. If there's any unnecessary part of the --- URL, I'd like to remove it.

Plus, I don't like using ---'s short code system (e.g. amzn.to). I want more control, especially if I want to generate my own links on the fly. So I looked at a few different --- URLs, played around with them to see what would happen if I changed them, and wrote down my results.

This post is a prose version of those results.

## Background on URL structures

The basic URL has four parts: the protocol, subdomain, domain, and top-level domain. 

The protocol is the "http" or "https" part. HTTP stands for hypertext transfer protocol and is the most common protocol. Another common protocol is FTP (file transfer protocol). The *s* at the end means it's using a more secure version of that protocol.

The subdomain is the "www" part. A subdomain is not absolutely required, but it is common. The most common used subdomain is "www" but there is no requirement that a subdomain be that. It can be almost any string. For instance, the subdomain for this blog is "hendrixjoseph".

The domain is the "---" part, and it is always paired with a top-level domain, ".com" in the case of ---. --- also owns several other "---" domains with different top-level domains, such as ---.co.uk, ---.ca, and ---.de. You may come across this if you live in a country other than the US or peruse websites and blogs by people that live outside the US.

In addition to these basic four parts, a URL can also have a path and parameters.

Paths are similar to paths on a personal computer, and in some cases, they're simply paths on the server hosting the website. This is not always the case - sometimes paths can be inputs to the server, giving it the necessary information to construct and deliver a webpage.

URL parameters are at the end of the URL. They begin with a question mark (?), and multiple parameters are separated by an ampersand (&amp;). Typically, each parameter is split into two parts: a field name and a value. These values are separated by an equals sign (=) with the field name on the left and the value on the right. Sometimes you want a character in a value that you can't easily represent in the URL - for instance, you might want to use an ampersand, equals sign, or space. In this case, you can use ASCII codes instead. The ASCII code for ampersand, equals, and space are %26, %3D, and %20, respectively. Sometimes a plus sign (+) is used for a space instead of %20.

Alright, back to the --- URL structure analysis. For the purpose of this post, I'm going to use the Nintendo Switch as an example. In trying to find a Nintendo Switch, I came across three main types of URLs: product URLs, search URLs, and category URLs.

## --- Product URLs

An --- product URL links to a unique product. In the case of the Nintendo Switch, I found the following URL:

    /Nintendo-Switch-Neon-Blue-Red-Joy/dp/B01MUAGZ49/ref=sr_1_2?s=videogames&ie=UTF8&qid=1520015026&sr=1-2&keywords=nintendo%2Bswitch&th=1

![--- Product URL 01](/images/screenshots/product-url-01.png)

After I removed all the URL parameters, I found that the page is mostly unchanged:

    /Nintendo-Switch-Neon-Blue-Red-Joy/dp/B01MUAGZ49/ref=sr_1_2

![--- Product URL 02](/images/screenshots/product-url-02.png)

The biggest change is that the search box is now empty.

Playing around with the URL, I found out you can remove both the "ref=" part and the product description:

    /dp/B01MUAGZ49/

![--- Product URL 03](/images/screenshots/product-url-03.png)

In fact, you can change the product description, and the page is the same:

    /totally-not-a-nintendo-switch/dp/B01MUAGZ49/

![--- Product URL 04](/images/screenshots/product-url-04.png)

I believe, and what most other people believe, is that the in-URL product description is mostly an SEO tactic. What's important is having the "/dp/" part and the "B01MUAGZ49" part.

By the way, "B01MUAGZ49" is the identification number. Fun fact: A book's 10-digit ISBN is also the identification number.

Here's a breakdown of the URL parameters that were oddly unnecessary:

field name | example | purpose
--- | --- | ---
s | videogames | source?
ie | UTF8 | encoding
qid | 1520015026 | timestamp
sr | 1-2 | source
keywords | nintendo+switch | search keyword
th | 1 | unknown
linkCode | ll1 | unknown
tag | hendrixjoseph-20 | --- tracking ID
linkId | 2fbe7d9cff85cb095d4ff5a8937520e4 | unknown

Note that the above table has a few more rows than my above example; these rows were generated by --- when I created a link using the ---'s SiteStripe.

## --- Search URLs

When I searched for a Nintendo Switch under the video games category, I got the following URL:

    /s/ref=nb_sb_noss?url=search-alias%3Dvideogames&field-keywords=nintendo+switch

![--- Search URL 01](/images/screenshots/search-url-01.png)

The only part I could remove without significantly changing the page was the "ref=nb_sb_noss" part:

    /s/?url=search-alias%3Dvideogames&field-keywords=nintendo+switch

![--- Search URL 02](/images/screenshots/search-url-02.png)

That said, check out what happened when I used only one or the other URL parameter.

    /s/?field-keywords=nintendo+switch

![--- Search URL 03](/images/screenshots/search-url-03.png)

    /s/?url=search-alias%3Dvideogames

![--- Search URL 04](/images/screenshots/search-url-04.png)

Here's a table of the parameters, again with a few extra from using ---s SiteStripe:

field name | example | purpose
--- | --- | ---
url | search-alias%3Dvideogames | category
field-keywords | nintendo+switch | search terms
linkCode | ll2 | unknown
tag | hendrixjoseph-20 | --- tracking ID
linkId | 1076ff94b6e332fc9bc85ea943e02604 | unknown

## --- Category URLs

Finally, if I selected a category or department (and since I'm using the Nintendo Switch as an example, I selected the video game department), I got the following URL:

    /computer-video-games-hardware-accessories/b/ref=nav_shopall_cvg_ce?ie=UTF8&node=468642

![--- Category URL 01](/images/screenshots/category-url-01.png)

Playing around with the URL, I was able to get the same page with just the following:

    /b/?node=468642

![--- Category URL 02](/images/screenshots/category-url-02.png)

Similar to the product pages, the "computer-video-games-hardware-accessories" is not only not needed, it can be changed to just about anything with no effect on the page itself.

The URL parameters I discovered are:

field name | example | purpose
--- | --- | ---
ie | UTF8 | encoding
node | 468642 | category
linkCode | ll2 | unknown
tag | hendrixjoseph-20 | --- tracking ID
linkId | 7c656e410b58b3350015e2bc2bc9b176 | unknown

## Conclusion

I suggest if you're linking to a product, use the minimum link with the product information embedded in it (.../Nintendo-Switch-Neon-Blue-Red-Joy/dp/B01MUAGZ49/). Do something similar with linking to a category (
.../computer-video-games-hardware-accessories/b/). Use both parameters for the search, when available (.../s/?url=search-alias%3Dvideogames&field-keywords=nintendo+switch). I believe this will improve user readability and thus SEO. This is only marginal improvement, though, so if there's other SEO work to be done, do that first.

Oh, and don't forget to include the tracking id ("tag"). For the three types of URLs, they would appear as follows:

    /Nintendo-Switch-Neon-Blue-Red-Joy/dp/B01MUAGZ49/?tag=hendrixjoseph-20
    /computer-video-games-hardware-accessories/b/?tag=hendrixjoseph-20
    /s/?url=search-alias%3Dvideogames&field-keywords=nintendo+switch&tag=hendrixjoseph-20
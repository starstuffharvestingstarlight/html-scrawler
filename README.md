html-scrawler
=============

Turns an image into ascii art, html tags, etc, to get around image restrictions on websites.

I originally wrote this a few years ago in php but figured it'd be interesting to port it to js.

Here's an example sprite explosion:

![Example sprite explosion](https://raw.githubusercontent.com/starstuffharvestingstarlight/html-scrawler/master/doc/example_1.png)

This case was generated based on ~32x32 sprites which make the processing easier. This particular website does not allow images on the site, but they allow div tags and style (filtered). All I did was convert the sprites to smart CSS+HTML and voila.

The goal here is to start with an uploaded image and process it:
1. resize to intended size (done, kinda)
2. convert to indexed colours
3. map colours to a markup translation algorithm based on common filters (e.g., wordpress, utf8 block characters, etc)

libcaca and other ascii libs are better in a lot of ways, so this isn't about replacing any of that.

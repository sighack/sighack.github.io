---
title: "Procedural Color - Introduction"
author: Manohar Vanga
image: http://sighack.com/public/images/2018-02-11-generative-color-algorithms/sb1.png
description: An introduction to procedural color generation algorithms for generative art.
---

**For the last year or so, I've been slowly learning more about using color
in art and, in particular, trying to learn how to procedurally generate
and use interesting color combinations. My goal was to achieve _generative
colors_, where the program surprises me with color combinations rather than
me having to hand-pick palettes.**

**So I kept taking notes along the way,
I wrote code, I refactored it, and started slowly writing up an article summarizing
what I had learnt.
However, over time, the scope of this thing got completely out of hand to
the point where it became a chore to keep writing. So instead, I've decided
to break my ideas down into smaller pieces and publish them as individual
articles. I'll leave this intro here as a sort of table of contents.**

**Let's begin!**


Color is a pretty vast subject and can get very complex really fast. Over the
last year, I've been trying to learn more about it from the perspective of
generative/procedural art, and this series of posts is a compilation of some
of the stuff I've learnt.

If you're a generative or procedural artist, my hope is that by following along,
you end up with a few more options available to you with regard to color than the
usual randomly-generated RGB colors.

As I said before, this series has been a long time in the making and is based
on my own journey exploring this topic. If there's anything I've learnt along
the way it's that every rule can be happily broken while still producing
incredible work, and I heartily encourage you to do so! However, for those who
want a more structured approach to getting to grips with a topic as complex as
color, my hope is that the ideas presented here serve as stepping stones for
you to build upon.

Finally, everything I've presented below is nothing but the tiniest speck on the very
tip of a very large iceberg. There is a huge community of artists and researchers
working on just understanding how we percieve and react to color and it's impossible
to provide an exhaustive perspective of the area in one article. I've tried to
keep things at an introductory level and deliberately stuck to the HSB and RGB
colorspaces as these are widely accessible via generative toolkits like Processing.

## Articles in the Series

**[Creating Color Variations](procedural-color-algorithms-color-variations):**
In the first part, we'll look at **how to produce variations of a given base
color**, which is useful to just understand the basic levers that are
available to us when it comes to procedural color, and how they work.

**[HSB vs. RYB](procedural-color-algorithms-hsb-vs-ryb):**
In the second part, we'll look at the difference between the HSB color wheel and
the traditional RYB color wheel used by artists. I show two approaches for
converting from RYB hues to HSB hues.

**[Monochrome Color Schemes](procedural-color-algorithms-monochromatic-color-scheme):**
In this article, we'll look at monochromatic color schemes and how we can use
them programmatically. More specifically, I go into detail on _color values_
and why they matter, as well as how we can procedurally generate _value scales_.

**More articles coming soon as I write/edit them...**

![](/public/images/end.gif){: .center-image }

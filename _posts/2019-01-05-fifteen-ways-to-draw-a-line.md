---
title: Fifteen Ways to Draw a Line
author: Manohar Vanga
image: https://sighack.com/public/images/fifteen-ways-to-draw-a-line/lowres-8.png
description: An exploration on drawing textured lines generatively in fifteen different ways.
---

*All Processing code for this article, along with images, can be found [on Github](https://github.com/sighack/fifteen-lines)*

Early last year I challenged myself to come up with [twenty five designs using only
Perlin flow fields](getting-creative-with-perlin-noise-fields) and followed that up
with [seventy-five different ways to draw a circle](seventy-five-ways-to-draw-a-circle).
In this article I explore another simple challenge: fifteen different ways to
draw interesting lines.

## The Constraints 

I set three constraints for this challenge. As before, my first constraint was to
forego the use of color so that I could focus on forms and shapes instead.

Second, each version should be implemented as an independent, re-usable
function conforming to the following declaration:
```java
void line(float x1, float y1, float x2, float y2,
          float weight, float value) {
  /*
   * Draw a line from (x1, y1) to (x2, y2) with a given
   * weight and darkness (value)
   */
}
```
This way, I can easily reuse them later for other works. Above, you'll see that I
specify two additional parameters: a stroke weight and a _value_ (or lightness/darkness).

As the third and final constraint, each version had to have some
generative/procedural component to it. That is, each time the function is called,
a new variant should be generated.

Enough talking. Here are the results! Enjoy!

## Fifteen Lines

I started with a basic formatting of different weights and values that I was looking for
and went with the simplest possible line. Below, the stroke weight increases from left
to right, and the values get darker from top to bottom:

<a href="/public/images/fifteen-ways-to-draw-a-line/highres-1.png" target="_blank">
![](/public/images/fifteen-ways-to-draw-a-line/lowres-1.png)
*#1*
</a>

My immediate next urge was to form the line thickness from multiple thinner lines. The
endcaps of the line can be seen as a circle of diameter specified by `weight`.
I generated a random point inside the circle around the first endpoint and
another around the second, and connect them with a line whose color is based on
the specified value:

<a href="/public/images/fifteen-ways-to-draw-a-line/highres-2.png" target="_blank">
![](/public/images/fifteen-ways-to-draw-a-line/lowres-2.png)
*#2*
</a>

Instead of drawing complete lines, I instead sampled a few points on the line instead
and drew small ellipses (with the required opacity to get the correct value):

<a href="/public/images/fifteen-ways-to-draw-a-line/highres-3.png" target="_blank">
![](/public/images/fifteen-ways-to-draw-a-line/lowres-3.png)
*#3*
</a>

I wanted to try and see if I could use a solid black fill for the ellipses and vary
the value using just the density of the sampling itself, and it seems to work quite
well:

<a href="/public/images/fifteen-ways-to-draw-a-line/highres-4.png" target="_blank">
![](/public/images/fifteen-ways-to-draw-a-line/lowres-4.png)
*#4*
</a>

I decided to switch gears a bit and, after generating a few random points inside the
line shape, created a Delaunay diagram (using [Lee Byron's fantastic Mesh library
for Processing](http://leebyron.com/mesh/). The value was determined by the lightness
of the lines:

<a href="/public/images/fifteen-ways-to-draw-a-line/highres-5.png" target="_blank">
![](/public/images/fifteen-ways-to-draw-a-line/lowres-5.png)
*#5*
</a>

Since I was using the Mesh library anyway, I figured I would also try to do just a
convex hull of the randomly-generated points. This gives an interesting brush-like
shape:

<a href="/public/images/fifteen-ways-to-draw-a-line/highres-6.png" target="_blank">
![](/public/images/fifteen-ways-to-draw-a-line/lowres-6.png)
*#6*
</a>

At this point I wanted to try a variation of a previous sketch: instead of generating
random lines ending near the endpoints of our line, I wanted to generate them anywhere
within the line's shape. The result was subtly different, but the different was not
particularly discernible:

<a href="/public/images/fifteen-ways-to-draw-a-line/highres-7.png" target="_blank">
![](/public/images/fifteen-ways-to-draw-a-line/lowres-7.png)
*#7*
</a>

Since I was generating random points along the shape of the line anyway, I figured I'd
just draw some ellipses instead. I use random diameters based on the specified weight,
but this is the first one where I start drawing outside the bounds of the original shape:

<a href="/public/images/fifteen-ways-to-draw-a-line/highres-8.png" target="_blank">
![](/public/images/fifteen-ways-to-draw-a-line/lowres-8.png)
*#8*
</a>

In the next one, I removed the fill and used just a thin outline stroke. **Tip: you can
specify fractional stroke weights in Processing to get thinner lines (e.g. `strokeWeight(0.5)`)**

<a href="/public/images/fifteen-ways-to-draw-a-line/highres-9.png" target="_blank">
![](/public/images/fifteen-ways-to-draw-a-line/lowres-9.png)
*#9*
</a>

Rather than generating ellipses with random positions and diameters, I decided to generate
them on the original line with a random diameter up to the specified stroke weight:

<a href="/public/images/fifteen-ways-to-draw-a-line/highres-10.png" target="_blank">
![](/public/images/fifteen-ways-to-draw-a-line/lowres-10.png)
*#10*
</a>

This time I went from the stroke-only version to the filled version because I had just
done that variation betweween #8 and #9:

<a href="/public/images/fifteen-ways-to-draw-a-line/highres-11.png" target="_blank">
![](/public/images/fifteen-ways-to-draw-a-line/lowres-11.png)
*#11*
</a>

Now I decided to combine the stroke-only and fill-only versions. I used opposing
colors for the stroke and fill to get the different values: lighter values have a
dark stroke with very light fill, while darker values have a light stroke with a
much darker fill:

<a href="/public/images/fifteen-ways-to-draw-a-line/highres-12.png" target="_blank">
![](/public/images/fifteen-ways-to-draw-a-line/lowres-12.png)
*#12*
</a>

I moved on to implement a simple walker that walks along the line with random shifts
in its position. I overlaid a bunch of these to get the next iteration:

<a href="/public/images/fifteen-ways-to-draw-a-line/highres-13.png" target="_blank">
![](/public/images/fifteen-ways-to-draw-a-line/lowres-13.png)
*#13*
</a>

I then reduced the step size to a very small amount to get a perpendicular scribble,
and drew just a single walk from endpoint to enpoint with random variations based on
the specified stroke weight:

<a href="/public/images/fifteen-ways-to-draw-a-line/highres-14.png" target="_blank">
![](/public/images/fifteen-ways-to-draw-a-line/lowres-14.png)
*#14*
</a>

And finally, I decided to use a closed shape instead of an open one, allowing for filling
in the parts that jut out of the original line:

<a href="/public/images/fifteen-ways-to-draw-a-line/highres-15.png" target="_blank">
![](/public/images/fifteen-ways-to-draw-a-line/lowres-15.png)
*#15*
</a>

I suspect I could push this exercise pretty far if I wanted to, but I'll stop: I'm already
glad to have fifteen interesting line variations to play around with in future sketches!

![](/public/images/end.gif){: .center-image }

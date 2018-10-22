---
title: Fast Circle Packing Using Poisson Disk Sampling
layout: post
author: Manohar Vanga
image: http://sighack.com/public/images/2018-01-03-getting-creative-with-perlin-noise-fields/example-4.png
description: A simple technique for really fast circle packing using Poisson disk sampling.
---

I've been playing around with [circle packing](circle-packing-using-stochastic-search)
recently and wanted a fast way of generating packings. This post is a quick tip
on how to do this!

The basic problem with why circle packings are slow to generate have to do with
the two basic steps that are involved: first, we generate candidate circles, and
next, add them only if they satisfy certain conditions (e.g., they don't collide
with any other circle).

The typical approach is to generate random circles and check if they work. However,
the use of randomly generated circles makes this approach non-deterministic (i.e.,
you never know how long it'll take to generate the final packing). The typical
approach is to cap the number of randomly-generated circles that are checked to
some arbitrary upper limit.

## Faster Circle Packing

The approach I ended up using to speed up circle packing looks at more efficient ways
to achieve the above two steps. First, a lot of candidate solutions are generated en
masse using [Poisson disk sampling](poisson-disk-sampling-bridsons-algorithm),
which ensures a minimum radius between generated points; having a guaranteed
minimum spacing between circles makes it easy to generate good candidate solutions
that are already "packable". Next, each of these
candidate solutions are efficiently checked against other circles already drawn
using a [Quadtree for fast spacial search](fast-spacial-search-using-quadtrees).

Here's an animation that illustrates the approach I take:

![](/public/images/fast-circle-packing-using-poisson-disk-sampling/animation.gif)

The algorithm proceeds as follows:

1. Generate points evenly on the canvas spaced a minimum distance apart (twice the radius of the circles we want) using Poisson disk sampling.
2. Check each generated circle against existing circles on screen using a Quadtree. Throw out
ones that collide with previously-drawn circles and keep the ones that don't.
3. Reduce the radius and repeat steps 1 and 2 till the smallest radius is reached.

And that's it! I won't go into the teardown of the code as it's a fairly straightforward
combination of my [Poisson disk sampling implementation](poisson-disk-sampling-bridsons-algorithm)
and my [Quadtree implementation](fast-spacial-search-using-quadtrees). As always,
you can study the final code I wrote for generating the above animation [over at
GitHub](https://github.com/sighack/fast-circle-packing).

![](/public/images/end.gif){: .center-image }

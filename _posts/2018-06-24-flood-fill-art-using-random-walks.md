---
title: Flood-Fill Art Using Random Walks
layout: post
author: Manohar Vanga
image: https://sighack.com/public/images/flood-fill-art-using-random-walks/position-center/lowres-438.png
description: A simply technique for creating art using random walks on color channels, with a surprising number of variations.
---

Some of you might have seen this kind of (what I call) "flood-fill art"
floating around the internet.

![](/public/images/flood-fill-art-using-random-walks/position-center/lowres-438.png)

The technique used is simple but has a surprising result and a large number
of possible variations. The idea is that of a [random walk](https://en.wikipedia.org/wiki/Random_walk),
which is a fancy way of saying you change something randomly each step,
therefore simulating a random process. In this case, the random steps
are taken in the color domain starting from a "seed" pixel, with neighboring
pixels being colored with a slight perturbation in color.

In this post I show a visual exploration of tweaking some of the available
parameters of my implementation of such flood-fill art in Processing.

## Overview of the Approach

Here's a quick summary of my approach to creating this kind of flood-fill art
using random walks.
First, we sprinkle one or more "seed" points around the canvas, give them an
initial color, and add them to a list of points to be processed. Then, every
iteration, a point is randomly picked from this list, it's uncolored
neighbors are colored with a slightly mutated color, and those points are
then subsequently added to the list. Eventually, all points are colored and
the list becomes empty, at which point we stop. In my implementation, instead
of coloring individual pixels, I draw tiny lines from the "seed" pixel to its
neighbors, with the appropriate stroke color. This allows me to scale up my
images to arbitrary resolutions.

The approach is surprisingly flexible and serves as a good demonstration of
the kinds of explorations I like to do.

So let's go through a little gallery of permutations for this simple
technique where I play around with one or more of the levers available
to us.

## Exploration

Let's start tweaking the different parameters to see what's possible with
this simple algorithm. You can click any of the images below to view a higher
resolution version.

### Varying Perturbation Size

Let's start with a simple version where we place a single seed point in the
center that's colored with a random RGB value, and do a [random Gaussian](https://processing.org/reference/randomGaussian_.html)
perturbation in all three color channels (i.e., we modify red, green, and
blue values). Below are the generated images for a perturbations value of 1.

<a class="imglink" href='/public/images/flood-fill-art-using-random-walks/perturb-1/highres-14709.png' target='_blank'>![](/public/images/flood-fill-art-using-random-walks/perturb-1/lowres-14709.png)</a>
<a class="imglink" href='/public/images/flood-fill-art-using-random-walks/perturb-1/highres-19859.png' target='_blank'>![](/public/images/flood-fill-art-using-random-walks/perturb-1/lowres-19859.png)</a>
<a class="imglink" href='/public/images/flood-fill-art-using-random-walks/perturb-1/highres-421.png' target='_blank'>![](/public/images/flood-fill-art-using-random-walks/perturb-1/lowres-421.png)</a>

Here is the result for perturbations of size 5:

<a class="imglink" href='/public/images/flood-fill-art-using-random-walks/perturb-5/highres-14574.png' target='_blank'>![](/public/images/flood-fill-art-using-random-walks/perturb-5/lowres-14574.png)</a>
<a class="imglink" href='/public/images/flood-fill-art-using-random-walks/perturb-5/highres-18497.png' target='_blank'>![](/public/images/flood-fill-art-using-random-walks/perturb-5/lowres-18497.png)</a>
<a class="imglink" href='/public/images/flood-fill-art-using-random-walks/perturb-5/highres-401.png' target='_blank'>![](/public/images/flood-fill-art-using-random-walks/perturb-5/lowres-401.png)</a>
<a class="imglink" href='/public/images/flood-fill-art-using-random-walks/perturb-5/highres-8448.png' target='_blank'>![](/public/images/flood-fill-art-using-random-walks/perturb-5/lowres-8448.png)</a>

Here is the result for perturbations of size 20:

<a class="imglink" href='/public/images/flood-fill-art-using-random-walks/perturb-20/highres-13127.png' target='_blank'>![](/public/images/flood-fill-art-using-random-walks/perturb-20/lowres-13127.png)</a>
<a class="imglink" href='/public/images/flood-fill-art-using-random-walks/perturb-20/highres-405.png' target='_blank'>![](/public/images/flood-fill-art-using-random-walks/perturb-20/lowres-405.png)</a>
<a class="imglink" href='/public/images/flood-fill-art-using-random-walks/perturb-20/highres-4810.png' target='_blank'>![](/public/images/flood-fill-art-using-random-walks/perturb-20/lowres-4810.png)</a>
<a class="imglink" href='/public/images/flood-fill-art-using-random-walks/perturb-20/highres-8715.png' target='_blank'>![](/public/images/flood-fill-art-using-random-walks/perturb-20/lowres-8715.png)</a>

And things get really whacky with a perturbation of 100!

<a class="imglink" href='/public/images/flood-fill-art-using-random-walks/perturb-100/highres-476.png' target='_blank'>![](/public/images/flood-fill-art-using-random-walks/perturb-100/lowres-476.png)</a>

### Playing Around with Seed Placement

While we've been using a single seed point placed at the center of the canvas
so far, we can also vary the placement of the initial seed in a whole bunch of
ways. Here are just a few examples of this.

Here is our basic version that we've been looking at with a single seed point
at the center:

<a class="imglink" href='/public/images/flood-fill-art-using-random-walks/position-center/highres-438.png' target='_blank'>![](/public/images/flood-fill-art-using-random-walks/position-center/lowres-438.png)</a>

Here are some with a slight random variation from the center:

<a class="imglink" href='/public/images/flood-fill-art-using-random-walks/position-centerish/highres-10109.png' target='_blank'>![](/public/images/flood-fill-art-using-random-walks/position-centerish/lowres-10109.png)</a>
<a class="imglink" href='/public/images/flood-fill-art-using-random-walks/position-centerish/highres-20305.png' target='_blank'>![](/public/images/flood-fill-art-using-random-walks/position-centerish/lowres-20305.png)</a>
<a class="imglink" href='/public/images/flood-fill-art-using-random-walks/position-centerish/highres-4453.png' target='_blank'>![](/public/images/flood-fill-art-using-random-walks/position-centerish/lowres-4453.png)</a>
<a class="imglink" href='/public/images/flood-fill-art-using-random-walks/position-centerish/highres-4557.png' target='_blank'>![](/public/images/flood-fill-art-using-random-walks/position-centerish/lowres-4557.png)</a>

Here are some with a single seed at a random location on screen:

<a class="imglink" href='/public/images/flood-fill-art-using-random-walks/position-random/highres-13657.png' target='_blank'>![](/public/images/flood-fill-art-using-random-walks/position-random/lowres-13657.png)</a>
<a class="imglink" href='/public/images/flood-fill-art-using-random-walks/position-random/highres-21035.png' target='_blank'>![](/public/images/flood-fill-art-using-random-walks/position-random/lowres-21035.png)</a>
<a class="imglink" href='/public/images/flood-fill-art-using-random-walks/position-random/highres-449.png' target='_blank'>![](/public/images/flood-fill-art-using-random-walks/position-random/lowres-449.png)</a>
<a class="imglink" href='/public/images/flood-fill-art-using-random-walks/position-random/highres-7120.png' target='_blank'>![](/public/images/flood-fill-art-using-random-walks/position-random/lowres-7120.png)</a>

Here are some where we fix a single seed point at the top-right corner:

<a class='imglink' href='/public/images/flood-fill-art-using-random-walks/position-corner/highres-12855.png' target='_blank'>![](/public/images/flood-fill-art-using-random-walks/position-corner/lowres-12855.png)</a>
<a class='imglink' href='/public/images/flood-fill-art-using-random-walks/position-corner/highres-22398.png' target='_blank'>![](/public/images/flood-fill-art-using-random-walks/position-corner/lowres-22398.png)</a>
<a class='imglink' href='/public/images/flood-fill-art-using-random-walks/position-corner/highres-28934.png' target='_blank'>![](/public/images/flood-fill-art-using-random-walks/position-corner/lowres-28934.png)</a>
<a class='imglink' href='/public/images/flood-fill-art-using-random-walks/position-corner/highres-409.png' target='_blank'>![](/public/images/flood-fill-art-using-random-walks/position-corner/lowres-409.png)</a>

And here are some where I placed a hundred white seed points evenly placed
along the diagonal:

<a class='imglink' href='/public/images/flood-fill-art-using-random-walks/position-diagonal/highres-405.png' target='_blank'>![](/public/images/flood-fill-art-using-random-walks/position-diagonal/lowres-405.png)</a>
<a class='imglink' href='/public/images/flood-fill-art-using-random-walks/position-diagonal/highres-9015.png' target='_blank'>![](/public/images/flood-fill-art-using-random-walks/position-diagonal/lowres-9015.png)</a>

And here is the same with the seed points colored red instead:

<a class='imglink' href='/public/images/flood-fill-art-using-random-walks/position-diagonal/highres-457.png' target='_blank'>![](/public/images/flood-fill-art-using-random-walks/position-diagonal/lowres-457.png)</a>

And finally, here are some with multiple seed points distributed across the
canvas via [Poisson-disk sampling](poisson-disk-sampling-bridsons-algorithm)
and perturbation sizes of 1, 5, and 20:

<a class="imglink" href='/public/images/flood-fill-art-using-random-walks/position-poisson/highres-491.png' target='_blank'>![](/public/images/flood-fill-art-using-random-walks/position-poisson/lowres-491.png)</a>
<a class="imglink" href='/public/images/flood-fill-art-using-random-walks/position-poisson/highres-458.png' target='_blank'>![](/public/images/flood-fill-art-using-random-walks/position-poisson/lowres-458.png)</a>
<a class="imglink" href='/public/images/flood-fill-art-using-random-walks/position-poisson/highres-487.png' target='_blank'>![](/public/images/flood-fill-art-using-random-walks/position-poisson/lowres-487.png)</a>

### Varying Seed Colors

Let's start messing around with the seed colors themselves. Here are just a
tiny, tiny fraction of the possibilities.

We've already seen examples above of randomly-colored seed points. Here are
some with ten seed points whose color is fixed (white, black, and red):

<a class='imglink' href='/public/images/flood-fill-art-using-random-walks/seedcolors/highres-414.png' target='_blank'>![](/public/images/flood-fill-art-using-random-walks/seedcolors/lowres-414.png)</a>
<a class='imglink' href='/public/images/flood-fill-art-using-random-walks/seedcolors/highres-500.png' target='_blank'>![](/public/images/flood-fill-art-using-random-walks/seedcolors/lowres-500.png)</a>
<a class='imglink' href='/public/images/flood-fill-art-using-random-walks/seedcolors/highres-418.png' target='_blank'>![](/public/images/flood-fill-art-using-random-walks/seedcolors/lowres-418.png)</a>
<a class='imglink' href='/public/images/flood-fill-art-using-random-walks/seedcolors/highres-12153.png' target='_blank'>![](/public/images/flood-fill-art-using-random-walks/seedcolors/lowres-12153.png)</a>
<a class='imglink' href='/public/images/flood-fill-art-using-random-walks/seedcolors/highres-15414.png' target='_blank'>![](/public/images/flood-fill-art-using-random-walks/seedcolors/lowres-15414.png)</a>
<a class='imglink' href='/public/images/flood-fill-art-using-random-walks/seedcolors/highres-7175.png' target='_blank'>![](/public/images/flood-fill-art-using-random-walks/seedcolors/lowres-7175.png)</a>

### Biasing Color Mutation

We can also bias color channels if we want. This just means we add or subtract
a fixed value from a particular color channel (red, green, or blue). So, for
example, we can bias white by adding a fixed value to all three channels in
addition to the regular perturbation. This will lead to a race towards the
value 255 for all three channels, leading to white.

Here are some examples with diagonally-placed seed points with a white bias
in the color mutation:

<a class='imglink' href='/public/images/flood-fill-art-using-random-walks/bias-white/highres-466.png' target='_blank'>![](/public/images/flood-fill-art-using-random-walks/bias-white/lowres-466.png)</a>
<a class='imglink' href='/public/images/flood-fill-art-using-random-walks/bias-white/highres-407.png' target='_blank'>![](/public/images/flood-fill-art-using-random-walks/bias-white/lowres-407.png)</a>
<a class='imglink' href='/public/images/flood-fill-art-using-random-walks/bias-white/highres-395.png' target='_blank'>![](/public/images/flood-fill-art-using-random-walks/bias-white/lowres-395.png)</a>

And here are some biased towards black:

<a class='imglink' href='/public/images/flood-fill-art-using-random-walks/bias-black/highres-424.png' target='_blank'>![](/public/images/flood-fill-art-using-random-walks/bias-black/lowres-424.png)</a>
<a class='imglink' href='/public/images/flood-fill-art-using-random-walks/bias-black/highres-448.png' target='_blank'>![](/public/images/flood-fill-art-using-random-walks/bias-black/lowres-448.png)</a>
<a class='imglink' href='/public/images/flood-fill-art-using-random-walks/bias-black/highres-467.png' target='_blank'>![](/public/images/flood-fill-art-using-random-walks/bias-black/lowres-467.png)</a>

And here are some with single-channel biases on the red, green, and blue values:

<a class='imglink' href='/public/images/flood-fill-art-using-random-walks/bias-rgb/highres-423.png' target='_blank'>![](/public/images/flood-fill-art-using-random-walks/bias-rgb/lowres-423.png)</a>
<a class='imglink' href='/public/images/flood-fill-art-using-random-walks/bias-rgb/highres-433.png' target='_blank'>![](/public/images/flood-fill-art-using-random-walks/bias-rgb/lowres-433.png)</a>
<a class='imglink' href='/public/images/flood-fill-art-using-random-walks/bias-rgb/highres-404.png' target='_blank'>![](/public/images/flood-fill-art-using-random-walks/bias-rgb/lowres-404.png)</a>

### Varying Stroke Width

In my version, I draw lines between the starting point and the neighbors each
iteration. Here are some examples of what's possible when varying the stroke
width (1px, 5px, 10px, and 20px).

<a class='imglink' href='/public/images/flood-fill-art-using-random-walks/strokeweight/highres-416.png' target='_blank'>![](/public/images/flood-fill-art-using-random-walks/strokeweight/lowres-416.png)</a>
<a class='imglink' href='/public/images/flood-fill-art-using-random-walks/strokeweight/highres-479.png' target='_blank'>![](/public/images/flood-fill-art-using-random-walks/strokeweight/lowres-479.png)</a>
<a class='imglink' href='/public/images/flood-fill-art-using-random-walks/strokeweight/highres-435.png' target='_blank'>![](/public/images/flood-fill-art-using-random-walks/strokeweight/lowres-435.png)</a>
<a class='imglink' href='/public/images/flood-fill-art-using-random-walks/strokeweight/highres-419.png' target='_blank'>![](/public/images/flood-fill-art-using-random-walks/strokeweight/lowres-419.png)</a>

### Limiting Propogation Direction

We can also limit the direction of propogation! In the below examples,
instead of visiting all eight neighboring cells, we only visit cells to the
right and to the bottom of a given pixel:

<a class='imglink' href='/public/images/flood-fill-art-using-random-walks/limitdir/highres-407.png' target='_blank'>![](/public/images/flood-fill-art-using-random-walks/limitdir/lowres-407.png)</a>
<a class='imglink' href='/public/images/flood-fill-art-using-random-walks/limitdir/highres-528.png' target='_blank'>![](/public/images/flood-fill-art-using-random-walks/limitdir/lowres-528.png)</a>
<a class='imglink' href='/public/images/flood-fill-art-using-random-walks/limitdir/highres-421.png' target='_blank'>![](/public/images/flood-fill-art-using-random-walks/limitdir/lowres-421.png)</a>
<a class='imglink' href='/public/images/flood-fill-art-using-random-walks/limitdir/highres-2607.png' target='_blank'>![](/public/images/flood-fill-art-using-random-walks/limitdir/lowres-2607.png)</a>

### Image-Based Seed Colors

Here are some examples where seed points are spread around based on
[Poisson-disk sampling](poisson-disk-sampling-bridsons-algorithm)
with a small radius, and the colors for the seeds are chosen based on
an image. Here are some examples of (in my opinion) very beautiful painterly
lanscapes generated with this approach.

<a class='imglink' href='/public/images/flood-fill-art-using-random-walks/images/highres-408.png' target='_blank'>![](/public/images/flood-fill-art-using-random-walks/images/lowres-408.png)</a>
<a class='imglink' href='/public/images/flood-fill-art-using-random-walks/images/highres-418.png' target='_blank'>![](/public/images/flood-fill-art-using-random-walks/images/lowres-418.png)</a>
<a class='imglink' href='/public/images/flood-fill-art-using-random-walks/images/highres-447.png' target='_blank'>![](/public/images/flood-fill-art-using-random-walks/images/lowres-447.png)</a>
<a class='imglink' href='/public/images/flood-fill-art-using-random-walks/images/highres-451.png' target='_blank'>![](/public/images/flood-fill-art-using-random-walks/images/lowres-451.png)</a>

This also works relatively nicely for portraits!

<a class='imglink' href='/public/images/flood-fill-art-using-random-walks/images/highres-397.png' target='_blank'>![](/public/images/flood-fill-art-using-random-walks/images/lowres-397.png)</a>
<a class='imglink' href='/public/images/flood-fill-art-using-random-walks/images/highres-398.png' target='_blank'>![](/public/images/flood-fill-art-using-random-walks/images/lowres-398.png)</a>

### More Tweaks

We've just barely scratched the surface of what's possible with just one
simple algorithm. You can play for weeks on end with the color tweaking
alone: tying channels together, using HSB colors instead of RGB. You can
also try using different mutations for different parts of the canvas, or
limiting the extent of the filling to [packed circles or polygons](circle-packing-using-stochastic-search).
So many possibilities...

## Implementation in Processing

You can find a full version of my implementation, with easily-tweakable
parameters [over on Github](https://github.com/sighack/random-walk-art). I won't go into detail on how I implemented
it and leave it as an exercise to you to understand how it works.
I've tried my best to comment things
where possible and to keep the implementation readable, so reading through
the code shouldn't be too hard, and a useful exercise!
As a starting point, look at what the `render()` and `run()` functions do.

---
title: Getting Creative with Perlin Noise Fields
---

In little gaps of time when I'm trying to unwind from my PhD work, I have a hobby of making generative art. Seeing interesting images appear within a short time using simple algorithms provides a refreshing change from my academic work where one ends up working for months or years on a project before seeing any success.

On a boring weekend in December last year, I decided to set myself a fun challenge: pick a simple process for generative art and attempt to make as many different artworks as I can by just tweaking the various available parameters.

The algorithm I picked was the movement of particles on a canvas based on a simple force field using Perlin noise. I built a handful of simple classes in Processing to help me quickly iterate on ideas and I was off.


This post details what I came up with along with some lessons learnt. In particular, this challenge has been helpful in cementing my own understanding of how to *actively practice* creativity using self-imposed constraints.

## Perlin Noise Fields: A Brief Overview

The idea behind *Perlin noise fields* (not sure if that's the official term) is quite simple.

Think of the canvas as a two-dimensional force field. Each point on the canvas is assigned a direction in which it's "force" redirects particles.

So for example, by assigning random directions of force for every point on the canvas, we end up with the following.

![](/public/images/2018-01-03-getting-creative-with-perlin-noise-fields/random_force_field.png)

To give a more organic feel to the randomness, Perlin noise is used instead in determining the directions of forces. [Adrian Biagioli has a great writeup](http://flafla2.github.io/2014/08/09/perlinnoise.html) explaining how it works in detail. What we end up with is the following.

![](/public/images/2018-01-03-getting-creative-with-perlin-noise-fields/noise_force_field.png)

As you can see, the directions have a much smoother feel than the jumpy and jarring random version.

With this in place, the next step is to release some particles onto the canvas and simulate their movement as affected by the underlying forces.

![](/public/images/2018-01-03-getting-creative-with-perlin-noise-fields/particle_final.png)

That's it!

I added some basic classes to help me organize the code better. Primarily, I wanted to be able to define particle sets, each containing one or more particles and a custom drawing function. I also implemented classes to help me layer particle sets. That way I can have a sequence of layers which are drawn on the canvas one after the other, and a layer is finished only when all particle sets assigned to a given layer have been simulated a certain number of steps.

## The Iterations

**Click on the images below to see an animation of the process. WARNING: in case you're viewing this on your mobile data, some of the GIFs are fairly large!**

I first started with the low hanging fruit. A white background with lots of black particles set to a low opacity. This results in the following, where the parts where multiple particles interact end up darker.

![](/public/images/2018-01-03-getting-creative-with-perlin-noise-fields/example-1.png){: .clickgif }

Just out of curiosity, I decided to flip the colors. A black background with white streaks across it. The result was more interesting. The white in the foreground with black in the background gives a nicer sense of depth.

![](/public/images/2018-01-03-getting-creative-with-perlin-noise-fields/example-2.png){: .clickgif }

Going off that sense of depth, I decided to throw in some colors. Picking a palette of purples, I decided to layer multiple sets of particles, going from darker to lighter, and many to fewer. The result was quite beautiful.

![](/public/images/2018-01-03-getting-creative-with-perlin-noise-fields/example-3.png){: .clickgif }

At this point, I was getting a little bored with the variations and decided to play around with varying the thickness of lines. I used low opacity (1%) white particles on a black background and increased the thickness of the drawn lines with each successive frame. The result was quite pleasing, with the gray color almost disappearing into the background.

![](/public/images/2018-01-03-getting-creative-with-perlin-noise-fields/example-9.png){: .clickgif }

Out of chance, I happened to change the [stroke cap to square](https://processing.org/reference/strokeCap_.html) instead of the default round one. It suddenly introduced a whole new texture to the image.

![](/public/images/2018-01-03-getting-creative-with-perlin-noise-fields/example-4-1.png)

I wanted to get some color in there and so I started looking around for a way to procedurally generate a pleasing set of colors. I ended up finding [this great article](https://martin.ankerl.com/2009/12/09/how-to-create-random-colors-programmatically/) on generating colors, and ended up using the golden ratio color generator described there. The result was spectacular!

![](/public/images/2018-01-03-getting-creative-with-perlin-noise-fields/example-4.png){: .clickgif }

Instead of drawing lines, I switched to drawing arcs instead. Again, a completely different result!

![](/public/images/2018-01-03-getting-creative-with-perlin-noise-fields/example-5.png){: .clickgif }

I noticed that the golden-ratio based color generator was using the [HSB (or HSL) color space](https://en.wikipedia.org/wiki/HSL_and_HSV) and decided to play with that a bit. I picked a hue that I liked and picked random saturation and lightness values to get the following.

![](/public/images/2018-01-03-getting-creative-with-perlin-noise-fields/example-6.png){: .clickgif }

Next I decided to vary the saturation value based on the lifetime of the particle. The resulting effect was that the color went from full saturation to white while reducing in width.

![](/public/images/2018-01-03-getting-creative-with-perlin-noise-fields/example-7.png){: .clickgif }

For some reason, it suddenly reminded me of the hyena's den from Lion King.

![](/public/images/2018-01-03-getting-creative-with-perlin-noise-fields/lion-king.jpg)

I decided to pursue that a little for the heck of it. With a bit of layering, I was quite happy with what emerged.

![](/public/images/2018-01-03-getting-creative-with-perlin-noise-fields/example-8.png){: .clickgif }

At this point, I was starting to panic. I seemed to be running out of ideas. How was I ever going to get to my initial target of twenty five? I decided to back off to grayscale and use layers. The first layer releases a set of low-opacity white particles that build the background, followed by a series of thin strands of gray.

![](/public/images/2018-01-03-getting-creative-with-perlin-noise-fields/example-10.png){: .clickgif }

I then decided to try and draw lines perpendicular to the direction of motion using some translation and rotation before drawing. Due to some broken logic, I ended up getting the following image; a haze with little spots of clarity. A happy accident.

![](/public/images/2018-01-03-getting-creative-with-perlin-noise-fields/example-11.png){: .clickgif }

Here's another version I found saved during my explorations. I don't have the exact code used for this anymore; it's source has been lost forever!
![](/public/images/2018-01-03-getting-creative-with-perlin-noise-fields/example-11-2.png)

At this point, I again found myself running out of ideas but I stayed the course. I decided to draw circles, but a custom style that had wobbly edges. Again some bug in my code led me to a happy discovery of the following image.

![](/public/images/2018-01-03-getting-creative-with-perlin-noise-fields/example-12.png){: .clickgif }

Looking at it, I thought I could make it darker and get the feel of a starry sky. So I tried to make something along those lines. I threw in some stars in the sky and some shooting stars streaking across the sky.

![](/public/images/2018-01-03-getting-creative-with-perlin-noise-fields/example-13.png){: .clickgif }

I liked the shape of the shooting star where I varied the thickness of the line over the lifetime of the particle. I decided to layer different sizes of these shapes onto a white background. The result is a pattern that reminds me very much of the coat of fur on a Dalmatian!

![](/public/images/2018-01-03-getting-creative-with-perlin-noise-fields/example-14.png){: .clickgif }

I decided to make the tails longer, and lower the opacity over time so that particles fade away. I also did this in layers to get a lot of variation in the different levels in the image. The result was something very smooth and organic.

![](/public/images/2018-01-03-getting-creative-with-perlin-noise-fields/example-15.png){: .clickgif }

I decided to add some color in there. I tried to get the feel of a chalk drawing done with a light sanguine color.

![](/public/images/2018-01-03-getting-creative-with-perlin-noise-fields/example-23.png){: .clickgif }

Going back to the space-like image, I decided to try and do the look of some kind of nebula in space. Instead I ended up with an angry swarm of some kind of space aliens from Star Trek.

![](/public/images/2018-01-03-getting-creative-with-perlin-noise-fields/example-16.png){: .clickgif }
![](/public/images/2018-01-03-getting-creative-with-perlin-noise-fields/example-18.png){: .clickgif }

They kind of looked like leaves so I tried doing a scene of autumn leaves on the ground. Again, reusing the background from the space scene, I played with different colors and layers to get the following.

![](/public/images/2018-01-03-getting-creative-with-perlin-noise-fields/example-17.png){: .clickgif }

One aspect I had not played with at all was the scale of the Perlin noise. Varying this, one can go from small scribbles to long sweeping lines as the force lines become more or less detailed. I used the color generator from before and drew some simple lines. I drew ten layers with each one's hue mapped evenly along the color range.

![](/public/images/2018-01-03-getting-creative-with-perlin-noise-fields/example-19.png){: .clickgif }

I didn't particularly like the details on this one so I decided not to play with the noise levels anymore. Instead I chose to draw some text, just a big 'X' as the particle moved. Along with some layering and choice of color, I ended up with this.

![](/public/images/2018-01-03-getting-creative-with-perlin-noise-fields/example-20.png){: .clickgif }

At this point I remembered [an old program I had seen over at OpenProcessing](https://www.openprocessing.org/sketch/110105) on simulating water color and decided to implement a similar drawing style for my particles. (Note: the animated GIF in this case is not that good due to the limited color palette.)

![](/public/images/2018-01-03-getting-creative-with-perlin-noise-fields/example-21.png){: .clickgif }

I also tried varying the scale of the force. This meant that particles jumped a larger distance each frame, and instead of drawing lines, I just drew small circles at the new locations to end up with this.

![](/public/images/2018-01-03-getting-creative-with-perlin-noise-fields/example-22.png){: .clickgif }

At this point I was really running out of *novel* ideas but, as I had just two more to go, I decided to try different shapes. First I drew rectangles with some variation in their size and color. This was the result. It has the feel of a rough canvas.

![](/public/images/2018-01-03-getting-creative-with-perlin-noise-fields/example-24.png){: .clickgif }

Finally, for the last one, I decided to draw triangles. Every time a particle moved from an old position to a new position, I would use those as the first two points of triangle. I would additionally pick a point somewhere between them displaced vertically, and use that as a third point for a triangle. The result was quite intense!

![](/public/images/2018-01-03-getting-creative-with-perlin-noise-fields/example-25.png){: .clickgif }

Phew! Twenty five images done.

## Why?

Why bother? It's fun! No other reason in particular. Here are some things I've learnt:

1. It was surprisingly difficult to come up with new
ways to work within the constraints I had imposed upon myself.
However, at the end of this exercise, I can point to countless variations one
could pursue using the above designs as a starting point. All of this is just
with one simple algorithm.

3. The more you do, the more ways forward you'll see. If you had told me at the
beginning that I'd come up with the last few designs, I wouldn't have believed
you.  However, just sitting down and working on *something*, *anything*, even
as simple as the first few designs above, gets your brain going.

4. Constraints help. Trying to be creative without constraints, among endless
possibilities, is like being lost in a forest. Trying to be creative within
some constraints is like walking through the forest on a path, occasionally
choosing to go down a couple of paths revealed in front of you.

5. After a while, I started to see higher-level techniques that I could
apply. Stuff like the color-generation algorithm and the space-like background
become reusable components and I've applied them numerous times. So if you
see some complicated bit of work and wonder how in the world the creators came
up with it, they probably didn't do it in one swoop. They probably iterated
from something much simpler to reach that level of complexity over time.

![](/public/images/end.gif){: .center-image }

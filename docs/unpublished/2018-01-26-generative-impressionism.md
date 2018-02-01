---
title: Generative Impressionism
author: Manohar Vanga
image: http://sighack.com/public/images/2018-01-03-getting-creative-with-perlin-noise-fields/example-4.png
description: A simple technique for generating impressionistic versions of photographs.
---

I've been trying to come up with simple and effective techniques for generating
impressionistic versions of images and find myself constantly coming back to
the simple technique outlined here.

Basically, the idea is to pack as many circles of a particular size as
possible on the canvas with the color of the circle taken by averaging the pixels
of the underlying reference image. This is done for successively smaller circles,
which introduces lots of detail while still maintaining the impressionistic look.

Here are some results of this simple algorithm. The reference image
is shown alongside the generated. Clicking on the generated images will take
you to a higher-resolution version.

The technique appears to work better on images that are based around a dominant
color (see the first example below). For images with contrasting colors (_e.g._,
a light face over a dark background, this technique appears to generate a large
number of artefacts. However, from a simplicity perspective, no other technique
comes close. I will probably spend some time refining this technique in the
near future.

**NOTE: The reference images below have been taken from [Pixabay](https://pixabay.com/)
and are licensed under the CC0 license**

![](/public/images/2018-01-26-generative-impressionism/example1.jpg)
[![](/public/images/2018-01-26-generative-impressionism/example1.png)](/public/images/2018-01-26-generative-impressionism/example1.png){:target="_blank"}

![](/public/images/2018-01-26-generative-impressionism/example2.jpg)
[![](/public/images/2018-01-26-generative-impressionism/example2.png)](/public/images/2018-01-26-generative-impressionism/example2.png){:target="_blank"}

![](/public/images/2018-01-26-generative-impressionism/example3.jpg)
[![](/public/images/2018-01-26-generative-impressionism/example3.png)](/public/images/2018-01-26-generative-impressionism/example3.png){:target="_blank"}

![](/public/images/2018-01-26-generative-impressionism/example4.jpg)
[![](/public/images/2018-01-26-generative-impressionism/example4.png)](/public/images/2018-01-26-generative-impressionism/example4.png){:target="_blank"}

![](/public/images/2018-01-26-generative-impressionism/example5.jpg)
[![](/public/images/2018-01-26-generative-impressionism/example5.png)](/public/images/2018-01-26-generative-impressionism/example5.png){:target="_blank"}

![](/public/images/end.gif){: .center-image }

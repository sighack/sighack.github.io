---
title: Image-Based Palettes Using k-Means Clustering
author: Manohar Vanga
image: http://sighack.com/public/images/2018-01-03-getting-creative-with-perlin-noise-fields/example-4.png
description: A quick demonstration of how k-means clustering can be used to extract basic color palettes from images.
---

*All Processing code for this article, along with images, can be found [on Github](https://github.com/sighack/k-means-segmentation)*

In my previous post I showed [how to generate value sketches using k-means
clustering](generative-value-sketches-using-k-means-clustering).
I wanted to follow up by mentioning another use of the k-means clustering
algorithm; the generation of simple palettes based on images.

The advantage of using k-means to generate palettes based on images is that
it's simple and quickly gets you a basic set of colors to work with. Of course,
it comes with its disadvantages as well; since our k-means implementation
averages colors of all pixels assigned to the same cluster, we tend to lose
out colors that "pop", and end up getting somewhat subdued versions of these
colors. This method is therefore more suitable for images that don't have large
color contrasts (_e.g._, see the simple portraits below).

This is just a quick extension of my previous post, so I haven't spent much time
trying to improve it. One way to improve this might be to employ a
different color space such as HSB. Another might be to detect bright colors
separately using a different approach and add them to the palette.

Here are some examples of this method using five clusters.
Note the lack of bright highlight colors which is especially noticable in the
landscape examples below.

![](/public/images/2018-02-04-image-based-palettes-using-k-means-clustering/l1.png)
![](/public/images/2018-02-04-image-based-palettes-using-k-means-clustering/l2.png)
![](/public/images/2018-02-04-image-based-palettes-using-k-means-clustering/l3.png)
![](/public/images/2018-02-04-image-based-palettes-using-k-means-clustering/l4.png)
![](/public/images/2018-02-04-image-based-palettes-using-k-means-clustering/p1.png)
![](/public/images/2018-02-04-image-based-palettes-using-k-means-clustering/p2.png)
![](/public/images/2018-02-04-image-based-palettes-using-k-means-clustering/p3.png)
![](/public/images/2018-02-04-image-based-palettes-using-k-means-clustering/p4.png)

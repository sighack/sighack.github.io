---
title: Crazy-High-Resolution Images Using Tile Stitching
layout: post
author: Manohar Vanga
image: http://sighack.com/public/images/2018-01-03-getting-creative-with-perlin-noise-fields/example-4.png
description: Generate very high-resolution images in Processing by rendering images as tiles and stitching them together.
---

This is another quick tip on how to generate ridiculously high-resolution images in
Processing. I don't particularly have a good use for it but found it fun to implement,
but I'm sure it would help someone interested in printing gigantic images!
This is now part of my [Processing boilerplate](https://github.com/sighack/processing-boilerplate)
that I used as scaffolding for my projects.

I won't go into detail in explaining the exact logic, but it involes some simple
translations of a seeded image. This allows for re-creating an image over and over
again, translating it to bring the correct tile onto the drawing area, and rendering
it out as a separate image. Finally, a simple bash script stitches them all together
into a single image.

I was able to generate images of up to 50,000x50,000 pixels. The limiting factor is
really your memory, and when that runs out, your available disk space. Other than
that, go nuts!

Here is the code that does the exporting of individual tiles in case you're interested
in incorporating it into your own sketches:

```java
/* Set the width and height of your screen canvas in pixels */
final int CONFIG_WIDTH_PIXELS = 500;
final int CONFIG_HEIGHT_PIXELS = 500;

/*
 * When generating high-resolution images, the CONFIG_SCALE_FACTOR
 * is used as the multiplier for the number of pixels. (e.g, a
 * canvas of 1000x1000px with a scale factor of 5 gives a
 * 5000x5000px image.
 */
int CONFIG_SCALE_FACTOR = 10;
int CONFIG_NUM_XTILES = 2;
int CONFIG_NUM_YTILES = 2;

void saveHighResTiled(int scaleFactor, int nxtiles, int nytiles) {
  int tWidth = width / nxtiles;
  int tHeight = height / nytiles;
  for (int i = 0; i < nxtiles; i++) {
    for (int j = 0; j < nytiles; j++) {
      PGraphics hires = createGraphics(
                        tWidth * scaleFactor,
                        tHeight * scaleFactor,
                        JAVA2D);
      println("Saving high-resolution tile: " + j + ", " + i);
      beginRecord(hires);
      hires.scale(scaleFactor);
      pushMatrix();
      translate(-i*tWidth, -j*tHeight);
      seededRender();
      popMatrix();
      endRecord();
      hires.save(seed + "-tile-" + j + "-" + i + ".png");
      println("Finished");
    }
  }
}
```

Note that the `seededRender()` function above is what ensures that the image being
generated is always the same. This allows for doing this over and over again inside
a loop for each tile. You can call this function as shown below:

```java
saveHighResTiled(CONFIG_SCALE_FACTOR, CONFIG_NUM_XTILES, CONFIG_NUM_YTILES);
```

The image generated uses the width and height of the canvas (configured to be
500x500 pixels above) as the size of each individual tile. It then uses the
`CONFIG_SCALE_FACTOR` to determine what the final size should be. A factor of
10 means the output will be 5000x5000 pixels in size. However, this won't be just
a single image but in multiple tiles as specified by `CONFIG_NUM_XTILES` and
`CONFIG_NUM_YTILES`.

The file names also contain the seed value in case the image needs to be recreated.

## Stitching Tiles

I use [this script](https://github.com/sighack/processing-boilerplate/blob/master/code/stitch.sh)
to stitch images together, which uses ImageMagick's `montage` command internally to do
the stitching. So make sure you have [ImageMagick installed](https://imagemagick.org/script/download.php)
for your OS.

Enjoy! If you do end up plastering some building somewhere using this tool, drop me a
line over [on Twitter](https://twitter.com/sighack)!

![](/public/images/end.gif){: .center-image }

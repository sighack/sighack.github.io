---
title: "Exporting High-Resolution Images in Processing"
author: Manohar Vanga
image: http://sighack.com/public/images/2018-01-03-getting-creative-with-perlin-noise-fields/example-4.png
description: A tutorial on two simple ways to export high-resolution images of your artwork in Processing.
---

In this post we're going to look at two ways to export high-resolution versions
of your artwork from Processing.

The first method we're going to look at is to draw everything we draw on the screen
onto an additional off-screen `PGraphic` that has been scaled to the size we
want.

In the second approach, we'll first generate a PDF of our artwork and then use
command-line tools to generate a high-resolution PNG version.

**NOTE: If you want to skip the details and start a new sketch with all this built in, you can just
copy-paste this [boilerplate code from over here on GitHub](https://gist.github.com/mvanga/b1b8839f94aae70e34cfa3fb334e8845).**

In order to create high-resolution images, we first need to make our sketch _deterministic_. That means
we make sure that we can always recreate whatever is on the screen exactly
the same way.

## Creating Deterministic Sketches

The only unpredictable parts of a Processing sketch are calls to `random()` and
`noise()`, as well as the use of time-related functions like `millis()`. The
way to fix the first two is to simply use a known number as the _seed_ for
Processing's (pseudo)random-number generator. We do this with the `randomSeed()`
and `noiseSeed()` functions.

There is no easy way to mitigate the unpredictability
of `millis()` so you cannot use it in your sketches if you want to use this
technique.

Here is a basic sketch for generating a deterministic image.

```java
int seed;

void setup() {
  size(500, 500);
  seed = millis();
  seededRender();
}

void draw() {
}

void seededRender() {
  randomSeed(seed);
  noiseSeed(seed);
  render();
}

void render() {
  /* Do your drawing in here */
}
```

Above, in `setup()`, we first pick some random initial number for the seed using
`millis()`. Note that the seed itself can be chosen randomly, but to re-create
an identical image, the same seed needs to be used. We therefore store it in
the `seed` variable.

We then call the `seededRender()` function, which just sets the seeds using
the `randomSeed()` and `randomNoise()` calls before calling a user-defined
`render()` function. This is where we write all our drawing code.

## Technique #1 - Draw to Off-Screen Buffer

The basic idea here is to be able to press a single key and have Processing
save a high-resolution version of whatever is on screen.

Now that our sketch is deterministic and only dependent on a seed to recreate
an image, here is a function that saves a high-resolution PNG image.

```java
void saveHighRes(int scaleFactor) {
  PGraphics hires = createGraphics(
                        width * scaleFactor,
                        height * scaleFactor,
                        JAVA2D);
  println("Generating high-resolution image...");

  beginRecord(hires);
  hires.scale(scaleFactor);
  seededRender();
  endRecord();

  hires.save(seed + "-highres.png");
  println("Finished");
}
```
The `saveHighRes()` function is where all the magic
happens. It creates a
`PGraphic` instance with scaled-out dimensions (based on our
configured scale factor), and begins recording any drawing actions performed.
However, before calling our `seededRender()` function, it first tells Processing
to scale out any drawing actions that are performed using the
`scale()` function. Finally, once our
`render()` function has finished, it ends the recording and writes the image to disk.

I've successfully used this technique to generate images as large
as 10,000x10,000 pixels. The limiting factor is the amount of RAM available to
Processing, which can be increased to a certain degree in the preferences window.

![](/public/images/exporting-high-resolution-images-in-processing/preferences.png)

## Technique #2 - Generate a PDF

An alternative if you want to generate large images for which you do not have
memory available, we can generate a PDF instead. The technique for generating
is similar the recording technique shown above. Here is the function I use for
this purpose.

```java
import processing.pdf.*;

...

void savePDF() {
  println("Saving PDF image...");
  beginRecord(PDF, seed + "-vector.pdf");
  seededRender();
  endRecord();
  println("Finished");
}
```

This trick has been taken [from the documentation for the PDF library in Processing](https://processing.org/reference/libraries/pdf/index.html).
Just remember to add the `import` line at the top of your sketch or Processing will complain.

## Putting It Together

I use a keypress handler to allow me to export to low-resolution, high-resolution,
and vector versions. I also store the seed value in the filename itself so that
I can recreate it later if needed. It looks like this:

```java
/*
 * The keyPressed handler handles the following
 * -- If the key 's' (lower case) is pressed, then
 *    it will save a low-resolution version of the
 *    image into a file '<seed>-lowres.png'.
 *
 * -- If the key 'h' (lower case) is pressed, then
 *    it will save a high-resolution version into
 *    the file '<seed>-highres.png', scaled by an
 *    amount set in the SCALE_FACTOR variable.
 *    So if your screen width is 500 pixels, a
 *    scale factor of 10 will generate a
 *    high-resolution version that is 5000x5000px.
 *
 * -- If the key 'p' (lower case) is pressed, then
 *    it will save a vector version as PDF into the
 *    file '<seed>-vector.pdf', which is inherently
 *    scalable to any resolution.
 *
 * -- If any other key is pressed, a new random
 *    seed is generated and the render function
 *    called again to generate a new artwork.
 */
void keyPressed() {
  if (key == 's') {
    saveLowRes();
  } else if (key == 'h') {
    saveHighRes(CONFIG_SCALE_FACTOR);
  } else if (key == 'p') {
    savePDF();
  } else {
    seed = millis();
    seededRender();
  }
}
```

If you want to start a new sketch with all this built in, you can just
copy-paste this [boilerplate code from over here on GitHub](https://gist.github.com/mvanga/b1b8839f94aae70e34cfa3fb334e8845).

## Converting a PDF to PNG

It's annoying how information on doing something so easy is so difficult to
find on the web so I'm adding this one additional piece of information here.

Once you have a PDF file, you might want to convert it to a PNG or other
raster format. To do this, I use the `pdftoppm` command-line utility that is part
of the [Poppler library](https://poppler.freedesktop.org/).

```
pdftoppm processing.pdf outputfilename -png -r 300
```

This converts the file `processing.pdf` and saves a new file `outputfilename.png`.
The last argument describes how many pixels per inch should be generated,
with 72 pixels making up 1 inch in a Processing sketch. So, a 720x720 pixel
sketch would be 10x10 inches wide, and using a value of 300 with `pdftoppm`
would result in a 3000x3000 pixel image.

![](/public/images/end.gif){: .center-image }

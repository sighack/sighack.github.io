---
title: Convert Processing Sketches into Animated GIFs
layout: post
author: Manohar Vanga
image: http://sighack.com/public/images/make-animated-gifs-in-processing/out3.gif
description: A tutorial on how to covert your Processing sketches into animated GIFs.
---

This is another quick tutorial on how to make GIFs in Processing.

The recommended approach is to use the **gifAnimation** library. However, I've
found that the GIFs created by it can be a little glitchy. I'll quickly show
this approach and then show some of the glitches I've encountered. I'll end
by mentioning two more reliable approaches that I've found: one using ImageMagick
and another using FFmpeg.

## Approach 1: GIFs with gifAnimation

Import the **gifAnimation** library. If you don't have it installed, select
"Add Library" from the "Import Library" submenu within the Sketch menu.
You can also get it directly [from Github](https://github.com/01010101/GifAnimation) if you want.

This should add the following line to the top of your sketch:

```java
import gifAnimation.*;
```

Now create a GIF variable and set it up.

```java
GifMaker gifExport;

gifExport = new GifMaker(this, "out.gif");
gifExport.setRepeat(0); // 0 means "loop forever"
```

```java
gifExport.setDelay(30);
gifExport.addFrame();
```

Finally, finish your GIF and have Processing write it to the final file
using the `finish()` function.

```java
gifExport.finish();
```

I have a utility class that I use for this, which looks like the following:

```java
import gifAnimation.*;

class GIF {
  GifMaker gif;
  GIF(PApplet app, String filename) {
    gif = new GifMaker(app, filename, 100);
    gif.setRepeat(0); // 0 means endless loop
  }

  void addFrame(int delay_in_frames) {
    gif.setDelay(delay_in_frames);
    gif.addFrame();
  }

  void save() {
    gif.finish();
    println("Done!");
  }
};
```

To use this, here's a simple sketch that animates a red circle horizontally
across a black background.

```
GIF g;
int i = 0;

void setup() {
  size(500, 200);
  
  g = new GIF(this, "out.gif");
  frameRate(30);
  
  fill(255, 0, 0);
  noStroke();
  
}

void draw() {
  background(0);
  ellipse(i, height/2, 200, 200);
  
  if (i >= width) {
    /* Add a 2 second delay for the last frame */
    g.addFrame(2000);
    g.save();
    noLoop();
  } else {
    /* Add a framerate-proportional delay for other frames */
    g.addFrame(1000/30);
    println("Added frame " + i);
  }
  i+=20;
}`java
```

### Issues with gifAnimation

As I mentioned before, I've encountered some glitches with the `gifAnimation`
library and it's particularly problematic when using smaller shapes in your
sketches. My guess is that the encoding performed by the library throws out
small shapes somehow...

Here are the resulting GIFs when drawing a circle with 10, 100, and 200 pixel
diameters:

![](/public/images/make-animated-gifs-in-processing/out1.gif)
![](/public/images/make-animated-gifs-in-processing/out2.gif)
![](/public/images/make-animated-gifs-in-processing/out3.gif)

Notice all that blinking in the first two? It's not clear why this occurs or
if there is some issue with my approach, but I haven't found a way to fix it
thus far. I'll update this page if I do.

## Approach 2: Generate GIFs with ImageMagick

Instead, the better solution I found, which is unfortunately also more involved,
was to save PNGs for each frame and use [ImageMagick](https://www.imagemagick.org/) to generate the final GIF.

Download ImageMagick for your OS [here](https://legacy.imagemagick.org/script/download.php).

Now open up a terminal for your OS and navigate to the folder containing your
saved PNGs (use `saveFrame("#######.png")` to do this in Processing). Type
the following command:

    convert -delay 30 *.png +repage -loop 0 out.gif


## Approach 3: Generate GIFs with FFmpeg

You can also generate GIFs using [FFmpeg](https://www.ffmpeg.org/). I use the
following script taken from [this nice tutorial on getting high-quality GIFs
using FFmpeg](http://blog.pkh.me/p/21-high-quality-gif-with-ffmpeg.html)

```bash
#!/bin/sh

palette="/tmp/palette.png"
filters="fps=15,scale=320:-1:flags=lanczos"

ffmpeg -v warning -i %05d.png -vf "$filters,palettegen" -y $palette
ffmpeg -v warning -i %05d.png -i $palette -lavfi "$filters [x]; [x][1:v] paletteuse" -y $1)
```

Remember to save
your frames with `saveFrame("#####.png")`, using five hash signs to match the
`%05d.png` in the script. Now just save the script as `gif.sh` and invoke it
withing the folder containing the PNGs and an output file name as an argument:

    $ cd <folder-with-PNGs>
    $ ./gif.sh out.gif

Have fun creating GIFs!

![](/public/images/end.gif){: .center-image }

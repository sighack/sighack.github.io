---
title: "Making Videos from Processing Sketches"
author: Manohar Vanga
image: http://sighack.com/public/images/make-videos-from-processing-sketches/moviemaker.png
description: A tutorial on simple ways to export videos from your Processing sketches.
---

This is another quick tutorial on how to create videos from Processing sketches!
I post stuff like this here so that I have a quick reference to it later 
during development and don't have to hunt around on Google for the right
approach that worked for me.

## Approach 1: Processing's Movie Maker Tool

Creating videos from Processing is actually quite a breeze with the Movie Maker
tool that comes as a part of it; something that I wasn't aware of before.

In Processing, click on the **Tools** menu and click **Movie Maker**. You should
see the following window open up:

![](/public/images/make-videos-from-processing-sketches/moviemaker.png)

As can be seen from the helpful documentation provided within the window
itself, generating frames for your video in Processing simply involves throwing
in a `saveFrame("######.tif")` command at the end of your `draw()` function.

Note that TIF and TGA take a large amount of space and I had to use an external
disk to store them on my Macbook Air. The upside is that saving them is very fast.

On the other hand, PNGs (`saveFrame("######.png")`) require lesser space but
take much longer to write to disk.

Pick your poison! Making videos is resource intensive no matter what you try...

Once you have these numbered frames saved in a folder, you can give the path
to the Movie Maker tool along with an (optional) audio file for the background
music.

The tool also allows setting the frame rate of the output video which is very
helpful when trying to [synchronize audio with actions in your sketch](extract-onset-beat-times-from-audio-files).

Gotta love Processing!

## Approach 2: Using ffmpeg

Alternatively, if you want more control over the video-creation process, you
can use [FFmpeg](https://www.ffmpeg.org/) to create a video from a folder of
images. I typically use the command line as shown below:

    ffmpeg -framerate 30 -pattern_type glob \
        -i '*.png' -i example.mp3 \
         -c:v libx264 \ -r 30 -pix_fmt yuv420p out.mp4

The above command takes all the PNG's in the current folder and an `example.mp3`
file to create a video (_out.mp4_) at a frame rate of thirty frames per second.
You should of course edit the paths and the frame rate above to match your needs.

NOTE: the order of images above is based on the sequential numbers automatically
generated by Processing when naming files. If you have some different naming
convention, you'll need to change the `*.png` so that files are listed in
the correct frame order.

That's it!

![](/public/images/end.gif){: .center-image }
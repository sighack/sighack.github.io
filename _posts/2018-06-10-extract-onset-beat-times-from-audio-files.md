---
title: Extracting Onset (Beat) Times from Audio Files
layout: post
author: Manohar Vanga
image: http://sighack.com/public/images/2018-02-09-generative-sketch-starry-night/final-small.png
description: A tutorial on how to use the aubio library to extract beat or onset times from audio files.
---

I recently created a video for one of my sketches and wanted the animation to
be synchronized with the rhythm of the background track. This is a quick
tutorial explaining how I did this using the fantastic
[aubio](https://aubio.org/) library and Processing. Note that you will need to
have some familiarity with using the command line to do this.
<iframe src="https://player.vimeo.com/video/254623899" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

The aubio library comes with a bunch of command line tools, and the one I used
was the `aubioonset` command for getting a list of timestamps of detected "note
onsets", a term that is used to describe the beginning of a musical note.

The basic workflow looks like the following: _(i)_ get a list of onset times
using `aubioonset`, _(ii)_ translate these into specific frame numbers for
Processing, and _(iii)_ perform some action in your sketch at these times.

## Detecting Note Onset Times with `aubioonset`

The `aubioonset` tool makes this very easy. First, get the library itself
from Github using `git` at the command line:

    $ git clone https://github.com/aubio/aubio.git

Alternatively, you can visit the [project page on
Github](https://github.com/aubio/aubio) and download and extract a zip file
directly.

Next, compile the library as shown below:

    $ cd aubio
    $ make

This worked flawlessly on my Macbook Air running MacOS High Sierra (10.13).
If you have any issues with your specific setup, you might need to Google
around a bit.

The example programs (of which `aubioonset` is one) should now be in the
`build/examples` subdirectory. The documentation for the `aubioonset` tool
can be found [here](https://aubio.org/manpages/latest/aubioonset.1.html).

Since `aubioonset` outputs the onset time in milliseconds, I wrote a wrapper
script to convert these values into Processing frame numbers, given a
user-specified frame rate:

```bash
#!/bin/bash

if [ "$#" != "2" ]; then
    echo "usage: $0 <path-to-audio-file> <processing-framerate>"
    exit 0
fi

AUDIOFILE=$1
FRAMERATE=$2
AUBIO_PATH=./aubioonset

# Get a list of onset times in ms (one per line)
ONSETLIST=`$AUBIO_PATH --input $AUDIOFILE --onset-threshold 0.1 --time-format ms`

# Print out the 'totalFrames' variable
TOTAL=`echo $ONSETLIST | wc -w  | xargs`
echo "int totalFrames = $TOTAL;"

# Print out the 'actionFrames' array
echo -n "int actionFrames = { "
for i in $ONSETLIST; do
    echo "$i * $FRAMERATE / 1000" | bc
done | tr "\\n" "," | sed 's/,$/ };/'
```

Paste that into your favorite editor, change the `AUBIO_PATH` variable to point
to the location of your compiled `aubioonset` program, and save the file as
`onsets.sh`. Also make sure to make the script runnable via:

    $ chmod +x onsets.sh

The invocation of the script is shown below as well as the output. The
script is passed the path to an audio file and the frame rate of your sketch,
and it performs all the necessary conversions for you.

    $ ./onsets.sh example.mp3 30
    int totalFrames = 591;
    int[] actionFrames = { 6,32,58,75,97,114,131,153,175,
    ...
    ...
    ...
    8085,8101,8117,8147,8190,8230,8316,8343,8430,8614 };

The script prints out two variables that can be copy-pasted into Processing.
The first, `totalFrames` specifies the number of onset times that were
detected, and the `actionFrames` is an array containing the frame numbers of
each onset.

## Using Onset Times in Processing

To use these two variables in Processing is very simple:

```java
/* These are copy-pasted from the onsets.sh output */
int totalFrames = ...;
int[] actionFrames = { ... };

int frame_index = 0;

void setup() {
}

void draw() {
  if (frame_index < totalFrames &&
      frameCount == frames[frame_index]) {
    current_frame++;
    /* Perform some action here at onset time */
  }

  saveFrame("#####.tga");
}
```

In the above code, we first copy-paste the two variables that are given to
us by the `onsets.sh` script. We additionally need one variable: 
`frame_index` which is initialized to `0` (and represents the current index
into the `actionFrames` array).

Now, in the `draw()` function, we check if we have reached our total number
of onset times (stored in `totalFrames`), and if not, check if the frame number
at the current index is equal to the current frame (using Processing's `frameCount`
variable), and if so, perform some actions.

Finally every frame is saved as an image, which can then be [glued together into
a video](make-videos-from-processing-sketches), remembering to set the correct
frame rate for the video as used in Processing.

And that's it!

![](/public/images/end.gif){: .center-image }

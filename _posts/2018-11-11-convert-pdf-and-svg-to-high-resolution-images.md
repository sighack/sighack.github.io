---
title: Converting PDFs and SVGs to High-Resolution Images
layout: post
author: Manohar Vanga
image: /public/images/convert-pdf-and-svg-to-high-resolution-images/test-1-mono.jpg
description: Convert PDF and SVG files into high-resolution PNG, JPEG, and TIFF images
---

I find myself doing this constantly so 
this is another quick tip on how to convert vector image formats (PDF and SVG) into
high-resolution raster ones.

<ul align="center" class="half">
<li class='nostyle'><a class="toce" href="#a">Converting PDFs to High-Resolution PNGs</a></li>
<li class='nostyle'><a class="toce" href="#b">Converting PDFs to High-Resolution JPEGs</a></li>
<li class='nostyle'><a class="toce" href="#c">Converting PDFs to High-Resolution TIFFs</a></li>
<li class='nostyle'><a class="toce" href="#d">Converting PDFs to Bitmap and Grayscale Formats</a></li>
<li class='nostyle'><a class="toce" href="#e">Converting SVGs to PNG and JPEG Formats</a></li>
</ul>

<a name="a"></a>
## Converting PDFs to High-Resolution PNGs

If you try to searh for this, most suggestions bring up ImageMagick's `convert` tool.
However, for some reason I have never had any luck in figuring out the right combination
of command-line incantations to make it work for creating high-resolution images, not to
mention how slow it runs.

Instead, the tool I found to work most consistently for me is one called `pdftoppm`.
You can install it indirectly on MacOS through homebrew the [Poppler PDF rendering
library](https://poppler.freedesktop.org/):

    brew install poppler

For Debian-based Linux users, you can grab the `poppler-utils` package:

    sudo apt-get install poppler-utils 

Here is a simple example of how to convert a PDF into a high-resolution PNG image that
is suitable for printing:

    pdftoppm input.pdf outputname -png -rx 300 -ry 300

The `-rx` and `-ry` options above specify the DPI to use when generating the PNG for the
X and Y axes, respectively (the default is 150). Typically, a value of 150 to 300 is good
enough for prints, with little visible difference beyond that.

If you're wondering how big your image will be, you should know that PDF sizes are in
_points_, where 72 points makes an inch. So if you have a 72x72 point PDF image, the
above command would see a 1x1 inch vector image, and render it into a 300x300 PNG (since
we specify a DPI of 300).

The advantage of PNG is that it is compressed but lossless, in that it maintains all the
pixel information of the original image while providing a smaller file size. This is
contrast to something like BMP, which is lossless _but uncompressed_, and JPEG which is
compressed but _lossy_.

<a name="b"></a>
## Converting PDFs to High-Resolution JPEGs

Here is another example of converting a PDF to a high-resolution JPEG file:

    pdftoppm input.pdf outputname -jpeg -rx 300 -ry 300

The only difference is the `-jpeg` flag above. In case you were wondering, JPEG images
are _lossy_ in that they throw away pixel information from the original image in order
to have smaller file sizes suitable for distribution (e.g., on a website). It does this
by exploiting the specifics of how our eyes percieve colors and details relative to one
another.
To control the compression level when JPEG output is specified, you can use the `-jpegopt`
option:

    pdftoppm input.pdf outputname -jpeg -rx 300 -ry 300 \
             -jpegopt quality=50,progressive=yes

Above, we set the quality of the JPEG output to 50 (you can pick a range between 1 and
100, with the latter being the highest quality possible). Remember that the lower in
quality you go, the more lossy the image, and smaller the resulting file size.

The `progressive` option above specifies how pixels get loaded. [Here is a simple demo](http://pooyak.com/p/progjpeg/)
that illustrates this.

<a name="c"></a>
## Converting PDFs to High-Resolution TIFFs

Similar to the above, you can also convert PDFs to TIFF images with a simple change of
the command-line switch:

    pdftoppm input.pdf outputname -tiff -rx 300 -ry 300

The TIFF format is lossless and _supports layers_. It's typically used over PNGs when the
image has multiple layers and you don't want to flatten them into a single one (which
would happen if you converted to PNG).

<a name="d"></a>
## Other Fun Formats!

The `pdftoppm` tool can also convert to a bitmap format ([Portable Bitmap Format](https://en.wikipedia.org/wiki/Netpbm_format))
which is literally a text file of ones and zeroes (in binary) representing the black and
white version of the PDF:

    pdftoppm input.pdf outputname -mono -rx 300 -ry 300

|-----|------|
|![](/public/images/convert-pdf-and-svg-to-high-resolution-images/test-1.jpg)|![](/public/images/convert-pdf-and-svg-to-high-resolution-images/test-1-mono.jpg)

You can also generate a grayscale version of it which is output in the PGM ([Portable Graymap Format](https://en.wikipedia.org/wiki/Netpbm_format)):

    pdftoppm input.pdf outputname -gray -rx 300 -ry 300

|-----|------|
|![](/public/images/convert-pdf-and-svg-to-high-resolution-images/test-1.jpg)|![](/public/images/convert-pdf-and-svg-to-high-resolution-images/test-1-gray.jpg)

The `pdftoppm` tool also provides other options to deal with things like cropping to
specific parts of the PDF, scaling the image out to a different shape, rendering
multi-page PDFs as well as password-protected PDFs.

<a name="e"></a>
## Converting SVGs to High-Resolution PNG and JPEG

Finally, I want to add a note on converting SVGs to PNG or JPEG formats as I find myself
doing this quite often. Again, while the generally-recommended tool is ImageMagick's
`convert` tool, it never reliably worked for me for more complex SVGs.

Instead I use a tool called `rsvg-convert` which hasn't failed me yet.
You can install on a Mac using:

    brew install librsvg

On Debian-based systems you can get it using:

    sudo apt-get install librsvg2-bin

Here are two examples equivalent to the above `pdftoppm` commands to convert SVGs to both
PNG and JPEG:

    rsvg-convert --format=png --width 3000 --height 3000 myfile.svg
    rsvg-convert --format=jpeg --width 3000 --height 3000 myfile.svg

Here, we specify the width and height of the output file directly using the `--width` and
`--height` switches, respectively. You can also instead specify the DPI as before:

    rsvg-convert --format=png --dpi-x 300 --dpi-y 300 myfile.svg
    rsvg-convert --format=jpeg --dpi-x 300 --dpi-y 300 myfile.svg

The output file size will depend on the dimensions of your SVG.

That's all for now! I'll update this post with new information if something changes, but
for now these two tools seem to work well for me. Hopefully, it helps you as well!

![](/public/images/end.gif){: .center-image }

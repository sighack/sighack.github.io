---
title: Processing by Example
layout: page
permalink: /processing-by-example
---

1. It's easier to learn a subset of the language by aiming at a specific
task. In the case of this tutorial, it's aimed specifically at learning
enough Processing to be able to create static generative art. However, this
knowledge directly translates to creating a strong foundation for anything
else you might want to eventually do (e.g. making games, interactive art,
interfacing with electronics) as the programmatic ideas stay the same.

2. While this tutorial is geared specifically at Processing/Java, my hope
is to explain concepts in a way that translates easily to other languages.
What differs primarily across similar languages is the _syntax_ of how to specify
certain actions, which is much easier to pick up if you understand them from
another language.

An algorithm is a set of instructions.

In computer programming, a function is an implementation of an algorithm.

## The Basics

### Example 1: The println() function prints to the console

The `println()` _function_ takes a _string_ _parameter_ and outputs
it to the console at the bottom of the Processing IDE.

> **Definition** A _function_ is a a block of code that performs a specific
> task. They are useful for hiding the details of how something is done (_e.g._,
> the code needed to print something to the console) behind a nice name (_e.g.,_ `println()`).
> Functions are _called_ or executed by writing their name followed by a
> comma-separated list of parameters inside parantheses.

> **Definition** A _parameter_ is simply some information passed to a function
> that allows it to do its job. For functions that take no parameters, we simply
> append their name with empty parentheses when calling them or referring to
> them.

> **Definition** A _string_ is a data type. For now, just remember that
> strings are text surrounded by double quotes.

```java
println("Hello World!");
```

![](/public/images/processing-by-example/println-1.png){: .center-image }

### Example 2: The setup() and draw() functions

_Control flow_ in Processing happens via two functions named `setup()`
and `draw()` that you, the programmer, writes.

> **Definition** The term _control flow_ refers to the sequence in which lines
> of code are executed.

The `setup()` function is automatically called by Processing **once at the start
of your sketch**, followed by **repeated calls to the `draw()` function**.

```java
void setup() {
  println("Inside setup()");
}

void draw() {
  println("Inside draw()");
}
```

![](/public/images/processing-by-example/setup-draw-1.png){: .center-image }

Within a block of code (everything between two curly braces `{ ... }`), by default,
statements are executed from top to bottom.
Later on, we'll
learn how to alter this top-down flow in various ways when we look at _control
flow_ statements (_e.g._ loops and conditionals).

```java
void setup() {
  println("Inside setup(). Statement A.");
  println("Inside setup(). Statement B.");
  println("Inside setup(). Statement C.");
  println("Inside setup(). Statement D.");
}

void draw() {
  println("Inside draw(). Statement A.");
  println("Inside draw(). Statement B.");
}
```

![](/public/images/processing-by-example/setup-draw-3.png){: .center-image }

### Example 3: The draw() function can be omitted

When creating static images, the `draw()` function can be omitted entirely,
and all drawing code can be written in the `setup()` function.

```java
void setup() {
  println("Inside setup()");
}
```

![](/public/images/processing-by-example/setup-draw-2.png){: .center-image }

### Example 4: Setting the size of the canvas

You can set the size of the _canvas_ using `size()`.

> **Definition** The _canvas_ is a surface on which all drawing operations
> take place, similar to a canvas on which one would paint. Processing
> creates a _visible canvas_ in a window when we run a sketch. We can also
> create _invisible canvases_ (_i.e._, ones that exist but aren't
> drawn on the screen, unless explicitly requested), which we'll look at later.


```java
void setup() {
  size(200, 200);
}
```

![](/public/images/processing-by-example/size-1.png){: .center-image }

### Example 5: Setting the width of the canvas

The first _parameter_ to the `size()` _function_ specifies the width of the
canvas in pixels.

```java
void setup() {
  size(400, 200);
}
```

![](/public/images/processing-by-example/size-2.png){: .center-image }

### Example 6: Setting the height of the canvas

The second parameter to the `size()` function specifies the height of the
canvas in pixels.

```java
void setup() {
  size(200, 400);
}
```

![](/public/images/processing-by-example/size-3.png){: .center-image }

### Example 7: Writing single-line comments

You can add comments to your code to later help you understand it. Comments
are entirely ignored by Processing and are only for the benefit of the reader.
Single line comments can be written by starting the line with two forward slashes (`//`).

```java
void setup() {
  // Example comment: set the size of the canvas to 200x200 pixels
  size(200, 200);
}
```

### Example 8: Writing multi-line comments

For multi-line comments, you enclose your text inside a preceding `/*` and an ending `*/

```java
void setup() {
  /*
  Sets the size of the canvas to 200x200 pixels!
  */
  size(200, 200);
}
```

Typically, multi-line comments can be cleaned up for better readability through a bit
of spacing changes and adding preceding `*`'s.

```java
void setup() {
  /*
   * Sets the size of the canvas to 200x200 pixels!
   * We can even write more comments for a detailed
   * explanation. The preceding asterisks are ignored
   * as they are part of the comment as well.
   */
  size(200, 200);
}
```

### Example 9: Commenting specific lines

You can use either single-line comments or multi-line comments to add comments
at the end of a line.

```java
void setup() {
  size(200, 200); // This is a single-line comment
}
```

```java
void setup() {
  size(200, 200); /* This is a multi-line comment */
}
```

### Example 10: Setting a background color for the canvas

The `background()` function can be used to set the canvas background color. Colors
can be specified in Processing in a bunch of ways. The ones you'll most commonly use
are highlighted below.

You can set the background to an RGB color by passing three parameters to the
`background()` function: the red, green, and blue components each ranging between
0 and 255.

~~~~~java
void setup() {
  // Set the background to black
  background(0, 0, 0);
}
~~~~~
{: .half-width}
![](/public/images/processing-by-example/bg-1.png){: .right-image }

~~~~~java
void setup() {
  // Set the background to red
  background(255, 0, 0);
}
~~~~~
{: .half-width}
![](/public/images/processing-by-example/bg-2.png){: .right-image }

~~~~~java
void setup() {
  // Set the background to green
  background(0, 255, 0);
}
~~~~~
{: .half-width}
![](/public/images/processing-by-example/bg-3.png){: .right-image }

~~~~~java
void setup() {
  // Set the background to blue
  background(0, 0, 255);
}
~~~~~
{: .half-width}
![](/public/images/processing-by-example/bg-4.png){: .right-image }

~~~~~java
void setup() {
  // Set the background to an
  // arbitrary RGB value
  background(218, 66, 195);
}
~~~~~
{: .half-width}
![](/public/images/processing-by-example/bg-5.png){: .right-image }

~~~~~java
void setup() {
  // Set the background to white
  background(255, 255, 255);
}
~~~~~
{: .half-width}
![](/public/images/processing-by-example/bg-6.png){: .right-image }

For grayscale RGB colors, the red, green, and blue components always have the same value. Processing
allows you to use a shorthand for this by passing the `background()` function just
one number between 0 (black) and 255 (white).

~~~~~java
void setup() {
  // Set the background to black.
  background(0);
}
~~~~~
{: .half-width}
![](/public/images/processing-by-example/bg-1.png){: .right-image }

~~~~~java
void setup() {
  // Set middle-gray background
  background(128);
}
~~~~~
{: .half-width}
![](/public/images/processing-by-example/bg-7.png){: .right-image }

~~~~~java
void setup() {
  // Set the background to white
  background(255);
}
~~~~~
{: .half-width}
![](/public/images/processing-by-example/bg-6.png){: .right-image }

Processing also allows specifying an RGB color using hex notation.
This is especially convenient when grabbing colors off of images or websites using color pickers, which typically
give the value as a hex string.

~~~~~java
void setup() {
  // Set the background to white
  background(#ff4d4d);
}
~~~~~
{: .half-width}
![](/public/images/processing-by-example/bg-8.png){: .right-image }

### Example 11: Processing's coordinate system

The canvas in Processing can be viewed as a grid of pixels of a given width and
height (which we can specify using the `size()` function). Similar to the graph
paper you might have used when you were in school, Processing's canvas has an
origin and an X and Y axis (since we're working in 2D for now).

However, it should be noted that in Processing **the origin is at the top-left
corner of the canvas, with the positive X axis to the right and the positive
Y axis to the bottom.**

![](/public/images/processing-by-example/coordinates-1.png){: .center-image }

For many drawing operations
you will be _addressing_ various pixels on the canvas using their _coordinates_.
Similar to how you can specify the unique location of your house using a combination of
its number,
street name, and zip code, you can _address_ or specify the location of a pixel on
the canvas using its X and Y coordinates (written as `(x, y)`).

Below is an example of a pixel on the screen (`(50, 50)`). You can visualize it
as being 50 pixels to the right and 50 pixels down from the top left corner of the
canvas.

![](/public/images/processing-by-example/coordinates-2.png){: .center-image }

### Example 12: Zero-based indexing of coordinates

One quirk of addressing pixels is that each axes begins at zero and goes up to
`width-1`. So for example, for a screen size of 100 pixels, the X axis coordinates
range from 0 to 99). This is different from what we're naturally used to, where we count
from one to the number we want (_i.e._ `1, 2, ... 100`). **Note that the total number
of pixels is still the same (_e.g._ for a width of 100, we have pixels 1 through 99 plus
pixel 0, giving us a total of 100 pixels).**

> This technique, called _zero-based indexing_, is a carry-over from older
> programming languages, and provides
> [some practical benefits](https://en.wikipedia.org/wiki/Zero-based_numbering#Computer_programming)
> (_e.g._ making certain arithmetic operations simpler).

The example below labels the coordinates for each of the four corners for a screen
of size `width`x`height`:

![](/public/images/processing-by-example/coordinates-3.png){: .center-image }

## Drawing Primitives

### Example 13: Drawing points with point()

The `point()` function can be used to set individual pixels on the canvas. The
`point()` function takes two parameters: an X and Y coordinate, specifying the
location of the pixel you want to set.

**Note:** We'll look at how to use colors in the
future; for now you should simply try to understand the _syntax_ of how to set
a specific pixel on the screen using `point()`.

```java
void setup() {
  size(200, 200); // Set canvas size to 200x200 pixels
  background(255); // Set the background to white
  point(20, 20);
}
```

![](/public/images/processing-by-example/point-1.png){: .center-image }

![](/public/images/processing-by-example/point-2.png){: .center-image .shadow }

### Example 14: Specifying off-screen pixel coordinates

Most of Processing's basic functions let you happily specify pixel coordinates that are
outside the canvas area (_e.g._ negative values or values exceeding the width/height of
the canvas). It doesn't result in anything being drawn on the canvas but Processing
accepts it without complaint.

The following are all valid, and result in nothing being drawn on the canvas:

```java
void setup() {
  size(200, 200);
  background(255);
  point(-20, 20); // Point on left of window
  point(250, 20); // Point on right of window
  point(20, -20); // Point above window
  point(20, 250); // Point below window
}
```

### Example 15: Drawing lines with line()

Lines can be drawn using the `line()` function, which takes four parameters:
two pairs of X and Y coordinates indicating its start and end point.

~~~~~java
void setup() {
  // Set the background to white
  background(255, 255, 255);
  // Draw a line from (0, 0)
  // to (50, 50).
  line(0, 0, 50, 50);
}
~~~~~
{: .half-width}
![](/public/images/processing-by-example/line-1.png){: .right-image }

Reversing the order of two end points doesn't make a difference and results in
the exact same line as shown in the next example below.

~~~~~java
void setup() {
  // Set the background to white
  background(255, 255, 255);
  // Draw a line from (50, 50)
  // to (0, 0).
  line(50, 50, 0, 0);
}
~~~~~
{: .half-width}
![](/public/images/processing-by-example/line-1.png){: .right-image }


### Example 16: Drawing horizontal lines

Recall that lines require two pairs of X and Y coordinates: the starting point and the
ending point. Horizontal lines can be drawn by keeping the Y value of both these points
the same.

~~~~~java
void setup() {
  // Set the background to white
  background(255, 255, 255);
  // Draw horizontal line at Y=50
  line(10, 50, 90, 50);
}
~~~~~
{: .half-width}
![](/public/images/processing-by-example/line-2.png){: .right-image }

This makes sense if you understand the Processing coordinate system, where the Y axis
increases when going downwards from the top of the canvas.
It essentially tells us "how much down" a point is from the top edge of the canvas. In the
case of a horizontal line, we want both ends of the line to be the "same amount of down"
from the top edge.


### Example 17: Drawing vertical lines

Similar to the previous example, vertical lines can be drawn by keeping the X value of
both endpoints the same
the same.

~~~~~java
void setup() {
  // Set the background to white
  background(255, 255, 255);
  // Draw vertical line at X=50
  line(50, 10, 50, 90);
}
~~~~~
{: .half-width}
![](/public/images/processing-by-example/line-3.png){: .right-image }

Again, the X coordinate for a point essentially tells us "how much right" a point is from
the left edge of the canvas. In the
case of a vertical line, we want both ends of the line to be the "same amount of right"
from the left edge.










### Example 18: Drawing pixels with color() and set()

We'll work with various Processing functions down the line that take a **color
value** as a single parameter. The `color()` function takes the various components
that makes up a color (_e.g._, the red, green, and blue components) and encodes them
into a single value that Processing can use to decode the individual components.

This is convenient as it allows for using any of the different ways colors can be
specified (_e.g._, hex strings, RGB values, a grayscale value) and compresses them
into a single value for functions to use.

Here is an example that embeds a call to the `color()` function inside the `set()`
function to set a white pixel at `(20, 20)` on a canvas with a black background:

```java
void setup() {
  size(200, 200); // Set canvas size to 200x200 pixels
  background(0); // Set the background to black
  set( 20, 20, color(255) );
}
```

![](/public/images/processing-by-example/color-set.png){: .center-image }

The `set()` line above is equivalent to the following:

```java
set( 20, 20, color(255, 255, 255) );
set( 20, 20, color(#ffffff) );
```

Cmd + Shift + 4
Space
Option + Click

https://stackoverflow.com/questions/46375122/is-variable-assignment-a-statement-or-expression
https://www.artima.com/objectsandjava/webuscript/ExpressionsStatements1.html


![](/public/images/end.gif){: .center-image }
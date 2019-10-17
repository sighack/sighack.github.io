---
title: "Generative Color - Creating Variations (Part I)"
author: Manohar Vanga
image: http://sighack.com/public/images/2018-01-03-getting-creative-with-perlin-noise-fields/example-4.png
description: A compilation of procedural color generation algorithms for generative art.
---

**TLDR: This post is the first part in a series of posts on generative color
based on my own explorations. My hope with this first part is that it
serves as a visual guide on creating variations of a base color.**

Color is a pretty vast subject and can get very complex really fast. In
this series on generative color, I'm going to take a bottom-up approach to
procedural color generation that you can incorporate into your artwork. In
particular, I will focus only on _simple_ techniques.

If you're a generative artist or generally interested in creating procedural
content, my hope is that at the end of this series of posts, you have lot more
choice with regards to color instead of being stuck using random RGB values.

## Introduction

In this first part, we're going to focus on understanding the various levers
available to us with regard to color, and how we can generate color variations
of a given base color. That is, for each technique, the goal is to implement
a simple function that takes a base color and returns some controlled variation
of it.

When talking about color, we inevitably have to learn about color spaces, ways
to mathematically represent the range of colors in some way that is easy to
think about. For example, the RGB color space makes it easy to think of colors
in terms of their component "red"-ness, "green"-ness, and "blue"-ness. However,
the RGB color space makes it difficult to think about the relationship between
colors like we're used to in painting (_i.e._, the color wheel).

In this post, we'll briefly cover two color spaces: RGB and HSB (sometimes
also called HSV). Instead of going into boring technical details, we'll
look at these color spaces in terms of their strengths and weaknesses with
regard to our pursuit of generating color variations.

<h3 class='toct'>Covered Techniques</h3>
<p align="center" class="half">
<a class="toce" href="#rgb-mixing">Weighted RGB Mixing</a>
<a class="toce" href="#rgb-blending">RGB Blending</a>
<a class="toce" href="#hue-variation">Hue Variation</a>
<a class="toce" href="#saturation-variation">Saturation Variation</a>
<a class="toce" href="#brightness-variation">Brightness Variation</a>
<a class="toce" href="#sb-variation">S+B Variation</a>
<a class="toce" href="#hsb-variation">H+S+B Variation</a>
</p>

### Takeaways

As this is a fairly long post, I just want to quickly summarize the big
takeaways from it here. Please note that these are just my subjective opinions
and you should feel encouraged to break any and all of these rules if you want!

- **Avoid using the RGB color space if you can.** If forced, use
  [RGB blending](#rgb-blending) to mix in a base color to kill the harshness
  of randomly-generated RGB colors.

- **Use HSB whenever the option is available.** If you're playing around in Processing,
  this is easy to do using the `colorMode()` function.

- **Varying hues results in changes to the base color**, and the best use for it
  is to use small variations to create some natural-looking textures. With
  larger variations, the base color changes quite a bit and you're better off
  picking those colors directly as part of your color palette instead of
  relying on hue-variation to achieve it.

- **Varying saturation lightens the base color.** This can be used to create
  more variations of course using a small variation. One interesting use is
  that when you want to build a color palette around a central color, you
  can lower this to create a slightly-tinted white that fits better.

- **Lowering brightness darkens the base color.** Again, this can be used to create
  better-fitting darks for choosing a palette around a central color.

- Varying both saturation and brightness can create some very strong contrasts
  if used with large variation values, and **gives a very fresh vibe.**

## Weighted RGB Mixing
<a name="rgb-mixing"></a>

The solution that most of us have used at some point or other for generating
color variations is to use random RGB values. Something like this:
```java
color c = color(random(255), random(255), random(255));
```
The biggest problem with this approach is that it's ugly. Randomly varying the red,
green, and blue channels leads to colors that have no _cohesion_ between them.

|-----|------|
|![](/public/images/2018-02-11-generative-color-algorithms/rgb1.png)|![](/public/images/2018-02-11-generative-color-algorithms/rgb2.png)
|![](/public/images/2018-02-11-generative-color-algorithms/rgb3.png)|![](/public/images/2018-02-11-generative-color-algorithms/rgb4.png)

The first method we're going to look at is a simple, incremental improvement
over random RGB values, and involves _adding an extra step of mixing in a
base color with each randomly-generated color_.

There are a couple of ways to perform the mixing in a controlled fashion. In
this technique, to give more control of the mixing, we make use of a
user-specified weight, which specifies the percentage contribution of the
components of the mix color.

For example, a weight of 1 specifies that the 100% of the final RGB components
should come from the mix color while a value of 0.5 specifies
that we should use an equal proportion of the RGB components of both, the base
color, and the color being mixed.

```java
/*
 * Take two colors and mix them using weight 'w', which
 * specifies the proportion of R, G, and B components that
 * should be taken from the color 'a'.
 */
color rgb_mix_weighted(color a, color b, float w) {
  float r, g, b;

  /* Check bounds for weight parameter */
  w = w > 1 ? 1 : w;
  w = w < 0 ? 0 : w;

  /* Mix user-specified color using given weight */
  r = w * red(a)   + (1-w) * red(b);
  g = w * green(a) + (1-w) * green(b);
  b = w * blue(a)  + (1-w) * blue(b);

  return color(r, g, b);
}
```

The above code takes two colors and a weight as arguments and returns a
weighted, mixed color. We can now use this function to generate variations
of a `base` color as shown below:

```java
color random_rgb_mix_weighted(color base, float w) {
  /* Generate components for a random RGB color */
  float r = random(256);
  float g = random(256);
  float b = random(256);
  return rgb_mix_weighted(base, color(r, g, b), w);
}
```

The above function generates a random RGB color, mixes it with a specified
`base` color using a weight `w` for the `base`.

Now because randomly-generated RGB colors are not very harmonious together,
this approach gives better results when using higher weights for the base.
By doing so, what we get are variations of the base color (since it's components
are the primary contributors to the final, mixed color due to the large weight).

Here are some palettes generated using a random base color and a high weight
of 0.9.

|-----|------|
|![](/public/images/2018-02-11-generative-color-algorithms/rgba1.png)|![](/public/images/2018-02-11-generative-color-algorithms/rgba2.png)
|![](/public/images/2018-02-11-generative-color-algorithms/rgba3.png)|![](/public/images/2018-02-11-generative-color-algorithms/rgba4.png)
|![](/public/images/2018-02-11-generative-color-algorithms/rgba5.png)|![](/public/images/2018-02-11-generative-color-algorithms/rgba6.png)
|![](/public/images/2018-02-11-generative-color-algorithms/rgba7.png)|![](/public/images/2018-02-11-generative-color-algorithms/rgba8.png)
{: cellspacing="0" }

The weight can be lowered to create more variation; instead of creating variations
of a base color, it becomes more like adding a tint to randomly-generated ones.
Here is the same as above but with a weight of 0.6.

|-----|------|
|![](/public/images/2018-02-11-generative-color-algorithms/rgba9.png)|![](/public/images/2018-02-11-generative-color-algorithms/rgba10.png)
|![](/public/images/2018-02-11-generative-color-algorithms/rgba11.png)|![](/public/images/2018-02-11-generative-color-algorithms/rgba12.png)
{: cellspacing="0" }

By specifying white as the base color and a high weight, this can be used to
mellow down randomly-generated RGB colors. Not ideal, but better than nothing
I suppose. To see how the weight affects the outcome, here are some examples
of varying weights from 0.2 to 0.8 in intervals of 0.2, with a white base

|-----|------|
|![](/public/images/2018-02-11-generative-color-algorithms/rgba-w-2.png)|![](/public/images/2018-02-11-generative-color-algorithms/rgba-w-4.png)
|![](/public/images/2018-02-11-generative-color-algorithms/rgba-w-6.png)|![](/public/images/2018-02-11-generative-color-algorithms/rgba-w-8.png)
{: cellspacing="0" }

## RGB Blending
<a name="rgb-blending"></a>

One problem with the weighted mixing approach above is that it doesn't mix the way
RGB colors actually mix and can results in unnatural transitions between colours,
resulting in dark spots of different _values_ (see below for an example).

An RGB color can be thought of as a set of three dimmers controlling three
lights colored red, blue, and green that are pointed at a pixel. As an example,
if the "red dimmer" is set to the highest value, it overpowers the green and
blue ones, giving us a reddish pixel.

We can use this to improve our color-mixing
function to weight _the squares of the components_ instead of the components
themselves. The details are not particularly important, but basically you
weight the squares because [each component approximates the number of photons
in a given _area_](https://stackoverflow.com/a/29321264/1425555).

```java
color rgb_mix_blended(color a, color b, float w) {
  float ra = red(a);
  float ga = green(a);
  float ba = blue(a);

  float rb = red(b);
  float gb = green(b);
  float bb = blue(b);

  float new_r, new_g, new_b;

  new_r = sqrt(w * pow(ra, 2) + (1-w) * pow(rb, 2));
  new_g = sqrt(w * pow(ga, 2) + (1-w) * pow(gb, 2));
  new_b = sqrt(w * pow(ba, 2) + (1-w) * pow(bb, 2));

  return color(new_r, new_g, new_b);
}
```

We can use this function the same way we did for the weighted mixing approach,
where we take a base color, and mix it in with a randomly-generated one.

```java
color random_rgb_mix_blended(color base, float w) {
  /* Generate components for a random RGB color */
  float r = random(256);
  float g = random(256);
  float b = random(256);
  return rgb_mix_blended(base, color(r, g, b), w);
}
```

Here are the results. The two swatches below are identical, except that the
swatch on the left is from our previous, weighted mixing algorithm, while the
one on the right is from our new blended approach. Notice the
dark patches in the weighted one that look better in the blended one!

|-----|------|
|![](/public/images/2018-02-11-generative-color-algorithms/rgb-weighted.png)|![](/public/images/2018-02-11-generative-color-algorithms/rgb-blended.png)

If you're being forced to use RGB colors for some tragic reason, then this
blended approach provides much nicer results with minimal changes.

## The HSB (or HSV) Color Space

We now move into the HSB (also called HSV) color space, which is a cylindrical
transformation of the RGB color space. The advantage of using HSB is that it
is easier to reason about in terms of changing the individual components.
Therefore, we can shift the numbers around with fairly predictable results.

HSB colors comprise three components, a hue that determines the base color,
a saturation component that determines how "pure" the color is, and brightness
(or value in the HSV color space), which specifies the grayness. The image below
shows how these three components are organized.

![](/public/images/2018-02-11-generative-color-algorithms/HSV_color_solid_cylinder_alpha_lowgamma.png)
*The HSV or HSB color space. (Source: [Wikipedia](https://en.wikipedia.org/wiki/File:HSV_color_solid_cylinder_alpha_lowgamma.png))*

We can use this to build much more controlled color variations unlike the RGB
examples above. The first approach we're going to look at is varying the hue.

Note: To use HSB colors in Processing, one has to call the `colorMode()` function.
We're going to assume the ranges for the hue, saturation, and brightness to be
360, 100, and 100, respectively. Using 360 for the hue allows us to use angles
to represent colors on a color wheel.

```java
colorMode(HSB, 360, 100, 100);
```

## Hue Variation
<a name="hue-variation"></a>

Let's get to playing with hues. We first define a low-level function that lets
us vary the attributes of an HSB color. We'll continue using this for the rest
of our experiments with HSB colors.

```java
/*
 * Given an HSB color 'base', vary its hue, saturation, and
 * brightness values by the amounts 'hv', 'sv', and 'bv',
 * respectively.
 */
color hsb_modify(color base, float hv, float sv, float bv) {
  /* The hue should be wrapped around if it crosses 360 */
  float new_hue = (hue(base) + hv) % 360;
  float new_sat = (saturation(base) + sv);
  float new_bri = (brightness(base) + bv);

  /* If saturation or brightness go out of bounds, constrain */
  new_sat = new_sat > 100 ? 100 : new_sat;
  new_sat = new_sat < 0 ? 0 : new_sat;
  new_bri = new_bri > 100 ? 100 : new_bri;
  new_bri = new_bri < 0 ? 0 : new_bri;

  return color(new_hue, new_sat, new_bri);
}
```

With this in place, we can now define a function that varies the hue of a
base color randomly. To keep the variation in hues controlled, we use a
Gaussian random number (using Processing's `randomGaussian()` function)
instead of the uniform random number generator (`random()`).

```java
/* Vary the hue in the HSB color space */
color hsb_vary_hue(color base, float variance) {
  return hsb_modify(base, randomGaussian() * variance, 0, 0);
}
```
Above, we use the `hsb_modify()` function to modify only the hue of the base
color, which is calculated by scaling a random Gaussian value by a
user-specified variance. The saturation and brightness of the base are left as
is.

Here are some examples using a random hue, with a brightness and saturation
of 100%. The variance was set to 10, which means that the hue is shifted rangomly
by up to 10&deg; either clockwise or anti-clockwise. This gives a bit of
perceptible variation in the colors.

|-----|------|
|![](/public/images/2018-02-11-generative-color-algorithms/h1.png)|![](/public/images/2018-02-11-generative-color-algorithms/h2.png)
|![](/public/images/2018-02-11-generative-color-algorithms/h3.png)|![](/public/images/2018-02-11-generative-color-algorithms/h4.png)
{: cellspacing="0" }

Here are the same parameters as above but with a smaller variance of 5&deg;.
This results in a much smaller transition, which when applied to fill areas
results in an organic, smooth texture.

|-----|------|
|![](/public/images/2018-02-11-generative-color-algorithms/h5.png)|![](/public/images/2018-02-11-generative-color-algorithms/h6.png)
|![](/public/images/2018-02-11-generative-color-algorithms/h7.png)|![](/public/images/2018-02-11-generative-color-algorithms/h8.png)
{: cellspacing="0" }

And here it is with a larger variance of 30&deg;. Notice how we now start to
see different colors but they still work somewhat well together, courtesy of
the HSB color space. These are known as analogous color, those that are close
to each other on the color wheel, and ones we'll look into more in the next
part of this series.

|-----|------|
|![](/public/images/2018-02-11-generative-color-algorithms/h9.png)|![](/public/images/2018-02-11-generative-color-algorithms/h10.png)
|![](/public/images/2018-02-11-generative-color-algorithms/h11.png)|![](/public/images/2018-02-11-generative-color-algorithms/h12.png)
{: cellspacing="0" }

## Saturation Variation
<a name="saturation-variation"></a>

We implement this one in a similar way as the hue version. However, we don't
wrap around the ends of the spectrum. That is, we don't convert 105% into 5%.
Here is the code for doing this.

```java
color hsb_vary_saturation(color base, float variance) {
  return hsb_modify(base, 0, randomGaussian() * variance, 0);
}
```

Here are the results with a low saturation variance of 5%. The base color used had a
saturation of 50%. This means that we see randomly generated colors with 
saturations spread between 45% and 55% in a Gaussian distribution. This
kind of variation is very useful for creating variation in a single color
as the hue remains the same.

|![](/public/images/2018-02-11-generative-color-algorithms/s9.png)|![](/public/images/2018-02-11-generative-color-algorithms/s10.png)
|![](/public/images/2018-02-11-generative-color-algorithms/s11.png)|![](/public/images/2018-02-11-generative-color-algorithms/s12.png)

And here are some examples with a higher variation of 15%.

|![](/public/images/2018-02-11-generative-color-algorithms/s13.png)|![](/public/images/2018-02-11-generative-color-algorithms/s14.png)
|![](/public/images/2018-02-11-generative-color-algorithms/s15.png)|![](/public/images/2018-02-11-generative-color-algorithms/s16.png)

Here we choose the highest possible variance of 50. With an initial value of
50% for the saturation of our base color, we end up seeing saturation values
anywhere between 0% and 100%. The introduction of strong whites give a very
fresh feel to it by constrasting strongly with the purer variations.

|-----|------|
|![](/public/images/2018-02-11-generative-color-algorithms/s1.png)|![](/public/images/2018-02-11-generative-color-algorithms/s2.png)
|![](/public/images/2018-02-11-generative-color-algorithms/s3.png)|![](/public/images/2018-02-11-generative-color-algorithms/s4.png)
|![](/public/images/2018-02-11-generative-color-algorithms/s5.png)|![](/public/images/2018-02-11-generative-color-algorithms/s6.png)
|![](/public/images/2018-02-11-generative-color-algorithms/s7.png)|![](/public/images/2018-02-11-generative-color-algorithms/s8.png)
{: cellspacing="0" }

## Brightness Variation
<a name="brightness-variation"></a>

We now get to the final lever that we have in the HSB color space: brightness
(also called value when referring to it as HSV).
The brightness of a color in HSB specifies the amount of gray in the color.
An approximate way to think about this is that if saturation specifies
"lightness", then brightness specifies "darkness".

Again, we can simply re-use the `hsb_modify()` function we defined earlier
to write this function.

```java
color hsb_vary_brightness(color base, float variance) {
  return hsb_modify(base, 0, 0, randomGaussian() * variance);
}
```

Again, here are some examples to visually help you understand how varying this
component affects the color. Below is an example with a 5% variance in
brightness. Again, similar to varying the saturation, you can create smooth,
subtle variations in color with this.

|-----|------|
|![](/public/images/2018-02-11-generative-color-algorithms/b1.png)|![](/public/images/2018-02-11-generative-color-algorithms/b2.png)
|![](/public/images/2018-02-11-generative-color-algorithms/b3.png)|![](/public/images/2018-02-11-generative-color-algorithms/b4.png)
{: cellspacing="0" }

Here is an example with a 15% variation in brightness.

|-----|------|
|![](/public/images/2018-02-11-generative-color-algorithms/b5.png)|![](/public/images/2018-02-11-generative-color-algorithms/b6.png)
|![](/public/images/2018-02-11-generative-color-algorithms/b7.png)|![](/public/images/2018-02-11-generative-color-algorithms/b8.png)
{: cellspacing="0" }

And finally, here is an example with a 100% variance in brightness. Starting with
a base color at 100% brightness, this results in the full range of possible
brightnesses.

|-----|------|
|![](/public/images/2018-02-11-generative-color-algorithms/b9.png)|![](/public/images/2018-02-11-generative-color-algorithms/b10.png)
|![](/public/images/2018-02-11-generative-color-algorithms/b11.png)|![](/public/images/2018-02-11-generative-color-algorithms/b12.png)
{: cellspacing="0" }

You might be wondering why you would ever use such a large reduction in brightness.
Personally, I've found it useful to create near-black colors when designing
palettes based around a specific color. Using a low-brightness version of the
base color of the palette instead of plain black can make the color fit better.
We'll look at this in more detail in a later post when designing harmonious
color palettes.

## S+B Variation
<a name="sb-variation"></a>

We now start to combine these variations systematically in the next two
variations. We first look at varying the saturation and brightness randomly based on
a given variance. After this we'll look at varying all three HSB channels.

```java
color hsb_vary_sb(color base, float svariance, float bvariance) {
  return hsb_modify(
            base,
            0,
            randomGaussian() * svariance,
            randomGaussian() * bvariance);
}
```

Here are some visual examples to help you understand how varying both saturation
and brightness can create some interesting variation.

Below is an example with a 5% variance in
both saturation and brightness. Here the difference from prior approaches of
varying a single channel are subtle because of the low variance.

|-----|------|
|![](/public/images/2018-02-11-generative-color-algorithms/sb1.png)|![](/public/images/2018-02-11-generative-color-algorithms/sb2.png)
|![](/public/images/2018-02-11-generative-color-algorithms/sb3.png)|![](/public/images/2018-02-11-generative-color-algorithms/sb4.png)
{: cellspacing="0" }

Here is an example with a 15% variation in both saturation and brightness.

|-----|------|
|![](/public/images/2018-02-11-generative-color-algorithms/sb5.png)|![](/public/images/2018-02-11-generative-color-algorithms/sb6.png)
|![](/public/images/2018-02-11-generative-color-algorithms/sb7.png)|![](/public/images/2018-02-11-generative-color-algorithms/sb8.png)
{: cellspacing="0" }

And finally, here is an example with a 50% variance in both saturation and brightness. Starting with
a base color with 50% saturation and 100% brightness, this is what we get.

|-----|------|
|![](/public/images/2018-02-11-generative-color-algorithms/sb9.png)|![](/public/images/2018-02-11-generative-color-algorithms/sb10.png)
|![](/public/images/2018-02-11-generative-color-algorithms/sb11.png)|![](/public/images/2018-02-11-generative-color-algorithms/sb12.png)
{: cellspacing="0" }

## H+S+B Variation
<a name="hsb-variation"></a>

```java
color hsb_vary_all(color base, float hvar, float svar, float bvar) {
  return hsb_modify(
            base,
            randomGaussian() * hvar,
            randomGaussian() * svar,
            randomGaussian() * bvar);
}
```

---
title: Seventy-Five Ways to Draw a Circle
author: Manohar Vanga
image: http://sighack.com/public/images/2018-02-03-seventy-five-ways-to-draw-a-circle/circle-44.png
description: An exploration on drawing a simple circle generatively in seventy five different ways.
---

*All Processing code for this article, along with images, can be found [on Github](https://github.com/sighack/seventy-five-circles)*

I recently challenged myself to come up with [twenty five designs using only
Perlin flow fields](getting-creative-with-perlin-noise-fields).
This article is the next part of this series of explorations where I set myself
up with another simple challenge: come up with a seventy-five different ways to
draw a circle.

## The Constraints 
I set three constraints for this challenge. First, I decided to forego the use of
color as I wanted to focus on variety in forms instead. I also find that using
color variations to get out of a rut makes me feel like I'm cheating.

Second, every version should be implemented as an independent, re-usable
function conforming to the following declaration:
```java
void circle(float x, float y, float r) {
  /* Draw a circle with center at (x, y) and radius r */
}
```
This way, I can easily reuse them later for other works.

As the third and final constraint, each version had to have some
generative/procedural component to it. That is, each time the function is called,
a new variant should be generated.

Enough talking. Here are the results! Enjoy!

## Seventy-Five Circles

![](/public/images/2018-02-03-seventy-five-ways-to-draw-a-circle/circle-1.png)
*#1*

![](/public/images/2018-02-03-seventy-five-ways-to-draw-a-circle/circle-2.png)
*#2*

![](/public/images/2018-02-03-seventy-five-ways-to-draw-a-circle/circle-3.png)
*#3*

![](/public/images/2018-02-03-seventy-five-ways-to-draw-a-circle/circle-4.png)
*#4*

![](/public/images/2018-02-03-seventy-five-ways-to-draw-a-circle/circle-5.png)
*#5*

![](/public/images/2018-02-03-seventy-five-ways-to-draw-a-circle/circle-6.png)
*#6*

![](/public/images/2018-02-03-seventy-five-ways-to-draw-a-circle/circle-7.png)
*#7*

![](/public/images/2018-02-03-seventy-five-ways-to-draw-a-circle/circle-8.png)
*#8*

![](/public/images/2018-02-03-seventy-five-ways-to-draw-a-circle/circle-9.png)
*#9*

![](/public/images/2018-02-03-seventy-five-ways-to-draw-a-circle/circle-10.png)
*#10*

![](/public/images/2018-02-03-seventy-five-ways-to-draw-a-circle/circle-11.png)
*#11*

![](/public/images/2018-02-03-seventy-five-ways-to-draw-a-circle/circle-12.png)
*#12*

![](/public/images/2018-02-03-seventy-five-ways-to-draw-a-circle/circle-13.png)
*#13*

![](/public/images/2018-02-03-seventy-five-ways-to-draw-a-circle/circle-14.png)
*#14*

![](/public/images/2018-02-03-seventy-five-ways-to-draw-a-circle/circle-15.png)
*#15*

![](/public/images/2018-02-03-seventy-five-ways-to-draw-a-circle/circle-16.png)
*#16*

![](/public/images/2018-02-03-seventy-five-ways-to-draw-a-circle/circle-17.png)
*#17*

![](/public/images/2018-02-03-seventy-five-ways-to-draw-a-circle/circle-18.png)
*#18*

![](/public/images/2018-02-03-seventy-five-ways-to-draw-a-circle/circle-19.png)
*#19*

![](/public/images/2018-02-03-seventy-five-ways-to-draw-a-circle/circle-20.png)
*#20*

![](/public/images/2018-02-03-seventy-five-ways-to-draw-a-circle/circle-21.png)
*#21*

![](/public/images/2018-02-03-seventy-five-ways-to-draw-a-circle/circle-22.png)
*#22*

![](/public/images/2018-02-03-seventy-five-ways-to-draw-a-circle/circle-23.png)
*#23*

![](/public/images/2018-02-03-seventy-five-ways-to-draw-a-circle/circle-24.png)
*#24*

![](/public/images/2018-02-03-seventy-five-ways-to-draw-a-circle/circle-25.png)
*#25*

![](/public/images/2018-02-03-seventy-five-ways-to-draw-a-circle/circle-26.png)
*#26*

![](/public/images/2018-02-03-seventy-five-ways-to-draw-a-circle/circle-27.png)
*#27*

![](/public/images/2018-02-03-seventy-five-ways-to-draw-a-circle/circle-28.png)
*#28*

![](/public/images/2018-02-03-seventy-five-ways-to-draw-a-circle/circle-29.png)
*#29*

![](/public/images/2018-02-03-seventy-five-ways-to-draw-a-circle/circle-30.png)
*#30*

![](/public/images/2018-02-03-seventy-five-ways-to-draw-a-circle/circle-31.png)
*#31*

![](/public/images/2018-02-03-seventy-five-ways-to-draw-a-circle/circle-32.png)
*#32*

![](/public/images/2018-02-03-seventy-five-ways-to-draw-a-circle/circle-33.png)
*#33*

![](/public/images/2018-02-03-seventy-five-ways-to-draw-a-circle/circle-34.png)
*#34*

![](/public/images/2018-02-03-seventy-five-ways-to-draw-a-circle/circle-35.png)
*#35*

![](/public/images/2018-02-03-seventy-five-ways-to-draw-a-circle/circle-36.png)
*#36*

![](/public/images/2018-02-03-seventy-five-ways-to-draw-a-circle/circle-37.png)
*#37*

![](/public/images/2018-02-03-seventy-five-ways-to-draw-a-circle/circle-38.png)
*#38*

![](/public/images/2018-02-03-seventy-five-ways-to-draw-a-circle/circle-39.png)
*#39*

![](/public/images/2018-02-03-seventy-five-ways-to-draw-a-circle/circle-40.png)
*#40*

![](/public/images/2018-02-03-seventy-five-ways-to-draw-a-circle/circle-41.png)
*#41*

![](/public/images/2018-02-03-seventy-five-ways-to-draw-a-circle/circle-42.png)
*#42*

![](/public/images/2018-02-03-seventy-five-ways-to-draw-a-circle/circle-43.png)
*#43*

![](/public/images/2018-02-03-seventy-five-ways-to-draw-a-circle/circle-44.png)
*#44*

![](/public/images/2018-02-03-seventy-five-ways-to-draw-a-circle/circle-45.png)
*#45*

![](/public/images/2018-02-03-seventy-five-ways-to-draw-a-circle/circle-46.png)
*#46*

![](/public/images/2018-02-03-seventy-five-ways-to-draw-a-circle/circle-47.png)
*#47*

![](/public/images/2018-02-03-seventy-five-ways-to-draw-a-circle/circle-48.png)
*#48*

![](/public/images/2018-02-03-seventy-five-ways-to-draw-a-circle/circle-49.png)
*#49*

![](/public/images/2018-02-03-seventy-five-ways-to-draw-a-circle/circle-50.png)
*#50*

![](/public/images/2018-02-03-seventy-five-ways-to-draw-a-circle/circle-51.png)
*#51*

![](/public/images/2018-02-03-seventy-five-ways-to-draw-a-circle/circle-52.png)
*#52*

![](/public/images/2018-02-03-seventy-five-ways-to-draw-a-circle/circle-53.png)
*#53*

![](/public/images/2018-02-03-seventy-five-ways-to-draw-a-circle/circle-54.png)
*#54*

![](/public/images/2018-02-03-seventy-five-ways-to-draw-a-circle/circle-55.png)
*#55*

![](/public/images/2018-02-03-seventy-five-ways-to-draw-a-circle/circle-56.png)
*#56*

![](/public/images/2018-02-03-seventy-five-ways-to-draw-a-circle/circle-57.png)
*#57*

![](/public/images/2018-02-03-seventy-five-ways-to-draw-a-circle/circle-58.png)
*#58*

![](/public/images/2018-02-03-seventy-five-ways-to-draw-a-circle/circle-59.png)
*#59*

![](/public/images/2018-02-03-seventy-five-ways-to-draw-a-circle/circle-60.png)
*#60*

![](/public/images/2018-02-03-seventy-five-ways-to-draw-a-circle/circle-61.png)
*#61*

![](/public/images/2018-02-03-seventy-five-ways-to-draw-a-circle/circle-62.png)
*#62*

![](/public/images/2018-02-03-seventy-five-ways-to-draw-a-circle/circle-63.png)
*#63*

![](/public/images/2018-02-03-seventy-five-ways-to-draw-a-circle/circle-64.png)
*#64*

![](/public/images/2018-02-03-seventy-five-ways-to-draw-a-circle/circle-65.png)
*#65*

![](/public/images/2018-02-03-seventy-five-ways-to-draw-a-circle/circle-66.png)
*#66*

![](/public/images/2018-02-03-seventy-five-ways-to-draw-a-circle/circle-67.png)
*#67*

![](/public/images/2018-02-03-seventy-five-ways-to-draw-a-circle/circle-68.png)
*#68*

![](/public/images/2018-02-03-seventy-five-ways-to-draw-a-circle/circle-69.png)
*#69*

![](/public/images/2018-02-03-seventy-five-ways-to-draw-a-circle/circle-70.png)
*#70*

![](/public/images/2018-02-03-seventy-five-ways-to-draw-a-circle/circle-71.png)
*#71*

![](/public/images/2018-02-03-seventy-five-ways-to-draw-a-circle/circle-72.png)
*#72*

![](/public/images/2018-02-03-seventy-five-ways-to-draw-a-circle/circle-73.png)
*#73*

![](/public/images/2018-02-03-seventy-five-ways-to-draw-a-circle/circle-74.png)
*#74*

![](/public/images/2018-02-03-seventy-five-ways-to-draw-a-circle/circle-75.png)
*#75*

![](/public/images/end.gif){: .center-image }

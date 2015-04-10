---
title: Media Queries
description: CSS media queries allow us to adjust the display and orientation of content at different screen sizes.
sass: scss/util/_breakpoint.scss
---

## Default Media Queries

Foundation for Sites has three core breakpoint ranges.

- **Small:** any screen.
- **Medium:** any screen 640 pixels or wider.
- **Large:** any screen 1024 pixels or wider.

Many components can be modified at different screen sizes using special *breakpoint classes*. The grid is the most obvious example. In the code below, the left-hand column is six columns wide on small screens, hence `.small-6`. On medium-sized screens, the class `.medium-4` overrides the small style, changing the column to be four wide.

```html
<div class="row">
  <div class="small-6 medium-4 columns"></div>
  <div class="small-6 medium-8 columns"></div>
</div>
```

---

## Changing the Breakpoints

If you're using the Sass version of Foundation, the default breakpoints can be changed. The names of the breakpoints, and their widths, are stored in a `$breakpoints` variable in the settings file.

```scss
$breakpoints: (
  small: rem-calc(0),
  medium: rem-calc(640),
  large: rem-calc(1024),
  xlarge: rem-calc(1200),
  xxlarge: rem-calc(1440),
);
```

Changing the widths of any of the breakpoints is as easy as changing the pixel values in this map. Note that here there are two extra breakpoints: `xlarge` and `xxlarge`. We don't use these for any components, and also don't output any CSS classes that use them by default.

You can change that by modifying the `$breakpoint-classes` variable in your settings file. This is a list of breakpoint names. Adding or removing names from the list will change the CSS class output. It looks like this by default:

```scss
$breakpoint-classes: (small medium large);
```

For example, to get `.xlarge` classes in your CSS, for use in the grid, menu bar, and more, just add it to the end of the list:

```scss
$breakpoint-classes: (small medium large xlarge);
```

---

## The Breakpoint Mixin

Our `breakpoint()` mixin makes it easy to write media queries. You can use the named breakpoints, or a custom pixel, rem, or em value.

To use the mixin, call it with `@include`, and then include the CSS content you want inside the curly braces.

```scss
.element {
  // Only affects medium screens and larger
  @include breakpoint(medium) {
    // All CSS in here goes inside the media query
  }
}
```

The behavior of the media query can be changed by adding the keyword `down` or `only` after the breakpoint value, separated by a space.

```scss
.element {
  // Only affects medium screens and smaller
  @include breakpoint(medium down) { }
  // Only affects medium screens, not small or large
  @include breakpoint(medium only) { }
}
```

It's also possible to pass in custom values. You can enter a pixel, rem, or em value&mdsh;all values are converted to em at the end.

```scss
.element {
  // Converted to 20em
  @include breakpoint(320px) { }
  // Unitless values are assumed to be pixels
  @include breakpoint(320) { }
  // Converted to 40em
  @include breakpoint(40rem) { }
}
```

Lastly, there are three special media queries that are not width-based: `portrait`, `landscape`, and `retina`. Using these keywords with the `breakpoint()` mixin will output a media query for device orientation or pixel density, rather than screen width.

```scss
.element {
  @include breakpoint(landscape) {
    // CSS for landscape-oriented devices only
  }
  @include breakpoint(retina) {
    // CSS for high-resolution displays only
  }
}
```
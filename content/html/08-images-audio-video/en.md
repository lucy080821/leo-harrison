# Images, audio and video

## More about images

```html
<img src="cat.jpg" alt="A sleeping cat" width="400" height="300" loading="lazy" />
```

- `width` and `height` let the browser reserve space, so the page doesn't "jump" when the image loads.
- `loading="lazy"`: only load the image when the user scrolls near it.
- `alt` is always needed; purely decorative images use `alt=""` (empty) so screen readers skip them.

![The browser picks a suitable source in picture/audio/video](/lessons/html/08-images-audio-video-fig-en.svg)
*The browser picks a suitable source in picture/audio/video*

## figure and figcaption

Use them when an image (or chart, or code sample) has a **caption**:

```html
<figure>
  <img src="map.png" alt="Map of the area" />
  <figcaption>Figure 2: Map of the area</figcaption>
</figure>
```

## picture: images by screen size

```html
<picture>
  <source media="(min-width: 800px)" srcset="large.jpg" />
  <source media="(min-width: 400px)" srcset="medium.jpg" />
  <img src="small.jpg" alt="Landscape" />
</picture>
```

The browser picks the first matching `<source>`; the `<img>` is the last resort and is required.

## Audio and video

```html
<audio controls>
  <source src="music.mp3" type="audio/mpeg" />
  <source src="music.ogg" type="audio/ogg" />
  Your browser does not support audio.
</audio>

<video controls width="480" poster="cover.jpg">
  <source src="movie.mp4" type="video/mp4" />
  Your browser does not support video.
</video>
```

| Attribute | Effect |
|---|---|
| `controls` | Show play, pause and volume controls |
| `autoplay` | Start automatically (often blocked when there is sound) |
| `loop` | Repeat |
| `muted` | Mute the sound |
| `poster` | Cover image for a video |

The text inside the tag only shows when the browser **doesn't support** that tag (fallback content).

## Embedding another page

```html
<iframe src="https://example.com" width="400" height="300" title="Example page"></iframe>
```

An iframe's `title` helps screen readers describe the embedded content.

# Carousel Placeholder Guide

This guide explains how to use placeholders for the responsive carousel that shows 2 images on desktop and 1 image on mobile.

## Available Placeholder Images

The following images are available in the `Public` directory:

1. `Public/ai-powerup-product-design.jpg` - Technology and AI design
2. `Public/intellibuild.jpg` - Smart building and construction
3. `Public/bhim-banner01.png` - Building Information Modeling (BIM)
4. `Public/arch-banner.jpg` - Architectural design
5. `Public/e-id.webp` - Interior design
6. `Public/BIM.png` - BIM technology

## Desktop Version (2 images side by side)

For desktop screens (≥768px), the carousel shows 2 images per slide:

```html
<div class="carousel-item">
  <div class="row g-0">
    <div class="col-6">
      <div class="position-relative">
        <img
          class="w-100"
          src="Public/image1.jpg"
          alt="Description 1"
          style="height: 500px; object-fit: cover;"
        />
        <div class="carousel-caption d-none d-md-block">
          <h5>Image Title 1</h5>
          <p>Description for image 1</p>
        </div>
      </div>
    </div>
    <div class="col-6">
      <div class="position-relative">
        <img
          class="w-100"
          src="Public/image2.jpg"
          alt="Description 2"
          style="height: 500px; object-fit: cover;"
        />
        <div class="carousel-caption d-none d-md-block">
          <h5>Image Title 2</h5>
          <p>Description for image 2</p>
        </div>
      </div>
    </div>
  </div>
</div>
```

## Mobile Version (1 image per slide)

For mobile screens (<768px), the carousel shows 1 image per slide:

```html
<div class="carousel-item">
  <img
    class="w-100"
    src="Public/image1.jpg"
    alt="Description 1"
    style="height: 300px; object-fit: cover;"
  />
  <div class="carousel-caption d-md-none">
    <h5>Image Title 1</h5>
    <p>Description for image 1</p>
  </div>
</div>
```

## Implementation Notes

1. **Desktop Version**: Uses `d-none d-md-block` classes to show only on medium screens and above
2. **Mobile Version**: Uses `d-md-none` class to show only on small screens
3. **Image Sizing**:
   - Desktop images: 500px height with `object-fit: cover`
   - Mobile images: 300px height with `object-fit: cover`
4. **Captions**:
   - Desktop captions use `d-none d-md-block`
   - Mobile captions use `d-md-none`

## Adding New Slides

To add new slides:

### For Desktop Version:

1. Copy the entire `<div class="carousel-item">` block
2. Update the image sources
3. Update the alt text and captions

### For Mobile Version:

1. Copy the entire `<div class="carousel-item">` block
2. Update the image source
3. Update the alt text and caption

## CSS Classes Used

- `d-none` - Hides element by default
- `d-md-block` - Shows element on medium screens and above
- `d-md-none` - Hides element on medium screens and above
- `w-100` - Makes image full width
- `position-relative` - Needed for caption positioning

## Demo Files

Two demo files are included to help you understand the implementation:

1. `placeholder-carousel-demo.html` - Uses colored placeholders with icons
2. `image-placeholder-demo.html` - Uses actual images from the Public directory

You can open these files in your browser to see how the carousel works.

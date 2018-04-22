// Return a jquery object containing the main slides
function getMainSlides() {
  return $('div.reveal-frame div.slides > section');
}

// Return a slide given a horizontal and the optional vertical position
function getSlideObject(h, v) {
  if (h === undefined) {
    console.log("getSlideObject() got a null horizontal slide index");
    return null
  }

  let ms = getMainSlides();
  let s = ms.slice(h, h+1);

  if (v !== undefined) {
    s = s.find('> section').slice(v, v+1);
  }

  return s;
}

function getNumberOfMainSlides() {
  return getMainSlides().length;
}

function getNumberOfSubSlides(mainSlide) {
  let ms = getMainSlides();

  // If mainSlide is not passed in, assume that we want to count the number of
  // subslides for the current main slide
  if (mainSlide === undefined) {
    mainSlide = getCurrentMainSlide();
  }

  if (mainSlide < 0 || mainSlide >= ms.length) {
    console.log("getNumberOfMainSlides was given an invalid mainSlide: " + mainSlide);
    return -1;
  }

  let s = getSlideObject(mainSlide);

  // If the section doesn't have "stack" class, it means that it doesn't have
  // any sub-slides
  if (s.filter(".stack").length == 0) {
    return 0;
  }

  // Return the number of section elements that are children of the main slide
  return s.find("> section").length;
}

// Return the index of the current main slide. We can't depend on the
// data-index-h attribute because it's added only after overview mode is
// opened.
function getCurrentMainSlide() {
  let ms = getMainSlides();
  let curSlide = -1;

  ms.each(function(index) {
    // If the element has the class 'present', it means that it's the current
    // slide. There can be only one main slide with this class at any point in
    // time.
    if ($(this).filter('.present').length > 0) {
      curSlide = index;
    }
  });

  return curSlide;
}

// Return the index of the current main slide. We can't depend on the
// data-index-v attribute because it's added only after overview mode is
// opened.
function getCurrentSubSlide() {
  let sn = getCurrentMainSlide();

  if (getNumberOfSubSlides(sn) <= 0) {
    return -1;
  }

  let curSlide = -1;
  getSlideObject(sn).find('> section').each(function(index) {
    if ($(this).filter('.present').length > 0) {
      curSlide = index;
    }
  });

  return curSlide;
}

function goToSlide(mainSlide, subSlide) {
  // Inject a script element so that we can call reveal.js's function to switch
  // to a slide.
  $('body').append('<script type="text/javascript">Reveal.slide('+mainSlide+','+subSlide+')</script>');
}

// Go to the next slide, either subslide or main slide, whichever is next
function goToNextSlide() {
  if (getCurrentSubSlide() != -1 && getNumberOfSubSlides() > getCurrentSubSlide()+1) {
    goToSlide(getCurrentMainSlide(), getCurrentSubSlide() + 1);
    return true;
  }
  if (getNumberOfMainSlides() > getCurrentMainSlide() + 1) {
    goToSlide(getCurrentMainSlide()+1);
    return true;
  }
  return false;
}

// Go to the previous slide, either subslide or main slide, whichever is previous
function goToPreviousSlide() {
  if (getCurrentSubSlide() != -1 && getCurrentSubSlide() > 0) {
    goToSlide(getCurrentMainSlide(), getCurrentSubSlide() - 1);
    return true;
  }
  if (getCurrentMainSlide() > 0) {
    goToSlide(getCurrentMainSlide() - 1);
    return true;
  }
}


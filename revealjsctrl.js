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
  if (subSlide < 0) {
    subSlide = undefined;
  }

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

// Marked slides. This is currently a stack
var markedSlidesStack = [];

// Add the current slide to the marked slides stack
function markCurrentSlide() {
  markedSlidesStack.push(
    {
      mainSlide: getCurrentMainSlide(),
      subSlide: getCurrentSubSlide()
    }
  );
}

// Go to the slide on top of the marked slides stack
function goToLastMarkedSlide() {
  if (markedSlidesStack.length == 0) {
    return false;
  }

  let s = markedSlidesStack.pop();

  if (s.subSlide >=0 ) {
    goToSlide(s.mainSlide, s.subSlide);
  } else {
    goToSlide(s.mainSlide);
  }

  return true;
}

function sanitizeText(text) {
  // Change all non alphanumeric characters to spaces
  text = text.replace(/[^a-zA-Z0-9]/g, ' ');
  // Remove single characters
  text = text.replace(/\b\S\b/g, '');
  // Compress spaces to a single space
  text = text.replace(/ +/g, ' ');
  return text
}

// Very basic search scoring - returns the number of times the query is present
// in the text
function getSearchScore(text, query) {
  let haystack = sanitizeText(text);
  let needle = sanitizeText(query);

  let matches = haystack.match(new RegExp(needle, 'gi'));

  if (matches == null) {
    return 0;
  }
  return matches.length;
}

function searchSlides(query) {
  let ms = getMainSlides();  
  let results = [];

  for (var h = 0; h < ms.length; h++) {
    let s = $(ms[h]);

    if (s.filter('.stack').length > 0) {
      let ss = s.find('> section');
      for (var v = 0; v < ss.length ; v++) {
        let score = getSearchScore($(ss[v]).text(), query);
        if (score > 0) {
          results.push({
            mainSlide: h,
            subSlide: v,
            score: score
          });
        }
      }
    } else {
      let score = getSearchScore(s.text(), query);
      if (score > 0) {
        results.push({
          mainSlide: h,
          score: score
        });
      }
    }
  }

  results.sort(function(a, b) {
    // Higher score values should appear earlier
    if (a.score > b.score) {
      return -1;
    } else if (a.score < b.score) {
      return 1;
    }

    // Lower main slide values should appear earlier
    if (a.mainSlide > b.mainSlide) {
      return 1;
    } else if (a.mainSlide < b.mainSlide) {
      return -1;
    }

    // Lower sub slide values should appear earlier
    if (a.subSlide > b.subSlide) {
      return 1;
    } else if (a.subSlide < b.mainSlide) {
      return -1;
    }

    return 0;
  });

  return results;
}


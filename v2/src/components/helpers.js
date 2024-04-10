export const cmsSources = {
  NPR: 'npr',
  PUBLISHER: 'publisher',
  WAGTAIL: 'wagtail',
}

// determines the CMS source of an image
export const getCmsSource = (src) => {
  if (src.includes('media.npr.org')) {
    return cmsSources.NPR
  } else if (src.includes('media.wnyc.org')) {
    return cmsSources.PUBLISHER
  } else if (src.includes('nypr.digital')) {
    return cmsSources.WAGTAIL
  } else {
    return cmsSources.WAGTAIL
  }
}
export const cmsSources = {
  NPR: 'npr',
  PUBLISHER: 'publisher',
  WAGTAIL: 'wagtail',
}

export const NPRIMAGEDOMAINSOURCES = ["media.npr.org", "npr.brightspotcdn.com"]

// determines the CMS source of an image
export const getCmsSource = (src) => {
  // if src is all just numbers, it's a wagtail image. using the domain for the others
  if (/^\d+$/.test(src)) {
    return cmsSources.WAGTAIL
  } else if (src.includes("media.wnyc.org")) {
    return cmsSources.PUBLISHER
  } else if (NPRIMAGEDOMAINSOURCES.some(domain => src.includes(domain))) {
    return cmsSources.NPR
  } else {
    return cmsSources.WAGTAIL
  }
}
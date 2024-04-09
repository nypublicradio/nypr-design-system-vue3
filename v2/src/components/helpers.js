export const cmsSources = {
  NPR: 'npr',
  PUBLISHER: 'publisher',
  WAGTAIL: 'wagtail',
}

export const getCmsSource = (src) => {

  switch (src) {
    case src.includes('media.npr.org'):
      return cmsSources.NPR
    case src.includes('media.wnyc.org'):
      return cmsSources.PUBLISHER
    case src.includes('nypr.digital'):
      return cmsSources.WAGTAIL
    default:
      return cmsSources.WAGTAIL

  }
}
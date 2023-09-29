import { computed } from 'vue'
export const isPublisherSrc = (src) => {
    return src.includes('media.wnyc.org')
}
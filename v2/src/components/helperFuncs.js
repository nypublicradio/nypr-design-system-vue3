/*
formats the url of a publisher image so it works with our design system image components
*/
export const formatPublisherImageUrl = (url) => { return url.replace("%s/%s/%s/%s", "%width%/%height%/c/%quality%") }
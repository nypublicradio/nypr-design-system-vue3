export function mockBrowserWidth(width) {
    Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: width
    })
}

export function mockMatchMedia(matches) {
    window.matchMedia = () => ({
        matches: matches,
        addListener: () => { },
        removeListener: () => { },
        media: ''
    })
}
// Mocks the browser width for testing purposes
export function mockBrowserWidth(width) {
    Object.defineProperty(window, 'innerWidth', {
        configurable: true,
        value: width,
        writable: true,
    })
}
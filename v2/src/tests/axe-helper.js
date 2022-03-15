const { configureAxe } = require('jest-axe')

const axe = configureAxe({
  rules: {
    // this rule, "All page content must be contained by landmarks (region)"
    // is useful for testing pages but not so useful for testing individual
    // components.
    region: { enabled: false }
  }
})

module.exports = axe

# DNS Wizard Testing Guide

This document describes the testing setup for the DNS Wizard application using Playwright.

## Test Structure

### E2E Tests (`e2e/dns-wizard.spec.js`)
- Complete wizard flow testing
- DNS name generation validation
- Navigation between steps
- Device and beamline selection
- Progress indicator verification

### Responsive Tests (`e2e/responsive.spec.js`)
- Desktop, tablet, and mobile layouts
- Viewport size testing
- Orientation change handling
- Touch-friendly button sizing

### Visual Regression Tests (`e2e/visual.spec.js`)
- Screenshot comparison testing
- UI consistency across different states
- Cross-browser visual validation
- Mobile and tablet layout verification

## Running Tests

### Local Development
```bash
# Run all tests
npm run test:e2e

# Run tests with UI (interactive mode)
npm run test:e2e:ui

# Run tests in headed mode (see browser)
npm run test:e2e:headed

# Run specific test suites
npm run test:visual
npm run test:responsive
```

### Test Configuration
- **Browsers**: Chromium, Firefox, WebKit
- **Mobile**: iPhone 12, Pixel 5
- **Base URL**: http://localhost:3000
- **Auto-start**: Development server starts automatically

## Test Coverage

### Core Functionality
- ✅ Beamline selection (all 33 beamlines)
- ✅ Device type selection (8 device types)
- ✅ DNS name generation (ID, BM, IR beamlines)
- ✅ Step navigation (forward and back)
- ✅ Progress indicator
- ✅ Name breakdown display

### Responsive Design
- ✅ Desktop (1920x1080)
- ✅ Tablet (768x1024)
- ✅ Mobile (375x667)
- ✅ Small mobile (320x568)
- ✅ Orientation changes

### Visual Regression
- ✅ Initial page state
- ✅ All wizard steps
- ✅ Different beamline types
- ✅ Button hover states
- ✅ Progress bar states

## Test Data

### Beamline Types Tested
- **ID Beamlines**: 2-ID, 9-ID, 17-ID-1, 17-ID-2, 29-ID-2
- **BM Beamlines**: 4-BM, 6-BM, 8-BM, 11-BM, 16-BM, 17-BM
- **IR Beamlines**: 22-IR-1, 22-IR-2, 24-IR

### Device Types Tested
- Detector, Monitor, Camera, Motor, Sensor, Controller, Data Acquisition, Other

### Expected DNS Names
- `xf02id1-det.nsls2.bnl.gov` (2-ID + Detector)
- `xf09id1-det.nsls2.bnl.gov` (9-ID + Detector)
- `xf17id1-cam.nsls2.bnl.gov` (17-ID-1 + Camera)
- `xf17id2-sens.nsls2.bnl.gov` (17-ID-2 + Sensor)
- `xf04bm-mon.nsls2.bnl.gov` (4-BM + Monitor)
- `xf22ir1-ctrl.nsls2.bnl.gov` (22-IR-1 + Controller)

## CI/CD Integration

Tests run automatically on:
- Push to `main` branch
- Push to `feature/playwright-testing` branch
- Pull requests to `main` branch

Test artifacts are uploaded to GitHub Actions for review.

## Debugging Tests

### View Test Results
```bash
# Open test report
npx playwright show-report
```

### Debug Specific Test
```bash
# Run single test file
npx playwright test e2e/dns-wizard.spec.js

# Run with debug mode
npx playwright test --debug e2e/dns-wizard.spec.js
```

### Update Screenshots
```bash
# Update visual regression screenshots
npx playwright test --update-snapshots
```

## Best Practices

1. **Test Independence**: Each test should be able to run independently
2. **Clear Assertions**: Use descriptive test names and clear assertions
3. **Wait Strategies**: Use proper waiting for elements and network requests
4. **Data Cleanup**: Reset state between tests when needed
5. **Visual Consistency**: Maintain consistent visual regression baselines

## Troubleshooting

### Common Issues
- **Port conflicts**: Ensure port 3000 is available
- **Browser issues**: Run `npx playwright install` to update browsers
- **Screenshot mismatches**: Check for dynamic content or timing issues
- **Mobile tests failing**: Verify viewport settings and touch interactions

### Getting Help
- Check Playwright documentation: https://playwright.dev/
- Review test reports in `playwright-report/` directory
- Check GitHub Actions logs for CI/CD issues

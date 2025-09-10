const { test, expect } = require('@playwright/test');

test.describe('DNS Wizard Visual Regression Tests', () => {
  test('initial page appearance', async ({ page }) => {
    await page.goto('/');
    
    // Take screenshot of the initial page
    await expect(page).toHaveScreenshot('initial-page.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });

  test('beamline selection step', async ({ page }) => {
    await page.goto('/');
    await page.click('text=9-ID');
    
    // Take screenshot of device selection step
    await expect(page).toHaveScreenshot('device-selection-step.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });

  test('final result step', async ({ page }) => {
    await page.goto('/');
    await page.click('text=9-ID');
    await page.click('text=Detector');
    
    // Take screenshot of the final result
    await expect(page).toHaveScreenshot('dns-result-step.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });

  test('mobile layout', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Take screenshot of mobile layout
    await expect(page).toHaveScreenshot('mobile-initial-page.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });

  test('tablet layout', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    
    // Take screenshot of tablet layout
    await expect(page).toHaveScreenshot('tablet-initial-page.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });

  test('different beamline types visual consistency', async ({ page }) => {
    await page.goto('/');
    
    // Test ID beamline
    await page.click('text=9-ID');
    await page.click('text=Detector');
    await expect(page).toHaveScreenshot('id-beamline-result.png', {
      fullPage: true,
      animations: 'disabled'
    });
    
    // Reset and test BM beamline
    await page.click('text=🔄 Generate Another Name');
    await page.click('text=4-BM');
    await page.click('text=Monitor');
    await expect(page).toHaveScreenshot('bm-beamline-result.png', {
      fullPage: true,
      animations: 'disabled'
    });
    
    // Reset and test IR beamline
    await page.click('text=🔄 Generate Another Name');
    await page.click('text=22-IR-1');
    await page.click('text=Camera');
    await expect(page).toHaveScreenshot('ir-beamline-result.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });

  test('button hover states', async ({ page }) => {
    await page.goto('/');
    
    // Hover over a beamline button
    await page.hover('text=9-ID');
    await expect(page).toHaveScreenshot('beamline-button-hover.png', {
      animations: 'disabled'
    });
    
    // Navigate to device selection and hover over device button
    await page.click('text=9-ID');
    await page.hover('text=Detector');
    await expect(page).toHaveScreenshot('device-button-hover.png', {
      animations: 'disabled'
    });
  });

  test('progress bar states', async ({ page }) => {
    await page.goto('/');
    
    // Step 1 progress
    await expect(page).toHaveScreenshot('progress-step-1.png', {
      animations: 'disabled'
    });
    
    // Step 2 progress
    await page.click('text=9-ID');
    await expect(page).toHaveScreenshot('progress-step-2.png', {
      animations: 'disabled'
    });
    
    // Step 3 progress
    await page.click('text=Detector');
    await expect(page).toHaveScreenshot('progress-step-3.png', {
      animations: 'disabled'
    });
  });
});

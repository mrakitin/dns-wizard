const { test, expect } = require('@playwright/test');

test.describe('DNS Wizard Responsive Design', () => {
  test('should work on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    
    // Check that grid displays properly on desktop
    await expect(page.locator('.options-grid')).toBeVisible();
    await expect(page.locator('.option-button')).toHaveCount(37); // All beamlines
    
    // Check that 4-column grid is working
    const gridElement = page.locator('.options-grid');
    const computedStyle = await gridElement.evaluate(el => {
      return window.getComputedStyle(el).gridTemplateColumns;
    });
    expect(computedStyle).toContain('repeat(4, 1fr)');
  });

  test('should work on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    
    // Check that layout adapts to tablet
    await expect(page.locator('.options-grid')).toBeVisible();
    await expect(page.locator('.option-button')).toHaveCount(37);
    
    // Check that wizard container is properly sized
    const wizardContainer = page.locator('.wizard-container');
    await expect(wizardContainer).toBeVisible();
    
    // Test navigation still works
    await page.click('text=9-ID');
    await expect(page.locator('h2')).toContainText('Select Device Type');
  });

  test('should work on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Check that mobile layout is working
    await expect(page.locator('.options-grid')).toBeVisible();
    await expect(page.locator('.option-button')).toHaveCount(37);
    
    // Check that header is responsive
    const header = page.locator('.app-header h1');
    await expect(header).toBeVisible();
    
    // Test that buttons are touch-friendly
    const firstButton = page.locator('.option-button').first();
    const buttonBox = await firstButton.boundingBox();
    expect(buttonBox.height).toBeGreaterThan(40); // Minimum touch target size
    
    // Test navigation
    await page.click('text=9-ID');
    await page.click('text=Detector');
    await expect(page.locator('.dns-name')).toContainText('xf09id1-det.nsls2.bnl.gov');
  });

  test('should handle orientation changes', async ({ page }) => {
    // Start in portrait
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await expect(page.locator('.options-grid')).toBeVisible();
    
    // Switch to landscape
    await page.setViewportSize({ width: 667, height: 375 });
    await expect(page.locator('.options-grid')).toBeVisible();
    
    // Test that functionality still works
    await page.click('text=9-ID');
    await page.click('text=Detector');
    await expect(page.locator('.dns-name')).toContainText('xf09id1-det.nsls2.bnl.gov');
  });

  test('should display all beamline types correctly on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Check that all beamline types are visible
    await expect(page.locator('.beamline-icon').first()).toBeVisible(); // ID beamlines
    await expect(page.locator('text=🧲').first()).toBeVisible(); // BM beamlines
    await expect(page.locator('text=🌡️').first()).toBeVisible(); // IR beamlines
    
    // Check that specific beamlines are present
    await expect(page.locator('text=9-ID')).toBeVisible();
    await expect(page.locator('text=4-BM')).toBeVisible();
    await expect(page.locator('text=22-IR-1')).toBeVisible();
  });

  test('should handle long DNS names on small screens', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 568 }); // Very small screen
    await page.goto('/');
    
    await page.click('text=29-ID-2');
    await page.click('text=Data Acquisition');
    
    // Check that long DNS name is displayed properly
    const dnsName = page.locator('.dns-name');
    await expect(dnsName).toBeVisible();
    await expect(dnsName).toContainText('xf29id2-daq.nsls2.bnl.gov');
    
    // Check that text wraps or scrolls properly
    const dnsBox = await dnsName.boundingBox();
    expect(dnsBox.width).toBeLessThanOrEqual(320); // Should fit in viewport
  });
});

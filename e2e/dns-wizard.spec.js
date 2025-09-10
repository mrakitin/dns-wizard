const { test, expect } = require('@playwright/test');

test.describe('DNS Wizard E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display initial beamline selection step', async ({ page }) => {
    // Check that we're on the first step
    await expect(page.locator('h2')).toContainText('Select Beamline');
    await expect(page.locator('.step-container p')).toContainText('Choose the beamline where the device will be integrated');
    
    // Check that beamline options are visible
    await expect(page.locator('text=9-ID')).toBeVisible();
    await expect(page.locator('text=4-BM')).toBeVisible();
    await expect(page.locator('text=22-IR-1')).toBeVisible();
    
    // Check that icons are displayed
    await expect(page.locator('text=🔬')).toBeVisible(); // ID beamlines
    await expect(page.locator('text=🧲')).toBeVisible(); // BM beamlines
    await expect(page.locator('text=🌡️')).toBeVisible(); // IR beamlines
  });

  test('should navigate through complete wizard flow', async ({ page }) => {
    // Step 1: Select beamline
    await page.click('text=9-ID');
    await expect(page.locator('h2')).toContainText('Select Device Type');
    await expect(page.locator('.step-container p')).toContainText('Choose the type of device to integrate');
    
    // Step 2: Select device
    await page.click('text=Detector');
    await expect(page.locator('h2')).toContainText('Generated DNS Name');
    
    // Verify DNS name generation
    await expect(page.locator('.dns-name')).toContainText('xf09id1-det.nsls2.bnl.gov');
  });

  test('should generate correct DNS names for different beamline types', async ({ page }) => {
    // Test ID beamline
    await page.click('text=9-ID');
    await page.click('text=Detector');
    await expect(page.locator('.dns-name')).toContainText('xf09id1-det.nsls2.bnl.gov');
    
    // Reset and test BM beamline
    await page.click('text=🔄 Generate Another Name');
    await page.click('text=4-BM');
    await page.click('text=Monitor');
    await expect(page.locator('.dns-name')).toContainText('xf04bm-mon.nsls2.bnl.gov');
    
    // Reset and test IR beamline
    await page.click('text=🔄 Generate Another Name');
    await page.click('text=22-IR-1');
    await page.click('text=Camera');
    await expect(page.locator('.dns-name')).toContainText('xf22ir1-cam.nsls2.bnl.gov');
  });

  test('should handle back navigation correctly', async ({ page }) => {
    // Navigate to device selection
    await page.click('text=9-ID');
    await expect(page.locator('h2')).toContainText('Select Device Type');
    
    // Go back to beamline selection
    await page.click('text=← Back to Beamline Selection');
    await expect(page.locator('h2')).toContainText('Select Beamline');
  });

  test('should display device icons correctly', async ({ page }) => {
    await page.click('text=9-ID');
    
    // Check device icons are visible
    await expect(page.locator('text=📡')).toBeVisible(); // Detector
    await expect(page.locator('text=📺')).toBeVisible(); // Monitor
    await expect(page.locator('text=📷')).toBeVisible(); // Camera
    await expect(page.locator('text=⚙️')).toBeVisible(); // Motor
    await expect(page.locator('text=🌡️')).toBeVisible(); // Sensor
    await expect(page.locator('text=🎛️')).toBeVisible(); // Controller
    await expect(page.locator('text=💾')).toBeVisible(); // DAQ
    await expect(page.locator('text=🔧')).toBeVisible(); // Other
  });

  test('should show progress indicator', async ({ page }) => {
    // Check initial progress
    await expect(page.locator('.step-indicator')).toContainText('Step 1 of 3');
    
    // Check progress after beamline selection
    await page.click('text=9-ID');
    await expect(page.locator('.step-indicator')).toContainText('Step 2 of 3');
    
    // Check progress after device selection
    await page.click('text=Detector');
    await expect(page.locator('.step-indicator')).toContainText('Step 3 of 3');
  });

  test('should display name breakdown correctly', async ({ page }) => {
    await page.click('text=9-ID');
    await page.click('text=Detector');
    
    // Check breakdown section
    await expect(page.locator('.breakdown h4')).toContainText('Name Breakdown');
    await expect(page.locator('.breakdown li').first()).toContainText('xf - Standard prefix for beamline machines');
    await expect(page.locator('.breakdown li').nth(1)).toContainText('09 - Beamline ID (zero-padded)');
    await expect(page.locator('.breakdown li').nth(2)).toContainText('id - Beamline type identifier');
    await expect(page.locator('.breakdown li').nth(3)).toContainText('1 - Machine ID');
    await expect(page.locator('.breakdown li').nth(4)).toContainText('-det - Device type abbreviation');
    await expect(page.locator('.breakdown li').nth(5)).toContainText('.nsls2.bnl.gov - Default domain');
  });

  test('should have working copy to clipboard button', async ({ page }) => {
    await page.click('text=9-ID');
    await page.click('text=Detector');
    
    // Check copy button is visible
    await expect(page.locator('text=📋 Copy to Clipboard')).toBeVisible();
    
    // Click copy button (note: clipboard testing requires special permissions)
    await page.click('text=📋 Copy to Clipboard');
    
    // Verify button text changes or shows feedback (if implemented)
    // This would need additional implementation in the app
  });

  test('should handle multiple beamline selections', async ({ page }) => {
    // Test different beamline types
    const testCases = [
      { beamline: '2-ID', device: 'Detector', expected: 'xf02id1-det.nsls2.bnl.gov' },
      { beamline: '17-ID-1', device: 'Camera', expected: 'xf17id1-cam.nsls2.bnl.gov' },
      { beamline: '17-ID-2', device: 'Sensor', expected: 'xf17id2-sens.nsls2.bnl.gov' },
      { beamline: '4-BM', device: 'Monitor', expected: 'xf04bm-mon.nsls2.bnl.gov' },
      { beamline: '22-IR-1', device: 'Controller', expected: 'xf22ir1-ctrl.nsls2.bnl.gov' },
    ];

    for (const testCase of testCases) {
      // Reset if not first test
      if (testCase !== testCases[0]) {
        await page.click('text=🔄 Generate Another Name');
      }
      
      await page.click(`text=${testCase.beamline}`);
      await page.click(`text=${testCase.device}`);
      await expect(page.locator('.dns-name')).toContainText(testCase.expected);
    }
  });
});

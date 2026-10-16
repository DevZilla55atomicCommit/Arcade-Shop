import { test, expect } from "@playwright/test";

test.describe("Arcade Vault - Home Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("loads successfully", async ({ page }) => {
    await expect(page).toHaveTitle(/ARCADE VAULT/);
  });

  test("has hero section with headline", async ({ page }) => {
    const hero = page.locator("section").first();
    await expect(hero).toBeVisible();
    await expect(page.locator("h1")).toContainText("LEVEL UP YOUR GAME COLLECTION");
  });

  test("navigation is present", async ({ page }) => {
    await expect(page.locator("nav")).toBeVisible();
    await expect(page.locator('a[href="/shop"]')).toBeVisible();
    await expect(page.locator('a[href="/categories"]')).toBeVisible();
  });

  test("footer is present", async ({ page }) => {
    await expect(page.locator("footer")).toBeVisible();
  });
});

test.describe("Arcade Vault - Shop Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/shop");
  });

  test("loads game grid", async ({ page }) => {
    await expect(page.locator('[role="list"]')).toBeVisible();
  });

  test("has category filter", async ({ page }) => {
    await expect(page.locator('[role="tablist"]')).toBeVisible();
  });

  test("has sort dropdown", async ({ page }) => {
    await expect(page.locator("select")).toBeVisible();
  });
});

test.describe("Arcade Vault - Product Detail", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/product/neon-drifter");
  });

  test("displays game info", async ({ page }) => {
    await expect(page.locator("h1")).toContainText("NEON DRIFTER");
    await expect(page.locator('[data-testid="price"]')).toBeVisible();
    await expect(page.locator('[data-testid="rating"]')).toBeVisible();
  });

  test("add to cart button works", async ({ page }) => {
    const addToCart = page.locator('button:has-text("ADD TO CART")');
    await expect(addToCart).toBeVisible();
    await addToCart.click();
    await expect(page.locator('[aria-label*="cart"]')).toBeVisible();
  });
});

test.describe("Accessibility", () => {
  test("has proper heading hierarchy", async ({ page }) => {
    await page.goto("/");
    const h1 = page.locator("h1");
    await expect(h1).toHaveCount(1);
  });

  test("images have alt text", async ({ page }) => {
    await page.goto("/");
    const images = page.locator("img");
    const count = await images.count();
    for (let i = 0; i < count; i++) {
      const alt = await images.nth(i).getAttribute("alt");
      expect(alt).toBeTruthy();
    }
  });

  test("focus visible on interactive elements", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    const focused = page.locator(":focus");
    await expect(focused).toBeVisible();
  });
});

test.describe("Performance", () => {
  test("loads within acceptable time", async ({ page }) => {
    const start = Date.now();
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const loadTime = Date.now() - start;
    expect(loadTime).toBeLessThan(5000);
  });
});
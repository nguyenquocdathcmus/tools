import { expect, test } from "@playwright/test";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

const tinyPngBase64 =
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+Wn2QAAAAASUVORK5CYII=";

function tinyPngBuffer(): Buffer {
  return Buffer.from(tinyPngBase64, "base64");
}

async function createPdfBuffer(label: string): Promise<Buffer> {
  const pdf = await PDFDocument.create();
  const page = pdf.addPage([400, 280]);
  const font = await pdf.embedFont(StandardFonts.HelveticaBold);

  page.drawText(label, {
    x: 40,
    y: 220,
    size: 24,
    font,
    color: rgb(0.11, 0.2, 0.38),
  });

  const bytes = await pdf.save();
  return Buffer.from(bytes);
}

test("category item opens dedicated group page", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "All Tools" }).click();

  await expect(page).toHaveURL(/\/tools\/all$/);
  await expect(page.getByRole("heading", { name: "All Tools" })).toBeVisible();
});

test("json formatter formats input", async ({ page }) => {
  await page.goto("/json-formatter");
  await page.getByRole("button", { name: "Format JSON" }).click();

  const output = page.locator("textarea").nth(1);
  await expect(output).toContainText("\n");
  await expect(output).toContainText('"name": "MyTools"');
});

test("encode tools URL encode works", async ({ page }) => {
  await page.goto("/tools/encode");
  await page.locator("textarea").first().fill("hello world?");
  await page.getByRole("button", { name: "URL Encoder" }).click();

  const output = page.locator("textarea").nth(1);
  await expect(output).toHaveValue("hello%20world%3F");
});

test("timestamp unix to date conversion works", async ({ page }) => {
  await page.goto("/tools/timestamp");
  await page.getByLabel("Unix timestamp").fill("0");
  await page.getByRole("button", { name: "Unix to Date" }).click();

  await expect(page.getByLabel("Result")).toHaveValue(/1970-01-01T00:00:00.000Z/);
});

test("image convert png to jpg works", async ({ page }) => {
  await page.goto("/tools/image");
  await page
    .locator('input[type="file"]')
    .setInputFiles({
      name: "tiny.png",
      mimeType: "image/png",
      buffer: tinyPngBuffer(),
    });

  await page.getByLabel("Convert target format").selectOption("image/jpeg");
  await page.getByRole("button", { name: "Convert PNG/JPG" }).click();

  await expect(page.getByAltText("Processed output")).toBeVisible();
  await expect(page.getByRole("link", { name: "Download result" })).toHaveAttribute(
    "download",
    /processed-image\.jpg/,
  );
});

test("pdf tools merge works", async ({ page }) => {
  await page.goto("/tools/pdf");

  const firstPdf = await createPdfBuffer("First PDF");
  const secondPdf = await createPdfBuffer("Second PDF");

  await page.locator('input[type="file"]').setInputFiles([
    { name: "first.pdf", mimeType: "application/pdf", buffer: firstPdf },
    { name: "second.pdf", mimeType: "application/pdf", buffer: secondPdf },
  ]);

  await page.getByRole("button", { name: "Merge PDF" }).click();

  await expect(page.getByRole("link", { name: "Download PDF" })).toBeVisible();
});

test("favicon generator text mode generates assets", async ({ page }) => {
  await page.goto("/tools/favicon-generator");

  // Switch to text logo mode
  await page.getByRole("button", { name: /Text logo/ }).click();

  // Update brand name
  await page.getByLabel("Brand name").fill("TestBrand");

  // Update logo text (defaults to 'D', should accept single char)
  await page.getByLabel("Logo text").fill("T");

  // Wait for favicon generation to complete
  await expect(page.getByAltText("Favicon source preview")).toBeVisible({ timeout: 5000 });

  // Verify checklist items appear
  await expect(page.getByText("SVG favicon")).toBeVisible();
  await expect(page.getByText("ICO pack")).toBeVisible();
  await expect(page.getByText("PNG sizes")).toBeVisible();

  // Verify download buttons exist
  const downloadLinks = page.getByRole("link", { name: "Download file" });
  await expect(downloadLinks.first()).toBeVisible();
});

test("favicon generator upload mode processes image", async ({ page }) => {
  await page.goto("/tools/favicon-generator");

  // Should be on upload mode by default
  await page.locator('input[type="file"]').setInputFiles({
    name: "test-icon.png",
    mimeType: "image/png",
    buffer: tinyPngBuffer(),
  });

  // Wait for image preview to load
  await expect(page.getByAltText("Uploaded logo preview")).toBeVisible({ timeout: 5000 });

  // Verify dimensions are displayed
  await expect(page.getByText(/\d+ x \d+/)).toBeVisible();

  // Wait for favicon generation
  await expect(page.getByAltText("Favicon source preview")).toBeVisible({ timeout: 5000 });

  // Verify generated assets
  await expect(page.getByText("SVG favicon")).toBeVisible();
  await expect(page.getByRole("button", { name: "Download all (ZIP)" })).toBeVisible();
});

test("favicon generator manifest and snippet generation works", async ({ page }) => {
  await page.goto("/tools/favicon-generator");

  // Fill brand name
  await page.getByLabel("Brand name").fill("MyApp");

  // Verify manifest JSON is displayed
  const manifestCode = page.locator("pre.favicon-code").first();
  await expect(manifestCode).toContainText("MyApp");

  // Verify copy and download buttons
  await expect(page.getByRole("button", { name: "Copy manifest" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Download manifest" })).toBeVisible();

  // Verify HTML head snippet exists
  const snippetCode = page.locator("pre.favicon-code").nth(1);
  await expect(snippetCode).toContainText("favicon.svg");
  await expect(snippetCode).toContainText("apple-touch-icon");
});

test("favicon generator checker validates domain favicons", async ({ page }) => {
  await page.goto("/tools/favicon-generator");

  // Scroll to checker section
  await page.locator("input#favicon-checker-url").scrollIntoViewIfNeeded();

  // Enter a test URL
  await page.locator("input#favicon-checker-url").fill("https://example.com");

  // Click check button
  await page.getByRole("button", { name: "Check favicon" }).click();

  // Wait for results
  await expect(page.getByText("Resolved URL:")).toBeVisible({ timeout: 10000 });

  // Verify result structure
  await expect(page.getByText("Homepage status:")).toBeVisible();
  await expect(page.getByText("Icons found:")).toBeVisible();
});

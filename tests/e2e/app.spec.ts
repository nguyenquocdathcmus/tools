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

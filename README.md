# Daxnoria

Bo cong cu web xay dung bang Next.js de xu ly cac tac vu nhu format du lieu, encode/decode, xu ly image, PDF, timestamp, v.v.

## Yeu cau moi truong

- Node.js 20+
- npm 10+

Kiem tra phien ban:

```bash
node -v
npm -v
```

## Cai dat du an

Tai thu muc goc du an, chay:

```bash
npm install
```

## Chay du an o moi truong development

```bash
npm run dev
```

Sau do mo trinh duyet tai:

- http://localhost:3000

## Build va chay production

1. Build:

```bash
npm run build
```

2. Chay production server:

```bash
npm run start
```

## Lint code

```bash
npm run lint
```

## Chay test E2E (Playwright)

1. Cai browser cho Playwright (lan dau):

```bash
npx playwright install
```

2. Chay test E2E:

```bash
npm run test:e2e
```

3. Chay test E2E voi giao dien UI:

```bash
npm run test:e2e:ui
```

## Cau truc thu muc chinh

- src/app: cac page va route cua ung dung (App Router)
- src/components: cac UI component
- src/lib: helper va logic dung chung
- tests/e2e: test end-to-end

## Scripts co san

- npm run dev: chay dev server
- npm run build: build production
- npm run start: chay app da build
- npm run lint: kiem tra lint
- npm run test:e2e: chay test Playwright
- npm run test:e2e:ui: chay Playwright UI mode

## Ghi chu

Neu co cau hinh bien moi truong trong tuong lai, tao file .env.local tai thu muc goc du an va bo sung bien can thiet.

## SEO Sitelinks Checklist

Sau khi deploy, thuc hien checklist nay de tang co hoi co Sitelinks tren Google:

1. Submit lai sitemap trong Google Search Console:

```bash
https://daxnoria.com/sitemap.xml
```

2. Request indexing cho cac URL tru cot theo thu tu:

- /
- /tools
- /blog
- /developer-tools-online
- /api-debugging-tools
- /json-formatter
- /timestamp-converter
- /jwt-decoder

3. Kiem tra route search box:

- /search?q=json

4. Theo doi query brand trong Search Console:

- daxnoria
- daxnoria tools
- json formatter daxnoria

Tai lieu chi tiet: docs/SEO_SITELINKS_PLAYBOOK.md

Bao cao hang tuan: docs/SEO_WEEKLY_REPORT_TEMPLATE.md

Ke hoach 10 bai long-tail: docs/BLOG_TOPIC_CLUSTER_PLAN.md

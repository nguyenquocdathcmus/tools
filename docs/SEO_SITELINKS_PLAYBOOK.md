# SEO Sitelinks Playbook

Tai lieu nay dung de trien khai nhanh sau khi deploy, giup tang co hoi Google hien thi Sitelinks cho brand query.

## 1) URL tru cot can submit truoc

Submit theo thu tu uu tien sau trong Google Search Console (URL Inspection -> Request Indexing):

1. /
2. /tools
3. /blog
4. /developer-tools-online
5. /api-debugging-tools
6. /json-formatter
7. /timestamp-converter
8. /jwt-decoder
9. /diff-checker
10. /sitemap.xml

## 2) Sitemap va robots

Da co:

- /sitemap.xml
- /robots.txt

Sau moi lan cap nhat lon:

1. Vao Search Console -> Sitemaps
2. Re-submit sitemap: https://daxnoria.com/sitemap.xml
3. Kiem tra status khong loi crawl

## 3) Site name va Sitelinks Search Box

Da co schema:

- WebSite + SearchAction
- Organization
- Site navigation schema

Can dam bao:

1. Trang /search hoat dong on dinh
2. Khong tra ve loi voi query rong va query co gia tri
3. Khong chan crawl /search trong robots

## 4) Internal link can giu on dinh

Dieu huong cap cao khong nen doi lien tuc:

- Header: Home, Tools, Format, Encode, Timestamp, Blog
- Footer: Tools Directory, Blog, landing pages chinh

Luu y: giu ten menu on dinh it nhat 4-8 tuan de Google hoc cau truc.

## 5) Query can theo doi hang tuan

Theo doi trong Search Console -> Performance:

- daxnoria
- daxnoria tools
- daxnoria formatter
- json formatter daxnoria
- timestamp converter daxnoria

Chi so can theo doi:

1. Impression
2. CTR
3. Average position
4. Landing pages co impression cao nhat

## 6) Muc tieu 30 ngay

Tuan 1:

1. Submit URL tru cot
2. Re-submit sitemap
3. Kiem tra index status

Tuan 2:

1. Them 2-3 bai blog long-tail moi
2. Tang internal link tu bai blog ve trang tool tru cot

Tuan 3:

1. Kiem tra query moi co impression
2. Toi uu title/description cho 5 trang co impression cao nhat

Tuan 4:

1. Danh gia trang nao co CTR thap
2. Cap nhat heading va mo ta de tang click

## 7) Muc tieu 90 ngay

1. Duy tri nhat quan URL architecture
2. Mo rong content funnel (8-15 bai)
3. Tang brand mentions tu social/profile
4. Giu Core Web Vitals o muc xanh

## 8) Kiem tra nhanh sau deploy

Chay local truoc khi publish:

```bash
npm run lint
npm run build
```

Kiem tra route quan trong:

- /
- /tools
- /blog
- /search?q=json
- /developer-tools-online
- /api-debugging-tools

## 9) Ghi chu quan trong

Google khong co nut bat Sitelinks thu cong. Sitelinks duoc sinh tu:

1. Kien truc thong tin ro rang
2. Internal linking nhat quan
3. Brand signal va user behavior
4. Thoi gian crawl va hoc cau truc

Playbook nay giup toi da hoa kha nang, nhung khong the dam bao 100% ngay lap tuc.

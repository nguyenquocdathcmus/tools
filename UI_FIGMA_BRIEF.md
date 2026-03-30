# UI Brief cho Figma AI - MyTools

## 1) Muc tieu san pham
MyTools la web app utility cho developer, giup format/validate/minify text va xu ly nhanh Encode, Timestamp, Image, PDF ngay tren trinh duyet.

Muc tieu UI:
- Nhanh, ro rang, toi uu thao tac 1-2 buoc.
- Nguoi dung thay Input -> Action -> Output ngay lap tuc.
- Don gian, de scale them tool moi.

## 2) Information Architecture (IA)
Can thiet ke cac man hinh sau:

1. Home
2. Group page (All, Format, Web, Code)
3. Tool detail page cho tung formatter (vi du: JSON Formatter, XML Formatter...)
4. Encode tools page
5. Timestamp tools page
6. Image tools page
7. PDF tools page

## 3) Header va navigation
Header hien tai can UI theo dung logic:
- Brand: MyTools
- Main nav items: Home, Format, Encode, Timestamp, Image, PDF
- Khong co subtitle
- Khong co trust text
- Khong co Sign in / Upgrade

Yeu cau UX:
- Active state ro rang cho item dang o trang hien tai
- Hover/focus state cho tat ca nav item
- Mobile: nav chuyen thanh menu gọn (drawer hoac sheet)

## 4) Chuc nang can co theo tung khu vuc

### 4.1 Home
- Hero section voi H1, mo ta ngan
- Category tiles: All Tools, Format, Web Tools, Code Tools
- Popular tools grid
- Featured tools grid
- Danh sach tat ca formatter pages

### 4.2 Formatter tool page (24 formatter)
Mau chuc nang chung:
- Input textarea
- Output textarea
- Action buttons: Format now, Minify, Validate syntax, Copy output
- Hien loading state khi dang xu ly
- Hien syntax error details: line, column, line content

### 4.3 Encode tools
Actions bat buoc:
- Base64 Encode / Decode
- URL Encode / Decode
- HTML Encode / Decode

UI bat buoc:
- Input textarea
- Output textarea
- Error message area

### 4.4 Timestamp tools
Actions bat buoc:
- Unix to Date
- Date to Unix
- Timezone Convert

UI bat buoc:
- Input unix
- Input datetime-local
- Source timezone select
- Target timezone select
- Result textarea
- Error state

### 4.5 Image tools
Actions bat buoc:
- Compress image
- Resize image
- Convert PNG/JPG

UI bat buoc:
- Upload area (drag-drop + browse)
- Source preview
- Inputs: width, height, quality, target format
- Output preview
- Download result
- Error state

### 4.6 PDF tools
Actions bat buoc:
- Merge PDF
- Split PDF theo range (vd 1-2)
- PDF to Image (preview page 1)

UI bat buoc:
- File upload (multiple)
- Split range input
- Output block cho file PDF ket qua
- Output block cho image preview
- Download buttons
- Error state

## 5) Shared component system
Can sinh bo component dung chung:
- App Header
- App Footer
- Hero block
- Tool shell container
- Panel header
- Control row (button groups)
- Editor card
- Field (label + input/select)
- Dropzone
- Error alert
- Empty state
- Download action card

## 6) Trang thai UI bat buoc
Moi tool panel can co cac state:
- Default
- Hover/focus
- Loading
- Success
- Error
- Empty (chua co input/chua co file)
- Disabled button

## 7) Responsive requirement
- Desktop >= 1200px: 2 cot cho input/output
- Tablet 768-1199px: bo cuc linh hoat, giam spacing
- Mobile <= 767px: 1 cot, button stack theo hang

Can co:
- Sticky header hoac compact header tren mobile
- Touch target toi thieu 44px

## 8) Visual direction de Figma AI follow
- Tone: modern developer tool, clean, practical
- Uu tien readability cua text area va form controls
- Contrast ro, khong dung gradient qua manh lam mat tap trung
- Icon don gian theo category
- Typography de doc code/text de dang

## 9) Checklist output mong muon tu Figma AI
Yeu cau Figma AI tra ve:
1. Full page design cho 7 man hinh chinh
2. Component library co variants (default/hover/focus/disabled/error)
3. Auto layout day du
4. Responsive frames: desktop, tablet, mobile
5. Design token co ban: color, typography, spacing, radius
6. Prototype flow: Home -> Category -> Tool page -> thao tac input/output

## 10) Prompt mau de gui cho Figma AI
Ban co the copy prompt nay:

"Design a complete UI system for a web app named MyTools. The app includes: Home, group pages (All, Format, Web, Code), formatter tool page template, Encode tools, Timestamp tools, Image tools, and PDF tools. Header nav must contain: Home, Format, Encode, Timestamp, Image, PDF. Exclude subtitle, trust text, sign in, and upgrade actions. Build a reusable component system for hero, tool shell, input/output editors, control rows, form fields, dropzone, error alerts, and download cards. Include full interaction states (default, hover, focus, loading, success, error, empty, disabled). Provide responsive layouts for desktop/tablet/mobile and use modern clean developer-tool visual style with strong readability."
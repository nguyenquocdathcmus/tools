export type FormatterId =
  | "json"
  | "json5"
  | "xml"
  | "html"
  | "yaml"
  | "javascript"
  | "css"
  | "csharp"
  | "java"
  | "graphql"
  | "angular"
  | "vue"
  | "less"
  | "scss"
  | "typescript"
  | "babel"
  | "markdown"
  | "mdx"
  | "glimmer"
  | "lwc"
  | "php"
  | "wsdl"
  | "soap"
  | "flow";

export type PluginKey = "xml" | "php" | "java" | "csharp";

export type FormatterDefinition = {
  id: FormatterId;
  slug: string;
  name: string;
  parser: string;
  pluginKeys?: PluginKey[];
  seoDescription: string;
  landingIntro: string;
  sampleInput: string;
};

export const FORMATTERS: FormatterDefinition[] = [
  {
    id: "json",
    slug: "json-formatter",
    name: "JSON Formatter",
    parser: "json",
    seoDescription: "Format, minify, and validate JSON online with precise line-level error details.",
    landingIntro: "Optimize API responses, config files, and payloads with a fast and reliable JSON Formatter.",
    sampleInput: '{"name":"MyTools","version":1,"features":["format","validate"]}',
  },
  {
    id: "json5",
    slug: "json5-formatter",
    name: "JSON5 Formatter",
    parser: "json5",
    seoDescription: "Chuẩn hóa JSON5 có comment, trailing comma và validate syntax trực tiếp.",
    landingIntro: "JSON5 Formatter giúp bạn làm sạch cấu hình linh hoạt cho môi trường development.",
    sampleInput: "{\n  // comment\n  unquoted: 'value',\n  list: [1,2,],\n}",
  },
  {
    id: "xml",
    slug: "xml-formatter",
    name: "XML Formatter",
    parser: "xml",
    pluginKeys: ["xml"],
    seoDescription: "XML Formatter online cho cấu trúc dữ liệu enterprise với validate cú pháp theo dòng.",
    landingIntro: "Format XML giúp tài liệu dữ liệu dài dễ đọc hơn và giảm lỗi khi tích hợp hệ thống.",
    sampleInput: "<root><user id=\"1\"><name>Alice</name></user></root>",
  },
  {
    id: "html",
    slug: "html-formatter",
    name: "HTML Formatter",
    parser: "html",
    seoDescription: "Format và minify HTML cho landing page, email template và snippet frontend.",
    landingIntro: "HTML Formatter giữ cấu trúc DOM nhất quán để debug và review nhanh hơn.",
    sampleInput: "<div><h1>Hello</h1><p>world</p></div>",
  },
  {
    id: "yaml",
    slug: "yaml-formatter",
    name: "YAML Formatter",
    parser: "yaml",
    seoDescription: "YAML Formatter cho CI/CD, Kubernetes và config file với validate chuẩn indentation.",
    landingIntro: "Chuẩn hóa YAML giúp tránh lỗi pipeline do sai khoảng trắng hoặc nesting.",
    sampleInput: "service:\n  name: app\n  ports:\n    - 3000",
  },
  {
    id: "javascript",
    slug: "javascript-formatter",
    name: "JavaScript Formatter",
    parser: "babel",
    seoDescription: "Format, minify và kiểm tra cú pháp JavaScript cho project web hiện đại.",
    landingIntro: "JavaScript Formatter giúp codebase rõ ràng hơn trước khi commit hoặc deploy.",
    sampleInput: "function hello(name){console.log('Hello '+name)}",
  },
  {
    id: "css",
    slug: "css-formatter",
    name: "CSS Formatter",
    parser: "css",
    seoDescription: "CSS Formatter online để làm sạch stylesheet, validate selector và minify output.",
    landingIntro: "CSS Formatter giữ style file gọn, dễ maintain và thuận tiện cho team review.",
    sampleInput: "body{margin:0;padding:0;color:#222}",
  },
  {
    id: "csharp",
    slug: "csharp-formatter",
    name: "C# Formatter",
    parser: "cs",
    pluginKeys: ["csharp"],
    seoDescription: "C# Formatter cho class, LINQ và API code với kiểm tra lỗi cú pháp theo dòng.",
    landingIntro: "C# Formatter tạo chuẩn nhất quán cho backend .NET và code review kỹ thuật.",
    sampleInput: "public class User{public string Name{get;set;}}",
  },
  {
    id: "java",
    slug: "java-formatter",
    name: "Java Formatter",
    parser: "java",
    pluginKeys: ["java"],
    seoDescription: "Java Formatter online cho Spring, Android và dự án enterprise, có validate syntax.",
    landingIntro: "Java Formatter giúp định dạng class dài và giữ chuẩn coding style ổn định.",
    sampleInput: "class App{public static void main(String[] args){System.out.println(\"Hi\");}}",
  },
  {
    id: "graphql",
    slug: "graphql-formatter",
    name: "GraphQL Formatter",
    parser: "graphql",
    seoDescription: "GraphQL Formatter cho query, mutation, schema và validate lỗi theo dòng.",
    landingIntro: "GraphQL Formatter tối ưu truy vấn để nhóm frontend và backend trao đổi rõ ràng hơn.",
    sampleInput: "query GetUser($id: ID!){user(id:$id){id name}}",
  },
  {
    id: "angular",
    slug: "angular-formatter",
    name: "Angular Formatter",
    parser: "angular",
    seoDescription: "Angular Formatter cho template, directive và binding syntax với kết quả nhất quán.",
    landingIntro: "Angular Formatter giảm nhiễu khi review component template và expression phức tạp.",
    sampleInput: "<button (click)=\"save()\"> Save </button>",
  },
  {
    id: "vue",
    slug: "vuejs-formatter",
    name: "Vue JS Formatter",
    parser: "vue",
    seoDescription: "Vue JS Formatter cho SFC template/script/style và kiểm tra syntax nhanh.",
    landingIntro: "Vue Formatter giúp file component gọn và dễ đọc hơn ở cả template lẫn script block.",
    sampleInput: "<template><div>{{msg}}</div></template><script setup>const msg='hi'</script>",
  },
  {
    id: "less",
    slug: "less-formatter",
    name: "LESS Formatter",
    parser: "less",
    seoDescription: "LESS Formatter online cho biến, mixin và nested rules trong dự án web.",
    landingIntro: "LESS Formatter giữ cấu trúc style module rõ ràng khi codebase mở rộng.",
    sampleInput: "@color:#0a7; .btn{color:@color; .icon{margin-right:4px}}",
  },
  {
    id: "scss",
    slug: "scss-formatter",
    name: "SCSS Formatter",
    parser: "scss",
    seoDescription: "SCSS Formatter cho project React, Vue, Angular với validate nesting chính xác.",
    landingIntro: "SCSS Formatter giúp chuẩn hóa partials và module style theo convention của team.",
    sampleInput: "$primary:#0a7; .card{color:$primary; &__title{font-weight:700}}",
  },
  {
    id: "typescript",
    slug: "typescript-formatter",
    name: "TypeScript Formatter",
    parser: "typescript",
    seoDescription: "TypeScript Formatter cho type-safe code, interface, generic và validate syntax.",
    landingIntro: "TypeScript Formatter làm code typed sạch hơn, giảm lỗi trước khi build production.",
    sampleInput: "type User={id:number;name:string};const u:User={id:1,name:'A'};",
  },
  {
    id: "babel",
    slug: "babel-formatter",
    name: "Babel Formatter",
    parser: "babel",
    seoDescription: "Babel Formatter cho JavaScript hiện đại và cú pháp mới trong pipeline transpile.",
    landingIntro: "Babel Formatter hỗ trợ chuẩn hóa code JS dùng tính năng mới của ECMAScript.",
    sampleInput: "const sum=(a,b)=>a+b; class A{ #x = 1; }",
  },
  {
    id: "markdown",
    slug: "markdown-formatter",
    name: "Markdown Formatter",
    parser: "markdown",
    seoDescription: "Markdown Formatter cho tài liệu README, docs kỹ thuật và bài viết SEO.",
    landingIntro: "Markdown Formatter giúp nội dung technical writing gọn, dễ đọc và nhất quán heading.",
    sampleInput: "# title\n\n- item 1\n- item 2",
  },
  {
    id: "mdx",
    slug: "mdx-formatter",
    name: "MDX Formatter",
    parser: "mdx",
    seoDescription: "MDX Formatter cho blog và docs kết hợp Markdown với JSX, có validate nhanh.",
    landingIntro: "MDX Formatter giúp nhóm content và frontend làm việc mượt trong cùng một file.",
    sampleInput: "# Hello\n\n<Callout>Important</Callout>",
  },
  {
    id: "glimmer",
    slug: "glimmerjs-formatter",
    name: "Glimmer JS Formatter",
    parser: "glimmer",
    seoDescription: "Glimmer JS Formatter cho Ember template syntax và cấu trúc component rõ ràng.",
    landingIntro: "Glimmer Formatter làm sạch template để code Ember dễ bảo trì theo thời gian.",
    sampleInput: "<div>{{@title}}</div>",
  },
  {
    id: "lwc",
    slug: "lwc-formatter",
    name: "LWC Formatter",
    parser: "html",
    seoDescription: "LWC Formatter cho Lightning Web Components template với trình bày chuẩn.",
    landingIntro: "LWC Formatter giúp template Salesforce nhất quán và dễ đọc trong team CRM.",
    sampleInput: "<template><lightning-card title=\"User\"></lightning-card></template>",
  },
  {
    id: "php",
    slug: "php-formatter",
    name: "PHP Formatter",
    parser: "php",
    pluginKeys: ["php"],
    seoDescription: "PHP Formatter online cho Laravel, WordPress và backend truyền thống.",
    landingIntro: "PHP Formatter chuẩn hóa style code và tăng tốc review pull request.",
    sampleInput: "<?php\nfunction sum($a,$b){return $a+$b;}\n",
  },
  {
    id: "wsdl",
    slug: "wsdl-formatter",
    name: "WSDL Formatter",
    parser: "xml",
    pluginKeys: ["xml"],
    seoDescription: "WSDL Formatter cho SOAP contract XML và validate cấu trúc theo dòng.",
    landingIntro: "WSDL Formatter hỗ trợ đội tích hợp dịch vụ doanh nghiệp xử lý tài liệu lớn.",
    sampleInput: "<definitions><types></types><message name=\"Req\"></message></definitions>",
  },
  {
    id: "soap",
    slug: "soap-formatter",
    name: "SOAP Formatter",
    parser: "xml",
    pluginKeys: ["xml"],
    seoDescription: "SOAP Formatter online cho envelope và body XML với lỗi syntax chi tiết.",
    landingIntro: "SOAP Formatter giúp kiểm thử request/response XML nhanh hơn trong giai đoạn tích hợp.",
    sampleInput:
      "<soap:Envelope xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\"><soap:Body></soap:Body></soap:Envelope>",
  },
  {
    id: "flow",
    slug: "flow-formatter",
    name: "Flow Formatter",
    parser: "flow",
    seoDescription: "Flow Formatter cho JavaScript type annotations sử dụng Flow.",
    landingIntro: "Flow Formatter giữ code JS typed legacy nhất quán trong dự án dài hạn.",
    sampleInput: "// @flow\nfunction square(n:number){return n*n}",
  },
];

export const FORMATTER_BY_ID = Object.fromEntries(FORMATTERS.map((item) => [item.id, item])) as Record<
  FormatterId,
  FormatterDefinition
>;

export const FORMATTER_BY_SLUG = Object.fromEntries(
  FORMATTERS.map((item) => [item.slug, item]),
) as Record<string, FormatterDefinition>;

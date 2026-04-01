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
    seoDescription: "Standardize JSON5 with comments, trailing commas, and real-time syntax validation.",
    landingIntro: "JSON5 Formatter helps you clean up flexible configurations for development environments.",
    sampleInput: "{\n  // comment\n  unquoted: 'value',\n  list: [1,2,],\n}",
  },
  {
    id: "xml",
    slug: "xml-formatter",
    name: "XML Formatter",
    parser: "xml",
    pluginKeys: ["xml"],
    seoDescription: "Online XML Formatter for enterprise data structures with line-by-line syntax validation.",
    landingIntro: "Formatting XML makes long data documents more readable and reduces errors during system integration.",
    sampleInput: "<root><user id=\"1\"><name>Alice</name></user></root>",
  },
  {
    id: "html",
    slug: "html-formatter",
    name: "HTML Formatter",
    parser: "html",
    seoDescription: "Format and minify HTML for landing pages, email templates, and frontend snippets.",
    landingIntro: "HTML Formatter keeps consistent DOM structures for faster debugging and reviews.",
    sampleInput: "<div><h1>Hello</h1><p>world</p></div>",
  },
  {
    id: "yaml",
    slug: "yaml-formatter",
    name: "YAML Formatter",
    parser: "yaml",
    seoDescription: "YAML Formatter for CI/CD, Kubernetes, and config files with strict indentation validation.",
    landingIntro: "Standardizing YAML helps prevent pipeline errors caused by incorrect spacing or nesting.",
    sampleInput: "service:\n  name: app\n  ports:\n    - 3000",
  },
  {
    id: "javascript",
    slug: "javascript-formatter",
    name: "JavaScript Formatter",
    parser: "babel",
    seoDescription: "Format, minify, and check JavaScript syntax for modern web projects.",
    landingIntro: "JavaScript Formatter makes codebases clearer before committing or deploying.",
    sampleInput: "function hello(name){console.log('Hello '+name)}",
  },
  {
    id: "css",
    slug: "css-formatter",
    name: "CSS Formatter",
    parser: "css",
    seoDescription: "Online CSS Formatter to clean stylesheets, validate selectors, and minify output.",
    landingIntro: "CSS Formatter keeps style files neat, maintainable, and easy for team reviews.",
    sampleInput: "body{margin:0;padding:0;color:#222}",
  },
  {
    id: "csharp",
    slug: "csharp-formatter",
    name: "C# Formatter",
    parser: "cs",
    pluginKeys: ["csharp"],
    seoDescription: "C# Formatter for classes, LINQ, and API code with line-by-line syntax error checking.",
    landingIntro: "C# Formatter creates consistent standards for .NET backends and technical code reviews.",
    sampleInput: "public class User{public string Name{get;set;}}",
  },
  {
    id: "java",
    slug: "java-formatter",
    name: "Java Formatter",
    parser: "java",
    pluginKeys: ["java"],
    seoDescription: "Online Java Formatter for Spring, Android, and enterprise projects with syntax validation.",
    landingIntro: "Java Formatter helps format long classes and maintains stable coding styles.",
    sampleInput: "class App{public static void main(String[] args){System.out.println(\"Hi\");}}",
  },
  {
    id: "graphql",
    slug: "graphql-formatter",
    name: "GraphQL Formatter",
    parser: "graphql",
    seoDescription: "GraphQL Formatter for queries, mutations, schemas, and line-by-line validation.",
    landingIntro: "GraphQL Formatter optimizes queries so frontend and backend teams can communicate clearly.",
    sampleInput: "query GetUser($id: ID!){user(id:$id){id name}}",
  },
  {
    id: "angular",
    slug: "angular-formatter",
    name: "Angular Formatter",
    parser: "angular",
    seoDescription: "Angular Formatter for templates, directives, and binding syntax with consistent results.",
    landingIntro: "Angular Formatter reduces noise when reviewing component templates and complex expressions.",
    sampleInput: "<button (click)=\"save()\"> Save </button>",
  },
  {
    id: "vue",
    slug: "vuejs-formatter",
    name: "Vue JS Formatter",
    parser: "vue",
    seoDescription: "Vue JS Formatter for SFC templates, scripts, and styles with fast syntax checking.",
    landingIntro: "Vue Formatter helps keep component files neat and readable across template and script blocks.",
    sampleInput: "<template><div>{{msg}}</div></template><script setup>const msg='hi'</script>",
  },
  {
    id: "less",
    slug: "less-formatter",
    name: "LESS Formatter",
    parser: "less",
    seoDescription: "Online LESS Formatter for variables, mixins, and nested rules in web projects.",
    landingIntro: "LESS Formatter keeps module style structures clear as your codebase scales.",
    sampleInput: "@color:#0a7; .btn{color:@color; .icon{margin-right:4px}}",
  },
  {
    id: "scss",
    slug: "scss-formatter",
    name: "SCSS Formatter",
    parser: "scss",
    seoDescription: "SCSS Formatter for React, Vue, and Angular projects with precise nesting validation.",
    landingIntro: "SCSS Formatter helps standardize partials and module styles based on team conventions.",
    sampleInput: "$primary:#0a7; .card{color:$primary; &__title{font-weight:700}}",
  },
  {
    id: "typescript",
    slug: "typescript-formatter",
    name: "TypeScript Formatter",
    parser: "typescript",
    seoDescription: "TypeScript Formatter for type-safe code, interfaces, generics, and syntax validation.",
    landingIntro: "TypeScript Formatter makes typed code cleaner and reduces errors before production builds.",
    sampleInput: "type User={id:number;name:string};const u:User={id:1,name:'A'};",
  },
  {
    id: "babel",
    slug: "babel-formatter",
    name: "Babel Formatter",
    parser: "babel",
    seoDescription: "Babel Formatter for modern JavaScript and new syntax in transpile pipelines.",
    landingIntro: "Babel Formatter supports code standardization using new ECMAScript features.",
    sampleInput: "const sum=(a,b)=>a+b; class A{ #x = 1; }",
  },
  {
    id: "markdown",
    slug: "markdown-formatter",
    name: "Markdown Formatter",
    parser: "markdown",
    seoDescription: "Markdown Formatter for README files, technical docs, and SEO articles.",
    landingIntro: "Markdown Formatter makes technical writing neat, readable, and consistent.",
    sampleInput: "# title\n\n- item 1\n- item 2",
  },
  {
    id: "mdx",
    slug: "mdx-formatter",
    name: "MDX Formatter",
    parser: "mdx",
    seoDescription: "MDX Formatter for blogs and docs combining Markdown with JSX, featuring fast validation.",
    landingIntro: "MDX Formatter helps content and frontend teams work smoothly in the same file.",
    sampleInput: "# Hello\n\n<Callout>Important</Callout>",
  },
  {
    id: "glimmer",
    slug: "glimmerjs-formatter",
    name: "Glimmer JS Formatter",
    parser: "glimmer",
    seoDescription: "Glimmer JS Formatter for Ember template syntax and clear component structures.",
    landingIntro: "Glimmer Formatter cleans templates to make Ember code easy to maintain over time.",
    sampleInput: "<div>{{@title}}</div>",
  },
  {
    id: "lwc",
    slug: "lwc-formatter",
    name: "LWC Formatter",
    parser: "html",
    seoDescription: "LWC Formatter for Lightning Web Components templates with standard presentation.",
    landingIntro: "LWC Formatter helps Salesforce templates remain consistent and readable for CRM teams.",
    sampleInput: "<template><lightning-card title=\"User\"></lightning-card></template>",
  },
  {
    id: "php",
    slug: "php-formatter",
    name: "PHP Formatter",
    parser: "php",
    pluginKeys: ["php"],
    seoDescription: "Online PHP Formatter for Laravel, WordPress, and traditional backends.",
    landingIntro: "PHP Formatter standardizes code styles and accelerates pull request reviews.",
    sampleInput: "<?php\nfunction sum($a,$b){return $a+$b;}\n",
  },
  {
    id: "wsdl",
    slug: "wsdl-formatter",
    name: "WSDL Formatter",
    parser: "xml",
    pluginKeys: ["xml"],
    seoDescription: "WSDL Formatter for SOAP contract XML and line-by-line structure validation.",
    landingIntro: "WSDL Formatter assists enterprise integration teams in handling large documents.",
    sampleInput: "<definitions><types></types><message name=\"Req\"></message></definitions>",
  },
  {
    id: "soap",
    slug: "soap-formatter",
    name: "SOAP Formatter",
    parser: "xml",
    pluginKeys: ["xml"],
    seoDescription: "Online SOAP Formatter for XML envelopes and bodies with detailed syntax errors.",
    landingIntro: "SOAP Formatter speeds up XML request and response testing during the integration phase.",
    sampleInput:
      "<soap:Envelope xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\"><soap:Body></soap:Body></soap:Envelope>",
  },
  {
    id: "flow",
    slug: "flow-formatter",
    name: "Flow Formatter",
    parser: "flow",
    seoDescription: "Flow Formatter for JavaScript type annotations using Flow.",
    landingIntro: "Flow Formatter keeps typed legacy JS code consistent in long-term projects.",
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

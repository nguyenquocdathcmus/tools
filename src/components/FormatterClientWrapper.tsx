"use client";

import dynamic from "next/dynamic";

const FormatterClient = dynamic(() => import("./FormatterClient"), {
  ssr: false,
  loading: () => <div>Loading format tools...</div>,
});

export default FormatterClient;

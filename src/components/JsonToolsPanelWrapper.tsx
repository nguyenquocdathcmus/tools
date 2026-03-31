"use client";

import dynamic from "next/dynamic";

const JsonToolsPanel = dynamic(() => import("./JsonToolsPanel"), {
  ssr: false,
  loading: () => <div>Loading JSON Tools...</div>,
});

export default JsonToolsPanel;
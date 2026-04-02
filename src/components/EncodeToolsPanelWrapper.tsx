"use client";

import dynamic from "next/dynamic";

const EncodeToolsPanel = dynamic(() => import("./EncodeToolsPanel"), {
  ssr: false,
  loading: () => <div>Loading encoding tools...</div>,
});

export default EncodeToolsPanel;

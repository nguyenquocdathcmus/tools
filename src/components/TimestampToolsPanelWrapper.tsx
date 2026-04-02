"use client";

import dynamic from "next/dynamic";

const TimestampToolsPanel = dynamic(() => import("./TimestampToolsPanel"), {
  ssr: false,
  loading: () => <div>Loading timestamp tools...</div>,
});

export default TimestampToolsPanel;

type AdVariant = "top-banner" | "in-article";

type AdSlotProps = {
  variant: AdVariant;
};

const stylesByVariant: Record<AdVariant, React.CSSProperties> = {
  "top-banner": {
    padding: "20px 0",
    textAlign: "center",
    background: "var(--color-surface-sunken)",
    border: "1px dashed var(--color-border)",
    marginBottom: "32px",
    fontSize: "14px",
    color: "var(--color-text-subtle)",
    borderRadius: "8px",
  },
  "in-article": {
    padding: "80px 0",
    textAlign: "center",
    background: "var(--color-surface-sunken)",
    border: "1px dashed var(--color-border)",
    margin: "32px 0",
    fontSize: "14px",
    color: "var(--color-text-subtle)",
    borderRadius: "8px",
  },
};

const labelByVariant: Record<AdVariant, string> = {
  "top-banner": "[Top Banner Ad Placeholder - 728x90]",
  "in-article": "[In-Article Ad Placeholder - 300x250]",
};

export default function AdSlot({ variant }: AdSlotProps) {
  const adsEnabled = process.env.NEXT_PUBLIC_ENABLE_ADS === "true";

  // Keep ad positions in markup but disable rendering until integration is enabled.
  if (!adsEnabled) {
    return null;
  }

  return (
    <div data-ad-slot={variant} style={stylesByVariant[variant]}>
      {labelByVariant[variant]}
    </div>
  );
}

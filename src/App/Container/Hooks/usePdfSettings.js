import { useState } from "react";

/**
 * PDF Settings state hook.
 * - fontScale: multiplier for all font sizes (0.6 to 1.4, default 1.0)
 * - imageScale: max-width percentage for images (25 to 100, default 100)
 * - spacingMode: controls page-break behavior and vertical spacing
 *     "compact"     — minimal spacing, no page-break-avoid, tables/figures can split across pages
 *     "comfortable"  — moderate spacing, page-break-avoid only on headings, small elements flow naturally
 *     "spacious"     — generous spacing, page-break-avoid on tables/figures/blockquotes (can cause blank pages)
 */
const usePdfSettings = (initialValue = { fontScale: 1.0, imageScale: 100, spacingMode: "comfortable" }) => {
  const [state, setState] = useState(initialValue);
  return [state, setState];
};

export default usePdfSettings;

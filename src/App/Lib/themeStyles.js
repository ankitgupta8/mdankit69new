/**
 * Generates CSS string from a theme configuration object.
 * Applied to the preview pane and used for print/PDF output.
 *
 * Accepts optional pdfSettings:
 *   fontScale   — multiplier for all font sizes (0.6–1.4)
 *   imageScale  — max-width percentage for images (25–100)
 *   spacingMode — "compact" | "comfortable" | "spacious"
 */
import pdfThemes from './pdfThemes';

/**
 * Parse a CSS font-size value like "15px" or "1.6em" and scale it.
 */
function scaleFontSize(sizeStr, scale) {
  if (scale === 1) return sizeStr;
  const match = sizeStr.match(/^([\d.]+)(px|em|rem|%)$/);
  if (!match) return sizeStr;
  const num = parseFloat(match[1]);
  const unit = match[2];
  return `${(num * scale).toFixed(2)}${unit}`;
}

/**
 * Spacing multipliers per mode.
 * These scale margins, paddings, and line-height relative to the theme defaults.
 */
const SPACING = {
  compact:     { marginScale: 0.5,  lineHeightAdd: -0.15, tablePad: 0.65, blockMargin: 0.5  },
  comfortable: { marginScale: 0.8,  lineHeightAdd: 0,     tablePad: 0.85, blockMargin: 0.8  },
  spacious:    { marginScale: 1.0,  lineHeightAdd: 0.1,   tablePad: 1.0,  blockMargin: 1.0  },
};

/**
 * Build a complete CSS string for a given theme key + settings.
 */
export function generateThemeCSS(themeKey, pdfSettings) {
  const theme = pdfThemes[themeKey];
  if (!theme) return '';

  const fontScale = (pdfSettings && pdfSettings.fontScale) || 1.0;
  const imageScale = (pdfSettings && pdfSettings.imageScale != null) ? pdfSettings.imageScale : 100;
  const spacingMode = (pdfSettings && pdfSettings.spacingMode) || 'comfortable';
  const sp = SPACING[spacingMode] || SPACING.comfortable;

  const scope = '.preview.themed';

  // Scaled base font size
  const baseFontSize = scaleFontSize(theme.fontSize, fontScale);
  // Adjusted line height
  const baseLineHeight = (parseFloat(theme.lineHeight) + sp.lineHeightAdd).toFixed(2);

  const headingCSS = (tag, config) => {
    const props = [];
    if (config.color) props.push(`color: ${config.color}`);
    if (config.fontSize) props.push(`font-size: ${scaleFontSize(config.fontSize, fontScale)}`);
    if (config.fontWeight) props.push(`font-weight: ${config.fontWeight}`);
    if (config.borderBottom) props.push(`border-bottom: ${config.borderBottom}`);
    if (config.paddingBottom) props.push(`padding-bottom: ${config.paddingBottom}`);
    if (config.marginTop) {
      const mt = parseFloat(config.marginTop) * sp.marginScale;
      props.push(`margin-top: ${mt.toFixed(2)}em`);
    }
    if (config.textTransform) props.push(`text-transform: ${config.textTransform}`);
    if (config.letterSpacing) props.push(`letter-spacing: ${config.letterSpacing}`);
    if (config.fontStyle) props.push(`font-style: ${config.fontStyle}`);
    const mb = (0.6 * sp.marginScale).toFixed(2);
    props.push(`margin-bottom: ${mb}em`);
    props.push(`font-family: ${theme.fontFamily}`);
    return `${scope} ${tag} { ${props.join('; ')}; }`;
  };

  // Paragraph margin
  const pMargin = (1.0 * sp.blockMargin).toFixed(2);
  // List item margin
  const liMargin = (0.35 * sp.marginScale).toFixed(2);
  // Block margin (code, blockquote, table)
  const blockMargin = (1.2 * sp.blockMargin).toFixed(2);
  const tableMargin = (1.5 * sp.blockMargin).toFixed(2);
  // Table cell padding scaled
  const thPadV = Math.round(12 * sp.tablePad);
  const thPadH = Math.round(16 * sp.tablePad);
  const tdPadV = Math.round(10 * sp.tablePad);
  const tdPadH = Math.round(16 * sp.tablePad);
  // Code block padding
  const codePadNum = Math.round(16 * sp.tablePad);

  // Page-break rules per spacing mode
  let pageBreakCSS_print = '';
  if (spacingMode === 'compact') {
    // No page-break-avoid at all — everything flows naturally, no blank pages
    pageBreakCSS_print = `
      ${scope} table { page-break-inside: auto !important; }
      ${scope} thead { display: table-header-group; }
      ${scope} tr { page-break-inside: auto; }
      ${scope} pre { page-break-inside: auto !important; }
      ${scope} blockquote { page-break-inside: auto !important; }
      ${scope} img { page-break-inside: auto !important; }
      ${scope} h1, ${scope} h2, ${scope} h3,
      ${scope} h4, ${scope} h5, ${scope} h6 {
        page-break-after: auto;
        page-break-inside: auto;
      }
    `;
  } else if (spacingMode === 'comfortable') {
    // Only headings avoid page breaks; tables/figures can split
    pageBreakCSS_print = `
      ${scope} table { page-break-inside: auto !important; }
      ${scope} thead { display: table-header-group; }
      ${scope} tr { page-break-inside: auto; }
      ${scope} pre { page-break-inside: auto !important; }
      ${scope} blockquote { page-break-inside: auto !important; }
      ${scope} img { page-break-inside: avoid; }
      ${scope} h1, ${scope} h2, ${scope} h3,
      ${scope} h4, ${scope} h5, ${scope} h6 {
        page-break-after: avoid;
        page-break-inside: avoid;
      }
    `;
  } else {
    // spacious — avoid page breaks on everything (original behavior)
    pageBreakCSS_print = `
      ${scope} table { page-break-inside: avoid; }
      ${scope} thead { display: table-header-group; }
      ${scope} pre { page-break-inside: avoid; }
      ${scope} blockquote { page-break-inside: avoid; }
      ${scope} img { page-break-inside: avoid; }
      ${scope} h1, ${scope} h2, ${scope} h3,
      ${scope} h4, ${scope} h5, ${scope} h6 {
        page-break-after: avoid;
        page-break-inside: avoid;
      }
    `;
  }

  return `
    /* ===== Theme: ${theme.name} | Scale: ${fontScale} | Images: ${imageScale}% | Spacing: ${spacingMode} ===== */

    ${scope} {
      font-family: ${theme.fontFamily} !important;
      font-size: ${baseFontSize} !important;
      line-height: ${baseLineHeight} !important;
      color: ${theme.textColor} !important;
      background-color: ${theme.backgroundColor} !important;
      padding: 24px 32px !important;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }

    ${scope} * {
      font-family: inherit;
    }

    /* Headings */
    ${headingCSS('h1', theme.h1)}
    ${headingCSS('h2', theme.h2)}
    ${headingCSS('h3', theme.h3)}
    ${headingCSS('h4', theme.h4)}
    ${headingCSS('h5', theme.h5)}
    ${headingCSS('h6', theme.h6)}

    /* Paragraphs */
    ${scope} p {
      margin-bottom: ${pMargin}em;
      line-height: ${baseLineHeight};
    }

    /* Lists */
    ${scope} ul, ${scope} ol {
      padding-left: 2em;
      margin-bottom: ${pMargin}em;
    }
    ${scope} li {
      margin-bottom: ${liMargin}em;
      line-height: ${baseLineHeight};
    }
    ${scope} li > ul, ${scope} li > ol {
      margin-top: ${liMargin}em;
      margin-bottom: 0;
    }

    /* Links */
    ${scope} a {
      color: ${theme.link.color} !important;
      text-decoration: none;
    }
    ${scope} a:hover {
      text-decoration: underline;
    }

    /* Code blocks */
    ${scope} pre {
      background: ${theme.codeBlock.background} !important;
      border: ${theme.codeBlock.border} !important;
      border-radius: ${theme.codeBlock.borderRadius} !important;
      padding: ${codePadNum}px !important;
      overflow-x: auto;
      margin: ${blockMargin}em 0;
    }
    ${scope} pre code {
      font-family: ${theme.codeBlock.fontFamily} !important;
      font-size: ${scaleFontSize(theme.codeBlock.fontSize, fontScale)} !important;
      background: transparent !important;
      padding: 0 !important;
      border: none !important;
      border-radius: 0 !important;
      color: inherit;
      line-height: 1.6;
    }

    /* Inline code */
    ${scope} code {
      background: ${theme.inlineCode.background} !important;
      color: ${theme.inlineCode.color} !important;
      border-radius: ${theme.inlineCode.borderRadius} !important;
      padding: ${theme.inlineCode.padding} !important;
      font-family: ${theme.inlineCode.fontFamily} !important;
      font-size: ${scaleFontSize(theme.inlineCode.fontSize, fontScale)} !important;
    }

    /* Blockquotes */
    ${scope} blockquote {
      border-left: ${theme.blockquote.borderLeft} !important;
      background: ${theme.blockquote.background} !important;
      color: ${theme.blockquote.color} !important;
      padding: ${theme.blockquote.padding} !important;
      border-radius: ${theme.blockquote.borderRadius} !important;
      margin: ${blockMargin}em 0 !important;
      font-style: normal !important;
    }
    ${scope} blockquote p {
      margin: ${(0.4 * sp.marginScale).toFixed(2)}em 0;
    }

    /* Tables */
    ${scope} table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;
      margin: ${tableMargin}em 0;
      border-radius: ${theme.table.borderRadius};
      overflow: hidden;
      border: 1px solid ${theme.table.borderColor};
      font-size: ${scaleFontSize('1em', fontScale)};
    }
    ${scope} thead tr {
      background-color: ${theme.table.headerBg} !important;
    }
    ${scope} thead th {
      color: ${theme.table.headerColor} !important;
      font-weight: 600;
      padding: ${thPadV}px ${thPadH}px;
      text-align: left;
      border-bottom: 2px solid ${theme.table.borderColor};
      font-size: ${scaleFontSize('0.92em', fontScale)};
      letter-spacing: 0.3px;
    }
    ${scope} tbody td {
      padding: ${tdPadV}px ${tdPadH}px;
      border-bottom: 1px solid ${theme.table.borderColor};
    }
    ${scope} tbody tr:nth-child(even) {
      background-color: ${theme.table.stripedBg};
    }
    ${scope} tbody tr:last-child td {
      border-bottom: none;
    }
    ${scope} tbody tr:hover {
      opacity: 0.92;
    }

    /* Horizontal rules */
    ${scope} hr {
      ${theme.hr.border};
      border-top: ${theme.hr.borderTop};
      margin: ${(parseFloat(theme.hr.margin) * sp.marginScale || 2 * sp.marginScale).toFixed(1)}em 0;
    }

    /* Images */
    ${scope} img {
      max-width: ${imageScale}% !important;
      height: auto !important;
      border-radius: 8px;
      margin: ${blockMargin}em 0;
      display: block;
    }

    /* Strong and emphasis */
    ${scope} strong {
      font-weight: 700;
    }
    ${scope} em {
      font-style: italic;
    }

    /* Definition lists, details */
    ${scope} details {
      margin: ${blockMargin}em 0;
      padding: 8px 16px;
      border-radius: 6px;
      background: ${theme.codeBlock.background};
    }
    ${scope} summary {
      cursor: pointer;
      font-weight: 600;
    }

    /* ===== PRINT STYLES ===== */
    @media print {
      @page {
        margin: ${theme.pageMargin};
        size: A4;
      }

      ${scope} {
        padding: 0 !important;
        font-size: ${baseFontSize} !important;
        background-color: ${theme.backgroundColor} !important;
        color: ${theme.textColor} !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
        color-adjust: exact !important;
      }

      ${scope} pre {
        white-space: pre-wrap !important;
        word-wrap: break-word !important;
      }

      /* Page break rules based on spacing mode */
      ${pageBreakCSS_print}

      /* Preserve colors in print */
      ${scope} thead tr {
        background-color: ${theme.table.headerBg} !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      ${scope} thead th {
        color: ${theme.table.headerColor} !important;
      }
      ${scope} tbody tr:nth-child(even) {
        background-color: ${theme.table.stripedBg} !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      ${scope} blockquote {
        background: ${theme.blockquote.background} !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      ${scope} pre {
        background: ${theme.codeBlock.background} !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
    }
  `;
}

/**
 * Injects or updates a <style> tag in the document head with the theme CSS.
 */
export function injectThemeStyle(themeKey, pdfSettings) {
  const styleId = 'pdf-theme-style';
  let styleEl = document.getElementById(styleId);
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = styleId;
    document.head.appendChild(styleEl);
  }
  styleEl.textContent = generateThemeCSS(themeKey, pdfSettings);
}

/**
 * Remove the injected theme style tag.
 */
export function removeThemeStyle() {
  const styleEl = document.getElementById('pdf-theme-style');
  if (styleEl) {
    styleEl.remove();
  }
}

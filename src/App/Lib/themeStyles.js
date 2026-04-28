/**
 * Generates CSS string from a theme configuration object.
 * Applied to the preview pane and used for print/PDF output.
 */
import pdfThemes from './pdfThemes';

/**
 * Build a complete CSS string for a given theme key.
 * The CSS targets `.preview.themed` to scope styles properly.
 */
export function generateThemeCSS(themeKey) {
  const theme = pdfThemes[themeKey];
  if (!theme) return '';

  const scope = '.preview.themed';

  const headingCSS = (tag, config) => {
    const props = [];
    if (config.color) props.push(`color: ${config.color}`);
    if (config.fontSize) props.push(`font-size: ${config.fontSize}`);
    if (config.fontWeight) props.push(`font-weight: ${config.fontWeight}`);
    if (config.borderBottom) props.push(`border-bottom: ${config.borderBottom}`);
    if (config.paddingBottom) props.push(`padding-bottom: ${config.paddingBottom}`);
    if (config.marginTop) props.push(`margin-top: ${config.marginTop}`);
    if (config.textTransform) props.push(`text-transform: ${config.textTransform}`);
    if (config.letterSpacing) props.push(`letter-spacing: ${config.letterSpacing}`);
    if (config.fontStyle) props.push(`font-style: ${config.fontStyle}`);
    props.push('margin-bottom: 0.6em');
    props.push(`font-family: ${theme.fontFamily}`);
    return `${scope} ${tag} { ${props.join('; ')}; }`;
  };

  return `
    /* ===== Theme: ${theme.name} ===== */

    ${scope} {
      font-family: ${theme.fontFamily} !important;
      font-size: ${theme.fontSize} !important;
      line-height: ${theme.lineHeight} !important;
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
      margin-bottom: 1em;
      line-height: ${theme.lineHeight};
    }

    /* Lists */
    ${scope} ul, ${scope} ol {
      padding-left: 2em;
      margin-bottom: 1em;
    }
    ${scope} li {
      margin-bottom: 0.35em;
      line-height: ${theme.lineHeight};
    }
    ${scope} li > ul, ${scope} li > ol {
      margin-top: 0.35em;
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
      padding: ${theme.codeBlock.padding} !important;
      overflow-x: auto;
      margin: 1.2em 0;
    }
    ${scope} pre code {
      font-family: ${theme.codeBlock.fontFamily} !important;
      font-size: ${theme.codeBlock.fontSize} !important;
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
      font-size: ${theme.inlineCode.fontSize} !important;
    }

    /* Blockquotes */
    ${scope} blockquote {
      border-left: ${theme.blockquote.borderLeft} !important;
      background: ${theme.blockquote.background} !important;
      color: ${theme.blockquote.color} !important;
      padding: ${theme.blockquote.padding} !important;
      border-radius: ${theme.blockquote.borderRadius} !important;
      margin: 1.2em 0 !important;
      font-style: normal !important;
    }
    ${scope} blockquote p {
      margin: 0.4em 0;
    }

    /* Tables */
    ${scope} table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;
      margin: 1.5em 0;
      border-radius: ${theme.table.borderRadius};
      overflow: hidden;
      border: 1px solid ${theme.table.borderColor};
    }
    ${scope} thead tr {
      background-color: ${theme.table.headerBg} !important;
    }
    ${scope} thead th {
      color: ${theme.table.headerColor} !important;
      font-weight: 600;
      padding: 12px 16px;
      text-align: left;
      border-bottom: 2px solid ${theme.table.borderColor};
      font-size: 0.92em;
      letter-spacing: 0.3px;
    }
    ${scope} tbody td {
      padding: 10px 16px;
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
      margin: ${theme.hr.margin};
    }

    /* Images */
    ${scope} img {
      max-width: 100%;
      height: auto;
      border-radius: 8px;
      margin: 1em 0;
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
      margin: 1em 0;
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
        font-size: ${theme.fontSize} !important;
        background-color: ${theme.backgroundColor} !important;
        color: ${theme.textColor} !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
        color-adjust: exact !important;
      }

      ${scope} pre {
        white-space: pre-wrap !important;
        word-wrap: break-word !important;
        page-break-inside: avoid;
      }

      ${scope} table {
        page-break-inside: avoid;
      }

      ${scope} thead {
        display: table-header-group;
      }

      ${scope} h1, ${scope} h2, ${scope} h3,
      ${scope} h4, ${scope} h5, ${scope} h6 {
        page-break-after: avoid;
        page-break-inside: avoid;
      }

      ${scope} img {
        page-break-inside: avoid;
      }

      ${scope} blockquote {
        page-break-inside: avoid;
      }

      /* Page numbers via CSS counters */
      ${theme.pageNumber ? `
        ${scope}::after {
          content: '';
          display: block;
        }
      ` : ''}

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
export function injectThemeStyle(themeKey) {
  const styleId = 'pdf-theme-style';
  let styleEl = document.getElementById(styleId);
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = styleId;
    document.head.appendChild(styleEl);
  }
  styleEl.textContent = generateThemeCSS(themeKey);
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

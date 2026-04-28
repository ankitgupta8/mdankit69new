import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useProvided } from "nonaction";
import { PdfSettingsContainer } from "../../Container";

const SPACING_MODES = [
  {
    key: "compact",
    label: "Compact",
    desc: "Minimal spacing, tables & figures can split across pages — no blank pages",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /><line x1="3" y1="14" x2="21" y2="14" /><line x1="3" y1="18" x2="21" y2="18" />
      </svg>
    ),
  },
  {
    key: "comfortable",
    label: "Comfortable",
    desc: "Balanced spacing, only headings avoid page breaks — best for most documents",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="3" y1="5" x2="21" y2="5" /><line x1="3" y1="10" x2="21" y2="10" /><line x1="3" y1="15" x2="21" y2="15" /><line x1="3" y1="20" x2="21" y2="20" />
      </svg>
    ),
  },
  {
    key: "spacious",
    label: "Spacious",
    desc: "Generous spacing, tables & figures stay on one page — may cause blank pages",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="3" y1="4" x2="21" y2="4" /><line x1="3" y1="11" x2="21" y2="11" /><line x1="3" y1="18" x2="21" y2="18" />
      </svg>
    ),
  },
];

const FONT_SCALE_PRESETS = [
  { value: 0.65, label: "XS" },
  { value: 0.75, label: "S" },
  { value: 0.85, label: "M-" },
  { value: 1.0,  label: "M" },
  { value: 1.1,  label: "L" },
  { value: 1.25, label: "XL" },
  { value: 1.4,  label: "2XL" },
];

const IMAGE_SCALE_PRESETS = [
  { value: 25,  label: "XS" },
  { value: 35,  label: "S" },
  { value: 50,  label: "M" },
  { value: 65,  label: "L" },
  { value: 80,  label: "XL" },
  { value: 100, label: "Full" },
];

const PdfSettings = ({ className }) => {
  const [settings, setSettings] = useProvided(PdfSettingsContainer);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFontScale = (value) => {
    setSettings({ ...settings, fontScale: value });
  };

  const handleSpacingMode = (mode) => {
    setSettings({ ...settings, spacingMode: mode });
  };

  const handleImageScale = (value) => {
    setSettings({ ...settings, imageScale: value });
  };

  const currentScaleLabel = FONT_SCALE_PRESETS.find(p => p.value === settings.fontScale)?.label || `${Math.round(settings.fontScale * 100)}%`;
  const currentImageLabel = IMAGE_SCALE_PRESETS.find(p => p.value === settings.imageScale)?.label || `${settings.imageScale}%`;

  return (
    <div className={className + " no-print"} ref={dropdownRef}>
      <button
        className="settings-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
        title="PDF Layout Settings"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" />
          <line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" />
          <line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" />
          <line x1="1" y1="14" x2="7" y2="14" /><line x1="9" y1="8" x2="15" y2="8" /><line x1="17" y1="16" x2="23" y2="16" />
        </svg>
        <span className="btn-label">Layout</span>
        <svg className="chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }}>
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      {isOpen && (
        <div className="settings-dropdown">
          {/* Font Size Section */}
          <div className="section">
            <div className="section-header">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="4 7 4 4 20 4 20 7" /><line x1="9" y1="20" x2="15" y2="20" /><line x1="12" y1="4" x2="12" y2="20" />
              </svg>
              <span>Overall Size</span>
              <span className="section-value">{currentScaleLabel}</span>
            </div>
            <p className="section-desc">Scale all text, tables, and elements proportionally</p>
            <div className="scale-presets">
              {FONT_SCALE_PRESETS.map((preset) => (
                <button
                  key={preset.value}
                  className={`scale-btn ${settings.fontScale === preset.value ? 'active' : ''}`}
                  onClick={() => handleFontScale(preset.value)}
                  title={`${Math.round(preset.value * 100)}%`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
            <div className="slider-row">
              <span className="slider-label">60%</span>
              <input
                type="range"
                min="0.6"
                max="1.4"
                step="0.05"
                value={settings.fontScale}
                onChange={(e) => handleFontScale(parseFloat(e.target.value))}
                className="scale-slider"
              />
              <span className="slider-label">140%</span>
            </div>
            <div className="scale-percent">{Math.round(settings.fontScale * 100)}%</div>
          </div>

          {/* Image Size Section */}
          <div className="section">
            <div className="section-header">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
              </svg>
              <span>Image Size</span>
              <span className="section-value">{currentImageLabel}</span>
            </div>
            <p className="section-desc">Limit the maximum width of images in the document</p>
            <div className="scale-presets">
              {IMAGE_SCALE_PRESETS.map((preset) => (
                <button
                  key={preset.value}
                  className={`scale-btn ${settings.imageScale === preset.value ? 'active' : ''}`}
                  onClick={() => handleImageScale(preset.value)}
                  title={`${preset.value}% width`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
            <div className="slider-row">
              <span className="slider-label">25%</span>
              <input
                type="range"
                min="25"
                max="100"
                step="5"
                value={settings.imageScale}
                onChange={(e) => handleImageScale(parseInt(e.target.value, 10))}
                className="scale-slider"
              />
              <span className="slider-label">100%</span>
            </div>
            <div className="scale-percent">{settings.imageScale}%</div>
          </div>

          {/* Spacing Mode Section */}
          <div className="section">
            <div className="section-header">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10H3M21 6H3M21 14H3M21 18H3" />
              </svg>
              <span>Page Break Mode</span>
            </div>
            <p className="section-desc">Controls how tables, figures, and blocks split across pages</p>
            <div className="spacing-options">
              {SPACING_MODES.map((mode) => (
                <button
                  key={mode.key}
                  className={`spacing-btn ${settings.spacingMode === mode.key ? 'active' : ''}`}
                  onClick={() => handleSpacingMode(mode.key)}
                >
                  <div className="spacing-icon">{mode.icon}</div>
                  <div className="spacing-info">
                    <span className="spacing-label">{mode.label}</span>
                    <span className="spacing-desc">{mode.desc}</span>
                  </div>
                  {settings.spacingMode === mode.key && (
                    <svg className="check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default styled(PdfSettings)`
  position: relative;
  display: inline-block;

  .settings-toggle-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 16px;
    background: #2d3142;
    color: #ffffff;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    font-family: 'Inter', 'Segoe UI', sans-serif;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    white-space: nowrap;
  }
  .settings-toggle-btn:hover {
    background: #3d4258;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  .btn-label {
    font-size: 14px;
  }

  .settings-dropdown {
    position: absolute;
    bottom: calc(100% + 8px);
    right: 0;
    width: 340px;
    max-height: 520px;
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18), 0 2px 8px rgba(0, 0, 0, 0.08);
    z-index: 10000;
    overflow-y: auto;
    overflow-x: hidden;
    animation: slideUp 0.2s ease;
    font-family: 'Inter', 'Segoe UI', sans-serif;
    padding: 0;
  }
  .settings-dropdown::-webkit-scrollbar {
    width: 6px;
  }
  .settings-dropdown::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 3px;
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .section {
    padding: 16px;
    border-bottom: 1px solid #f0f0f0;
  }
  .section:last-child {
    border-bottom: none;
  }

  .section-header {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 600;
    font-size: 13px;
    color: #1a1a2e;
    margin-bottom: 4px;
  }
  .section-header svg {
    color: #555;
    flex-shrink: 0;
  }
  .section-value {
    margin-left: auto;
    font-size: 12px;
    font-weight: 600;
    color: #4f46e5;
    background: #eef0ff;
    padding: 2px 8px;
    border-radius: 12px;
  }

  .section-desc {
    font-size: 11px;
    color: #888;
    margin: 0 0 10px 0;
    line-height: 1.4;
  }

  /* Font scale presets */
  .scale-presets {
    display: flex;
    gap: 4px;
    margin-bottom: 10px;
  }
  .scale-btn {
    flex: 1;
    padding: 6px 0;
    border: 1px solid #e0e0e8;
    background: #fafafe;
    border-radius: 6px;
    font-size: 11px;
    font-weight: 600;
    font-family: 'Inter', 'Segoe UI', sans-serif;
    color: #555;
    cursor: pointer;
    transition: all 0.15s ease;
  }
  .scale-btn:hover {
    background: #f0f0fa;
    border-color: #c0c0d0;
  }
  .scale-btn.active {
    background: #4f46e5;
    color: #fff;
    border-color: #4f46e5;
  }

  /* Slider */
  .slider-row {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .slider-label {
    font-size: 10px;
    color: #999;
    flex-shrink: 0;
    width: 28px;
    text-align: center;
  }
  .scale-slider {
    flex: 1;
    -webkit-appearance: none;
    appearance: none;
    height: 5px;
    border-radius: 3px;
    background: #e0e0e8;
    outline: none;
    cursor: pointer;
  }
  .scale-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #4f46e5;
    cursor: pointer;
    box-shadow: 0 1px 4px rgba(0,0,0,0.2);
  }
  .scale-slider::-moz-range-thumb {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #4f46e5;
    cursor: pointer;
    border: none;
    box-shadow: 0 1px 4px rgba(0,0,0,0.2);
  }
  .scale-percent {
    text-align: center;
    font-size: 11px;
    color: #4f46e5;
    font-weight: 600;
    margin-top: 4px;
  }

  /* Spacing mode options */
  .spacing-options {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .spacing-btn {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #eee;
    background: #fafafe;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.15s ease;
    text-align: left;
    font-family: 'Inter', 'Segoe UI', sans-serif;
  }
  .spacing-btn:hover {
    background: #f5f5fa;
    border-color: #d0d0e0;
  }
  .spacing-btn.active {
    background: #eef0ff;
    border-color: #4f46e5;
  }
  .spacing-icon {
    flex-shrink: 0;
    color: #666;
    display: flex;
    align-items: center;
  }
  .spacing-btn.active .spacing-icon {
    color: #4f46e5;
  }
  .spacing-info {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
  }
  .spacing-label {
    font-size: 13px;
    font-weight: 600;
    color: #1a1a2e;
    line-height: 1.3;
  }
  .spacing-desc {
    font-size: 10px;
    color: #888;
    line-height: 1.3;
  }
  .check-icon {
    flex-shrink: 0;
    color: #4f46e5;
  }

  @media (max-width: 719px) {
    .settings-dropdown {
      width: 300px;
      right: -60px;
    }
    .btn-label {
      display: none;
    }
    .settings-toggle-btn {
      padding: 10px 12px;
    }
  }
`;

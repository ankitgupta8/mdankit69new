import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useProvided } from "nonaction";
import { ThemeContainer } from "../../Container";
import pdfThemes from "../../Lib/pdfThemes";
import { injectThemeStyle } from "../../Lib/themeStyles";

const ThemeSelector = ({ className }) => {
  const [currentTheme, setCurrentTheme] = useProvided(ThemeContainer);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleThemeChange = (themeKey) => {
    setCurrentTheme(themeKey);
    injectThemeStyle(themeKey);
    setIsOpen(false);
  };

  // Group themes by category
  const categories = {};
  Object.entries(pdfThemes).forEach(([key, theme]) => {
    const cat = theme.category || "Other";
    if (!categories[cat]) categories[cat] = [];
    categories[cat].push({ key, ...theme });
  });

  const currentThemeData = pdfThemes[currentTheme];

  return (
    <div className={className + " no-print"} ref={dropdownRef}>
      <button
        className="theme-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
        title="Change PDF Style"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path>
        </svg>
        <span className="btn-label">
          Change Style
        </span>
        <svg className="chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }}>
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      {isOpen && (
        <div className="theme-dropdown">
          <div className="dropdown-header">
            <span>PDF Styles</span>
            <span className="current-label">{currentThemeData ? currentThemeData.name : ''}</span>
          </div>
          <div className="dropdown-scroll">
            {Object.entries(categories).map(([category, themes]) => (
              <div key={category} className="theme-category">
                <div className="category-label">{category}</div>
                {themes.map((theme) => (
                  <button
                    key={theme.key}
                    className={`theme-option ${currentTheme === theme.key ? 'active' : ''}`}
                    onClick={() => handleThemeChange(theme.key)}
                  >
                    <div className="theme-preview-colors">
                      <span className="color-dot" style={{ background: theme.h1.color }}></span>
                      <span className="color-dot" style={{ background: theme.h2.color }}></span>
                      <span className="color-dot" style={{ background: theme.h3.color }}></span>
                      <span className="color-dot" style={{ background: theme.backgroundColor, border: '1px solid #ccc' }}></span>
                    </div>
                    <div className="theme-info">
                      <span className="theme-name">{theme.name}</span>
                      <span className="theme-desc">{theme.description}</span>
                    </div>
                    {currentTheme === theme.key && (
                      <svg className="check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default styled(ThemeSelector)`
  position: relative;
  display: inline-block;

  .theme-toggle-btn {
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
  .theme-toggle-btn:hover {
    background: #3d4258;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  .btn-label {
    font-size: 14px;
  }

  .theme-dropdown {
    position: absolute;
    bottom: calc(100% + 8px);
    right: 0;
    width: 340px;
    max-height: 480px;
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18), 0 2px 8px rgba(0, 0, 0, 0.08);
    z-index: 10000;
    overflow: hidden;
    animation: slideUp 0.2s ease;
    font-family: 'Inter', 'Segoe UI', sans-serif;
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .dropdown-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 16px;
    border-bottom: 1px solid #eee;
    font-weight: 600;
    font-size: 14px;
    color: #1a1a2e;
  }
  .current-label {
    font-size: 12px;
    font-weight: 500;
    color: #666;
    background: #f0f0f5;
    padding: 3px 10px;
    border-radius: 20px;
  }

  .dropdown-scroll {
    max-height: 400px;
    overflow-y: auto;
    padding: 8px;
  }
  .dropdown-scroll::-webkit-scrollbar {
    width: 6px;
  }
  .dropdown-scroll::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 3px;
  }

  .theme-category {
    margin-bottom: 4px;
  }

  .category-label {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #999;
    padding: 8px 12px 4px;
  }

  .theme-option {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    padding: 10px 12px;
    border: none;
    background: transparent;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.15s ease;
    text-align: left;
    font-family: 'Inter', 'Segoe UI', sans-serif;
  }
  .theme-option:hover {
    background: #f5f5fa;
  }
  .theme-option.active {
    background: #eef0ff;
  }

  .theme-preview-colors {
    display: flex;
    flex-direction: column;
    gap: 2px;
    flex-shrink: 0;
  }
  .color-dot {
    width: 18px;
    height: 4px;
    border-radius: 2px;
    display: block;
  }

  .theme-info {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
  }
  .theme-name {
    font-size: 13px;
    font-weight: 600;
    color: #1a1a2e;
    line-height: 1.3;
  }
  .theme-desc {
    font-size: 11px;
    color: #888;
    line-height: 1.3;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .check-icon {
    flex-shrink: 0;
    color: #4f46e5;
  }

  @media (max-width: 719px) {
    .theme-dropdown {
      width: 300px;
      right: -10px;
    }
    .btn-label {
      display: none;
    }
    .theme-toggle-btn {
      padding: 10px 12px;
    }
  }
`;

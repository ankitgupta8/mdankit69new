import { Container } from 'nonaction';
import useText from './Hooks/useText.js';
import useTheme from './Hooks/useTheme.js';
import usePdfSettings from './Hooks/usePdfSettings.js';
export const TextContainer = Container(useText);
export const ThemeContainer = Container(useTheme);
export const PdfSettingsContainer = Container(usePdfSettings);
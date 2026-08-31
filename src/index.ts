/**
 * @mav/bayad — MaV design system for the Bayad fintech prototype.
 *
 * Setup (three things every consumer must do):
 * 1. `import '@mav/bayad/styles.css'` once at the app root.
 * 2. Load the fonts (Google Fonts <link>, or `import '@mav/bayad/fonts.css'`).
 * 3. Theme via `document.documentElement.setAttribute('data-theme', 'dark' | 'light')`.
 *
 * See CLAUDE.md in the package repo for the component index, token cheat
 * sheet, and screen recipes.
 */
import './styles.css';

/* Icons */
export * from './icons';

/* Atoms */
export * from './components/atoms/Button';

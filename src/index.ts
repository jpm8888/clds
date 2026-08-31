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
export * from './components/atoms/Badge';
export * from './components/atoms/Chip';
export * from './components/atoms/Avatar';
export * from './components/atoms/Divider';
export * from './components/atoms/Spinner';
export * from './components/atoms/ProgressBar';
export * from './components/atoms/Illustration';
export * from './components/atoms/SocialButton';
export * from './components/atoms/TextLink';
export * from './components/atoms/TextField';
export * from './components/atoms/Textarea';
export * from './components/atoms/SearchField';
export * from './components/atoms/OtpInput';

/* Molecules */
export * from './components/molecules/ButtonGroup';
export * from './components/molecules/MenuButton';
export * from './components/molecules/Tabs';
export * from './components/molecules/GlideTabs';
export * from './components/molecules/PillTabs';
export * from './components/molecules/ButtonDock';
export * from './components/molecules/Breadcrumb';
export * from './components/molecules/Coachmark';
export * from './components/molecules/Checkbox';
export * from './components/molecules/Radio';
export * from './components/molecules/Toggle';
export * from './components/molecules/Stepper';
export * from './components/molecules/AmountInput';

/* Organisms */
export * from './components/organisms/BottomNav';
export * from './components/organisms/AppBar';

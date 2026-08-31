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
export * from './components/molecules/Alert';
export * from './components/molecules/Toast';
export * from './components/molecules/PaymentCard';
export * from './components/molecules/List';
export * from './components/molecules/SectionHeader';
export * from './components/molecules/BlogCard';
export * from './components/molecules/Pagination';
export * from './components/molecules/Checkbox';
export * from './components/molecules/Radio';
export * from './components/molecules/Toggle';
export * from './components/molecules/Stepper';
export * from './components/molecules/AmountInput';
export * from './components/molecules/EmptyState';
export * from './components/molecules/Balance';
export * from './components/molecules/CashflowCard';
export * from './components/molecules/Chart';
export * from './components/molecules/ChatBubble';
export * from './components/molecules/Datepicker';
export * from './components/molecules/MessageInput';
export * from './components/molecules/SwipeButton';

/* Organisms */
export * from './components/organisms/BottomNav';
export * from './components/organisms/AppBar';
export * from './components/organisms/BottomSheet';
export * from './components/organisms/PhoneFrame';
export * from './components/organisms/BalanceCard';
export * from './components/organisms/TransactionList';
export * from './components/organisms/SpendLimit';
export * from './components/organisms/LinkedAccounts';
export * from './components/organisms/QrPay';
export * from './components/organisms/ReceiptDetail';
export * from './components/organisms/DonutChart';
export * from './components/organisms/PinDots';
export * from './components/organisms/AmountSlider';
export * from './components/organisms/LoginForm';
export * from './components/organisms/OtpEntry';
export * from './components/organisms/SelectAccount';
export * from './components/organisms/Splash';
export * from './components/organisms/HomeHero';
export * from './components/organisms/ServiceMenu';
export * from './components/organisms/BillReminders';
export * from './components/organisms/SnapABill';
export * from './components/organisms/AiAssistant';
export * from './components/organisms/PaymentOrchestration';
export * from './components/organisms/Reconciliation';

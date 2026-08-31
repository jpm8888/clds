import {
  forwardRef,
  useState,
  type FormEvent,
  type FormHTMLAttributes,
  type ReactNode,
} from 'react';
import { Icon, type IconName } from '../../../icons';
import { cx } from '../../../internal/cx';
import './login-form.css';

export type SocialProvider = 'apple' | 'google' | 'facebook';

export interface LoginField {
  /** Key in the values object passed to onSubmit. */
  name: string;
  label: string;
  /** @default 'text' */
  type?: 'text' | 'email' | 'password' | 'tel';
  placeholder?: string;
  /** Leading icon from the MaV registry. */
  icon?: IconName;
  /** Small action link on the label row (e.g. "Forgot?"). */
  labelAction?: { label: string; onClick?: () => void };
  defaultValue?: string;
}

export interface LoginFormProps extends Omit<
  FormHTMLAttributes<HTMLFormElement>,
  'onSubmit' | 'children'
> {
  /** @default 'Welcome back' */
  title?: string;
  /** @default 'Sign in to continue.' */
  subtitle?: string;
  /** Field list; sensible sign-in defaults when omitted. */
  fields?: LoginField[];
  /** Checkbox row under the fields, e.g. "Remember me" or Terms consent. */
  checkboxLabel?: ReactNode;
  /** @default true */
  defaultChecked?: boolean;
  /** @default 'Sign in' */
  submitLabel?: string;
  /** Social providers under the "or continue with" divider. */
  socialProviders?: SocialProvider[];
  /** Footer line, e.g. <>Don't have an account? <a>Sign up</a></>. */
  footer?: ReactNode;
  /** Receives { [field.name]: value } plus `checked`. */
  onSubmit?: (values: Record<string, string>, checked: boolean) => void;
}

const DEFAULT_FIELDS: LoginField[] = [
  { name: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com', icon: 'mail' },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: '••••••••',
    icon: 'lock',
    labelAction: { label: 'Forgot?' },
  },
];

const SOCIAL: Record<SocialProvider, { label: string; svg: ReactNode }> = {
  apple: {
    label: 'Sign in with Apple',
    svg: (
      <svg className="ic-apple" viewBox="0 0 24 24" aria-hidden>
        <path d="M16.37 1.43c0 1.14-.42 2.2-1.13 2.98-.79.87-2.08 1.55-3.15 1.46-.13-1.1.42-2.26 1.1-3 .77-.84 2.13-1.47 3.18-1.44zM20.94 17.02c-.55 1.27-.82 1.84-1.53 2.96-.99 1.57-2.39 3.53-4.12 3.54-1.54.02-1.94-1.01-4.03-1-2.09.01-2.53 1.02-4.07 1.01-1.73-.02-3.05-1.78-4.04-3.35C-.65 15.79-.94 10.63.77 7.89 1.98 5.94 3.89 4.8 5.69 4.8c1.83 0 2.98 1.01 4.5 1.01 1.47 0 2.37-1.01 4.49-1.01 1.6 0 3.3.87 4.51 2.38-3.96 2.17-3.32 7.83.25 9.28z" />
      </svg>
    ),
  },
  google: {
    label: 'Sign in with Google',
    svg: (
      <svg viewBox="0 0 24 24" aria-hidden>
        <path
          fill="#4285F4"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z"
        />
        <path
          fill="#34A853"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"
        />
        <path
          fill="#FBBC05"
          d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z"
        />
        <path
          fill="#EA4335"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"
        />
      </svg>
    ),
  },
  facebook: {
    label: 'Sign in with Facebook',
    svg: (
      <svg viewBox="0 0 24 24" aria-hidden>
        <circle cx="12" cy="12" r="11" fill="#1877F2" />
        <path
          fill="#fff"
          d="M15.5 12.5h-2.3V20h-3v-7.5H8.5V9.8h1.7V8.3c0-2 1.2-3.3 3.2-3.3h1.9v2.6h-1.3c-.7 0-.9.4-.9.9v1.3h2.3l-.4 2.7z"
        />
      </svg>
    ),
  },
};

/**
 * Full authentication screen — labelled inputs with leading icons, a primary
 * CTA (flips to lime in dark mode), a checkbox row, the "or continue with"
 * divider, and Apple/Google/Facebook social buttons.
 *
 * Self-contained: manages its own input state and hands you the values on
 * submit. Render it as the whole screen body at 360–390px width.
 *
 * @example
 * <LoginForm onSubmit={(values, remember) => signIn(values.email, values.password)} />
 */
export const LoginForm = forwardRef<HTMLFormElement, LoginFormProps>(function LoginForm(
  {
    title = 'Welcome back',
    subtitle = 'Sign in to continue.',
    fields = DEFAULT_FIELDS,
    checkboxLabel = 'Remember me',
    defaultChecked = true,
    submitLabel = 'Sign in',
    socialProviders = ['apple', 'google', 'facebook'],
    footer,
    onSubmit,
    className,
    ...rest
  },
  ref,
) {
  const [checked, setChecked] = useState(defaultChecked);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const values: Record<string, string> = {};
    for (const f of fields) {
      const v = data.get(f.name);
      values[f.name] = typeof v === 'string' ? v : '';
    }
    onSubmit?.(values, checked);
  };
  return (
    <form ref={ref} className={cx('auth-screen', className)} onSubmit={handleSubmit} {...rest}>
      <div className="auth-head">
        <div className="auth-h1">{title}</div>
        <div className="auth-sub">{subtitle}</div>
      </div>
      {fields.map((f) => (
        <div className="auth-f" key={f.name}>
          <div className="auth-f-top">
            <span className="auth-f-label">{f.label}</span>
            {f.labelAction && (
              <button type="button" className="auth-f-link" onClick={f.labelAction.onClick}>
                {f.labelAction.label}
              </button>
            )}
          </div>
          <div className="auth-f-input">
            {f.icon && <Icon className="auth-f-ic" name={f.icon} strokeWidth={1.8} aria-hidden />}
            <input
              name={f.name}
              type={f.type ?? 'text'}
              placeholder={f.placeholder}
              defaultValue={f.defaultValue}
              aria-label={f.label}
            />
          </div>
        </div>
      ))}
      {checkboxLabel && (
        <label className="auth-cbx-row">
          <span className={cx('auth-cbx', checked && 'on')} onClick={() => setChecked(!checked)}>
            <svg viewBox="0 0 24 24" aria-hidden>
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </span>
          {checkboxLabel}
        </label>
      )}
      <button type="submit" className="auth-btn">
        {submitLabel}
      </button>
      {socialProviders.length > 0 && (
        <>
          <div className="auth-or">
            <span>Or continue with</span>
          </div>
          <div className="auth-stack">
            {socialProviders.map((p) => (
              <button key={p} type="button" className="auth-social">
                {SOCIAL[p].svg}
                {SOCIAL[p].label}
              </button>
            ))}
          </div>
        </>
      )}
      {footer && <div className="auth-foot">{footer}</div>}
    </form>
  );
});

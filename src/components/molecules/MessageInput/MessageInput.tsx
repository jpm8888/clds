import { forwardRef, useState, type ReactNode, type TextareaHTMLAttributes } from 'react';
import { Icon } from '../../../icons';
import { cx } from '../../../internal/cx';
import './message-input.css';

export interface MessageInputProps extends Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'onChange'
> {
  /** Fires with the textarea's current text. */
  onChange?: (value: string) => void;
  /** Fires with the trimmed text when the send button is pressed (only when non-empty). */
  onSend?: (value: string) => void;
  /** Error styling (red tint + outline). @default false */
  error?: boolean;
  /** Extra toolbar buttons rendered after the built-in tools. */
  extraTools?: ReactNode;
  /** Show the attach / emoji / mention tool row. @default true */
  tools?: boolean;
}

/* Emoji + mention glyphs are not in the shared registry — local one-offs. */
const EmojiIco = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M8 14.5s1.5 2 4 2 4-2 4-2" />
    <path d="M9 9.5h.01M15 9.5h.01" />
  </svg>
);
const MentionIco = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M16 12v1.5a2.5 2.5 0 0 0 5 0V12a9 9 0 1 0-3.5 7.1" />
  </svg>
);

/**
 * Message composer — a textarea over an attach/emoji/mention toolbar with a
 * send button that lights up (primary token, → lime in dark) once there is
 * content. Pair with ChatBubble/ChatThread for chat screens.
 *
 * @example
 * <MessageInput placeholder="Your message…" onSend={(text) => postMessage(text)} />
 */
export const MessageInput = forwardRef<HTMLTextAreaElement, MessageInputProps>(
  function MessageInput(
    {
      onChange,
      onSend,
      error = false,
      extraTools,
      tools = true,
      disabled,
      className,
      placeholder = 'Your message…',
      rows = 2,
      value,
      defaultValue,
      ...rest
    },
    ref,
  ) {
    const [inner, setInner] = useState(String(defaultValue ?? ''));
    const text = value !== undefined ? String(value) : inner;
    const canSend = text.trim().length > 0 && !disabled;

    return (
      <div className={cx('msg', error && 'is-error', disabled && 'is-disabled', className)}>
        <textarea
          ref={ref}
          className="msg-text"
          rows={rows}
          placeholder={placeholder}
          disabled={disabled}
          value={value !== undefined ? value : inner}
          onChange={(e) => {
            if (value === undefined) setInner(e.target.value);
            onChange?.(e.target.value);
          }}
          {...rest}
        />
        <div className="msg-bar">
          {tools ? (
            <div className="msg-tools">
              <button className="msg-icon" type="button" title="Attach" aria-label="Attach">
                <Icon name="plus" />
              </button>
              <span className="msg-vline" />
              <button className="msg-icon" type="button" title="Emoji" aria-label="Emoji">
                <EmojiIco />
              </button>
              <button className="msg-icon" type="button" title="Mention" aria-label="Mention">
                <MentionIco />
              </button>
              {extraTools}
            </div>
          ) : (
            <span />
          )}
          <button
            className={cx('msg-send', canSend && 'on')}
            type="button"
            title="Send"
            aria-label="Send"
            disabled={!canSend}
            onClick={() => {
              if (!canSend) return;
              onSend?.(text.trim());
              if (value === undefined) setInner('');
            }}
          >
            <Icon name="send" />
          </button>
        </div>
      </div>
    );
  },
);

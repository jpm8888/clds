import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../../internal/cx';
import './chat-bubble.css';

export type ChatBubbleSide = 'in' | 'out';

export interface ChatBubbleReply {
  /** Who is being quoted. */
  who: ReactNode;
  /** The quoted text (single line, ellipsized). */
  text: ReactNode;
}

export interface ChatBubbleProps extends HTMLAttributes<HTMLDivElement> {
  /** `in` = incoming (grey, left, avatar/name), `out` = outgoing (tinted primary, right). @default 'in' */
  side?: ChatBubbleSide;
  /** Message body. */
  children?: ReactNode;
  /** Sender name shown above the text (incoming). Re-themes blue → lime in dark. */
  name?: ReactNode;
  /** Avatar initial(s) rendered in the 28px disc (incoming only). */
  avatar?: ReactNode;
  /** Timestamp string, e.g. '09:24'. */
  time?: ReactNode;
  /** Single-row layout with the time inline after a short text. @default false */
  short?: boolean;
  /** Show the green ✓✓ delivery check (outgoing). @default false */
  delivered?: boolean;
  /** Quoted reply block rendered above the text behind a primary accent bar. */
  reply?: ChatBubbleReply;
  /** Reaction pill content overlapping the bubble corner (e.g. '❤️'). */
  reaction?: ReactNode;
}

const Check = () => (
  <svg className="ccheck" viewBox="0 0 26 14" aria-label="Delivered" role="img">
    <path d="M1 8l4.5 4.5L14 3" />
    <path d="M12 10.5l1.5 1.5L24 3" />
  </svg>
);

/**
 * Chat message bubble. Incoming bubbles are grey with an avatar + sender
 * name; outgoing are tinted primary (solid blue in dark) with a timestamp
 * and green ✓✓ delivery. Compose several inside a `ChatThread`.
 *
 * @example
 * <ChatThread>
 *   <ChatBubble side="in" avatar="A" name="Amara Nwosu" time="09:24" short>Hi!</ChatBubble>
 *   <ChatBubble side="out" time="09:25" delivered>Payment sent 🎉</ChatBubble>
 * </ChatThread>
 */
export const ChatBubble = forwardRef<HTMLDivElement, ChatBubbleProps>(function ChatBubble(
  {
    side = 'in',
    name,
    avatar,
    time,
    short = false,
    delivered = false,
    reply,
    reaction,
    className,
    children,
    ...rest
  },
  ref,
) {
  const out = side === 'out';
  const meta = (
    <span className="cmeta">
      {time != null && <span className="ctime">{time}</span>}
      {delivered && <Check />}
    </span>
  );
  return (
    <div ref={ref} className={cx('cmsg', out ? 'out' : 'in', className)} {...rest}>
      {!out && avatar != null && <span className="cavatar">{avatar}</span>}
      <div className="col">
        <div className="cbubble">
          {reply && (
            <span className="cquote">
              <span className="who">{reply.who}</span>
              <span className="qt">{reply.text}</span>
            </span>
          )}
          {name != null && <div className="cname">{name}</div>}
          {short ? (
            <span className="cshortrow">
              {children}
              {meta}
            </span>
          ) : (
            <>
              {children}
              {(time != null || delivered) && <div className="cmeta">{meta}</div>}
            </>
          )}
          {reaction != null && <span className="creact">{reaction}</span>}
        </div>
      </div>
    </div>
  );
});

export interface ChatThreadProps extends HTMLAttributes<HTMLDivElement> {
  /** Borderless layout without the card shell. @default false */
  plain?: boolean;
  children?: ReactNode;
}

/** Column shell for a run of ChatBubbles (max-width 390, card border by default). */
export const ChatThread = forwardRef<HTMLDivElement, ChatThreadProps>(function ChatThread(
  { plain = false, className, children, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={cx('cthread', plain && 'plain', className)} {...rest}>
      {children}
    </div>
  );
});

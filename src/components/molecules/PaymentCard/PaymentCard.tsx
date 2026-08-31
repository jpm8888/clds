import { forwardRef, type HTMLAttributes } from 'react';
import { cx } from '../../../internal/cx';
import skin1 from '../../../assets/cards/skin-1.png';
import skin2 from '../../../assets/cards/skin-2.png';
import skin11 from '../../../assets/cards/skin-11.png';
import skin13 from '../../../assets/cards/skin-13.png';
import './payment-card.css';

/**
 * Bundled card-face skins (a curated subset of the 16 MaV skins — the full
 * set lives in the source repo under app/assets/cards/skins/). Pass any
 * image URL as `skin` to use your own.
 */
export const paymentCardSkins = {
  'skin-1': skin1,
  'skin-2': skin2,
  'skin-11': skin11,
  'skin-13': skin13,
} as const;

export type PaymentCardSkin = keyof typeof paymentCardSkins;

export interface PaymentCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Card number, spaces preserved as given (e.g. '4485 1174 9027 8110'). */
  number: string;
  /** Card holder name (rendered uppercase). */
  holder: string;
  /** Expiry, e.g. '09/27'. */
  expiry: string;
  /** Background skin: a bundled skin name or any image src. @default 'skin-1' */
  skin?: PaymentCardSkin | (string & {});
  /** @default 'Card holder' */
  holderLabel?: string;
  /** @default 'Exp' */
  expiryLabel?: string;
}

/**
 * MaV payment card face — data layer over a swappable skin with a legibility
 * scrim (ISO 7810 ratio, radius 20). The data text is always white; the card
 * does not re-theme (it is a physical-card visual).
 *
 * Never render real card numbers in prototypes — use masked or sample data.
 *
 * @example
 * <PaymentCard number="4485 1174 9027 8110" holder="Amara Cruz" expiry="09/27" skin="skin-2" />
 */
export const PaymentCard = forwardRef<HTMLDivElement, PaymentCardProps>(function PaymentCard(
  {
    number,
    holder,
    expiry,
    skin = 'skin-1',
    holderLabel = 'Card holder',
    expiryLabel = 'Exp',
    className,
    ...rest
  },
  ref,
) {
  const src = skin in paymentCardSkins ? paymentCardSkins[skin as PaymentCardSkin] : skin;
  return (
    <div ref={ref} className={cx('pcard', className)} {...rest}>
      <div className="pcard-skins">
        <img className="on" src={src} alt="" />
      </div>
      <div className="pcard-scrim" />
      <div className="pcard-sheen" />
      <div className="pcard-data">
        <div className="pcard-number">{number}</div>
        <div className="pcard-row">
          <div>
            <div className="pcard-label">{holderLabel}</div>
            <div className="pcard-holder">{holder}</div>
          </div>
          <div className="pcard-exp">
            <span className="lbl">{expiryLabel}</span>
            <span>{expiry}</span>
          </div>
        </div>
      </div>
    </div>
  );
});

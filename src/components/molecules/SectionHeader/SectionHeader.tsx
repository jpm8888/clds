import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { Icon, type IconName } from '../../../icons';
import { cx } from '../../../internal/cx';
import './section-header.css';

export type SectionHeaderSize = 'sm' | 'md' | 'lg';
export type SectionHeaderAppearance = 'default' | 'subtle' | 'inverted';
export type SectionHeaderSpacing = 'none' | 'xs' | 'sm' | 'md' | 'lg';

export interface SectionHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title: ReactNode;
  /** Secondary line under the title. */
  description?: ReactNode;
  /** Title size: sm 14 / md 20 / lg 24. @default 'md' */
  size?: SectionHeaderSize;
  /** @default 'left' */
  align?: 'left' | 'center';
  /** `subtle` mutes the text; `inverted` for dark media surfaces. @default 'default' */
  appearance?: SectionHeaderAppearance;
  /** Loading skeleton — greys out title/description/trailing. @default false */
  skeleton?: boolean;
  /** Bottom-margin preset from the --mav-space-header-* tokens. @default 'none' */
  spacing?: SectionHeaderSpacing;
  /** Trailing "See all" text link. Pass true for the default label. */
  seeAll?: string | boolean;
  onSeeAll?: () => void;
  /** Trailing 32px round icon button (ignored when seeAll is set). */
  icon?: IconName;
  onIconClick?: () => void;
  /** @default 'Action' */
  iconLabel?: string;
}

/**
 * MaV section header (Figma 270:8099) — a titled row that opens a content
 * section: "Recent transactions · See all", "Insights", etc.
 *
 * @example
 * <SectionHeader title="Recent transactions" seeAll onSeeAll={goToHistory} spacing="md" />
 * <SectionHeader size="lg" title="Insights" description="Curated for you" icon="arrow-right" />
 */
export const SectionHeader = forwardRef<HTMLDivElement, SectionHeaderProps>(function SectionHeader(
  {
    title,
    description,
    size = 'md',
    align = 'left',
    appearance = 'default',
    skeleton = false,
    spacing = 'none',
    seeAll,
    onSeeAll,
    icon,
    onIconClick,
    iconLabel = 'Action',
    className,
    ...rest
  },
  ref,
) {
  let trailing: ReactNode = null;
  if (seeAll) {
    trailing = (
      <button type="button" className="sh-link" onClick={onSeeAll}>
        {typeof seeAll === 'string' ? seeAll : 'See all'}
      </button>
    );
  } else if (icon) {
    trailing = (
      <button type="button" className="sh-ico" aria-label={iconLabel} onClick={onIconClick}>
        <Icon name={icon} size={18} aria-hidden />
      </button>
    );
  }

  return (
    <div
      ref={ref}
      className={cx(
        'sh',
        size,
        align === 'center' && 'center',
        appearance !== 'default' && appearance,
        skeleton && 'skeleton',
        spacing !== 'none' && `sh-space-${spacing}`,
        className,
      )}
      {...rest}
    >
      <div className="sh-main">
        <p className="sh-title">{title}</p>
        {description != null && <p className="sh-desc">{description}</p>}
      </div>
      {trailing}
    </div>
  );
});

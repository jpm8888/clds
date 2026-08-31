/** Tiny class-name joiner (internal — avoids a clsx dependency). */
export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}

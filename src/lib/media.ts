// Helpers for media items (images + YouTube videos).

/** Extract an 11-char YouTube id from a youtu.be / youtube.com URL. */
export function youtubeId(url: string): string | null {
  const m = url.match(/(?:youtu\.be\/|v=|embed\/)([\w-]{11})/);
  return m ? m[1] : null;
}

export function youtubeThumb(id: string): string {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

/** Parse a t=/start= param (510, 510s, 8m30s, 1h2m3s) into seconds. */
export function youtubeStart(url: string): number | null {
  const m = url.match(/[?&](?:t|start)=(\d[\dhms]*)/);
  if (!m) return null;
  if (/^\d+s?$/.test(m[1])) return parseInt(m[1], 10);
  let s = 0;
  for (const [, n, unit] of m[1].matchAll(/(\d+)([hms])/g)) {
    s += Number(n) * (unit === 'h' ? 3600 : unit === 'm' ? 60 : 1);
  }
  return s || null;
}

export function youtubeEmbed(id: string, start?: number | null): string {
  return `https://www.youtube.com/embed/${id}${start ? `?start=${start}` : ''}`;
}

/** A normalized slide for the Carousel. */
export interface Slide {
  kind: 'image' | 'video';
  src: string; // image path, or YouTube embed URL
  thumb: string; // thumbnail image path
  caption?: string;
}

export function toSlides(
  media: { type: 'image' | 'video'; url: string; caption?: string }[],
): Slide[] {
  return media.map((m) => {
    if (m.type === 'video') {
      const id = youtubeId(m.url);
      return {
        kind: 'video' as const,
        src: id ? youtubeEmbed(id, youtubeStart(m.url)) : m.url,
        thumb: id ? youtubeThumb(id) : '',
        caption: m.caption,
      };
    }
    return { kind: 'image' as const, src: m.url, thumb: m.url, caption: m.caption };
  });
}

import type { ImageMetadata } from 'astro';

// Eagerly import every portfolio image so we can resolve a content-file string
// path (e.g. "/images/portfolio/eday.png") to its optimizable ImageMetadata.
const map = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/portfolio/*.{jpg,jpeg,png,webp,avif,gif}',
  { eager: true },
);

/** Resolve a stored image path/filename to its imported ImageMetadata, or null. */
export function resolveImage(path: string | undefined): ImageMetadata | null {
  if (!path) return null;
  const file = path.split('/').pop();
  if (!file) return null;
  const key = Object.keys(map).find((k) => k.endsWith('/' + file));
  return key ? map[key].default : null;
}

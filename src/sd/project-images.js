// Some Webflow project exports retain a thumbnail-sized `sizes` value even
// though CSS stretches the image across a full row. Keep responsive variants,
// but describe the actual untransformed CSS width to the browser.
export function installProjectImageSizes(root, win = window) {
  if (!root) return () => {};
  const images = [...root.querySelectorAll('img.image-project[srcset], img.cover-project[srcset]')]
    .filter(image => /^\s*\d+(?:\.\d+)?px\s*$/.test(image.getAttribute('sizes') || '') && /\s\d+w(?:\s*,|\s*$)/.test(image.getAttribute('srcset') || ''));
  if (!images.length) return () => {};
  let disposed = false, frame;
  function update(image) {
    if (disposed || !root.isConnected || !image.isConnected) return;
    const width = image.clientWidth;
    // Hidden cards wait for layout; a reveal transform must not change sizing.
    if (!(width > 0)) return;
    const sizes = `${Math.ceil(width)}px`;
    if (image.getAttribute('sizes') !== sizes) image.setAttribute('sizes', sizes);
  }
  images.forEach(update);
  const observer = win.ResizeObserver ? new win.ResizeObserver(entries => {
    entries.forEach(entry => update(entry.target));
  }) : null;
  images.forEach(image => observer?.observe(image));
  const resize = () => {
    if (disposed || frame != null) return;
    frame = win.requestAnimationFrame(() => { frame = null; images.forEach(update); });
  };
  if (!observer) win.addEventListener('resize', resize, { passive: true });
  return () => {
    disposed = true;
    observer?.disconnect();
    win.removeEventListener('resize', resize);
    if (frame != null) win.cancelAnimationFrame(frame);
    // Corrected attributes stay with their page. Reverting on departure could
    // request another resource while the outgoing snapshot is being retained.
  };
}

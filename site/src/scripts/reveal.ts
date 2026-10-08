// Scroll reveal: one IntersectionObserver for every [data-reveal] element.
// The `js-reveal` class on <html> is added by an inline head script (BaseLayout)
// so hidden states only exist when this script can actually reveal them.

const MAX_STAGGER = 6;
const VISIBLE_RATIO = 0.15;

function revealAll(): void {
  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => el.classList.add('is-revealed'));
  document.documentElement.classList.remove('js-reveal');
}

function release(el: HTMLElement): void {
  // Hand the element back to its own transitions/transforms (hover, filters...).
  el.removeAttribute('data-reveal');
  el.classList.remove('is-revealed');
  el.style.removeProperty('--reveal-index');
}

function reveal(el: HTMLElement, index: number): void {
  el.style.setProperty('--reveal-index', String(index));
  el.classList.add('is-revealed');

  let done = false;
  const finish = () => {
    if (done) return;
    done = true;
    el.removeEventListener('transitionend', onEnd);
    release(el);
  };
  const onEnd = (e: TransitionEvent) => {
    if (e.target === el && (e.propertyName === 'opacity' || e.propertyName === 'clip-path')) finish();
  };
  el.addEventListener('transitionend', onEnd);
  // Fallback if transitionend never fires (e.g. element hidden via display:none).
  window.setTimeout(finish, 700 + index * 80 + 400);
}

function init(): void {
  if (!document.documentElement.classList.contains('js-reveal')) return;

  try {
    const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (targets.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        const perGroup = new Map<Element | null, number>();
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const rootH = entry.rootBounds?.height ?? window.innerHeight;
          // Tall elements may never reach 15% of their own height: also accept 15% of the viewport.
          const enough =
            entry.intersectionRatio >= VISIBLE_RATIO || entry.intersectionRect.height >= rootH * VISIBLE_RATIO;
          if (!enough) continue;

          const el = entry.target as HTMLElement;
          io.unobserve(el);

          // Stagger siblings revealed in the same batch inside a [data-reveal-group].
          const group = el.closest('[data-reveal-group]');
          let index = 0;
          if (group) {
            index = Math.min(perGroup.get(group) ?? 0, MAX_STAGGER);
            perGroup.set(group, (perGroup.get(group) ?? 0) + 1);
          }
          reveal(el, index);
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: [0, 0.05, 0.15, 0.3, 0.6] },
    );

    targets.forEach((el) => io.observe(el));
  } catch {
    revealAll();
  }
}

init();

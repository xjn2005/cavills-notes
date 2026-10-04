function isImageTarget(target) {
  return target instanceof Element && Boolean(target.closest('img'));
}

document.addEventListener(
  'contextmenu',
  (event) => {
    if (isImageTarget(event.target)) event.preventDefault();
  },
  true,
);

document.addEventListener(
  'dragstart',
  (event) => {
    if (isImageTarget(event.target)) event.preventDefault();
  },
  true,
);

(() => {
  const optionsMenu = document.querySelector('.header-right .docmd-options-menu');

  if (!optionsMenu || document.querySelector('.github-project-link')) return;

  const link = document.createElement('a');
  link.className = 'github-project-link';
  link.href = 'https://github.com/xjn2005/cavills-notes';
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.ariaLabel = '在 GitHub 上查看项目';
  link.title = 'GitHub';
  link.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.866-.014-1.7-2.782.604-3.369-1.34-3.369-1.34-.455-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.004.07 1.532 1.03 1.532 1.03.892 1.529 2.341 1.087 2.91.831.091-.646.349-1.087.635-1.337-2.221-.253-4.556-1.111-4.556-4.944 0-1.092.39-1.985 1.029-2.685-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.026A9.564 9.564 0 0 1 12 6.8a9.58 9.58 0 0 1 2.504.337c1.909-1.295 2.748-1.026 2.748-1.026.546 1.377.203 2.394.1 2.647.64.7 1.028 1.593 1.028 2.685 0 3.842-2.339 4.688-4.566 4.936.359.31.679.921.679 1.856 0 1.34-.012 2.423-.012 2.753 0 .269.18.58.688.481A10.002 10.002 0 0 0 22 12c0-5.523-4.477-10-10-10Z"/></svg>';
  optionsMenu.before(link);
})();

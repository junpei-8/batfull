export interface GetInvisibleFileInputElementOptions {
  accept?: string;
  multiple?: boolean;
}

export function getInvisibleFileInputElement(
  options: GetInvisibleFileInputElementOptions = {},
) {
  const inputEl = document.createElement('input');

  inputEl.type = 'file';
  if (options.accept) inputEl.accept = options.accept;
  if (options.multiple) inputEl.multiple = options.multiple;

  inputEl.setAttribute(
    'style',
    'position:absolute;pointer-events:none;opacity:0;',
  );

  return inputEl;
}

export function getFileEvent(
  options: GetInvisibleFileInputElementOptions = {},
) {
  const inputEl = getInvisibleFileInputElement(options);

  return new Promise<Event>((resolve) => {
    inputEl.addEventListener('change', (event) => {
      resolve(event);
      document.body.removeChild(inputEl);
    });
    document.body.appendChild(inputEl);
    inputEl.click();
  });
}

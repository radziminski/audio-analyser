import { Logger } from 'winston';

export const MAX_LOG_DEPTH = 10;

export const logObject = (
  logger: Logger,
  title: string,
  obj: {},
  currIndent = 0,
) => {
  if (!Object.keys(obj).length) return logger.http(`==> ${title}: Empty`);

  const indent = Array.from(Array(currIndent).keys()).reduce(
    (string, _) => string + '==',
    '==',
  );
  logger.http(`${indent}> ${title}:`);
  const deptGuard = MAX_LOG_DEPTH - currIndent;

  Object.keys(obj).forEach((key) => {
    if (deptGuard === 0) return `${indent}==> Object to deep for logs`;

    if (!obj[key].replace)
      return logObject(logger, key, obj[key], currIndent + 1);

    return logger.http(`${indent}==> [${key}]: ${obj[key]}`);
  });
};

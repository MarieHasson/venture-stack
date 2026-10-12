import { color } from '@oclif/color';

const BRAND_NAME = 'VentureStack';
const BRAND_URL = 'https://github.com/MarieHasson/venture-stack';
const GRADIENT_START = { r: 99, g: 102, b: 241 };
const GRADIENT_END = { r: 34, g: 211, b: 238 };

interface RGB {
  r: number;
  g: number;
  b: number;
}

function interpolateColor(start: RGB, end: RGB, factor: number): RGB {
  return {
    r: Math.round(start.r + (end.r - start.r) * factor),
    g: Math.round(start.g + (end.g - start.g) * factor),
    b: Math.round(start.b + (end.b - start.b) * factor),
  };
}

function colorText(text: string, rgb: RGB): string {
  return `\x1b[38;2;${rgb.r};${rgb.g};${rgb.b}m${text}\x1b[0m`;
}

function gradientText(value: string): string {
  return [...value]
    .map((character, index) => {
      const progress = index / Math.max(value.length - 1, 1);
      return colorText(character, interpolateColor(GRADIENT_START, GRADIENT_END, progress));
    })
    .join('');
}

export function renderBanner(): string {
  return ['', `  ${gradientText(BRAND_NAME)}`, `  ${color.underline(color.cyan(BRAND_URL))}`, ''].join('\n');
}

export async function printBannerAnimated(options: { speed?: number } = {}): Promise<void> {
  const { speed = 20 } = options;

  process.stdout.write('\x1B[?25l');
  process.stdout.write('\n  ');
  for (let index = 0; index < BRAND_NAME.length; index++) {
    const progress = index / Math.max(BRAND_NAME.length - 1, 1);
    process.stdout.write(colorText(BRAND_NAME[index], interpolateColor(GRADIENT_START, GRADIENT_END, progress)));
    await sleep(speed);
  }
  process.stdout.write(`\n  ${color.underline(color.cyan(BRAND_URL))}\n\n`);
  process.stdout.write('\x1B[?25h');
}

export function printBanner(): void {
  console.log(renderBanner());
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function renderGradientDivider(width = 60): string {
  let output = '  ';
  for (let index = 0; index < width; index++) {
    const progress = index / Math.max(width - 1, 1);
    output += colorText('─', interpolateColor(GRADIENT_START, GRADIENT_END, progress));
  }
  return output;
}

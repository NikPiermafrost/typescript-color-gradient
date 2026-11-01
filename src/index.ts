const HEX: string[] = Array.from({ length: 256 }, (_, i) => i.toString(16).padStart(2, '0'));
const VALID_COLOR = /^#[0-9A-Fa-f]{6}$/;

function generateGradient(colors: string[] = [], numberOfColors: number = 10): string[] {
  if (!Number.isInteger(numberOfColors) || numberOfColors < 0) {
    throw new RangeError('Number of colors should be a non-negative integer');
  }

  if (numberOfColors === 0) return [];

  const stopColors = colors.slice();

  if (stopColors.length === 0) {
    stopColors.push(`#${Math.floor(Math.random() * 0x1000000).toString(16).padStart(6, '0')}`);
  }

  if (stopColors.length === 1) {
    const n = parseInt(stopColors[0]!.replace('#', ''), 16);
    stopColors.push(`#${HEX[255 - ((n >> 16) & 255)]}${HEX[255 - ((n >> 8) & 255)]}${HEX[255 - (n & 255)]}`);
  }

  const stopCount = stopColors.length;
  const rs = new Array<number>(stopCount);
  const gs = new Array<number>(stopCount);
  const bs = new Array<number>(stopCount);

  for (let s = 0; s < stopCount; s++) {
    const color = stopColors[s]!;
    if (!VALID_COLOR.test(color)) {
      throw new Error(`Invalid color format: ${color}`);
    }
    const n = parseInt(color.slice(1), 16);
    rs[s] = (n >> 16) & 255;
    gs[s] = (n >> 8) & 255;
    bs[s] = n & 255;
  }

  if (numberOfColors === 1) return [stopColors[0]!];

  const result = new Array<string>(numberOfColors);
  const lastIndex = numberOfColors - 1;
  const segmentTotal = stopCount - 1;
  const segmentStep = 1 / segmentTotal;

  for (let i = 0; i < numberOfColors; i++) {
    const t = i / lastIndex;
    const start = Math.min(Math.floor(t * segmentTotal), segmentTotal - 1);
    const end = start + 1;
    const localT = (t - (start * segmentStep)) / segmentStep;

    result[i] = `#${HEX[Math.round(rs[start]! + (rs[end]! - rs[start]!) * localT)]}`
      + `${HEX[Math.round(gs[start]! + (gs[end]! - gs[start]!) * localT)]}`
      + `${HEX[Math.round(bs[start]! + (bs[end]! - bs[start]!) * localT)]}`;
  }

  return result;
}

export { generateGradient };

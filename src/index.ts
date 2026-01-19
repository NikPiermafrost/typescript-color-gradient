function toHex(c: number): string {
  const hex = Math.round(c).toString(16);
  return hex.length === 1 ? '0' + hex : hex;
}

function parseColorToRgb(hex: string): [number, number, number] {
  const cleanHex = hex.replace('#', '');
  const bigint = parseInt(cleanHex, 16);
  return [
    (bigint >> 16) & 255, // R
    (bigint >> 8) & 255,  // G
    bigint & 255          // B
  ];
}

function generateComplementary(hex: string): string {
  const [r, g, b] = parseColorToRgb(hex);
  return `#${toHex(255 - r)}${toHex(255 - g)}${toHex(255 - b)}`;
}

function isColorValid(color: string): boolean {
  return /^#[0-9A-Fa-f]{6}$/.test(color);
}

function generateRandomColor(): string {
  return `#${Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0')}`;
}

function generateGradient(colors: string[] = [], numberOfColors: number = 10): string[] {
  if (!Number.isInteger(numberOfColors) || numberOfColors < 0) {
    throw new RangeError('Number of colors should be a non-negative integer');
  }

  if (numberOfColors === 0) return [];

  const stopColors = [...colors]; 

  if (stopColors.length === 0) {
    stopColors.push(generateRandomColor());
  }

  if (stopColors.length === 1) {
    stopColors.push(generateComplementary(stopColors[0]!));
  }

  stopColors.forEach(color => {
    if (!isColorValid(color)) {
      throw new Error(`Invalid color format: ${color}`);
    }
  });

  const rgbStops = stopColors.map(parseColorToRgb);

  const result: string[] = new Array(numberOfColors);
  const lastIndex = numberOfColors - 1;

  for (let i = 0; i < numberOfColors; i++) {
    if (lastIndex === 0) {
      result[i] = stopColors[0]!;
      continue;
    }

    const t = i / lastIndex;

    const segmentTotal = rgbStops.length - 1;
    const segmentIndex = Math.floor(t * segmentTotal);
    
    const startStopIndex = Math.min(segmentIndex, segmentTotal - 1);
    const endStopIndex = startStopIndex + 1;

    const segmentStep = 1 / segmentTotal;
    const localT = (t - (startStopIndex * segmentStep)) / segmentStep;

    const startRGB = rgbStops[startStopIndex]!;
    const endRGB = rgbStops[endStopIndex]!;

    const r = startRGB[0] + (endRGB[0] - startRGB[0]) * localT;
    const g = startRGB[1] + (endRGB[1] - startRGB[1]) * localT;
    const b = startRGB[2] + (endRGB[2] - startRGB[2]) * localT;

    result[i] = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  return result;
}

export { generateGradient };
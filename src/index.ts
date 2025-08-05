function getHexColor(color: string): string {
  return color.replace('#', '');
}

function generateComplementary(color: string): string {
  return `#${color.slice(-6).split('').reverse().join('')}`;
}

function isColorValid(color: string): boolean {
  const hexColorRegex = /^#([0-9A-Fa-f]{6})$/;
  return hexColorRegex.test(color);
}

function generateRandomColor(): string {
  return `#${Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0')}`;
}

function parseHexColor(hex: string): [number, number, number] {
  return [
    parseInt(hex.substring(0, 2), 16),
    parseInt(hex.substring(2, 4), 16),
    parseInt(hex.substring(4, 6), 16),
  ];
}

function getColorFast(
  midPoint: number,
  startRGB: [number, number, number],
  endRGB: [number, number, number],
  min: number,
  max: number
): string {
  function interp(start: number, end: number) {
    const val = Math.round(((end - start) / (max - min)) * (midPoint - min) + start);
    return val < 16 ? '0' + val.toString(16) : val.toString(16);
  }
  return (
    '#' +
    interp(startRGB[0], endRGB[0]) +
    interp(startRGB[1], endRGB[1]) +
    interp(startRGB[2], endRGB[2])
  );
}

function generateGradient(colors: string[] = [], numberOfColors: number = 10): string[] {
  if (!Number.isInteger(numberOfColors) || numberOfColors < 0) {
    throw new RangeError('Number of colors should be a non-negative integer');
  }

  if (!colors.length) {
    colors.push(generateRandomColor());
  }

  if (colors.length === 1) {
    const onlyColor = colors.at(0);
    colors.push(generateComplementary(onlyColor!));
  }

  colors.forEach(color => {
    if (!isColorValid(color)) {
      throw new Error(`Invalid color: ${color}`);
    }
  });

  // Special case: exactly two colors and two steps, just return them
  if (colors.length === 2 && numberOfColors === 2) {
    return [colors[0]!, colors[1]!];
  }

  const gradientArray: string[] = new Array(numberOfColors);
  const increment = Math.ceil(numberOfColors / (colors.length - 1));
  let currentIndex = 0;

  for (let i = 0; i < colors.length - 1; i++) {
    const startHex = getHexColor(colors[i]!);
    const endHex = getHexColor(colors[i + 1]!);
    const startRGB = parseHexColor(startHex);
    const endRGB = parseHexColor(endHex);
    const min = increment * i;
    const max = increment * (i + 1);

    const start = min === 0 ? 1 : min;
    const end = max === numberOfColors ? max + 1 : max;

    for (let midPoint = start; midPoint < end; midPoint++) {
      gradientArray[currentIndex] = getColorFast(midPoint, startRGB, endRGB, min, max);
      currentIndex++;
    }
  }

  return gradientArray;
}

export { generateGradient };
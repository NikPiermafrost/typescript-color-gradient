function getHexColor(color: string): string {
  return color.replace('#', '');
}

function generateHex(midPoint: number, start: string, end: string, min: number, max: number): string {
  const startInt = parseInt(start, 16);
  const endInt = parseInt(end, 16);

  const finalBase = Math.round(
    ((endInt - startInt) / (max - min)) * (midPoint - min) + startInt
  );

  return finalBase < 16 ? '0' + finalBase.toString(16) : finalBase.toString(16);
}

function getColor(midPoint: number, startColor: string, endColor: string, min: number, max: number): string {
  const startR = startColor.substring(0, 2);
  const startG = startColor.substring(2, 4);
  const startB = startColor.substring(4, 6);

  const endR = endColor.substring(0, 2);
  const endG = endColor.substring(2, 4);
  const endB = endColor.substring(4, 6);

  return (
    '#' +
    generateHex(midPoint, startR, endR, min, max) +
    generateHex(midPoint, startG, endG, min, max) +
    generateHex(midPoint, startB, endB, min, max)
  );
}

function generateGradientColor(midPoint: number, startColor: string, endColor: string, min: number, max: number): string {
  const startHex = getHexColor(startColor);
  const endHex = getHexColor(endColor);
  return getColor(midPoint, startHex, endHex, min, max);
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

  const gradientArray: string[] = new Array(numberOfColors);
  const increment = Math.ceil(numberOfColors / (colors.length - 1));
  let currentIndex = 0;

  for (let i = 0; i < colors.length - 1; i++) {
    const startColor = colors[i]!;
    const endColor = colors[i + 1]!;
    const min = increment * i;
    const max = increment * (i + 1);

    const start = min === 0 ? 1 : min;
    const end = max === numberOfColors ? max + 1 : max;

    for (let midPoint = start; midPoint < end; midPoint++) {
      gradientArray[currentIndex] = generateGradientColor(midPoint, startColor, endColor, min, max )  ;
      currentIndex++;
    }
  }

  return gradientArray;
}

export { generateGradient };
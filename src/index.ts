interface Limits {
  upper: number,
  lower: number
}

class GradientColor {

  private startColor: string;
  private endColor: string;
  private minNum: number;
  private maxNum: number;

  constructor() {
    this.startColor = '';
    this.endColor = '';
    this.minNum = 0;
    this.maxNum = 10;
  }

  setGradient(colorStart: string, colorEnd: string) {
    this.startColor = this.getHexColor(colorStart);
    this.endColor = this.getHexColor(colorEnd);
  }

  getHexColor(color: string) {
    return color.split('#').splice(-1).join('');
  }

  setMidpoint(minNumber: number, maxNumber: number) {
    this.minNum = minNumber;
    this.maxNum = maxNumber;
  }

  getColor(numberValue: number): string {
    return (
      '#' +
      this.generateHex(
        numberValue,
        this.startColor.substring(0, 2),
        this.endColor.substring(0, 2)
      ) +
      this.generateHex(
        numberValue,
        this.startColor.substring(2, 4),
        this.endColor.substring(2, 4)
      ) +
      this.generateHex(
        numberValue,
        this.startColor.substring(4, 6),
        this.endColor.substring(4, 6)
      )
    );
  }

  generateHex(numberValue: number, start: string, end: string) {
    const minNum = this.minNum;
    const maxNum = this.maxNum;
    const finalBase = Math.round(
      ((parseInt(end, 16) - parseInt(start, 16)) / (maxNum - minNum)) * (numberValue - minNum) + parseInt(start, 16)
    );

    if (finalBase < 16) {
      return '0' + finalBase.toString(16);
    }
    return finalBase.toString(16);
  }
}

class Gradient {
  private gradients: GradientColor[];
  private maxNum: number;
  private colors: string[];
  private intervals: Limits[];

  constructor() {
    this.gradients = [];
    this.maxNum = 10;
    this.colors = [];
    this.intervals = [];
    this.setGradient(...this.colors);
  }
  /**
   * sets all the colors to generate a gradient.
   * @param {string[]} gradients the hex colors from which the gradient is generated.
   * @returns {Gradient} for method chaining.
   */
  setGradient(...gradients: string[]): Gradient {
    this.setColors(gradients || []);
    return this;
  }

  /**
   * sets all the colors to generate a gradient.
   * @returns {string[]} the array of generated hex colors.
   */
  getColors(): string[] {
    const gradientArray: string[] = [];

    const intervals = this.intervals;
    const gradients = this.gradients;
    const maxNum = this.maxNum;

    for (let j = 0; j < intervals.length; j++) {
      const interval = intervals[j];
      const start = interval!.lower === 0 ? 1 : Math.ceil(interval!.lower);
      const end =
        interval!.upper === maxNum
          ? interval!.upper + 1
          : Math.ceil(interval!.upper);
      for (let i = start; i < end; i++) {
        gradientArray.push(gradients[j]!.getColor(i));
      }
    }

    return gradientArray;
  }

  /**
   * sets all the colors to generate a gradient.
   * @param {number} numberValue the index of the color array.
   * @returns {string} the desired color from the gradient array.
   */
  getColor(numberValue: number): string {
    if (isNaN(numberValue)) {
      throw new TypeError('value should be a number');
    }
    if (numberValue < 0) {
      throw new RangeError('value should be greater or equal than 0');
    }
    if (numberValue > this.colors.length) {
      throw new RangeError(`value should be lesser than ${this.maxNum}`);
    }
    const toInsert = numberValue + 1;
    const segment = (this.maxNum) / this.gradients.length;
    const index = Math.min(
      Math.floor((Math.max(toInsert, 0)) / segment),
      this.gradients.length - 1
    );
    return this.gradients[index]!.getColor(toInsert);
  }

  /**
   * sets all the colors to generate a gradient.
   * @param {number} maxNumber The number of colors generated from the gradient. Default is 10
   * @returns {Gradient} for method chaining.
   */
  setNumberOfColors(maxNumber: number): Gradient {
    if (isNaN(maxNumber)) {
      throw new RangeError('midPoint should be a number');
    }
    if (maxNumber < 0) {
      throw new RangeError('midPoint should be greater or equal than 0');
    }
    this.maxNum = maxNumber;
    this.setColors(this.colors);
    return this;
  }

  private setColors(colors: string[]): void {

    if (!colors.length) {
      colors.push(this.generateRandomColor());
    }

    if (colors.length === 1) {
      const [onlyOne] = colors;
      colors.push(this.generateComplementary(onlyOne!));
    }

    if (colors.some((color) => this.isInvalid(color))) {
      throw new Error('All colors must be defined and/or not empty');
    }

    const increment = (this.maxNum) / (colors.length - 1);
    const firstGradient = new GradientColor();
    const lower = 0;
    const upper = increment;

    firstGradient.setGradient(colors[0]!, colors[1]!);
    firstGradient.setMidpoint(lower, upper);

    this.gradients = [firstGradient];
    this.intervals = [{
      lower,
      upper
    }];

    for (let i = 1; i < colors.length - 1; i++) {
      const gradientColor = new GradientColor();
      const lower = increment * i;
      const upper = increment * (i + 1);
      gradientColor.setGradient(colors[i]!, colors[i + 1]!);
      gradientColor.setMidpoint(lower, upper);
      this.gradients[i] = gradientColor;
      this.intervals[i] = {
        lower,
        upper
      };
    }

    this.colors = colors;
  }

  private generateComplementary(startingColor: string): string {
    return `#${startingColor.slice(-6).split('').reverse().join('')}`;
  }

  private generateRandomColor(): string {
    return `#${Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0')}`;
  }

  private isInvalid(color: string): boolean {
    const regex = /[0-9A-Fa-f]{6}/;
    return color?.length < 6 
    || color?.length > 7
    || isNaN(parseInt(color.split('#').splice(-1).join(''), 16))
    || !regex.test(color);
  }
}

export {
  Gradient
};

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
    return color.substring(color.length - 6, color.length);
  }

  setMidpoint(minNumber: number, maxNumber: number) {
    this.minNum = minNumber;
    this.maxNum = maxNumber;
  }

  getColor(numberValue: number): string {
    if (!numberValue) {
      throw new Error('Could not get a color, the numeric value is undefined or null');
    }
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
    if (numberValue < this.minNum) {
      numberValue = this.minNum;
    } else if (numberValue > this.maxNum) {
      numberValue = this.maxNum;
    }

    const midPoint = this.maxNum - this.minNum;
    const startBase = parseInt(start, 16);
    const endBase = parseInt(end, 16);
    const average = (endBase - startBase) / midPoint;
    const finalBase = Math.round(average * (numberValue - this.minNum) + startBase);
    return finalBase < 16 ? '0' + finalBase.toString(16) : finalBase.toString(16);
  }
}

export class Gradient {

  private gradients: GradientColor[];
  private maxNum: number;
  private colors: string[];
  private intervals: Limits[];

  constructor() {
    this.gradients = [];
    this.maxNum = 10;
    this.colors = ['', ''];
    this.intervals = [];
  }

  private setColors(colors: string[]): void {
    if (colors.length < 2) {
      throw new RangeError('At least 2 colors are needed');
    }

    if (colors.some((color) => !color)) {
      throw new Error('All colors must be defined and/or not empty');
    }

    const increment = (this.maxNum) / (colors.length - 1);
    const firstGradient = new GradientColor();
    const lower = 0;
    const upper = increment;

    firstGradient.setGradient(colors[0], colors[1]);
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
      gradientColor.setGradient(colors[i], colors[i + 1]);
      gradientColor.setMidpoint(lower, upper);
      this.gradients[i] = gradientColor;
      this.intervals[i] = {
        lower,
        upper
      };
    }

    this.colors = colors;
  }


  /**
   * sets all the colors to generate a gradient.
   * @param {string[]} gradients the hex colors from which the gradient is generated.
   * @returns {Gradient} for method chaining.
   */
  setGradient(...gradients: string[]): Gradient {
    this.setColors(gradients);
    return this;
  }

  /**
   * sets all the colors to generate a gradient.
   * @returns {string[]} the array of generated hex colors.
   */
  getArray(): string[] {
    const gradientArray: string[] = [];

    for (let j = 0; j < this.intervals.length; j++) {
      const interval = this.intervals[j];
      const start = interval.lower === 0 ? 1 : Math.ceil(interval.lower);
      const end =
        interval.upper === this.maxNum
          ? interval.upper + 1
          : Math.ceil(interval.upper);
      for (let i = start; i < end; i++) {
        gradientArray.push(this.gradients[j].getColor(i));
      }
    }

    return gradientArray;
  }

  /**
   * sets all the colors to generate a gradient.
   * @param {number} numberValue the 1 start index of the color array. Thus i don't really like it,
   * the original author made it like this so i left it as is.
   * @returns {string} the desired color from the gradient array.
   */
  getColor(numberValue: number): string {
    if (isNaN(numberValue)) {
      throw new TypeError('getColor should be a number');
    }
    if (numberValue <= 0) {
      throw new TypeError(`getColor should be greater than ${numberValue}`);
    }
    const segment = (this.maxNum) / this.gradients.length;
    const index = Math.min(
      Math.floor((Math.max(numberValue, 0)) / segment),
      this.gradients.length - 1
    );
    return this.gradients[index].getColor(numberValue);
  }

  /**
   * sets all the colors to generate a gradient.
   * @param {number} maxNumber The number of colors generated from the gradient.
   * @returns {Gradient} for method chaining.
   */
  setMidpoint(maxNumber: number): Gradient {
    if (isNaN(maxNumber)) {
      throw new RangeError('midPoint should be a number');
    }
    if (maxNumber <= 0) {
      throw new RangeError(`midPoint should be greater than ${maxNumber}`);
    }
    this.maxNum = maxNumber;
    this.setColors(this.colors);
    return this;
  }
}


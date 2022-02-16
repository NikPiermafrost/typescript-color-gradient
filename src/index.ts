interface Limits {
  upper: number,
  lower: number
}

class GradientColor {
  startColor: string;
  endColor: string;
  minNum: number;
  maxNum: number;

  constructor(startColor = '', endColor = '', minNum = 0, maxNum = 10) {
    this.startColor = startColor;
    this.maxNum = maxNum;
    this.endColor = endColor;
    this.minNum = minNum;
  }

  setGradient(colorStart: string, colorEnd: string) {
    this.startColor = this.getHexColor(colorStart);
    this.endColor = this.getHexColor(colorEnd);
  }

  getHexColor(color: string) {
    return color.substring(color.length - 6, color.length);
  }

  setMidpoint (minNumber: number, maxNumber: number) {
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
    const balancedFinalBase =
      finalBase < 16 ? '0' + finalBase.toString(16) : finalBase.toString(16);
    return balancedFinalBase;
  }
}

export class Gradient {

  private gradients: GradientColor[];
  private maxNum: number;
  private colors: string[];
  private intervals: Limits[];

  constructor(gradients = [], maxNum = 10, colors = ['', ''], intervals = []) {
    this.gradients = gradients;
    this.maxNum = maxNum;
    this.colors = colors;
    this.intervals = intervals;
  }

  private setColors(colors: string[]): void {
    if (colors.length < 2) {
      throw new Error('At least 2 colors are needed');
    }

    const increment = (this.maxNum) / (colors.length - 1);
    const firstGradient = new GradientColor();
    const lower = 0;
    const upper = 0 + increment;
    firstGradient.setGradient(colors[0], colors[1]);
    firstGradient.setMidpoint(lower, upper);
    this.gradients = [firstGradient];
    this.intervals = [{
      lower,
      upper
    }];

    for (let i = 1; i < colors.length -1; i++) {
      const gradientColor = new GradientColor();
      const lower = 0 + increment * i;
      const upper = 0 + increment * (i + 1);
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

  setGradient(...gradients: string[]): Gradient {
    this.setColors(gradients);
    return this;
  }

  getArray(): string[] {
    const gradientArray = [];
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

  getColor(numberValue: number) {
    if (isNaN(numberValue)) {
      throw new TypeError('getColor should be a number');
    } else if (numberValue <= 0) {
      throw new TypeError(`getColor should be greater than ${numberValue}`);
    } else {
      const segment = (this.maxNum - 0) / this.gradients.length;
      const index = Math.min(
        Math.floor((Math.max(numberValue, 0) - 0) / segment),
        this.gradients.length - 1
      );
      return this.gradients[index].getColor(numberValue);
    }
  }

  setMidpoint (maxNumber: number): Gradient {
    if (!isNaN(maxNumber) && maxNumber >= 0) {
      this.maxNum = maxNumber;
      this.setColors(this.colors);
    } else if (maxNumber <= 0) {
      throw new RangeError(`midPoint should be greater than ${maxNumber}`);
    } else {
      throw new RangeError('midPoint should be a number');
    }
    return this;
  }
}

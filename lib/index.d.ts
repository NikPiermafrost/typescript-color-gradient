export declare class Gradient {
    private gradients;
    private maxNum;
    private colors;
    private intervals;
    constructor(gradients?: never[], maxNum?: number, colors?: string[], intervals?: never[]);
    private setColors;
    setGradient(...gradients: string[]): Gradient;
    getArray(): string[];
    getColor(numberValue: number): string;
    setMidpoint(maxNumber: number): Gradient;
}

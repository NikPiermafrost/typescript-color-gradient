
<div>
    <h1>Typescript Color Gradient</h1>
    <h4>All credits to Adrinlol, original creator of this simple yet amazing library</h4>
    <p>typescript-color-gradient is a typescript native fork of javascript-color-gradient, a lightweight library used to generate an array of color gradients by providing the colors to blend, as well as the total number of colors to return.</p>
    <a href="https://github.com/Adrinlol/javascript-color-gradient" style="font-size: xl">For the original creator of the library, this is the repository</a>
</div>
<br />

[![Package Quality](https://packagequality.com/badge/typescript-color-gradient.png)](https://packagequality.com/#?package=typescript-color-gradient)

![MIT License](https://img.shields.io/npm/l/typescript-color-gradient) 

## Installation

For Node.js: Install the `typescript-color-gradient` npm module:

```bash
npm install typescript-color-gradient
```

Then import it into your TypeScript or JavaScript code:

```typescript
import { generateGradient } from "typescript-color-gradient";
```

## Usage
Generate a random gradient
```typescript
import { generateGradient } from "typescript-color-gradient";

const gradientArray = generateGradient();

console.log(gradientArray);
// [... a gradient with 10 colors starting by generating a random color and his complementary hex string value]
```


Using 1 color and the default number of colors (10) to generate an array of hex color values:

```typescript
import { generateGradient } from "typescript-color-gradient";

const gradientArray = generateGradient(["#3F2CAF"]);

console.log(gradientArray);
// [... a gradient with 10 colors starting by the selected color and his complementary hex string value]
```

Using 2 colors and the default number of colors (10) to generate an array of hex color values:

```typescript
import { generateGradient } from "typescript-color-gradient";

const gradientArray = generateGradient(["#3F2CAF", "#e9446a"]);

console.log(gradientArray);
// ["#3f2caf", "#522fa7", "#6531a0", "#783498", "#8b3790", "#9d3989", "#b03c81", "#c33f79", "#d64172", "#e9446a"]
```

Using 4 colors and 20 total colors to generate an array of hex color values:

```typescript
import { generateGradient } from "typescript-color-gradient";

const gradientArray = generateGradient(["#3F2CAF", "#e9446a", "#edc988", "#607D8B"], 20);

console.log(gradientArray);
// ["#3f2caf", "#5a30a4", "#753499", "#90378e", "#aa3b83", "#c53f79", "#e0436e", "#e9526d", "#ea6772", "#eb7c77", …]
```

## Migrating to V4

It just goes from
```javascript
import { Gradient } from "typescript-color-gradient";

const gradientArray = new Gradient()
  .setGradient("#3F2CAF", "#e9446a", "#edc988", "#607D8B")
  .setNumberOfColors(20)
  .getColors();

console.log(gradientArray);
```

to
```javascript
import { generateGradient } from "typescript-color-gradient";

const gradientArray = generateGradient(["#3F2CAF", "#e9446a", "#edc988", "#607D8B"], 20);

console.log(gradientArray);
```


## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

`typescript-color-gradient` is [MIT licensed.](https://github.com/NikPiermafrost/typescript-color-gradient/blob/master/LICENSE)

## Quotes
Again thanks to [Adrinlol](https://github.com/Adrinlol) for his work and letting me fork his job.
If anyone wants to contribute with a donation, i kindly ask to send it to [The original creator](https://www.buymeacoffee.com/adrinlol)

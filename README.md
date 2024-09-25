
<div>
    <h1>Typescript Color Gradient</h1>
    <h4>All credits to Adrinlol, original creator of this simple yet amazing library</h4>
    <p>typescript-color-gradient is a typescript native fork of javascript-color-gradient, a lightweight JavaScript library used to generate an array of color gradients by providing start and finish colors, as well as the required number of midpoints.</p>
    <a href="https://github.com/Adrinlol/javascript-color-gradient" style="font-size: xl">For the original creator of the library, this is the repository</a>
</div>
<br />

[![Package Quality](https://packagequality.com/badge/typescript-color-gradient.png)](https://packagequality.com/#?package=typescript-color-gradient)

![MIT License](https://img.shields.io/npm/l/javascript-color-gradient) 

## Installation

For Node.js: Install the `typescript-color-gradient` npm module:

```bash
npm install typescript-color-gradient
```

Then import the module into your JavaScript:

```typescript
import { generateGradient } from  from "typescript-color-gradient";
```

## Usage
Generate a random gradient
```typescript
import { generateGradient } from  from "typescript-color-gradient";

const gradientArray = generateGradient();

console.log(gradientArray);
// [... a gradient with 10 colors starting by generating a random color and his complementary hex string value]
```


Using 1 colors and default (10) midpoints to generate an array of hex color values:

```typescript
import { generateGradient } from  from "typescript-color-gradient";

const gradientArray = generateGradient(["#3F2CAF"]);

console.log(gradientArray);
// [... a gradient with 10 colors starting by the selected color and his complementary hex string value]
```

Using 2 colors and default (10) midpoints to generate an array of hex color values:

```typescript
import { generateGradient } from  from "typescript-color-gradient";

const gradientArray = generateGradient(["#3F2CAF", "#e9446a"]);

console.log(gradientArray);
// ["#502ea8", "#6131a1", "#72339a", "#833693", "#94388d", "#a53a86", "#b63d7f", "#c73f78", "#d84271", "#e9446a"]
```

Using 4 colors and 20 midpoints to generate an array of hex color values :

```javascript
import { generateGradient } from  from "typescript-color-gradient";

const gradientArray = generateGradient(["#3F2CAF", "#e9446a", "#edc988", "#607D8B"], 20);

console.log(gradientArray);
// ["#5930a5", "#72339a", "#8c3790", "#a53a86", "#bf3e7b", "#d84271", "#e94b6c", "#ea5f70", "#ea7375", "#eb8779", …]
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
import { generateGradient } from  from "typescript-color-gradient";

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

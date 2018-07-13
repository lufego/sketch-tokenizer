# sketch-tokenizer

<img src="https://image.ibb.co/cyYXXT/Screen_Shot_2018_07_12_at_17_08_15.png" width="200" />

Generates the design token with few clicks.

> If you work with design tokens in your project, one of the issues you might face is receiving layouts and having to inspecting them to find out which design token corresponds to certain HEX value.

> That's time consuming, and would be really good to receive such layouts with some "text labels" indicating which design token applies to certain color.

> This plugin comes to make both Designers and Developers's lives easier: you provide a file with your main colors and their variations, and the plugin will take care of mapping those to design tokens.


## Demo

<img src="http://g.recordit.co/Pw1Ut79guk.gif" width="500" />

## Usage

1. Provide a JSON file with your project's url(decision base colors)[https://medium.com/eightshapes-llc/tokens-in-design-systems-25dd82d58421]

````json
// variations are based on the color`s lightness channel
// (E.g color(var(--color-green), lightness(25%)))
{
  "baseColors": {
    "green": {
      "default": "#00b39e",
      "25": "25%",
      "40": "40%",
      "85": "85%",
      "95": "95%"
    },
    "white": {
      "default": "#ffffff"
    },
    "navy": {
      "default": "#213c45",
      "30": "30%",
      "40": "40%",
      "98": "98%"
    },
  }
}
````

2. Import this file on `Plugins > Tokenizer > Import base colors file...`

![how-to-import](http://g.recordit.co/FK9uXWnFa7.gif)

3. Select an object in the Artboard

4. Go to `Plugins > Tokenizer > Get color variable > Fill Color` or `Border Color`

5. 🎉 The corresponding design token to that label will be applied to the Artboard

## Future updates

- Implement actual design tokens (not only base colors)
- Tones for text

// Color converters

export function transformColorLightness(hex, lightness) {
  /* A bit of crazyness happening here;
  But this is the workflow from hsl_picker plugin to 
  generate colors in sketch, so the same scheme is below */
  // HEXtoRGB => RgbToHsl => change light => HSLtoRGB => RGBtoHSL => HSLtoHEX

  const colorRgb = HEXtoRGB(hex);
  const colorHsl = RGBtoHSL(colorRgb, lightness);
  const colorRgbTransformed = HSLtoRGB(colorHsl);
  const colorHslTransformed = RGBtoHSL(colorRgbTransformed);
  const colorHex = HSLtoHEX(colorHslTransformed);
  console.log('colorHex', colorHex);
  return colorHex;
}

function HEXtoRGB(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
      ]
    : null;
}

function RGBtoHSL([r, g, b], lightness) {
  (r /= 255), (g /= 255), (b /= 255);
  var max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  var h,
    s,
    l = (max + min) / 2;
  if (max == min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return [
    Math.round(h * 360),
    Math.round(s * 100),
    lightness ? parseInt(lightness) : Math.round(l * 100)
  ];
}

function HSLtoHEX(hsl) {
  const rgbColor = HSLtoRGB([hsl[0], hsl[1], hsl[2]]);
  const r = rgbColor[0];
  const g = rgbColor[1];
  const b = rgbColor[2];

  // console.log('rgb', r, g, b)

  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function HSLtoRGB([h, s, l]) {
  var m1, m2, hue;
  s = s / 100;
  l = l / 100;
  var r, g, b;

  if (s == 0) r = g = b = l * 255;
  else {
    m2 = l < 0.5 ? l * (1 + s) : l + s - l * s;
    m1 = 2 * l - m2;
    hue = h / 360;

    r = hue2rgb(m1, m2, hue + 1 / 3);
    g = hue2rgb(m1, m2, hue);
    b = hue2rgb(m1, m2, hue - 1 / 3);
  }

  function multiplyBy255(num) {
    return num * 255;
  }

  if (r < 1 || g < 1 || b < 1) {
    r = multiplyBy255(r);
    g = multiplyBy255(g);
    b = multiplyBy255(b);
  }

  // console.log('rgb', Math.round(r), Math.round(g), Math.round(b));

  return [Math.round(r), Math.round(g), Math.round(b)];
}

// Used inside HSLtoRGB function
function hue2rgb(m1, m2, hue) {
  if (hue < 0) hue += 1;
  if (hue > 1) hue -= 1;
  if (hue < 1 / 6) return m1 + (m2 - m1) * 6 * hue;
  if (hue < 1 / 2) return m2;
  if (hue < 2 / 3) return m1 + (m2 - m1) * (2 / 3 - hue) * 6;
  return m1;
}

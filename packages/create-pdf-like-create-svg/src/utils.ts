import arcToBezier from "svg-arc-to-cubic-bezier";

const point = {
  x: 700,
  y: 100,

  rx: 300,
  ry: 200,
  largeArcFlag: 30,
  sweepFlag: 0,
  xAxisRotation: 0,
};

export function transformArc2Bezier(
  previousPoint: { x: number; y: number },
  currentPoint: typeof point
) {
  const curves = arcToBezier({
    px: previousPoint.x,
    py: previousPoint.y,
    cx: currentPoint.x,
    cy: currentPoint.y,

    rx: currentPoint.rx,
    ry: currentPoint.ry,
    xAxisRotation: currentPoint.xAxisRotation,
    largeArcFlag: currentPoint.largeArcFlag,
    sweepFlag: currentPoint.sweepFlag,
  });

  return curves;
}

command: "elliptical arc";
largeArc: false;
rx: 20;
ry: 20;
sweep: true;
x: 50;
xAxisRotation: 0;
y: 30;

export const cToQ = 2 / 3; // ratio to convert quadratic bezier curves to cubic ones
// transforms a cubic bezier control point to a quadratic one: returns from + (2/3) * (to - from)
export function toCubic(from: number[], to: number[]): number[] {
  return [
    cToQ * (to[0] - from[0]) + from[0],
    cToQ * (to[1] - from[1]) + from[1],
  ];
}

export function transferSvgPath2pdfOperator(arr) {
  let ret: any[] = [];

  let prevX: number = 0;
  let prevY: number = 0;

  for (const item of arr) {
    let code = item.code;

    switch (code) {
      case "M":
        prevX = item.x;
        prevY = item.y;

        ret.push({ op: "m", c: [item.x, item.y] });
        break;

      case "L":
        prevX = item.x;
        prevY = item.y;

        ret.push({ op: "l", c: [item.x, item.y] });
        break;

      case "Z":
        ret.push({ op: "h", c: [] });
        break;

      case "A":
        let arr = transformArc2Bezier(
          { x: prevX, y: prevY },
          {
            ...item,
            sweepFlag: item.sweep,
            largeArcFlag: item.largeArc,
          }
        );

        for (const a of arr) {
          ret.push({ op: "c", c: [a.x1, a.y1, a.x2, a.y2, a.x, a.y] });

          prevX = a.x;
          prevY = a.y;
        }

        break;

      case "Q": {
        console.log(item);

        ret.push({
          op: "c",
          c: [prevX, prevY, item.x1, item.y1, item.x, item.y],
        });
        prevX = item.x;
        prevY = item.y;

        break;
      }

      default:
        console.error(code, item);

        throw new Error(code);

        break;
    }
  }

  return ret;
}

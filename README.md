# react-svg-pdf

The goal of `react-svg-pdf` is to help you build pdf more easily, If you know how to create svg, you also know how to create pdf.

## How to use?

```shell
npm i react-svg-pdf -S
```

Next, you can write your familiar SVG code like below, that will make a heart for you.

```jsx
import ReactPDF from "react-svg-pdf";
import React from "react";
import jsPDF from "jspdf";

function App() {
  return (
    <>
      <path
        fill="#e06d21"
        d="M 10,30
           A 20,20 0,0,1 50,30
           A 20,20 0,0,1 90,30
           Q 90,60 50,90
           Q 10,60 10,30 z"
      />
    </>
  );
}

let pdf = new jsPDF({ orientation: "p" });

ReactPDF.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,

  pdf,
  () => {
    let embed = document.getElementById("app") as HTMLEmbedElement;
    if (embed) embed.src = pdf.output("bloburi") as any;
  }
);

```

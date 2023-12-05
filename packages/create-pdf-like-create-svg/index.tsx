import ReactPDF from "./src/react-pdf-render";
import React from "react";
import jsPDF from "jspdf";

function App() {
  return (
    <>
      <path d="M 10 10 L 100 100 L 100 200 Z" fill="#26d5d5" stroke="#000" />
      <path d="M 20 10 L 110 100 L 110 200" stroke="#000" />
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

import ReactReconciler from "react-reconciler";
import parseSVG from "svg-path-parser";
import { transferSvgPath2pdfOperator } from "./utils";
import jsPDF from "jspdf";

let reconciler = ReactReconciler({
  /* configuration for how to talk to the host environment */
  /* aka "host config" */

  supportsMutation: true,

  createInstance(
    type,
    props,
    rootContainerInstance,
    hostContext,
    internalInstanceHandle
  ) {
    if (type === "path") {
      let d = props.d;
      let arr = parseSVG(d);

      console.log(arr);

      let pdf = rootContainerInstance as jsPDF;

      let operator = transferSvgPath2pdfOperator(arr);

      pdf.path(operator);

      if (props.fill) {
        pdf.setFillColor(props.fill).fill();
      }

      if (props.stroke) {
        pdf.setDrawColor(props.stroke).stroke();
      }
    }
    console.log(arguments);
  },

  createTextInstance(
    text,
    rootContainerInstance,
    hostContext,
    internalInstanceHandle
  ) {
    return "aa";
  },

  appendChildToContainer(container, child) {},
  appendChild(parent, child) {},
  appendInitialChild(parent, child) {},

  removeChildFromContainer(container, child) {},
  removeChild(parent, child) {},
  insertInContainerBefore(container, child, before) {},
  insertBefore(parent, child, before) {},

  clearContainer(container) {},

  prepareUpdate(
    instance,
    type,
    oldProps,
    newProps,
    rootContainerInstance,
    currentHostContext
  ) {},
  commitUpdate(
    instance,
    updatePayload,
    type,
    oldProps,
    newProps,
    finishedWork
  ) {},

  finalizeInitialChildren() {},
  getChildHostContext() {},
  getPublicInstance() {},
  getRootHostContext() {},
  prepareForCommit() {},
  resetAfterCommit() {},
  shouldSetTextContent() {
    return false;
  },
});

let ReactPDF = {
  render(whatToRender, pdf, callback) {
    let container = reconciler.createContainer(
      pdf,
      0,
      null,
      true,
      false,
      "",
      (...e) => {
        console.error(e);
      },
      null
    );

    reconciler.updateContainer(whatToRender, container, null, callback);
  },
};

export default ReactPDF;

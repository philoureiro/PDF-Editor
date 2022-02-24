import { degrees, PDFDocument, rgb, StandardFonts } from "pdf-lib";

export const scaleXY = (number, browserName) => {
  const chrome = {
    1: {
      width: "772",
      height: "999",
    },
    2: {
      width: "1545",
      height: "1999",
    },
    3: {
      width: "2318",
      height: "3000",
    },
    4: {
      width: "3090",
      height: "3999",
    },
    5: {
      width: "3863",
      height: "5000",
    },
  };

  const firefox = {
    1: {
      width: "706",
      height: "1000",
    },
    2: {
      width: "1413",
      height: "2000",
    },
    3: {
      width: "2119",
      height: "3000",
    },
    4: {
      width: "2826",
      height: "4000",
    },
    5: {
      width: "3533",
      height: "4999",
    },
  };

  const safari = {
    1: {
      width: "707",
      height: "1000",
    },
    2: {
      width: "1413",
      height: "2000",
    },
    3: {
      width: "2119",
      height: "3000",
    },
    4: {
      width: "2826",
      height: "4000",
    },
    5: {
      width: "3533",
      height: "4999",
    },
  };
  return browserName === "chrome" ? chrome[number] : firefox[number];
};

export const Scalator = async (scale, urlFile) => {
  console.log("entrou");
  const existingPdfBytes = await fetch(urlFile).then((res) =>
    res.arrayBuffer()
  );
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  console.log("teste", pdfDoc);
  const pages = pdfDoc.getPages();
  console.log("tam", pages.lenght);
  console.log(pages[0].getSize());
  const { width, height } = pdfDoc[0].getSize();

  console.log(pdfDoc[0]);
  return {
    currentWidth: width * scale,
    currentHeight: height * scale,
    initialWidth: width,
    initialHeight: height,
  };
};

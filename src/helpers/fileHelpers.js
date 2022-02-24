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

export const getPDFBlob = async (urlFile) => {
  const existingPdfBytes = await fetch(urlFile).then((res) =>
    res.arrayBuffer()
  );

  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  return pdfDoc.getPages();
};

export const Scalator = (scale, blob) => {
  if (blob[0]) {
    const { width, height } = blob[0].getSize();

    return {
      defaultScale: {
        width,
        height,
        scale: 1,
      },
      currentScale: {
        scale: scale,
        width: width * scale,
        height: height * scale,
      },
    };
  }

  return;
};

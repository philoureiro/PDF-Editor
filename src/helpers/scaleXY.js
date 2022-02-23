export const scaleXY = (number) => {
  const scales = {
    1: {
      width: "772px",
      height: "999px",
    },
    2: {
      width: "1545px",
      height: "1999px",
    },
    3: {
      width: "2318px",
      height: "3000px",
    },
    4: {
      width: "3090px",
      height: "3999px",
    },
    5: {
      width: "3863px",
      height: "5000px",
    },
  };

  return scales[number];
};

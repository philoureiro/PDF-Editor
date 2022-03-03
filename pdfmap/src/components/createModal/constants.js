export function generateRandomColor() {
  let maxVal = 0xffffff; // 16777215
  let randomNumber = Math.random() * maxVal;
  randomNumber = Math.floor(randomNumber);
  randomNumber = randomNumber.toString(16);
  let randColor = randomNumber.padStart(6, 0);
  return `#${randColor.toUpperCase()}`;
}

const SIZE = {
  default: { width: 200, height: 40 },
  large: { width: 350, height: 75 },
  rect: { width: 75, height: 75 },
};

const TYPE_OPTIONS = {
  text: { ...SIZE.default, fill: "#2146FF", opacity: 0.2 },
  number: { ...SIZE.default, fill: "#400CA5", opacity: 0.2 },
  date: { ...SIZE.default, fill: "#A8194B", opacity: 0.2 },
  checkbox: { ...SIZE.rect, fill: "#F7540A", opacity: 0.2 },
  dropdown: { ...SIZE.default, fill: "#FEFE35", opacity: 0.2 },
  textarea: { ...SIZE.large, fill: "#68B42F", opacity: 0.2 },
};

export const SELECT_TYPE_OPTIONS = [
  { label: "Text", value: "text" },
  { label: "Number", value: "number" },
  { label: "Date", value: "date" },
  { label: "Checkbox", value: "checkbox" },
  { label: "Dropdown", value: "dropdown" },
  { label: "Text Area", value: "textarea" },
];

export const INITIAL_FORM_VALUES = {
  type: SELECT_TYPE_OPTIONS[0].value,
};

export function handleSelectedType(selectedType) {
  return TYPE_OPTIONS[selectedType];
}

export function generateRandomColor() {
  let maxVal = 0xffffff; // 16777215
  let randomNumber = Math.random() * maxVal;
  randomNumber = Math.floor(randomNumber);
  randomNumber = randomNumber.toString(16);
  let randColor = randomNumber.padStart(6, 0);
  return `#${randColor.toUpperCase()}`;
}

const SIZES = {
  default: { width: 200, height: 40 },
  large: { width: 350, height: 75 },
  rect: { width: 75, height: 75 },
};

const TYPE_OPTIONS = {
  text: { size: SIZES.default, color: '#2146FF' },
  number: { size: SIZES.default, color: '#400CA5' },
  date: { size: SIZES.default, color: '#A8194B' },
  checkbox: { size: SIZES.rect, color: '#F7540A' },
  dropdown: { size: SIZES.default, color: '#FEFE35' },
  textarea: { size: SIZES.large, color: '#68B42F' },
};

export const SELECT_TYPE_OPTIONS = [
  { label: 'Text', value: 'text' },
  { label: 'Number', value: 'number' },
  { label: 'Date', value: 'date' },
  { label: 'Checkbox', value: 'checkbox' },
  { label: 'Dropdown', value: 'dropdown' },
  { label: 'Text Area', value: 'textarea' },
];

export const INITIAL_FORM_VALUES = {
  type: SELECT_TYPE_OPTIONS[0].value,
};

export function handleSelectedType(selectedType) {
  return TYPE_OPTIONS[selectedType];
}

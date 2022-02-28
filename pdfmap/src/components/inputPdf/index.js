const STYLE = {
  padding: '1rem',
  margin: '2rem',
  borderRadius: '5px',
  float: 'right',
  cursor: 'pointer',
  color: '#fff',
  backgroundColor: '#333',
};

export default function InputPdf({ setPdf }) {
  const handleSetUrlFromFile = event => {
    if (event.currentTarget?.files?.length) {
      const [pdf] = event.currentTarget.files;
      setPdf(URL.createObjectURL(pdf));
      return;
    }
    setPdf(null);
  };

  return (
    <label style={STYLE}>
      Upload Document
      <input type='file' onChange={handleSetUrlFromFile} hidden />
    </label>
  );
}

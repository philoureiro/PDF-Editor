export const getDocumentPageSize = (documentRef) => {
  if (documentRef?.current) {
    console.log(documentRef.current);
    const { width, height } = documentRef?.current?.getBoundingClientRect();

    return { width, height };
  }
};

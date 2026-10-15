const isSameDocument = (left: object | null, right: object): boolean =>
  left === right;

export const createTelemetryDocumentGate = (initialDocument: object) => {
  let currentDocument: object | null = initialDocument;
  let readyDocument: object | null = null;

  return {
    startNavigation(): void {
      currentDocument = null;
      readyDocument = null;
    },
    commitNavigation(document: object): void {
      currentDocument = document;
      readyDocument = null;
    },
    acknowledge(document: object): boolean {
      if (!isSameDocument(currentDocument, document)) return false;
      readyDocument = document;
      return true;
    },
    isReady(document: object): boolean {
      return isSameDocument(readyDocument, document);
    },
    reset(): void {
      currentDocument = null;
      readyDocument = null;
    },
  };
};

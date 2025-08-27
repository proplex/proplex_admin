import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Set up the worker for react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PDFViewerProps {
  fileUrl: string;
  fileName?: string;
}

export default function PDFViewer({ fileUrl, fileName }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  function changePage(offset: number) {
    setPageNumber(prevPageNumber => {
      const newPageNumber = prevPageNumber + offset;
      return numPages ? Math.min(Math.max(1, newPageNumber), numPages) : 1;
    });
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  function zoomIn() {
    setScale(prevScale => Math.min(prevScale + 0.2, 3));
  }

  function zoomOut() {
    setScale(prevScale => Math.max(prevScale - 0.2, 0.5));
  }

  function rotate() {
    setRotation(prevRotation => (prevRotation + 90) % 360);
  }

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={previousPage}
          disabled={pageNumber <= 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="text-sm">
          Page {pageNumber} of {numPages || '--'}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={nextPage}
          disabled={numPages === null || pageNumber >= numPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={zoomOut}>
          <ZoomOut className="h-4 w-4" />
        </Button>
        <span className="text-sm">{Math.round(scale * 100)}%</span>
        <Button variant="outline" size="sm" onClick={zoomIn}>
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={rotate}>
          <RotateCw className="h-4 w-4" />
        </Button>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Document
          file={fileUrl.startsWith('data:application/pdf;base64,') ? { data: fileUrl } : fileUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
            <div className="flex items-center justify-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          }
          error={
            <div className="flex items-center justify-center p-8 text-red-500">
              Failed to load PDF
            </div>
          }
        >
          <Page
            pageNumber={pageNumber}
            scale={scale}
            rotate={rotation}
            renderAnnotationLayer={true}
            renderTextLayer={true}
          />
        </Document>
      </div>

      {fileName && (
        <div className="mt-2 text-sm text-gray-600">
          {fileName}
        </div>
      )}
    </div>
  );
}
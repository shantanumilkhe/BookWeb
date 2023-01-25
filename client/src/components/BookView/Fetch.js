import React, { useEffect, useState,createRef } from "react";
import 'react-pdf/dist/esm/Page/TextLayer.css'
import '../../css/viewer.css'
import { Document, Page } from 'react-pdf';
const Fetch = (props) => {
  const [pdfFile, setPdfFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  async function getFile(id) {
    try {
        const response = await fetch('http://localhost:5000/drive/'+id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/octet-stream'
            },
            responseType: 'blob'
        });
        setPdfFile(response.url)
        const fileBlob = await response.blob();
        return fileBlob;
    } catch (error) {
        console.error(error);
    }
  }
  useEffect(() => {
    getFile(props.id);
  }, [props.id])
  
  return (
    <div>
      <div>
        <p>
          Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
        </p>
        <button
          type="button"
          disabled={pageNumber <= 1}
          onClick={previousPage}
        >
          Previous
        </button>
        <button
          type="button"
          disabled={pageNumber >= numPages}
          onClick={nextPage}
        >
          Next
        </button>
      </div>
      <div id="ResumeContainer">

      <Document
        height='508px'
        width="100%"
        file={pdfFile}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <div style={{
				border: '2px solid lightgray',
				display: 'flex',
				height: '100%',
				borderRadius: '3px',
			}}>
        <Page pageNumber={pageNumber} />
        </div>
      </Document>
      </div>
    </div>
  );
}

export default Fetch

import React, { useEffect, useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import { VariableSizeList as List } from "react-window";
import { asyncMap } from "@wojtekmaj/async-array-utils";
import axios from "axios";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

const width = 500;
const height = width * 1.5;

function Row({ index, style }) {
  function onPageRenderSuccess(page) {
    console.log(`Page ${page.pageNumber} rendered`);
  }

  return (
    <div style={style}>
      <Page
        onRenderSuccess={onPageRenderSuccess}
        pageIndex={index}
        width={width}
      />
    </div>
  );
}

const Viewer = () => {
  const [pdf, setPdf] = useState(null);
  const [pageViewports, setPageViewports] = useState(null);


  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [renderNavButtons, setRenderNavButtons] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);
  const handleFile = async (e) => {
    const file = e.target.files[0];
    let url = URL.createObjectURL(file);
    setPdfFile(file);
  };

  const changePage = (offset) => {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }
  const previousPage = () => { changePage(-1); }
  const nextPage = () => { changePage(+1); }
  /**
   * React-Window cannot get item size using async getter, therefore we need to
   * calculate them ahead of time.
   */
  useEffect(() => {
    setPageViewports(null);

    if (!pdf) {
      return;
    }

    (async () => {
      const pageNumbers = Array.from(new Array(pdf.numPages)).map(
        (_, index) => index + 1
      );

      const nextPageViewports = await asyncMap(pageNumbers, (pageNumber) =>
        pdf.getPage(pageNumber).then((page) => page.getViewport({ scale: 1 }))
      );

      setPageViewports(nextPageViewports);
    })();
  }, [pdf]);

  function onDocumentLoadSuccess(nextPdf) {
    setPdf(nextPdf);
    setNumPages(nextPdf.numPages);
    setRenderNavButtons(true);
  }

  function getPageHeight(pageIndex) {
    if (!pageViewports) {
      throw new Error("getPageHeight() called too early");
    }

    const pageViewport = pageViewports[pageIndex];
    const scale = width / pageViewport.width;
    const actualHeight = pageViewport.height * scale;

    return actualHeight;
  }
  const sendFile = async () => {
    var FormData = require('form-data');
    var formData = new FormData();

    formData.append("document",pdfFile);
    // await axios.post('http://localhost:5000/drive/upload', formData).then(res => { console.log(res) });
    console.log(formData.get("file"));
    await fetch("http://localhost:5000/drive/upload", {
        method: 'POST',
        body: formData,
        
    })
        .then((res) => console.log(res))
        .catch((err) => ("Error occured", err));
  }
  return (
    <div>
      <div>
        <input
          type="file"
          accept="application/pdf"
          placeholder="insert PDF here"
          onChange={(e) => handleFile(e)}
        />
      </div>
      {renderNavButtons &&
        <div className="buttonc">
          <div>
            <button onClick={sendFile}>Upload</button>
          </div>
          <div>
            <button
              disabled={pageNumber <= 1}
              onClick={previousPage}
            >
              Previous Page
            </button>
            {"  "}
            <button
              disabled={pageNumber === numPages}
              onClick={nextPage}
            >
              Next Page
            </button>
          </div>
        </div>
      }


      <Document
        file={pdfFile}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {pdf && pageViewports ? (
          <List
            width={width}
            height={height}
            estimatedItemSize={height}
            itemCount={pdf.numPages}
            itemSize={getPageHeight}
          >
            {Row}
          </List>
        ) : null}
      </Document>
    </div>
  );
}

export default Viewer
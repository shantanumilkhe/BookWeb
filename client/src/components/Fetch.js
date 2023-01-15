import React, { useEffect, useState,createRef } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import { VariableSizeList as List } from "react-window";
import { asyncMap } from "@wojtekmaj/async-array-utils";
import { useWindowWidth, useWindowHeight } from "@wojtekmaj/react-hooks";
import axios from "axios";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

const Fetch = () => {
  const windowWidth = useWindowWidth();
  const windowHeight = useWindowHeight();
  const listRef = createRef();
  const [pdf, setPdf] = useState(null);
  const [pageViewports, setPageViewports] = useState(null);


  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [renderNavButtons, setRenderNavButtons] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);
  const [displayPage,setDisplayPage] = useState(null);
  let name,value;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;

    setDisplayPage(value);
  }

  const goToPage = () =>{
    setPageNumber(displayPage-1);
    listRef.current.scrollToItem(displayPage-1,"center");
  }
  const changePage = (offset) => {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
    listRef.current.scrollToItem(pageNumber,"center");
  }
  const previousPage = () => { 
    changePage(-1);
   }
  const nextPage = () => { changePage(+1); }
  /**
   * React-Window cannot get item size using async getter, therefore we need to
   * calculate them ahead of time.
   */
  async function getFile() {
    try {
        const response = await fetch('http://localhost:5000/drive/1Q_xEHAlxdqkvsSFAz2dqEucZWZLfOKsw', {
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
    getFile();
  }, [])
  
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

  function Row({ index, style }) {
    function onPageRenderSuccess(page) {
      console.log(`Page ${page.pageNumber} rendered`);
    }
  
    return (
      <div style={style}>
        <Page
          onRenderSuccess={onPageRenderSuccess}
          pageIndex={index}
        />
      </div>
    );
  }

  function getPageHeight(pageIndex) {
    if (!pageViewports) {
      throw new Error("getPageHeight() called too early");
    }

    const pageViewport = pageViewports[pageIndex];

    return pageViewport.height;
  }

  return (
    <div>
      
      {renderNavButtons &&
        <div className="buttonc">
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
            <input type="number" value={displayPage} onChange={handleInput}/>
            <button onClick={goToPage}>
              Go To Page
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
            ref={listRef}
            width={windowWidth}
            height={windowHeight}
            estimatedItemSize={getPageHeight(0)}
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

export default Fetch
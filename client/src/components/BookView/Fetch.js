import { useEffect, useState,createRef } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import { VariableSizeList as List } from "react-window";
import { asyncMap } from "@wojtekmaj/async-array-utils";
import { useWindowWidth, useWindowHeight } from "@wojtekmaj/react-hooks";
import { useParams } from "react-router-dom";
import '../../css/viewer.css'

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;
function Row({ index, style }) {
  return (
    <div style={{...style}}>
      <div className="PDFPage">
      <Page pageIndex={index} renderTextLayer={false} renderAnnotationLayer={false} />
      </div>
    </div>
  );
}
const Fetch = () => {
  let params = useParams();
  const listRef = createRef();
  const windowWidth = useWindowWidth();
  const windowHeight = useWindowHeight();
  const [pdfFile, setPdfFile] = useState(null);
  const [pdf, setPdf] = useState(null);
  const [pageViewports, setPageViewports] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages,setNumPages] = useState(null);
  const [goto, setGoto] = useState(null);

  async function getFile() {
    try {
      const response = await fetch('https://bookweb.onrender.com/drive/' + params.id, {
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
    setNumPages(nextPdf.numPages)
    setPdf(nextPdf);
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
      <Document
        className={'PDFDocument'}
        file={pdfFile}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {pdf && pageViewports ? (<div>
          <div className="pdf-toolbox">
            <button className="pdf-prev" onClick={() => { listRef.current.scrollToItem(currentPage-2,"start") }} disabled={currentPage === 1}>Previous</button>
            <button className="pdf-next" onClick={() => { listRef.current.scrollToItem(currentPage,"start") }} disabled={currentPage === numPages}>Next</button>
            <div className="pdf-page-counter">
              <span className="pdf-current-page">{currentPage}</span>
              <span> / </span>
              <span className="pdf-total-pages">{numPages}</span>
            </div>
            <input type="number" className='form-control w-50 mx-2' placeholder='Page Number' value={goto} onChange={(e) => setGoto(Number(e.target.value))} ></input>
            <button className="pdf-download" onClick={() => { listRef.current.scrollToItem((goto - 1),"start") }}>Go</button>
          </div>
          <div className='pdfArea'>
            <List
              width={window.innerWidth}
              height={windowHeight-128}
              estimatedItemSize={getPageHeight(0)}
              itemCount={pdf.numPages}
              itemSize={getPageHeight}
              ref={listRef}
              onItemsRendered={({ visibleStartIndex, visibleStopIndex }) => {
                setCurrentPage(visibleStartIndex + 1)
              }
              }
            >
              {Row}
            </List>
          </div>
        </div>
        ) : null}
      </Document>
    </div>
  );
}

export default Fetch;
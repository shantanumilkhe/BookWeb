// import { useEffect, useState, createRef } from "react";
// import { pdfjs, Document, Page } from "react-pdf";
// import { VariableSizeList as List } from "react-window";
// import { asyncMap } from "@wojtekmaj/async-array-utils";
// import { useWindowWidth, useWindowHeight } from "@wojtekmaj/react-hooks";
// import { useParams } from "react-router-dom";
// import '../../css/viewer.css'
// // Import the main component
// import { Viewer } from '@react-pdf-viewer/core';

// // Import the styles
// import '@react-pdf-viewer/core/lib/styles/index.css';

// // Your render function

// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;
// function Row({ index, style }) {
//   return (
//     <div style={{ ...style }}>
//       <div className="PDFPage">
//         <Page pageIndex={index} renderTextLayer={false} renderAnnotationLayer={false} />
//       </div>
//     </div>
//   );
// }
// const Fetch = () => {
//   let params = useParams();
//   const listRef = createRef();
//   const windowWidth = useWindowWidth();
//   const windowHeight = useWindowHeight();
//   const [pdfFile, setPdfFile] = useState(null);
//   const [pdf, setPdf] = useState(null);
//   const [pageViewports, setPageViewports] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [numPages, setNumPages] = useState(null);
//   const [goto, setGoto] = useState(null);

//   async function getFile() {
//     try {
//       const response = await fetch('http://localhost:5000/drive/' + params.id, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/octet-stream'
//         },
//         responseType: 'blob'
//       });
//       setPdfFile(response.url)
//       const fileBlob = await response.blob();
//       return fileBlob;
//     } catch (error) {
//       console.error(error);
//     }
//   }
//   useEffect(() => {
//     getFile();
//   }, [])
//   useEffect(() => {
//     setPageViewports(null);

//     if (!pdf) {
//       return;
//     }

//     (async () => {
//       const pageNumbers = Array.from(new Array(pdf.numPages)).map(
//         (_, index) => index + 1
//       );

//       const nextPageViewports = await asyncMap(pageNumbers, (pageNumber) =>
//         pdf.getPage(pageNumber).then((page) => page.getViewport({ scale: 1 }))
//       );

//       setPageViewports(nextPageViewports);
//     })();
//   }, [pdf]);

//   function onDocumentLoadSuccess(nextPdf) {
//     setNumPages(nextPdf.numPages)
//     setPdf(nextPdf);
//   }

//   function getPageHeight(pageIndex) {
//     if (!pageViewports) {
//       throw new Error("getPageHeight() called too early");
//     }

//     const pageViewport = pageViewports[pageIndex];

//     return pageViewport.height;
//   }

//   return (
//     <div>
//       <Document
//         className={'PDFDocument'}
//         file={pdfFile}
//         onLoadSuccess={onDocumentLoadSuccess}
//       >
//         {pdf && pageViewports ? (<div>
//           <div className="pdf-toolbox">
//             <button className="pdf-prev" onClick={() => { listRef.current.scrollToItem(currentPage-2,"start") }} disabled={currentPage === 1}>Previous</button>
//             <button className="pdf-next" onClick={() => { listRef.current.scrollToItem(currentPage,"start") }} disabled={currentPage === numPages}>Next</button>
//             <div className="pdf-page-counter">
//               <span className="pdf-current-page">{currentPage}</span>
//               <span> / </span>
//               <span className="pdf-total-pages">{numPages}</span>
//             </div>
//             <input type="number" className='form-control w-50 mx-2' placeholder='Page Number' value={goto} onChange={(e) => setGoto(Number(e.target.value))} ></input>
//             <button className="pdf-download" onClick={() => { listRef.current.scrollToItem((goto - 1),"start") }}>Go</button>
//           </div>
//           <div className='pdfArea'>
//             <List
//               width={window.innerWidth}
//               height={windowHeight-128}
//               estimatedItemSize={getPageHeight(0)}
//               itemCount={pdf.numPages}
//               itemSize={getPageHeight}
//               ref={listRef}
//               onItemsRendered={({ visibleStartIndex, visibleStopIndex }) => {
//                 setCurrentPage(visibleStartIndex + 1)
//               }
//               }
//             >
//               {Row}
//             </List>
//           </div>
//         </div>
//         ) : null}
//       </Document>
//     </div>
//   );
// }

// export default Fetch;

import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { pageNavigationPlugin } from '@react-pdf-viewer/page-navigation';
import { zoomPlugin } from '@react-pdf-viewer/zoom';
import '@react-pdf-viewer/zoom/lib/styles/index.css';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/page-navigation/lib/styles/index.css';
const Fetch = () => {
  let params = useParams();
  const [pdfFile, setPdfFile] = useState(null);
  const [pdf, setPdf] = useState(null);
  const pageNavigationPluginInstance = pageNavigationPlugin();
  const { CurrentPageInput, GoToFirstPageButton, GoToLastPageButton, GoToNextPageButton, GoToPreviousPage } =
    pageNavigationPluginInstance;
    const zoomPluginInstance = zoomPlugin();
    const { ZoomInButton, ZoomOutButton, ZoomPopover } = zoomPluginInstance;
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
  return (
    <div>
      {pdfFile ? <div
        style={{
          border: '1px solid rgba(0, 0, 0, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          height: window.innerHeight,
        }}
      >
        <div
          style={{
            position:'sticky',
            alignItems: 'center',
            backgroundColor: '#eeeeee',
            borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
            display: 'flex',
            justifyContent: 'center',
            padding: '4px',
            zIndex:'1',
          }}
        >
          <div style={{ padding: '0px 2px' }}>
            <GoToPreviousPage />
          </div>
          <div style={{ padding: '0px 2px' }}>
            <CurrentPageInput />
          </div>
          <div style={{ padding: '0px 2px' }}>
            <GoToNextPageButton />
          </div>
          <div style={{ padding: '0px 2px' }}>
            <ZoomOutButton />
          </div>
          <div style={{ padding: '0px 2px' }}>
            <ZoomPopover />
          </div>
          <div style={{ padding: '0px 2px' }}>
            <ZoomInButton />
          </div>
        </div>
        <div
          style={{
            userSelect: 'none' ,
            flex: 1,
            overflow: 'hidden',
          }}
        >
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.2.146/build/pdf.worker.min.js">
            <Viewer theme='dark' fileUrl={pdfFile} plugins={[pageNavigationPluginInstance,zoomPluginInstance]} />;
          </Worker>
        </div>
      </div> : null}
    </div>
  )
}

export default Fetch
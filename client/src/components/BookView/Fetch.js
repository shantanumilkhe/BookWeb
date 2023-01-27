import React, { useState, useEffect, createRef } from 'react';
import { useParams } from 'react-router-dom';
import { Document, Page , pdfjs} from 'react-pdf';
import { FixedSizeList } from 'react-window';
import '../../css/viewer.css'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Fetch = (props) => {
  let h = window.innerHeight;
  let params = useParams(); 
  const listRef = createRef();
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pdfFile, setPdfFile] = useState(null);
  const [goto, setGoto] = useState(null);
  const [scale, setScale] = useState(1);

  async function getFile() {
    try {
      const response = await fetch('http://localhost:5000/drive/' + params.id, {
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

  const renderPage = ({ index, style }) => {
    return (
      <div style={style} ><Page key={index + 1} pageNumber={index + 1} renderTextLayer={false} renderAnnotationLayer={false} scale={1} height={h-20}/></div>
    );
  }

  return (
    <div>
      <Document
        file={pdfFile}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
      >
        {numPages && (
          <>
            <div className="pdf-toolbox">
              <button className="pdf-prev" onClick={() => { listRef.current.scrollToItem(currentPage - 2) }} disabled={currentPage === 1}>Previous</button>
              <button className="pdf-next" onClick={() => { listRef.current.scrollToItem(currentPage) }} disabled={currentPage === numPages}>Next</button>
              <div className="pdf-page-counter">
                <span className="pdf-current-page">{currentPage}</span>
                <span> / </span>
                <span className="pdf-total-pages">{numPages}</span>
              </div>
              <input type="number" className='form-control w-50 mx-2' placeholder='Page Number' value={goto} onChange={(e) => setGoto(Number(e.target.value))} ></input>
              <button className="pdf-download" onClick={() => { listRef.current.scrollToItem(goto - 1) }}>Go</button>
            </div>
            <div className='pdfArea'>
              <FixedSizeList
                itemCount={numPages}
                itemSize={h-16}
                height={h}
                width={700}
                ref={listRef}
                onItemsRendered={({ visibleStartIndex, visibleStopIndex }) => {
                  setCurrentPage(visibleStartIndex + 1)
                }
                }
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {renderPage}
              </FixedSizeList>
            </div>
          </>
        )}
      </Document>
    </div>
  );
}

export default Fetch;

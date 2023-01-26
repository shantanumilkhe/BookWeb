import React, { useState, useEffect, createRef } from 'react';
import { Document, Page } from 'react-pdf';
import { FixedSizeList } from 'react-window';
import '../../css/viewer.css'
const Fetch = (props) => {
  const listRef = createRef();
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pdfFile, setPdfFile] = useState(null);
  const [goto,setGoto] = useState(null);

  async function getFile(id) {
    try {
      const response = await fetch('http://localhost:5000/drive/' + id, {
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

  const renderPage = ({ index, style }) => {
    return (
      <div style={style}><Page key={index + 1} pageNumber={index + 1} renderTextLayer={false}/></div>
    );
  }

  return (
    <div>
      <div>Page no.:{currentPage}/{numPages}</div>
      <Document
        file={pdfFile}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
      >
        {numPages && (
          <>
            <div>
              <button onClick={() => { listRef.current.scrollToItem(currentPage - 2)}} disabled={currentPage === 1}>Previous</button>
              <button onClick={() => { listRef.current.scrollToItem(currentPage)}} disabled={currentPage === numPages}>Next</button>
              <input type="number" placeholder='Page Number' value={goto} onChange={(e)=>setGoto(Number(e.target.value))} ></input>
              <button onClick={()=>{listRef.current.scrollToItem(goto-1)}}>Go</button>
            </div>
            <FixedSizeList
              itemCount={numPages}
              itemSize={800}
              height={800}
              width="100%"
              ref={listRef}
              onItemsRendered={({ visibleStartIndex, visibleStopIndex }) => {
                setCurrentPage(visibleStartIndex + 1 )
              }
              }
            >
              {renderPage}
            </FixedSizeList>
          </>
        )}
      </Document>
    </div>
  );
}

export default Fetch;

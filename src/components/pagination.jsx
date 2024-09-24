import React from "react";
import Pagination from 'react-bootstrap-4-pagination';

const Paginator = (props) => {
  const { pageCount, pageNumber, url, url_1} = props;
  
 
  let paginationConfig = {
    totalPages: pageCount,
    currentPage: parseInt(pageNumber),
    showMax: 4,
    size: "md",
    threeDots: true,
    prevNext: true,
    href: url, // * will be replaced by the page number
    pageOneHref: url_1,
        
  };

  return (
         <Pagination {...paginationConfig} />
    );
};

export default Paginator;

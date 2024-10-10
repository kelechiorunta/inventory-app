// components/Pagination.js
import React from 'react';

const Pagination = ({ currentPage, totalProducts, productsPerPage, paginate }) => {
  const pageNumbers = [];

  // Calculate total pages
  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className='shadow-md rounded-md p-2'>
      <ul style={{ display: 'flex', listStyle: 'none', justifyContent: 'center', padding: 0 }}>
        <li
          style={{
            marginRight: '10px',
            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
          }}
        >
          <button
            onClick={() => currentPage > 1 && paginate(currentPage - 1)}
            disabled={currentPage === 1}
            style={{ padding: '5px 10px' }}
          >
            &laquo;
          </button>
        </li>
        {pageNumbers.map((number) => (
          <li key={number} style={{ marginRight: '5px' }}>
            <button
              onClick={() => paginate(number)}
              style={{
                padding: '5px 10px',
                backgroundColor: currentPage === number ? '#007BFF' : '#FFF',
                color: currentPage === number ? '#FFF' : '#000',
                border: '1px solid #ddd',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              {number}
            </button>
          </li>
        ))}
        <li
          style={{
            marginLeft: '10px',
            cursor: currentPage === pageNumbers.length ? 'not-allowed' : 'pointer',
          }}
        >
          <button
            onClick={() => currentPage < pageNumbers.length && paginate(currentPage + 1)}
            disabled={currentPage === pageNumbers.length}
            style={{ padding: '5px 10px' }}
          >
            &raquo;
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;

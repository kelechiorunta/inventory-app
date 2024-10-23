import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; // Include the CSS for skeleton animations

export default function TableLayout({ headers, rows, loading }) {
  return (
    <table className="border border-[#ccc] border-collapse w-full table-fixed overflow-hidden">
      {/* Table Head */}
      <thead className="hidden xlg:table-header-group">
        <tr className="border border-[#ddd]">
          {headers.map((header, index) => (
            <th
              key={index}
              scope={header.scope || 'col'}
              className="px-2 py-[0.625em] text-center uppercase text-[0.85em] tracking-wider"
            >
              {header.label}
            </th>
          ))}
        </tr>
      </thead>

      {/* Table Body */}
      <tbody className="w-full">

      {loading ? (
            // Show skeleton rows when loading
            Array(3)
              .fill('')
              .map((_, index) => (
                <tr key={index}>
                  <td>
                    <Skeleton width={150} />
                  </td>
                  <td>
                    <Skeleton width={100} />
                  </td>
                  <td>
                    <Skeleton width={100} />
                  </td>
                  <td>
                    <Skeleton width={50} />
                  </td>
                  <td>
                    <Skeleton width={50} />
                  </td>
                  <td>
                    <Skeleton width={50} height={50} />
                  </td>
                </tr>
              ))
          ) : 
        
        rows.map((row, rowIndex) => (
          <tr key={rowIndex} className="border border-[#ddd] block xlg:table-row mb-[0.625em] xlg:mb-0">
            {headers.map((header, colIndex) => (
              <td
                key={colIndex}
                data-label={header.label}
                // className="block xlg:table-cell px-2 py-[0.625em] text-right xlg:text-center border-b last:border-b-0 xlg:border-0 before:content-[attr(data-label)] before:font-bold before:uppercase before:float-left before:xlg:hidden"
              >
                {row[header.key]}
              </td>
            ))}
          </tr>
        ))
    }
      </tbody>
    </table>
  );
}
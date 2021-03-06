import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const PaginationStyles = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--grey);
  margin: 2rem 0;
  border-radius: 5px;
  text-align: center;

  & > * {
    padding: 1rem;
    flex: 1;
    border-right: 1px solid var(--grey);
    text-decoration: none;

    &[aria-current],
    &.current {
      color: var(--red);
    }
    &[disabled] {
      pointer-events: none;
      color: var(--grey);
    }
  }
`;

const Pagination = ({ pageSize, totalCount, currentPage, skip, base }) => {
  const totalPages = Math.ceil(totalCount / pageSize);
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  const hasPrevPage = prevPage >= 1;
  const hasNextPage = nextPage <= totalPages;

  return (
    <PaginationStyles>
      <Link disabled={!hasPrevPage} to={`${base}/${prevPage}`}>
        &#x2190; Prev
      </Link>
      {Array.from({ length: totalPages }, (_, i) => (
        <Link
          className={currentPage === 1 && i === 0 ? 'current' : ''}
          to={`${base}/${i > 0 ? i + 1 : ''}`}
        >
          {i + 1}
        </Link>
      ))}
      <Link disabled={!hasNextPage} to={`${base}/${nextPage}`}>
        Next &#x2192;
      </Link>
    </PaginationStyles>
  );
};

export default Pagination;

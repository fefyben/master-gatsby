import React from 'react';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';

import Pagination from '../components/Pagination';

const SlicemasterGridStyles = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`;

const SlicemasterItemStyles = styled.div`
  a {
    text-decoration: none;
  }

  h2 {
    transform: rotate(2deg);
    text-align: center;
    font-size: 4rem;
    margin-bottom: -2rem;
    position: relative;
    z-index: 2;
  }

  .gatsby-image-wrapper {
    height: 400px;
  }

  .description {
    background-color: var(--yellow);
    padding: 1rem;
    margin: -6rem 2rem 2rem;
    text-align: center;
    transform: rotate(1deg);
    position: relative;
    z-index: 2;
  }
`;

const SliceMastersPage = ({ data, pageContext }) => {
  const slicemasters = data.slicemasters.nodes;

  return (
    <>
      <Pagination
        pageSize={parseInt(process.env.GATSBY_PAGE_SIZE)}
        totalCount={data.slicemasters.totalCount}
        currentPage={pageContext.currentPage || 1}
        skip={pageContext.skip}
        base="/slicemasters"
      />
      <SlicemasterGridStyles>
        {slicemasters.map((person) => (
          <SlicemasterItemStyles key={person.id}>
            <Link to={`/slicemaster/${person.slug.current}`}>
              <h2>
                <span className="mark">{person.name}</span>
              </h2>
            </Link>
            <Img fluid={person.image.asset.fluid} />
            <p className="description">{person.description}</p>
          </SlicemasterItemStyles>
        ))}
      </SlicemasterGridStyles>
    </>
  );
};
export default SliceMastersPage;

export const query = graphql`
  query($skip: Int = 0, $pageSize: Int = 3) {
    slicemasters: allSanityPerson(limit: $pageSize, skip: $skip) {
      totalCount
      nodes {
        id
        name
        description
        slug {
          current
        }
        image {
          asset {
            fluid(maxWidth: 410) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;

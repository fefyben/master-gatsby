import React from 'react';
import { graphql } from 'gatsby';

import PizzaList from '../components/PizzaList';

const PizzasPage = ({ data }) => {
  const pizzas = data.pizzas.nodes;
  return (
    <>
      <p>Hey! There are {pizzas.length} pizzas!!</p>
      <PizzaList pizzas={pizzas} />
    </>
  );
};
export default PizzasPage;

export const query = graphql`
  query PizzaQuery {
    pizzas: allSanityPizza {
      nodes {
        name
        id
        slug {
          current
        }
        toppings {
          id
          name
        }
        image {
          asset {
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;

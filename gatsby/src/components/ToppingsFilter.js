import React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import styled from 'styled-components';

const ToppingsStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 4rem;

  a {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 0 1rem;
    align-items: center;
    background-color: var(--grey);
    border-radius: 2px;
    padding: 5px;

    .count {
      background-color: var(--white);
      padding: 2px 5px;
    }

    /* &.active { */
    &[aria-current='page'] {
      background-color: var(--yellow);
    }
  }
`;

function countPizzasInToppings(pizzas) {
  // Return the pizzas with counts
  const counts = pizzas
    .map((pizza) => pizza.toppings)
    .flat()
    .reduce((acc, topping) => {
      // Check is this is an existing topping
      const existingTopping = acc[topping.id];
      if (existingTopping) {
        // If it is, increment by 1
        existingTopping.count += 1;
      } else {
        // Otherwise create a new entry in out acc and set it to one
        acc[topping.id] = {
          id: topping.id,
          name: topping.name,
          count: 1,
        };
      }

      return acc;
    }, {});

  // Sort them based on their count
  const sortedToppings = Object.values(counts).sort(
    (a, b) => b.count - a.count
  );

  return sortedToppings;
}

const ToppingsFilter = ({ activeTopping }) => {
  // Get a list of all the toppings
  // Get a list of all the Pizzas with their toppings
  const { pizzas } = useStaticQuery(graphql`
    query {
      # toppings: allSanityTopping {
      #   nodes {
      #     name
      #     id
      #     vegetarian
      #   }
      # }
      pizzas: allSanityPizza {
        nodes {
          toppings {
            name
            id
          }
        }
      }
    }
  `);
  // Count how many pizzas are in each topping
  const toppingsWithCounts = countPizzasInToppings(pizzas.nodes);

  // Loop over the list of toppings and display the topping and the count of pizzas in that topping
  return (
    <ToppingsStyles>
      <Link to="/pizzas">
        <span className="name">All</span>
        <span className="count">{pizzas.nodes.length}</span>
      </Link>
      {toppingsWithCounts.map((topping) => (
        <Link
          to={`/topping/${topping.name}`}
          key={topping.id}
          className={topping.name === activeTopping ? 'active' : ''}
        >
          <span className="name">{topping.name}</span>
          <span className="count">{topping.count}</span>
        </Link>
      ))}
    </ToppingsStyles>
  );
};

export default ToppingsFilter;

import * as React from "react";
import { graphql } from "gatsby";
import "../styles/global.css";
import Layout from "../components/layout";
import Card from "../components/Card.js";

const plantsList = ({ data }) => {
  const plants = data?.allPlants?.nodes || [];

  // list all of the plants
  return (
    <div>
      <Layout pageTitle="Annuals">
        <ul>
          {plants.map((plant) => {
            return (
              <li key={plant.id}>
                <a href={"/plant/" + plant.id}>
                  <Card>
                    <p>
                      <img
                        src={plant.default_image.thumbnail}
                        alt={plant.common_name}
                        data-testid="image"
                      />
                    </p>
                    <h3>{plant.common_name}</h3>
                    <p>
                      <em>{plant.scientific_name}</em>
                    </p>
                  </Card>
                </a>
              </li>
            );
          })}
        </ul>
      </Layout>
    </div>
  );
};

export const query = graphql`
  query {
    allPlants {
      nodes {
        id
        common_name
        scientific_name
        cycle
        default_image {
          regular_url
          thumbnail
        }
      }
    }
  }
`;

export default plantsList;

export const Head = () => <title>All Plants</title>;

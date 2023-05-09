import * as React from "react";
import Layout from "../components/layout";

function Plant({ pageContext }) {
  const { plant } = pageContext;

  // display individual plant information
  return (
    <Layout pageTitle={plant.common_name}>
      <p>
        <img src={plant.default_image.regular_url} alt={plant.common_name} />
      </p>
      <h2>Details:</h2>
      <p>
        <strong>Scientific Name:</strong> <em>{plant.scientific_name}</em>
      </p>
      <p>
        <strong>Other name:</strong> {plant.other_name}
      </p>
      <p>
        <strong>Sunlight</strong>: {plant.sunlight}
      </p>
      <p>
        <strong>Watering</strong>: {plant.watering}
      </p>
    </Layout>
  );
}

export default Plant;

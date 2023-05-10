import * as React from "react";
import Layout from "../components/layout";
import { Link } from "gatsby";

function Plant({ pageContext }) {
  const { plant } = pageContext;

  // display individual plant information
  return (
    <div>
      <Layout pageTitle={plant.common_name}>
        <span className="badge" style={{ marginLeft: "40px" }}>
          {plant.cycle}
        </span>
        <div className="container">
          <div className="photo">
            <p>
              <img
                src={plant.default_image.regular_url}
                alt={plant.common_name}
              />
            </p>
          </div>
          <div className="details">
            <h3>Details</h3>
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
          </div>
        </div>
      </Layout>
      <div className="link">
        <Link to="/">All Annuals</Link>
      </div>
    </div>
  );
}

export default Plant;

import * as React from "react";
import { Link } from "gatsby";
import Layout from "../components/layout";
import Card from "../components/Card";

// help from https://www.youtube.com/watch?v=JRqM7iFCdTk
export default function PaginatedTemplate({ pageContext }) {
  const { pageCount, group, index, first, last } = pageContext;

  const prevPage = index - 1;
  const nextPage = index + 1;

  const prevPageUrl = prevPage === 1 ? "/plants" : `/plants/${prevPage}`;
  const nextPageUrl = `/plants/${nextPage}`;

  return (
    <Layout>
      <ul>
        {group.map((plant) => {
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
                  <span className="badge">{plant.cycle}</span>
                </Card>
              </a>
            </li>
          );
        })}
      </ul>
      <div className="pagination">
        <p>
          <span>{pageCount} pages: </span>
          <span>{!first && <Link to={prevPageUrl}>Previous page</Link>}</span>
          <span></span>
          <span>{!last && <Link to={nextPageUrl}>Next page</Link>}</span>
        </p>
      </div>
    </Layout>
  );
}

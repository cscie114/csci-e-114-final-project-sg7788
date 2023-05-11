import * as React from "react";
import { Link } from "gatsby";
import "../styles/global.css";
import Layout from "../components/layout";

export default function blogPost({ pageContext: { post } }) {
  return (
    <div>
      <Layout pageTitle="Blog">
        <div className="container" style={{ paddingTop: "20px" }}>
          <h3>{post.title}</h3>
          <p>{post.excerpt}</p>
          <Link to="/blog">All blog posts</Link>
        </div>
      </Layout>
    </div>
  );
}

import React from "react";
import Card from "../components/Card.js";
import Layout from "../components/layout";

export default function Blog({ pageContext }) {
  const { allPosts } = pageContext;

  return (
    <div>
      <Layout pageTitle="Blog">
        <ul>
          {allPosts.posts.map((post) => (
            <li key={post.id}>
              <a href={"/post/" + post.ID}>
                <Card>
                  <h3>{post.title}</h3>
                  <p>{post.content}</p>
                </Card>
              </a>
            </li>
          ))}
        </ul>
      </Layout>
    </div>
  );
}

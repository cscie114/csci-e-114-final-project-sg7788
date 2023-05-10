require("dotenv").config();
const EleventyFetch = require("@11ty/eleventy-fetch");
const path = require("path");
const createPaginatedPages = require("gatsby-paginate");

async function getPlants() {
  let apiKey = process.env.PLANT_API_KEY;
  let plantListUrl = "https://perenual.com/api/species-list";
  let requestParams = {
    cycle: "annual",
    current_page: 1,
    total: 198,
    // to: 30,
    // per_page: 30,
    key: apiKey,
  };

  let totalPlants;
  let nextPage;
  let allPlantsData = { data: [] };

  do {
    // Set up the full request URL
    let params = new URLSearchParams(requestParams);
    let queryString = params.toString();
    let requestUrl = plantListUrl + "?" + queryString;
    console.log(requestUrl);

    try {
      // fetch the data from the `/plants` endpoint, using the full request URL
      let plantsData = await EleventyFetch(requestUrl, {
        duration: "1d",
        type: "json",
        directory: ".11tycache",
        fetchOptions: {
          headers: {
            "user-agent":
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36",
          },
        },
      });

      // put data into array
      allPlantsData.data.push(...plantsData.data);
      allPlantsData.total = plantsData.total;

      totalPlants = plantsData.total;
      lastPage = plantsData.last_page;
      prevPage = requestParams.current_page - 1;
      nextPage = requestParams.current_page + 1;
      requestParams.current_page = nextPage;
      console.log("previous page: ", prevPage);
      console.log("next page: ", nextPage);
      console.log("last page: ", lastPage);
      console.log("total plants: ", totalPlants);
      console.log("array: ", allPlantsData);
    } catch (err) {
      console.error("Something went wrong with request\n" + requestUrl);
      console.log(err);
    }
  } while (nextPage <= lastPage);
  return allPlantsData;
}

// create node for each plant
exports.sourceNodes = async ({
  actions,
  createContentDigest,
  createNodeId,
}) => {
  const { createNode } = actions;

  const plantsData = await getPlants();

  // loop through data and create Gatsby nodes
  plantsData.data.forEach((plant) =>
    createNode({
      ...plant,
      id: createNodeId(plant.id),
      parent: null,
      children: [],
      internal: {
        type: "Plants",
        contentDigest: createContentDigest(plant),
      },
    })
  );
  return;
};

//create a page for each plant
//from Gatsby documentation: https://www.gatsbyjs.com/docs/creating-and-modifying-pages/
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const { createRedirect } = actions;

  createRedirect({
    fromPath: `/`,
    toPath: `/plants`,
    redirectInBrowser: true,
    isPermanent: true,
  });

  const queryResults = await graphql(`
    query {
      allPlants {
        pageInfo {
          currentPage
          pageCount
          itemCount
          perPage
          totalCount
          hasNextPage
          hasPreviousPage
        }
        nodes {
          id
          common_name
          other_name
          scientific_name
          sunlight
          watering
          cycle
          default_image {
            regular_url
            thumbnail
          }
        }
      }
    }
  `);

  // use the plant.js as the template for each created page
  const plantTemplate = path.resolve(`src/templates/plant.js`);
  queryResults.data.allPlants.nodes.forEach((node) => {
    createPage({
      path: `/plant/${node.id}`,
      component: plantTemplate,
      context: {
        // pass plant as context
        plant: node,
      },
    });
  });

  const plantPages = queryResults.data.allPlants.nodes;

  createPaginatedPages({
    edges: plantPages,
    createPage,
    pageTemplate: "src/templates/pagination.js",
    pageLength: 10,
    pathPrefix: "plants",
  });
};

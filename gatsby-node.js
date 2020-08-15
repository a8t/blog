const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.tsx`)
  const chordsPost = path.resolve(`./src/templates/chords-post.tsx`)

  const result = await graphql(
    `
      {
        allMdx(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
                mdxNodeType
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  const posts = result.data.allMdx.edges

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    const component = { blog: blogPost, chords: chordsPost }[
      post.node.fields.mdxNodeType
    ]

    createPage({
      path: post.node.fields.slug,
      component,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === "Mdx") {
    const { sourceInstanceName } = getNode(node.parent)

    createNodeField({
      name: `mdxNodeType`,
      node,
      value: sourceInstanceName,
    })

    createNodeField({
      name: `slug`,
      node,
      value: "/" + sourceInstanceName + createFilePath({ node, getNode }),
    })
  }
}

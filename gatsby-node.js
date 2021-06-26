const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const _ = require("lodash")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.tsx`)
  const chordsPost = path.resolve(`./src/templates/chords-post.tsx`)
  const categoryTemplate = path.resolve(`./src/templates/categories.tsx`)

  const result = await graphql(
    `
      {
        blogPosts: allMdx(
          sort: { fields: [frontmatter___date], order: DESC }
          filter: { fields: { mdxNodeType: { eq: "blog" } } }
          limit: 1000
        ) {
          nodes {
            fields {
              slug
              mdxNodeType
            }
            frontmatter {
              title
            }
          }
        }

        chordPosts: allMdx(
          sort: { fields: [frontmatter___date], order: DESC }
          filter: { fields: { mdxNodeType: { eq: "chords" } } }
          limit: 1000
        ) {
          nodes {
            fields {
              slug
              mdxNodeType
            }
            frontmatter {
              title
            }
          }
        }

        categoriesGroup: allMdx(limit: 2000) {
          group(field: frontmatter___categories) {
            fieldValue
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  const makePagesFromNodes = (nodes, component) => {
    nodes.forEach((post, index, posts) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1]
      const next = index === 0 ? null : posts[index - 1]

      createPage({
        path: post.fields.slug,
        component,
        context: {
          slug: post.fields.slug,
          previous,
          next,
        },
      })
    })
  }
  makePagesFromNodes(result.data.blogPosts.nodes, blogPost)
  makePagesFromNodes(result.data.chordPosts.nodes, chordsPost)

  const categories = result.data.categoriesGroup.group
  categories.forEach(category => {
    createPage({
      path: `/categories/${_.kebabCase(category.fieldValue)}/`,
      component: categoryTemplate,
      context: {
        category: category.fieldValue,
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

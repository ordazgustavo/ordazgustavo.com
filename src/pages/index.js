import React from 'react'
import ReactDOM from 'react-dom'
import {graphql} from 'gatsby'
import {css} from '@emotion/core'
import styled from '@emotion/styled'
import SEO from '../components/seo'
import Layout from '../components/layout'
import Link from '../components/link'
import Container from 'components/container'
import {rhythm, fonts} from '../lib/typography'
import parseQueryString from '../lib/parse-query-string'
import theme from '../../config/theme'
import {bpMaxMD, bpMaxSM} from '../lib/breakpoints'
import Hero from 'components/big-hero'

const PostTitle = styled.h3`
  margin-bottom: ${rhythm(0.3)};
  transition: ${theme.transition.ease};
  font-size: 22px;
  font-family: ${fonts.regular};
  :hover {
    color: ${theme.brand.primary};
    transition: ${theme.transition.ease};
  }
`

const Description = styled.p`
  margin-bottom: 10px;
  display: inline-block;
`

function SubscribeConfirmation() {
  const portalContainerRef = React.useRef(null)
  const [showMessage, setShowMessage] = React.useState(false)
  const [animateIn, setAnimateIn] = React.useState(false)
  React.useEffect(() => {
    portalContainerRef.current = document.createElement('div')
    Object.assign(portalContainerRef.current.style, {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 11,
    })
    document.body.append(portalContainerRef.current)
  }, [])

  React.useEffect(() => {
    if (parseQueryString(window.location.search).hasOwnProperty('subscribed')) {
      setTimeout(() => {
        setShowMessage(true)
        setTimeout(() => {
          setShowMessage(false)
        }, 4500)
      }, 200)
    }
  }, [])
  React.useEffect(() => {
    if (showMessage) {
      setAnimateIn(true)
      setTimeout(() => setAnimateIn(false), 4000)
    }
  }, [showMessage])

  if (showMessage) {
    return ReactDOM.createPortal(
      <button
        onClick={() => setAnimateIn(false)}
        css={css`
          border-radius: 0;
          width: 100%;
          padding: 20px;
          display: flex;
          justify-content: center;
          background-color: ${theme.colors.green};
          color: ${theme.colors.primary_light};
          transition: 0.3s;
          transform: translateY(${animateIn ? '0' : '-85'}px);
        `}
      >
        Thanks for subscribing!
      </button>,
      portalContainerRef.current,
    )
  } else {
    return null
  }
}

export default function Index({data: {allMdx}}) {
  return (
    <Layout headerColor={theme.colors.white} logo={false} hero={<Hero />}>
      <SEO />
      <SubscribeConfirmation />
      <Container
        css={css`
          margin-top: -20px;
          position: relative;
          padding-bottom: 0;
          background: white;
          border-radius: 5px;
          padding: 40px 80px 60px 80px;
          margin-bottom: ${rhythm(1)};
          ${bpMaxMD} {
            padding: auto;
          }
          ${bpMaxSM} {
            border-radius: 0;
          }
          h2 {
            margin-bottom: ${rhythm(1.5)};
          }
        `}
      >
        <h2>Blog</h2>
        {allMdx.edges.map(({node: post}) => (
          <div
            key={post.id}
            css={css`
              margin-bottom: 40px;
            `}
          >
            <Link
              to={post.fields.slug}
              aria-label={`View ${post.frontmatter.title}`}
            >
              <PostTitle>{post.frontmatter.title}</PostTitle>
            </Link>
            <Description>
              {post.excerpt}{' '}
              <Link
                to={post.fields.slug}
                aria-label={`View ${post.frontmatter.title}`}
              >
                Read →
              </Link>
            </Description>
            <span />
          </div>
        ))}
        <Link to="/blog" aria-label="Visit blog page">
          View all articles
        </Link>
      </Container>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    allMdx(
      limit: 5
      sort: {fields: [frontmatter___date], order: DESC}
      filter: {
        frontmatter: {published: {ne: false}, unlisted: {ne: true}}
        fileAbsolutePath: {regex: "//content/blog//"}
      }
    ) {
      edges {
        node {
          excerpt(pruneLength: 190)
          id
          fields {
            title
            slug
            date
          }
          parent {
            ... on File {
              sourceInstanceName
            }
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            description
            banner {
              childImageSharp {
                sizes(maxWidth: 720) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
            keywords
          }
        }
      }
    }
  }
`
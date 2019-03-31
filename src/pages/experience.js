import React from 'react'
import {css} from '@emotion/core'
import Layout from '../components/layout'
import Container from 'components/container'
import SEO from '../components/seo'
import theme from '../../config/theme'
import experience from '../data/experience'
import {bpMaxSM} from '../lib/breakpoints'

export default function Experience() {
  return (
    <Layout headerColor={theme.colors.white}>
      <SEO />
      <Container
        noVerticalPadding
        css={css`
          margin-top: 30px;
        `}
      >
        {experience.map(({id, company, date, position, location, description}) => (
          <div
            key={id}
            css={css`
              background: white;
              border-radius: 5px;
              padding: 40px;
              ${bpMaxSM} {
                padding: 20px;
              }
              margin-bottom: 20px;
              h2 {
                margin-bottom: 0;
              }
              hr {
                margin: 25px 0;
              }
              p {
                margin-bottom: 0;
              }
            `}
          >
            <div
              css={css`
                display: flex;
                align-items: center;
                justify-content: space-between;
              `}
            >
              <h2>{company}</h2>
              <small>{date.from} - {date.to || 'Actualidad'}</small>
            </div>
            <small>
              {position}, {location}
            </small>
            <hr />
            <p>{description}</p>
          </div>
        ))}
      </Container>
    </Layout>
  )
}

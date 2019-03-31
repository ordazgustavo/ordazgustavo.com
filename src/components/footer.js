import React from 'react'
import {css} from '@emotion/core'

import theme from '../../config/theme'
import {bpMaxSM} from '../lib/breakpoints'
import Container from './container'
import {Twitter, GitHub, LinkedIn} from './social'
import Link from './link'

const Footer = () => (
  <footer
    css={css`
      background: ${theme.colors.purple_dark};
      color: white;
      margin-top: 70px;
    `}
  >
    <Container
      css={css`
        padding-top: 0;
        padding-bottom: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        ${bpMaxSM} {
          padding-top: 0;
          flex-direction: column;
        }
      `}
    >
      <div>
        <ul
          css={css`
            display: flex;
            align-items: center;
            flex-flow: row;
            margin: 0;
            li {
              list-style: none;
              margin: 0 10px;
              a {
                color: rgba(255, 255, 255, 0.7);
                :hover {
                  color: rgba(255, 255, 255, 1);
                }
              }
            }
            ${bpMaxSM} {
              padding-top: 0;
              flex-direction: column;
            }
          `}
        >
          <li>
            <Link to="/uses/">Usa</Link>
          </li>
          <li>
            <Link to="/experience/">Experiencia</Link>
          </li>
          <li>
            <Link to="/projects/">Proyectos</Link>
          </li>
        </ul>
      </div>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          div,
          img {
            margin: 50px 0;
            ${bpMaxSM} {
              margin: 20px 0;
            }
          }
          ${bpMaxSM} {
            align-items: center;
          }
        `}
      >
        <div>
          <Twitter />
          <GitHub />
          <LinkedIn />
        </div>
      </div>
    </Container>
  </footer>
)

export default Footer

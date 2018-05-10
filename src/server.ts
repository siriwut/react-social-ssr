import { render } from '@jaredpalmer/after'
import express from 'express'
import routes from './routes'
import configureStore from 'store/configureStore'
import { localeActions } from 'store/actions'
import Document from './Document'
const assets = require(process.env.RAZZLE_ASSETS_MANIFEST!)

const server = express()
 const sotre = configureStore().store

server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR!))
  .get('/*', async (req, res) => {
    try {
      const html = await render({
        req,
        res,
        routes,
        assets,
        document: Document,
        store: sotre,
      })
      res.send(html)
    } catch (error) {
      console.error(error)
      res.json(error)
    }
  })

export default server

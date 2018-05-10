import React from 'react'
import { AfterRoot, AfterData } from '@jaredpalmer/after'
import { JssProvider, SheetsRegistry } from 'react-jss'
import { createGenerateClassName } from 'material-ui/styles'
import MuiLayout from 'layouts/muiLayout'

class Document extends React.Component<any,any> {
  static async getInitialProps({ req, assets, data, renderPage }: any) {
    const sheets = new SheetsRegistry()
    const generateClassName = createGenerateClassName()

    const page = await renderPage((After: any) => (props: any) => (
      <JssProvider registry={sheets} generateClassName={generateClassName}>
        <MuiLayout>
          <After {...props} />
        </MuiLayout>
      </JssProvider>
    ))
    return { assets, data, sheets, ...page }
  }

  render() {
    const { helmet, assets, data, sheets } = this.props
    // get attributes from React Helmet
    const htmlAttrs = helmet.htmlAttributes.toComponent()
    const bodyAttrs = helmet.bodyAttributes.toComponent()

    return (
      <html {...htmlAttrs}>
        <head>
          <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
          <meta charSet='utf-8' />
          <title>Welcome to the Afterparty</title>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          {helmet.title.toComponent()}
          {helmet.meta.toComponent()}
          {helmet.link.toComponent()}
          {assets.client.css && (
            <link rel='stylesheet' href={assets.client.css} />
          )}
          <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,400,500' />
          <style type='text/css'>{sheets.toString()}</style>
        </head>
        <body {...bodyAttrs}>
          <AfterRoot />
          <AfterData data={data} />
          <script
            type='text/javascript'
            src={assets.client.js}
            defer
            crossOrigin='anonymous'
          />
        </body>
      </html>
    )
  }
}

export default Document
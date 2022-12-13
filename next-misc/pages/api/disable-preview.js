const handler = (req, res) => {
  res.clearPreviewData()
  res.end('Preview mode disabled')
}

export default handler

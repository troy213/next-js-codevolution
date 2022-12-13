const handler = (req, res) => {
  res.setPreviewData({ user: 'Troy' })
  res.redirect(req.query.redirect)
  // res.end('Preview mode enabled')
}

export default handler

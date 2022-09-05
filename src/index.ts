import app from './router'


app.listen(process.env.PORT || 3000, () => {
  console.info('APP Started.')
})

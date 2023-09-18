import GoogleSignInPlugin from 'vue3-google-signin'

export default ({ app, router, store }) => {
  app.use(GoogleSignInPlugin, {
    clientId: '488602956046-ca26ms80mgai210aitkno34s5p93ok3f.apps.googleusercontent.com'
  })
}

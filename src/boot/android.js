import vue3GoogleLogin from 'vue3-google-login'

export default ({ app, router, store }) => {
  app.use(vue3GoogleLogin, {
    clientId: '488602956046-qvrn32eq3f7m3i10b1ebh5krkvqt0oi7.apps.googleusercontent.com'
  })
}

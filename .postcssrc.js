// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    "postcss-import": {
      resolve: function (id,basedir,importOptions) {
        let match = id.match(/^~@\/assets/);
        console.log('位置：'+id);
        if (match){
          return path.join(__dirname, './src/assets', id.substr(9));
        }
        return id;
      }
    },
    "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {}
  }
}

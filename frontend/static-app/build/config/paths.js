export const paths = {
  src: {
    meta: {
      metaFiles: "./source/meta/*"
    },
    assets: {
      assetFiles: ["../../assets/dist/**/*"],
      svgFiles: ["dist/assets/svgs"]
    },
    html: {
      htmlDir: "./source",
      htmlFiles:"./source/html/**/*.html"
    },
    styles: {
      scssDir: `../living-style-guide/source/`,
      scssFiles: [`../living-style-guide/source/**/*.scss`],
      scssPages: [`../living-style-guide/source/**/*.page.scss`],
      scssLayers: [`../living-style-guide/source/**/*.layer.scss`],
    },
    scripts: {
      javaScriptDir: `../js-component-library/source/`,
      javaScriptFiles: [`../js-component-library/source/**/*.js`],
      javaScriptPages: [`../js-component-library/source/**/*.page.js`],
      javaScriptLayers: [`../js-component-library/source/**/*.layer.js`],
      javaScriptLibrary: [`../js-component-library/source/**/*.cmp.js`, `../js-component-library/source/**/*.pat.js`, `../js-component-library/source/**/*.mod.js`, `../js-component-library/source/**/*.widget.js`]
    }
  },
  dist: {
    dir: `./dist`,
  },
};

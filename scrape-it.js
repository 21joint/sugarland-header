const pkg = require("./package");
const scrape = require("website-scraper");
const options = {
  urls: [pkg.website],
  directory: "./scraped"
};

// with promise
scrape(options)
  .then(result => {
    /* some code here */
  })
  .catch(err => {
    /* some code here */
  });

// or with callback
scrape(options, (error, result) => {
  /* some code here */
});

// Fetch module
import fetch from "node-fetch";

// url parser
import urlParser from "node:url";

// Needed to parse the downloaded HTML document
import cheerio from "cheerio";

// Export to file system
import fs from "fs";

// Variables
let processedLinks = [];

// Combining endpoint with host and protocoll if needed
const urlGenerator = (protocol, hostname, link) => {
  if (link.includes("http")) {
    return link;
  } else if (link.startsWith("/")) {
    return `${protocol}//${hostname}${link}`;
  } else {
    return `${protocol}//${hostname}/${link}`;
  }
};

export const crawler = ({ mainUrl, url, callback }) => {
  // Check if already visited
  if (processedLinks.includes(url)) {
    return;
  }

  // Parsing URL
  const parsedURL = urlParser.parse(mainUrl);
  const parsedVariableURL = urlParser.parse(url);

  if (!parsedVariableURL.hostname.includes(parsedURL.hostname)) {
    return;
  }

  // Write file to text document
  fs.appendFile("links.txt", url + "\n", (err) => {
    if (err) throw err;
  });

  // Note a fresh link as visited
  processedLinks.push(url);

  // Optinal callback Function
  callback =
    callback ||
    function () {
      return;
    };

  // Parsing URL

  // Start fetching document
  fetch(url)
    .then((result) => {
      // Extract informations
      return result.text();
    })
    .then((html) => {
      // Custom interaction
      callback(html);

      // Filter informations
      const $ = cheerio.load(html);
      const links = $("a")
        .map((index, element) => {
          return element.attribs.href;
        })
        .get();

      // Run crawler with new links
      links.forEach((link) => {
        const generatorResult = urlGenerator(
          parsedVariableURL.protocol,
          parsedVariableURL.host,
          link
        );
        crawler({ mainUrl: mainUrl, url: generatorResult, callback: callback });
      });
    })
    .catch((error) => {
      console.log(`An error occured: ${error}`);
    });
};

// Run crawler
// crawler({ url: https://github.com/,url: "https://github.com/", callback: null });

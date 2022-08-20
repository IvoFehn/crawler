# Crawler

The crawler will parse all links that are on the current page, note them, visits and parses them at a later point as long as they got the same base URL.

If there is a facebook link on github the crawler will ignore it.

While the whole process the crawler will write all valid URLs into a file which is created in the same directory.

## How to use the crawler?

Run the `crawler()` function with 3 arguments:

1. Required: Base URL (e.g. `http://localhost:1000/`)
2. Required: URL (e.g. `http://localhost:1000/`) - giving it twice is needed for the pattern
3. Optional: Callback Function - The crawler will give the callback function the source code of the html document

## Example

```js
const myCallback = (html) => {
  console.log(html);
};

crawler({
  mainUrl: "https://github.com/",
  url: "https://github.com/",
  callback: myCallback,
});
```

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

const fs = require('fs');
app.use(bodyParser.json());

const writeBlog = (blog) => {
  fs.writeFileSync('./data/blog.json', JSON.stringify(blog));
};

const readBlog = () => {
  let blog = JSON.parse(fs.readFileSync('./data/blog.json'));
  return blog;
};

const appendBlog = (article) => {
  let blog = readBlog();
  let timeStamp = new Date();

  let currentArticles = blog.articles;

  currentArticles.push({
    text: article,
    publishTime: timeStamp
  });

  blog.articles = currentArticles;
  writeBlog(blog);
}

writeBlog({
  articles: ['article1!']
});

app.get('/', (req, res) => res.send(readBlog()));

app.post('/', (req, res) => {
  appendBlog(req.body.article);
  res.send('complete!');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

console.log(readBlog());

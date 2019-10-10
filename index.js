const express = require('express');
const app = express();


app.get('/', (req, res) => {
  res.send(`
  <ul>
    <li><a href="/default">default</a></li>
    <li><a href="/no-cache">no-cache</a></li>
    <li><a href="/one-hour">one-hour</a></li>
  </ul>
`);
});


const render = (res) => {
  res.send(`
<html>
<head>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/timeago.js/3.0.2/timeago.min.js" type="text/javascript"></script>
</head>
<body>
  <h1 id="h1">Loading...</h1>
  <script>
    (function () {
      const t = ${Date.now()};
      function update() {
        document.getElementById('h1').innerText = timeago().format(t);
      }
      update();
      setInterval(update, 1000);
    })();
  </script>
</body>
</html>
`);
};


app.get('/default', (req, res) => {
  render(res);
});


app.get('/no-cache', (req, res) => {
  res.set('cache-control', 'max-age=0, private, must-revalidate');
  render(res);
});


app.get('/one-hour', (req, res) => {
  res.set('cache-control', 'max-age=3600, private, must-revalidate');
  render(res);
});


app.listen(3000);

let { app, port } = require("./index");

app.listen(port, () => {
  console.log(`Example app listining on http://localhost:${port}`);
});

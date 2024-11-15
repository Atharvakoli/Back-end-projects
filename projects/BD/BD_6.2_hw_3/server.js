const { app } = require("./index.js");

app.listen(port, () => {
  console.log(`Example app listining on http://localhost:${port}`);
});

module.exports = { app };

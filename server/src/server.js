const dotenv = require("dotenv");
dotenv.config();

require("./config/db");

const app = require("./app");

const PORT = process.env.PORT || 8000;


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
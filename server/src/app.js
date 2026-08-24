const express = require("express");
const cors = require("cors");
const app = express();
const { passport } = require("./config/passport");
app.use(passport.initialize());

app.use(express.json());
app.use(cors());

const problemRoutes = require("./routes/problemRoutes");
app.use("/problems", problemRoutes);

const submissionRoutes = require("./routes/submissionRoutes");
app.use("/submissions", submissionRoutes);

const authRoutes = require("./routes/authRoutes");
app.use("/auth" , authRoutes);

const aiRoutes = require("./routes/aiRoutes");
app.use("/ai" , aiRoutes);

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "AlgoFlow Backend Running ",
  });
});
module.exports = app;

const { requireAuth } = require("./config/passport"); // adjust path as needed

app.get("/test-protected", requireAuth, (req, res) => {
  res.json({ message: "You are authenticated!", user: req.user });
});
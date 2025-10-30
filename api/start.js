import app from "./server.js";

const PORT = process.env.PORT || 5174;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

import app from "./index";
const API_PORT = process.env.API_PORT || 3000;

app.listen(API_PORT, () => {
  console.log(`Listening at http://localhost:${API_PORT}`);
});

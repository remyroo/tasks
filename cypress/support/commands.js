import axios from "axios";

Cypress.Commands.add("resetDatabase", async () => {
  return await axios.post("http://localhost:3000/test/reset_database");
});

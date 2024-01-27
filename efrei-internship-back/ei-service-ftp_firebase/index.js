const express = require('express');
const cors = require('cors')

const app = express();
// const port = process.env.PORT || 3000;
const port = 3030;

app.use(cors({ origin: ["http://localhost:3000"] }))

app.use(express.json());
//app.use('/file', fileRoutes);
app.use(express.urlencoded({ extended: true }));

const routes = require('./routes/fileRoutes');
routes(app);

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
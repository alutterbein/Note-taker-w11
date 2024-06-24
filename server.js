const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const html_routes = require('./routes/htmlRoutes');
const api_routes = require('./routes/apiRoutes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(html_routes);
app.use(api_routes);




    app.listen(PORT, () => 
        console.log(`App listening at http://localhost:${PORT}`));

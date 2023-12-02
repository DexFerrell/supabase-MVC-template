require('dotenv').config();
const express = require('express');
const cors = require('cors');
const supabase  = require('./config/supabaseConfig.js')
const itemRoutes = require('./routes/itemRoutes.js')

const app = express();

const port = process.env.PORT || 6543;

//Tes connection to SupaBase
supabase.from('Items').select('id').range(0, 0)
    .then(response => {
        if (response.data) {
            console.log('Connected to Supabase successfully!');
        } else if (response.error) {
            console.error('Error connecting to Supabase:', response.error.message);
        }
    });

// Enable CORS
app.use(cors());

// Serve static files
app.use(express.static('public'));

// Parse requests for strings/arrays, use extended: true for nested requests
app.use(express.urlencoded({ extended: false }));

//Parse JSON requests
app.use(express.json());

// Set EJS as templating engine
app.set('view engine', 'ejs');

// Route  (create our own middleware) 
app.use('/', itemRoutes);


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


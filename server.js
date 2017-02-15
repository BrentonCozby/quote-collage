const express = require('express')
const bodyParser = require('body-parser')
const app = express()

// Middleware
app.use(bodyParser.json())

// Static files
app.use(express.static('./build'))

// Serve index.html
app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
})

// Start the server
const PORT = 3002
app.listen(PORT, function() {
    console.log(`Listening on ${PORT}...`)
})

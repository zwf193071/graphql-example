const express = require('express');
const { graphqlHTTP } = require('express-graphql')
const mongoose = require('mongoose');
const cors = require('cors')

const schema  = require('./schema/schema.js')

const app = express();

// allow cross-origin requests
app.use(cors())

mongoose.connect('mongodb://localhost/admin')
mongoose.connection.once('open', () => {
    console.log('connected to database')
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))


app.listen(4000, () => {

    console.log('Listening for requests on port 4000')

})

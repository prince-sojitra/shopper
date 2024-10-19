const mongoose = require('mongoose');


mongoose.connect(process.env.dbLink)
    .then(() => console.log('Connected!'))
    .catch(err => console.log(err.message))

    
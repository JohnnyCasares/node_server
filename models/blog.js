const mongoose = require('mongoose');

const Schema = mongoose.Schema; //constructor to create a schema

const blogSchema = new Schema( //schema that defines properties of blog
    {
        title: {
            type: String,
            required: true
        },
        snippet: {
            type: String,
            required: true
        },
        body: {
            type: String,
            required: true
        },

    },
    { timestamps: true });

const Blog = mongoose.model('Blog', blogSchema); //interface to communicate with db using schema

module.exports = Blog; //use this model in the code to create instance of Blog

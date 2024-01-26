const Blog = require('../models/blog');

const blog_index = (req, res) => {

    // res.send('<p>home page </p>'); 
    // res.sendFile('./views/index.html', { root: __dirname });
    Blog.find().sort({ createdAt: -1 }) //descending order (newest at the top)
        .then((result) => {

            res.render(
                'index',
                {
                    title: 'Home',
                    blogs: result
                }
            );


        })
        .catch(
            (err) => console.log(err)
        );

    //ejs is server side rendering

}

const blog_detials = (req, res) => {
    const id = req.params.id;
    const blog = Blog.findById(id).
        then(result => {
            res.render(
                'details', 
            {blog:result, title:'Blog Details'}
            );
        }).catch(err=>console.log(err));


}
const blog_create_get = (req, res) => {
    res.render('create',
        {
            title: 'Create Blog'
        });

}

const blog_delete = (req, res)=>{
    const id = req.params.id;
    const blog = Blog.findByIdAndDelete(id)
    .then(
        result=>{
            res.json({redirect: '/'});
        })
        .catch(err=>console.log(err));        
}

const blog_create_post =  (req, res) => {
    const blog = new Blog(req.body);

    blog.save().then(
        (result) => {
            res.redirect("/");

        }
    ).catch((err) => { console.log(err) });

}

module.exports = {

    blog_index,
    blog_detials,
    blog_create: blog_create_get,
    blog_delete,
    blog_create_post
};
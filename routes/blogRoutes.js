const express = require('express');

const router = express.Router();
const blogController = require('../controllers/blogController');
//routes
router.get(

    '/',
    blogController.blog_index
);

router.post(
    '/',
    blogController.blog_create_post);





//blog routes
router.get(
    '/blogs/create',
    blogController.blog_create
);

router.get(
    '/blogs/:id', blogController.blog_detials
);
//delete handler
router.delete(
    '/blogs/:id',
    blogController.blog_delete
)



module.exports = router;
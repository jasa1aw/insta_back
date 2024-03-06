const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        if(file.mimetype,startWith('image/')){
            cb(null, './public/images/postsImages');
        }else if(file.mimetype.startWith('video/')){
            cb(null, './public/images/stories');
        }else{
            cb(new Error('Invalid file type'))
        }
    },
    filename: function(req, file, cb){
        let ext = file.originalname.split('.');
        ext = ext[ext.length - 1];
        const unique = Date.now() + '.' + ext;
        cb(null, unique)
    }
});

const upload = multer({storage});
module.exports = {upload};
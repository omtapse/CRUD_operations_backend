const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const Product = require('../models/product_modal');

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const extension = path.extname(file.originalname);
      cb(null, file.fieldname + '-' + uniqueSuffix + extension);
    },
  });
const upload = multer({ storage });


router.get('/',(req,res)=>{
    Product.find().then((products)=>{
        res.json(products);
    }).catch((err)=>{
        console.log(err);
    })
})

router.get('/getProductDetails/:id',(req,res)=>{
    Product.findById(req.params.id).then((product)=>{
        res.json(product);
    }).catch((err)=>{
        console.log(err);
    })

})

router.post('/',(req,res)=>{
    let newProduct = new Product(req.body.data);
    newProduct.save().then((product)=>{
        res.status(200).json({'product': 'Added successfully'});
    }).catch((err)=>{
        console.log(err)
        res.status(400).send('Failed to create new record');
    })
})

router.post("/uploadImage", upload.array('images'),(req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).send('No files uploaded.');
    }
    const fileArray = req.files; 
    const imagePaths = [];
    fileArray.forEach((file) => {
        imagePaths.push("http://localhost:3003/"+file.path.split('\\').join('/'));
      });
    res.status(200).send({
        messgae: 'Files uploaded successfully',
        data: imagePaths
    });
});

router.put('/:id',(req,res)=>{
    Product.findByIdAndUpdate(req.params.id, req.body.data).then((product)=>{
        res.status(200).json({'product': 'Updated successfully'});
    }).catch((err)=>{
        console.log(err)
        res.status(400).send('Failed to update record');
    })
})

router.delete('/:id',(req,res)=>{
    Product.findByIdAndRemove(req.params.id).then((product)=>{
        res.status(200).json({'product': 'Deleted successfully'});
    }).catch((err)=>{
        console.log(err)
        res.status(400).send('Failed to delete record');
    })
})

module.exports = router;
const express = require('express');
const router = express.Router();
const { Hacker } = require('../models/Hacker');

<<<<<<< HEAD
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function(req, file, cb) {
    cb(null, Number(new Date()) + '_' + file.originalname);
  }
});
=======
const _ =require('lodash')
>>>>>>> 9ec5c4e74bf4c56c36e9855d071c6e45c34a4996

const fileFilter = (req, file, cb) => {
  if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter
});

function dynamicSort(property) {
  var sortOrder = 1;
  if (property[0] === '-') {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function(a, b) {
    /* next line works with strings and numbers,
     * and you may want to customize it to your needs
     */
    var result =
      a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result * sortOrder;
  };
}

router.get('/top3', async (req, res) => {
  try {
    let solAvg = 0;
    let compAvg = 0;
    let total = 0;
    let resArray = [];
    let result = await Hacker.find();

    result.forEach(data => {
      solAvg = (data.solnaccepted / data.challengessolved) * 100;
      let sum = 0;
      Object.values(data.ComP).forEach(item => {
        sum = sum + item;
      });
      compAvg = ( sum / (result.length*100) ) * 100;
      total = solAvg + compAvg;
      console.log(solAvg, compAvg, total);
      resArray.push({
        name: data.name,
        value: total
      });
    });
  
    let top3 = resArray.sort(dynamicSort('value'));
    
    console.log(resArray)
    return res.send(top3.slice(1).slice(-3));
  } catch (e) {
    return res.send(e);
  }
});

<<<<<<< HEAD
router.post('/add', upload.single('photo'), (req, res) => {
  const body = req.body;
  if (req.file) {
    body.photo = req.file.path;
  } else {
    const error = new Error('Please upload a file');
    error.httpStatusCode = 400;
    return next(error);
  }
  const hacker = new Hacker(body);
  console.log(body);
  hacker
    .save()
    .then(hack => res.send(hack))
    .catch(err => res.send(err));
});
router.get('/allHackers', async function(req, res) {
  try {
    let hacker = await Hacker.find();
    let result = hacker.sort(dynamicSort('name'));
    return res.send(result);
  } catch (e) {
    return res.send(e);
  }
});
router.get('/:id', (req, res) => {
  const { id } = req.params;
  console.log('id', id);
  Hacker.findOne({ _id: id })
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.send({});
      }
=======
router.post('/add',upload.single('photo'),(req,res,next)=>{
    const body=req.body
    if(req.file){
        body.photo=req.file.path
    }
    else{
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }
    
    const hacker =new Hacker(body)
    console.log(body)
    hacker.save()
    .then(hack=>res.send(hack))
    .catch(err=>res.send(err))
})
router.get('/allHackers', async function(req,res){
    function dynamicSort(property) {
        var sortOrder = 1;
        if(property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a,b) {
            /* next line works with strings and numbers, 
             * and you may want to customize it to your needs
             */
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }
    try{
        let hacker =await Hacker.find()
        let result=hacker.sort(dynamicSort("name"))
        return res.send(result)
    }catch(e){
        return res.send(e)
    }

})
router.get('/:id',(req,res)=>{
    const {id}=req.params
    console.log('id',id)
    Hacker.findOne({_id:id})
    .then(data=>{
        if(data){
            res.send(data)
        }
        else{
            res.send({})
        }
    })
    .catch(err=>{
        res.send(err)
>>>>>>> 9ec5c4e74bf4c56c36e9855d071c6e45c34a4996
    })
    .catch(err => {
      res.send(err);
    });
});


module.exports = {
  hackerRouter: router
};

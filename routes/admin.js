var express = require('express');
var router = express.Router();
const { Fruit } = require('../models/fruits')
const { Admin } = require('../models/admin')

const isAdmin =(req,res,next)=>{
  if(req.session.adminname){
    next()
  }else{
    res.redirect('/admin/login')
  }
}
/* GET home page. */
router.get('/', isAdmin,function(req, res, next) {
  Fruit.find({}).then((fruits)=>{
    res.render('admin/list',{title: 'Fruit', fruits: fruits});
  })
});

router.get('/add',isAdmin,(req,res)=>{
  res.render('admin/add')
})
router.post('/add',(req,res)=>{
  let fruit = new Fruit({
    name:req.body.name,
    description:req.body.description,
    price:req.body.price
  })
  console.log(req.body)
  fruit.save().then(function(doc){
    console.log (doc._id)
  }).then(()=>{
    res.redirect('/admin')
  }).catch(function (error) {
    console.log(error);
});
})

router.get('/edit/:id',isAdmin,(req,res)=>{
  let id = req.params.id
  Fruit.findById(id).then((fruit)=>{
    // console.log(medicine)
    res.render('admin/edit',{fruit:fruit})
  })
})
router.post('/edit/:id',(req,res)=>{
  let fruit ={
    name:req.body.name,
    description:req.body.description,
    price:req.body.price
  }
  let query = {
    _id: req.params.id
  }
    Fruit.updateOne(query,fruit).then((doc)=>{
      res.redirect('/admin')
    }).catch(err=>console.log(err))
})
router.get('/delete/:id',isAdmin,(req,res)=>{
  let query ={
    _id: req.params.id
  }
  Fruit.deleteOne(query).then(()=>{
    console.log('Deleted Successfully')
  }).then(()=>{
    res.redirect('/admin')
  })
})
router.post('/search',isAdmin,(req,res)=>{
 let searchQuery = req.body.search
 Fruit.find({
  $or:[{name:{$regex:searchQuery,$options:'i'}},
  {description:{$regex:searchQuery,$options:'i'}},
  {price:{$regex:searchQuery,$options:'i'}}]
 }).then((searchResults)=>{
  res.render('admin/search',{title:'Search Results',searchResults})
  console.log (searchResults)
 }).catch(err=>console.log(err))
})
router.get('/view/:id',(req,res)=>{
  let id = req.params.id
  Fruit.findById(id).then((fruit)=>{
    res.render('admin/view',{title:'Fruit',fruit:fruit})
  }) 
})

router.get("/signup", (req, res) => {
  res.render("admin/signup");
});
router.post("/signup", (req, res) => {
  let admin = new Admin({
    adminname: req.body.adminname,
    password: req.body.password,
  });
  admin
    .save()
    .then((signup) => {
    })
    .then(() => {
      res.redirect("/admin/login");
    });
});

router.get("/login", (req, res) => {
  res.render("admin/login");
});
router.post("/login", (req, res) => {
  let query = {
    adminname: req.body.adminname,
    password: req.body.password,
  };
  Admin.findOne(query).then((login) => {
    if (login) {
      req.session.adminname=login.adminname
      res.redirect("/admin");
    } else {
      res.redirect("/admin");
    }
  });
});
router.get('/logout',(req,res)=>{
  req.session.destroy()
    res.redirect('/admin/login')
  
})
  
module.exports = router;

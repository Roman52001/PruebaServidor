const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index.ejs');
});

     
   router.get('/login', (req, res) =>{
    res.render('login');
   });
     
   router.get('/empleados', (req, res) =>{
    res.render('empleados');
   });
     
    
      


module.exports = router;
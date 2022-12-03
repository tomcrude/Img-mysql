const express = require("express")
const multer = require("multer")
const path = require("path")
const fs = require("fs")
const mysql = require("mysql")
const config = require("./config.js");
const router = express.Router()

router.use(express.static(path.resolve(__dirname, './client/build')));

var pool  = mysql.createPool({
    connectionLimit : 10,
    host: config.host,
    database: config.database,
    user: config.user,
    password: config.password
  });
  

router.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
  });

const diskstorage = multer.diskStorage({
    destination: path.join(__dirname, "./images"),
    filename: (req,file,cb)=>{
        cb(null, Date.now() + "-image-" + file.originalname)
    }
})

const fileupload =  multer({
    storage: diskstorage
}).single("image")


router.get("/images/get",(req,res)=>{
    
    pool.getConnection((err, con)=>{
        if (err) return console.log(err)

        con.query("SELECT * FROM image", (e,rows)=>{
            if (e) return console.log(e)

            rows.map(img =>{
                fs.writeFileSync(path.join(__dirname, "./my-images/" + img.id + "-img.png"), img.data)
            }  )

            const im = fs.readdirSync(path.join(__dirname, "./my-images/"))

            res.json(im)
        })

        con.release();
        
    })
   
})


router.post("/images", fileupload ,(req,res)=>{
    
    pool.getConnection((err, con)=>{
        if (err) return console.log(err)
        

        const type = req.file.mimetype
        const namesss = req.file.originalname
        const data = fs.readFileSync(path.join(__dirname, "./images/" + req.file.filename))


        con.query("INSERT INTO image set ?", [{type, namesss, data}], (e,rows)=>{
            if (e) return console.log(e)

            res.send("image guardada")
        })
        con.release();
    })
   
})

router.delete("/images/delete/:id" ,(req,res)=>{
    
    pool.getConnection((err, con)=>{
        if (err) return console.log(err)

        const id = req.params.id.split(" ")
        console.log(id)

        con.query("DELETE FROM image WHERE id = ?", [req.params.id] , (e,rows)=>{
            if (e) return console.log(e)

            fs.unlinkSync(path.join(__dirname, "./my-images/" + id + "-img.png"))

            res.send("image delete")
        })
        con.release();
    })
   
})

module.exports = router
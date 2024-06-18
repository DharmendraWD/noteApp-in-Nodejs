const express = require("express")
const app = express()
const fs = require("node:fs")
const path  = require("node:path")
const port = 3000;
app.listen(port, ()=>{
    console.log("Server is running...")
}) 

// THESE BOTH LINE USED FOR HANDLE FORM DATA ON BACKEND
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))     //static images, video can be used in 
app.set('view engine', 'ejs') //used to render ejs file as html

app.get("/", (req, res)=>{
    fs.readdir("./files", (err, file)=>{       
        res.render("index", {file})
    } )
})
// TO CREATE NEW NOTES 
app.post("/create", (req, res)=>{
let title = req.body.title;
    console.log(title)
    if(!title){
        // return res.status(400).json({message:"file name necessary"})
    return res.status(400).json("ERROR, Enter Title Name First.")
    }
    else{
        fs.writeFile(`./files/${req.body.title}.txt`, req.body.desc, (err)=>{
        if(err) console.log(err.message)
        res.redirect("/")
    })
    }
})

// WHEN CLICK ON TO READ CONTENT 
app.get("/notes/:title", (req, res)=>{
    const title = req.params.title;
    fs.readFile(`./files/${title}`, "utf8", (err, file)=>{       
        if(err) console.log(err.message)
            else{
              res.render("desc", {title, file})
            }
    })
    
})
// WHEN CLICK ON TO DELETE ALL 
app.get("/api/deleteall", (req, res)=>{
        fs.readdir("./files", (err, files)=>{
            if(err) throw err.message;
                // while deleting if there is no files then show "No files found to delete"
                    if(files.length<=0){
                        return res.status(400).json({message:"No files Found to delete."})

        }
                    else{
                        for(const file of files){
                            fs.unlink(path.join("./files", file), err =>{
                                if(err) throw err.message;
                                console.log("deleted successfully")
                    })
              
                }
            }
        })
})


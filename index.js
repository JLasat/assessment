const express = require("express");
const app = express();
const pool = require("./db");
const cors = require("cors");

// middle ware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/jeff",(req,res) =>{

    res.send("hello world")

})

app.get("/get-employee", async (req,res) =>{
    
   try { 
    const sql = `SELECT id, name  
    FROM public.employees
    ORDER BY id ASC ;`
        const rs = await pool.query(sql) 

        res.json(rs.rows)
   } catch (error) {
        console.error(error.message)
   }

})

app.get("/get-employee/:id", async (req,res) =>{
      
     try {
      const sql = `SELECT id, name
       FROM public.employees
       WHERE id = $1;`
       
       const rs = await pool.query(sql,[req.params.id])
   
          res.json(rs.rows)
     } catch (error) {
          console.error(error.message)
     }
  
  })

app.delete("/delete-employee/:id", async (req,res) =>{
     
    try { 
     const sql = `DELETE FROM public.employees
     WHERE id = $1;`
         
         const rs = await pool.query(sql,[req.params.id])
 
         res.json(rs.rows)
    } catch (error) {
         console.error(error.message)
    }
 
 }) 


app.put("/update-employee/:id", async (req,res) =>{
    const {name} = req.body
    try {
     const sql = `UPDATE public.employees
     SET  name=$1
     WHERE id = $2;`
         const rs = await pool.query(sql,[name,req.params.id])
 
         res.json(rs.rows)
    } catch (error) {
         console.error(error.message)
    }
 
 }) 


 
app.post("/add", async (req,res) =>{

    const {name} = req.body
   try {
    const sql = `INSERT INTO public.employees(
        name)
       VALUES ($1) returning *;`
        const rs = await pool.query(sql,[name])

        res.json(rs.rows)
   } catch (error) {
        console.error(error.message)
   }   
     
})   
 
const PORT =  process.env.PORT || 5000;

app.listen(PORT,() =>{
    console.log(`server running at ${PORT}`);
})
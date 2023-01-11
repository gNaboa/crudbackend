
const express = require('express')

const app = express()
const cors = require("cors");

const mysql = require('mysql')

const db = mysql.createPool({
  host: '',
  user: '',
  password: '',
  database: 'movie_reviews'

})
const port = 3001

// Middlewares here 
app.use(cors());
app.use(express.json());


//post method

app.post('/api/insert', (req, res) => {

  const { movieTitle, movieDecription } = req.body
  const sqlInsert = "INSERT INTO movie_reviews.movie_review (movietitle, moviedescription) VALUES (?,?);"

  db.query(sqlInsert, [movieTitle, movieDecription], (err, result) => {

  })
})

//get method

app.get('/api/movielist',(req,res) =>{
   const sqlGetAllMovies = "SELECT * FROM movie_reviews.movie_review"

  db.query(sqlGetAllMovies,(err,result)=>{
     res.send(result) // manda os dados direto para o servidor
  })

})
//delete method
app.delete('/api/delete/:movieTitle',(req,res)=>{
   const name = req.params.movieTitle
   const sqlDeleteMovie = "DELETE FROM movie_reviews.movie_review WHERE movieTitle = ?"

   db.query(sqlDeleteMovie,name,(err,result)=>{
           console.log(result)
   })
})

//update method
app.put('/api/update',(req,res)=>{
  const {movieDecription,movieTitle} = req.body
  const sqlUpdateMovie = "UPDATE movie_reviews.movie_review SET movieDescription = ? WHERE movieTitle = ?"

  db.query(sqlUpdateMovie,[movieDecription,movieTitle],(err,result)=>{
          console.log(result)
  })
})

app.listen(port, () => console.log("Server running in port 3001"))

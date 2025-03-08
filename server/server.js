import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongodb from './config/mongodb.js'
import  userRouter  from './Routes/UserRoutes.js'
mongodb()


 const port = process.env.PORT || 4000


const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/user', userRouter)



app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})



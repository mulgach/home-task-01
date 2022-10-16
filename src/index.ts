import express, {Request, Response} from 'express'
import bodyParser from 'body-parser';
import {testRouter, videosRouter} from "./routes/video-router";

const app = express()

const port = process.env.PORT || 3000

const parserMiddleware = bodyParser({})
app.use(parserMiddleware)

app.use('/videos', videosRouter)
app.use('/testing/all-data', testRouter)
app.listen(port, () => {
    console.log(`app listening on port: ${port}`)
})
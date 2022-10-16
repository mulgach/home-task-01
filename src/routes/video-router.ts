import {Request, Response, Router} from "express";

export const videosRouter = Router({})
export const testRouter = Router({})

const videos: exampleVideo [] = []

type exampleVideo = {
    id: number,
    title: string,
    author: string,
    canBeDownloaded: boolean,
    minAgeRestriction: any
    createdAt: string,
    publicationDate: string,
    availableResolutions: Array<string>
}

videosRouter.get('/', (req: Request, res: Response) => {
    res.status(200).send(videos)
})
videosRouter.post('/', (req: Request, res: Response) => {
    let title = req.body.title;
    let author = req.body.author;
    let avRes = req.body.availableResolutions;
    let dataAnswer = []
    let anyString: Array<string> = []
    //without Resolution check
    let t = {
        message: typeof anyString,
        field: "title"
    }
    let a = {
        message: typeof anyString,
        field: "author"
    }
    if (!title || !title.trim() || title.length > 40) {
        dataAnswer.push(t)
    } else if (!author || !author.trim() || author.length > 20) {
        dataAnswer.push(a)
    }

    if (!title || !author || !title.trim() || !author.trim() ||
        title.length > 40 || author.length > 20
        || typeof title !== 'string' || typeof author!== 'string' ) {
        res.status(400).send ({
            errorsMessages: dataAnswer
        })
    } else {
        let date = new Date()
        date.setDate(date.getDate() + 1)
        const newVideo = {
            id: videos.length + 1, //???
            title: req.body.title,
            author: req.body.author,
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: new Date().toISOString(),
            publicationDate: date.toISOString(),
            availableResolutions: req.body.availableResolutions
        }
        //add object to jason
        videos.push(newVideo)
        res.status(201).send(newVideo);
    }
    return
})
videosRouter.get('/:id', (req: Request, res: Response) => {
    let idVideo = videos.find(v => v.id === +req.params.id)
    if (idVideo) {
        res.status(200).send(idVideo)
    } else {
        res.send(404)
    }
})
videosRouter.put('/:id', (req: Request, res: Response) => {
    let updateVideo = videos.find(v => v.id === +req.params.id)
    let title = req.body.title;
    let author = req.body.author;
    let avRes = req.body.availableResolutions;
    let cBD = req.body.canBeDownloaded;
    let minAge = req.body.minAgeRestriction;
    //without Resolution check
    if (updateVideo) {
        //without Resolution check
        let t = {
            message:  "Any<String>",
            field: "title"
        }
        let a = {
            message: "Any<String>",
            field: "author"
        }
        let c = {
            message: "Any<String>",
            field: "canBeDownloaded"
        }
        let m = {
            message: "Any<String>",
            field: "minAgeRestriction"
        }
        let dataAnswer: Array<object> = []
          if (!author || !author.trim() || author.length > 20) {
            dataAnswer.push(a)
        }
          if (!title || !title.trim() || title.length > 40) {
              dataAnswer.push(t)
          }
          if (typeof cBD !== 'boolean') {
              dataAnswer.push(c)
        }
          if ((minAge < 1 && minAge > 18) || typeof minAge !== 'number') {
              dataAnswer.push(m)
        }

        if (!title || !author || !cBD || !title.trim() || !author.trim() ||
            title.length > 40 || author.length > 20 || (minAge < 1 && minAge > 18)
            || typeof title !== 'string' || typeof author !== 'string'
            || typeof cBD !== 'boolean' || typeof minAge !== 'number') {
            res.status(400).send({
                errorsMessages: dataAnswer
            })
        } else {
            updateVideo.title = req.body.title
            updateVideo.author = req.body.author
            updateVideo.availableResolutions = req.body.availableResolutions //what to do with old array?
            updateVideo.canBeDownloaded = req.body.canBeDownloaded
            updateVideo.minAgeRestriction = req.body.minAgeRestriction
            updateVideo.publicationDate = req.body.publicationDate
            res.status(204).send(updateVideo)
        }
    } else {
        res.send(404)
    }
    return
})
videosRouter.delete('/:id', (req: Request, res: Response) => {
    let delVideo = videos.find(v => v.id === +req.params.id)
    if (delVideo) {
        videos.splice((+req.params.id) - 1, 1)
        res.send(204)
    } else {
        res.send(404)
    }
})

testRouter.delete('/', (req: Request, res: Response) => {
    videos.length = 0
    res.send(204)
})
require('dotenv').config();
const express = require('express')
const cors = require('cors')
const Note = require('./moduls/note')
const app = express()
app.use(express.static('build'))
app.use(express.json())

app.use(cors())


  app.get('/api/notes', (req, res) => {
    Note.find({}).then(notes => {
      res.json(notes.map(note => note.toJSON()))
    })
  })

  app.get('/api/notes/:id', (req, res, next) => {
    Note.findById(req.params.id).then(note => {
      if(note) {
        res.json(note.toJSON())
      }else{
        res.status(404).end()
      }
    })
    .catch(error => next(error))
  })
  
  app.delete('/api/notes/:id', (request, response, next) => {
    Note.findByIdAndRemove(request.params.id)
      .then(result => {
        response.status(204).end()
      })
      .catch(error => next(error))
  })


  app.post('/api/notes', (request, response, next) => {
    const body = request.body
    if(!body.content){
      return res.status(400).json({
        error: 'content missing'
      })
    }  
    const note = new Note( {
      content: body.content,
      important: body.important || false,
      date: new Date()
    })
  
    note
    .save()
    .then(savedNote => savedNote.toJSON())
    .then(savedAndFormattedNote => {
      response.json(savedAndFormattedNote)
    }) 
    .catch(error => next(error))
  })

  app.put('/api/notes/:id', (request, response, next) => {
    const body = request.body
    const note = {
      content: body.content,
      important: body.important
    }
    Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then(updatedNote => {
      response.json(updatedNote.toJSON())
    })
    .catch(error => next(error))
  })

  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
      console.log(`Service running on port ${PORT}`)
  })

  const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  // handler of requests with unknown endpoint
  app.use(unknownEndpoint)
  
  const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    }
  
    next(error)
  }
  app.use(errorHandler)
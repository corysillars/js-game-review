const router = require('express').Router()
const games = require('../../../data/games.json')
router.get('/', (req, res) => {
    const summary = games.map(({id, title, image, rating}) => ({
        id,
        title,
        image,
       rating
    }))
    res.send(summary)
})


router.get('/game/:id', (req, res) => {
    const Id = parseInt(req.params.id)
    const game = games.find(game => game.id === Id)
    if (game)  return res.send(game)
     
        res.status(404).send({error: 'Game not found'})
})
router.post('/game/add', (req, res) => {
    const id = games.length  + 1 
    const game = req.body
    const newgame = {id, ...game}
    games.push(newgame)
    res.send(newgame)
})
module.exports = router 
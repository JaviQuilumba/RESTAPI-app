const express = require('express');
const router = express.Router();

let movies = [
    {
        id: 1,
        title: 'Inception',
        director: 'Christopher Nolan',
        year: 2010
    },
    {
        id: 2,
        title: 'The Matrix',
        director: 'Lana and Lilly Wachowski',
        year: 1999
    },
    {
        id: 3,
        title: 'Interstellar',
        director: 'Christopher Nolan',
        year: 2014
    }
];

/**
 * @swagger
 * /api/movies:
 *   get:
 *     summary: Retrieve a list of movies
 *     description: Retrieve a list of movies with their details.
 *     responses:
 *       200:
 *         description: A list of movies.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The movie ID.
 *                   title:
 *                     type: string
 *                     description: The movie title.
 *                   director:
 *                     type: string
 *                     description: The movie director.
 *                   year:
 *                     type: integer
 *                     description: The release year.
 */
router.get('/movies', (req, res) => {
    res.json(movies);
    console.log('Query parameters:', req.query);
});

/**
 * @swagger
 * /api/movies/{id}:
 *   get:
 *     summary: Retrieve a single movie by ID
 *     description: Retrieve a movie with its details by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The movie ID.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single movie.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The movie ID.
 *                 title:
 *                   type: string
 *                   description: The movie title.
 *                 director:
 *                   type: string
 *                   description: The movie director.
 *                 year:
 *                   type: integer
 *                   description: The release year.
 *       404:
 *         description: Movie not found.
 */
router.get('/movies/:id', (req, res) => {
    const movie = movies.find(m => m.id === parseInt(req.params.id));
    if (!movie) return res.status(404).send('Movie not found');
    res.json(movie);
});

/**
 * @swagger
 * /api/movies:
 *   post:
 *     summary: Create a new movie
 *     description: Add a new movie to the list.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The movie title.
 *               director:
 *                 type: string
 *                 description: The movie director.
 *               year:
 *                 type: integer
 *                 description: The release year.
 *     responses:
 *       201:
 *         description: The created movie.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The movie ID.
 *                 title:
 *                   type: string
 *                   description: The movie title.
 *                 director:
 *                   type: string
 *                   description: The movie director.
 *                 year:
 *                   type: integer
 *                   description: The release year.
 */
router.post('/movies', (req, res) => {
    console.log(req.body);
    const newMovie = {
        id: movies.length + 1,
        title: req.body.title,
        director: req.body.director,
        year: req.body.year
    };
    movies.push(newMovie);
    res.status(201).json(newMovie);
});

/**
 * @swagger
 * /api/movies/{id}:
 *   put:
 *     summary: Update a movie by ID
 *     description: Update the details of an existing movie by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The movie ID.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The movie title.
 *               director:
 *                 type: string
 *                 description: The movie director.
 *               year:
 *                 type: integer
 *                 description: The release year.
 *     responses:
 *       200:
 *         description: The updated movie.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The movie ID.
 *                 title:
 *                   type: string
 *                   description: The movie title.
 *                 director:
 *                   type: string
 *                   description: The movie director.
 *                 year:
 *                   type: integer
 *                   description: The release year.
 *       404:
 *         description: Movie not found.
 */
router.put('/movies/:id', (req, res) => {
    const movie = movies.find(m => m.id === parseInt(req.params.id));
    if (!movie) return res.status(404).send('Movie not found');

    movie.title = req.body.title;
    movie.director = req.body.director;
    movie.year = req.body.year;
    res.json(movie);
});

/**
 * @swagger
 * /api/movies/{id}:
 *   delete:
 *     summary: Delete a movie by ID
 *     description: Remove a movie from the list by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The movie ID.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The deleted movie.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The movie ID.
 *                 title:
 *                   type: string
 *                   description: The movie title.
 *                 director:
 *                   type: string
 *                   description: The movie director.
 *                 year:
 *                   type: integer
 *                   description: The release year.
 *       404:
 *         description: Movie not found.
 */
router.delete('/movies/:id', (req, res) => {
    const movieIndex = movies.findIndex(m => m.id === parseInt(req.params.id));
    if (movieIndex === -1) return res.status(404).send('Movie not found');

    const deletedMovie = movies.splice(movieIndex, 1);
    res.json(deletedMovie);
});

module.exports = router;

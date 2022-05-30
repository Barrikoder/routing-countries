const express = require('express');
const app = express();
require("dotenv").config();
const { Pool } = require("pg");
const pool = new Pool();
const port = process.env.port || 3000;
const { get } = require("express/lib/response");

app.use(express.json());

app.get("/", (req, res) => {
    res.send('Hello World!')
});

app.get("/countries", async (req, res) => {
    const { body: { name }
} = req;
    try {
        const { rows } = await pool.query("SELECT * FROM countries")
        req.body.name.sort();
        res.status(200).json(rows)
    } catch (err) {
        res.status(500).send(err)
    }
});

app.post("/countries", async (req, res) => {
    const { body: { name, alpha2Code, alpha3Code }
    } = req;
    try {
        const { rows } = await pool.query("INSERT INTO countries (name, alpha2Code, alpha3Code) VALUES ($1, $2, $3) RETURNING *",
            [req.body.name, req.body.alpha2Code, req.body.alpha3Code]);
        res.status(200).json(rows)
    } catch (err) {
        res.status(500).send(err)
    }
});

app.get("/countries/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const { rowCount, rows } = await pool.query("SELECT * FROM countries WHERE id = $1", [id])
        if (!rowCount) return res.status(404).json({ error: `Country with id ${id} wasnt found` })
        res.status(200).send(rows)
    } catch (err) {
        res.status(500).send(err)
    }
});

app.put("/countries/:id", async (req, res) => {
    const { id } = req.params;
    const { name, alpha2Code, alpha3Code } = req.body;
    try {
        const { rows } = await pool.query("UPDATE countries SET name = $1, alpha2Code = $2, alpha3Code = $3 WHERE id = $4 RETURNING *",
            [name, alpha2Code, alpha3Code, id])
        res.status(201).send(rows)
    } catch (err) {
        res.status(500).send(err);
    }
});

app.delete("/countries/:id", async (req, res) => {
    const { params: { id }
} = req;
if (!id)
    return res.status(404).send({ error: "ID not found!" });
try {
    const { rows } = await pool.query("DELETE FROM countries WHERE id=$1", [req.params.id]);
    res.status(200).send(rows);
} catch (err) {
    res.status(500).send(err);
}
});

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
})
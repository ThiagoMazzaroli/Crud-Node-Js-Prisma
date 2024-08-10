import 'dotenv/config';
import express, { json } from 'express';
import { PrismaClient } from '@prisma/client'

const app = express();

const prisma = new PrismaClient()

const users = [];

app.use(express.json());

app.listen(process.env.PORT, () => {
    console.log('ola');
});


app.post("/usuarios", async (req, res) => {

    await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    });

    res.status(201).json(req.body);
});


app.get("/usuarios/", async (req, res) => {

    const allUsers = await prisma.user.findMany();
    res.status(200).send(allUsers);
});

app.put("/usuarios/:id", async (req, res) => {

    const { id } = req.params;

    await prisma.user.update({
        where: {
            id: Number(id)
        },
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    });
    res.status(201).json(req.body);
});

app.delete("/usuarios/:id", async (req, res) => {

    const { id } = req.params;

    await prisma.user.delete({
        where: {
            id: Number(id)
        }
    });

    res.status(201).json({ message: "Usuario deletado com sucesso!" });
});
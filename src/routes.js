import { Database } from "./database.js";
import { randomUUID } from 'node:crypto';
import { buildRoutePath } from "./utils/build-route-path.js";

const database = new Database();

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/users'),

        handler: (req , res) =>{
            const { search } = req.query;

            const users = database.select('users', search ? {
                nome: search,
                email: search
            } : null);

            return res.end(JSON.stringify(users,null,2));
        },
    },{
        method: 'POST',
        path: buildRoutePath('/users'),
        
        handler: (req, res) => {
            const {nome, email} = req.body;
     
            const users = {
                id: randomUUID(), 
                nome:nome,
                email:email
            };

            database.insert('users', users);

            return res.writeHead(201).end("criação de usuarios");
        }
    },{
        method:"DELETE",
        path:buildRoutePath("/users/:id"),

        handler : (req, res) => {
            const {id} = req.params;

            database.delete('users', id);

            return res.writeHead(204).end();
        }
    }
    ,{
        method: "PUT",
        path: buildRoutePath("/users/:id"),

        handler : (req, res) =>{
            const {id} = req.params;
            const {nome, email} = req.body;

            database.update('users', id, {nome, email})

            return res.writeHead(204).end();
        }
    }
]
import env from "./env";
import path from 'node:path'
import express from 'express'
import type { Request, Response } from 'express'

const __dirname = path.join(path.resolve(), 'src');

const APP_NAME: string = env.APP_NAME;

const app = express()

app.use(express.json())

app.use(express.static(path.join(__dirname, 'frontend')));

app.use('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

app.listen(3000, () => {
  console.log(`${APP_NAME} listent on http://localhost:3000`)
})

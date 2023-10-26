import express from "express";
import { router } from "../routes/routes";
import cors from 'cors'

import "dotenv/config";

const app = express();
app.use(express.static('public'))
app.use(cors())
app.use(express.json())
app.use('/product', router);

app.listen(process.env.PORT || 3001, () => console.log("serverRun"));

import express from "express";
import thumbs from "./api/thumbs";
import images from "./api/images";

const routes = express.Router();

routes.get('/', (req,res) =>{
	res.send('main api route');
});

routes.use('/images', images);
routes.use('/thumbs', thumbs);

export default routes;
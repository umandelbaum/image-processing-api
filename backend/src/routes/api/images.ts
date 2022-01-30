import express from "express";
import {promises as fs} from "fs";
import path from "path";

const images = express.Router();
const storageFolderPath = "../storage/images";

//Returns a json blob of the list of the images in storage
images.get('/', async (req,res) => {
	
	try {
		const filelist = await fs.readdir(storageFolderPath);        
		res.status(200).json(filelist);		
	} catch (err) {
		console.log(err);
		res.status(500).json("files couldn't be read");
	}
});

//Returns the relative path of the requested filename
images.get('/:id', async (req,res) => {
	
	try {
		const filelist = await fs.readdir(storageFolderPath);
		if (filelist.includes(req.params.id)) {
			res.status(200).json(path.join(storageFolderPath, req.params.id));
		} else {
			res.status(404).json("file not found");			
		}
	} catch (err) {
		console.log(err);
		res.status(500).json("files couldn't be read");
	}
});

export default images;
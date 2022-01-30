import express from "express";
import {promises as fs} from "fs";
import path from "path";
import sharp from 'sharp';

const thumbs = express.Router();
const imagesPath = "../storage/images";
const thumbsPath = "../storage/thumbs";

//Returns a json blob of the list of the thumbnails in storage
thumbs.get('/', async (req,res) => {
	
	try {
		const filelist = await fs.readdir(thumbsPath);        
		res.status(200).json(filelist);		
	} catch (err) {
		console.log(err);
		res.status(500).json("files couldn't be read");
	}
});

//This endpoint returns a JSON blob with relative path of the requested thumbnail
//If width or height parameters are set, then returns the relative path of a resized file
//If no width or height parameters are set, returns a 600x400 thumbnail
//If no resized file exists, it creates one, stores it, and then returns that relative path
thumbs.get('/:id', async (req,res) => {
	
	//Get width and height parameters, if they exist
	const width = req.query.width ? req.query.width as string : '600';
	const height = req.query.height ? req.query.height as string : '400';
	const thumbname = req.params.id.slice(0,-4) + width + 'x' + height + req.params.id.slice(-4);
	const thumbPath = path.join(thumbsPath, thumbname);

	try {
		//Check if thumbnail of desired size exists
		const thumbsFileList = await fs.readdir(thumbsPath);
		if (thumbsFileList.includes(thumbname)) {            
			res.status(200).json(thumbPath);
		} else  {
			//check if original file exists
			try {
				const imagesFileList = await fs.readdir(imagesPath);
		        if (imagesFileList.includes(req.params.id)) {
					//if original file exists, resize it and return link
					sharp(path.join(imagesPath,req.params.id))
						.resize(Number(width),Number(height))
						.toFile(thumbPath, function(err) {
							if(err){
								console.log(err);
								res.status(500).json("new thumbnail file couldn't be written");
							}
						});
					res.status(200).json(thumbPath);
				} else {
					//if no original file, then return error 404
					res.status(404).json("file not found");
				}
			} catch (err) {
				console.log(err);
				res.status(500).json("files couldn't be read");
			}                   	
		}
	} catch (err) {
		console.log(err);
		res.status(500).json("files couldn't be read");
	}
});

export default thumbs;
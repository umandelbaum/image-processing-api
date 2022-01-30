import supertest from "supertest";
import app from "../index";
import {promises as fs} from "fs";
import path from "path";

const request = supertest(app);

describe('Test thumbs endpoint responses', () => {
	
	const thumbsPath = "../storage/thumbs";

	it("ensures the get request to thumbs returns the file list as array of strings", async () => {
		try {
			const filelist = await fs.readdir(thumbsPath);        
			const response = await request.get('/api/thumbs');
			expect(response.status).toBe(200);
			const returnedList = response.body;
			filelist.forEach(file => {
				expect(returnedList.includes(file)).toBeTrue;
			});
		} catch (err) {
			console.log(err);
		}
    });

	it("ensures a request for a particular file returns the path to the default thumbnail", async () => {		
		const pictureName = "image1.jpg";
		const thumbname = "image1600x400.jpg";
		//first delete the default thumbnail if it exists
		try{
			const filelist = await fs.readdir(thumbsPath);
			if (filelist.includes(thumbname)){
				fs.unlink(path.join(thumbsPath,thumbname));				
			}
		} catch (err) {
			console.log(err);
		}
		
		//Now generate the default thumbail
		try {				
			const response = await request.get(`/api/thumbs/${pictureName}`);
			expect(response.status).toBe(200);
			const returnedPath = response.body;
			expect(returnedPath).toBe(path.join(thumbsPath,thumbname));
		} catch (err) {
			console.log(err);
		}
	});

	it("ensures thumbs fufills the request for a file of a given size", async () =>{
		const pictureName = "image1.jpg";
		const thumbname = "image1300x200.jpg";
		//first delete the default thumbnail if it exists
		try{
			const filelist = await fs.readdir(thumbsPath);
			if (filelist.includes(thumbname)){
				fs.unlink(path.join(thumbsPath,thumbname));				
			}
		} catch (err) {
			console.log(err);
		}
		
		//Now generate the thumbail at 300x200 size
		try {				
			const response = await request.get(`/api/thumbs/${pictureName}?width=300&height=200`);
			expect(response.status).toBe(200);
			const returnedPath = response.body;
			expect(returnedPath).toBe(path.join(thumbsPath,thumbname));
		} catch (err) {
			console.log(err);
		}
	});

	it("ensures thumbs returns 404 for a file that doesn't exist", async () => {
		try {				
			const response = await request.get(`/api/thumbs/skadfjkj`);
			expect(response.status).toBe(404);			
		} catch (err) {
			console.log(err);
		}
	});
});
import supertest from "supertest";
import app from "../index";
import {promises as fs} from "fs";
import path from "path";

const request = supertest(app);

describe("Test images endpoint responses", async () => {
    
	const folderpath = "../storage/images";
    
	it("ensures the get request to images returns the file list as array of strings", async () => {
		try {
			const filelist = await fs.readdir(folderpath);        
			const response = await request.get('/api/images');
			expect(response.status).toBe(200);
			const returnedList = response.body;
			filelist.forEach(file => {
				expect(returnedList.includes(file)).toBeTrue;
			});
		} catch (err) {
			console.log(err);
		}
        
	});

    it("ensures the get/<filename> returns a relative path of the file", async () =>{
        try {
			const filelist = await fs.readdir(folderpath);            
            const response = await request.get(`/api/images/${filelist[0]}`);
            expect(response.status).toBe(200);
            expect(response.body).toEqual(path.join(folderpath,filelist[0]));			
		} catch (err) {
			console.log(err);
		}
    });

    it("ensures the get/<filename> returns a 404 for a fake file", async () =>{
        try {
			const filelist = await fs.readdir(folderpath);
            const response = await request.get(`/api/images/${filelist[0]}asdfljdlsf`);
            expect(response.status).toBe(404);
		} catch (err) {
			console.log(err);
		}
    });
});

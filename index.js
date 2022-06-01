import "dotenv/config";

import express from "express";
import got from "got";

const app = express();

app.use(express.static("public"));
app.use(express.json());

app.post("/message", async (request, response) => {
    if (!request.body.url || !request.body.text) return response.json({
        success: false,
        error: "Please fill out missing fields."
    });

    try {
        await got.post(request.body.url, {
            json: {
                text: request.body.text
            }
        });
    } catch(e) {
        return response.json({success: false, error: e.message});
    }

    response.json({success: true});
});

app.listen(3000);
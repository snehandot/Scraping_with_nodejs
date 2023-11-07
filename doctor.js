const PORT = 8000;
const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

const url = 'https://www.maxhealthcare.in/find-a-doctor';

app.get('/', function (req, res) {
    res.json('This is my webscraper');
});

app.get('/results', (req, res) => {
    axios(url)
        .then(response => {
            const html = response.data;
            const $ = cheerio.load(html);
            const articles = [];

            $('.doctor-card-new').each(function () {
                const imageUrl = $(this).find('img').attr('src');
                const title = $(this).find('h4').text();
                const paragraphs = $(this).find('p');
                const url = $(paragraphs[paragraphs.length - 2]).text();

                articles.push({
                    imageUrl,
                    title,
                    url
                });
            });


            
            
            res.json(articles);
        })
        .catch(err => console.log(err));
});

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));

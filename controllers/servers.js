import fs from 'fs'
import path from 'path'

const __dirname = path.resolve()
let file = fs.readFileSync('./database.json', 'utf-8'); 
let jsObjectPublications = JSON.parse(file);
let articles = jsObjectPublications[2]['data'];
let authors = jsObjectPublications[3]['data'];
let journals = jsObjectPublications[4]['data'];

const getAllData = (id) => {
    let article = articles[id - 1];
    
    let authorsList = authors.filter(author => author['article_id'] === id);

    let finalData = {
        'article': article,
        'authors': authorsList.map(author => author['author']),
        'journal': journals.find(journal => journal['id'] == article['journal_id'])
    }

    return finalData
}

export const getArticle = (req, res) => {
    if (req.params.name !== 'article/id=:id') {
        res.sendFile(__dirname + '/404.html')
    }    

    let article = getAllData(req.params.id)

    res.render('article', {title: 'Article', active: 'article', article: article['article'], authors: article['authors'], journal: article['journal']})
}

export const getPublications = (req, res) => {
    if (req.params.name !== 'publications') {
        res.sendFile(__dirname + '/404.html')
    }    

    let dataConfig = {
        minPage: 1,
        articlesCount: 50,
        pagesCount: Math.ceil(articles.length / 50),
    }

    res.render('publications', {title: 'Publications', active: 'publications', data: articles, config: dataConfig})
}
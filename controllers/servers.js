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

const getAuthorsPublicList = authors => {
    let authorsPublications = []

    let authorsNames = authors.map(author => author['author'])
    authorsNames = new Set(authorsNames)
    
    authorsNames.forEach(authorName => {
        let publications = []
        
        for (let author of authors) {
            if (author['author'] === authorName) {
                publications.push(author)
            }
        }

        authorsPublications.push(publications)
    })

    return authorsPublications
}

const getAuthorRating = (author, articles) => {
    let authorRating = 0;

    for (let article of author) {
        let articleItem = articles.find(item => item['id'] === article['article_id'])
        authorRating += +articleItem['rating']
    }

    return Math.round(authorRating * 100) / 100
}

const getAuthorsList = () => {
    let authorsList = getAuthorsPublicList(authors)
    let authorsData = []
    let authorId = 0;
    for (let author of authorsList) {
        let authorRating = getAuthorRating(author, articles)

        let authorData = {
            id: authorId,
            author: author[0]['author'],
            publicCount: author.length,
            rating: authorRating
        }

        authorsData.push(authorData)
        authorId++
    }

    return authorsData
}

export const getPublications = (req, res) => {
    if (req.params.name !== 'publications') {
        res.sendFile(__dirname + '/404.html')
    }

    res.render('publications', {title: 'Publications', active: 'publications', data: articles})
} 

export const getArticle = (req, res) => {
    if (req.params.name !== 'article/id=:id') {
        res.sendFile(__dirname + '/404.html')
    }    

    let article = getAllData(req.params.id)
    console.log(article)
    res.render('article', {title: 'Article', active: 'article', article: article['article'], authors: article['authors'], journal: article['journal']})
}

export const getAuthors = (req, res) => {

    let autrhorsList = getAuthorsList(authors, articles)
    res.render('authors', {title: 'Authors', active: 'authors', data: autrhorsList})
}
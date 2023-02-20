mongo --host web2-mongodb:27017 blogger
db.articles.insert({authorName: "Henry", email: "henry@henry.com", creationDate: ISODate("2022-04-08"), text: "sample text"})

const Author = require("../models/Author");
const Genre = require("../models/Genre");

// get all authors
exports.getAuthors = (req, res, next) => {
  Author.findAll()
    .then((authors) => {
      res.status(200).json({ authors: authors });
    })
    .catch((err) => console.log(err));
};

exports.getAuthor = (req, res, next) => {
  const authorId = req.params.genreId;
  Author.findByPk(authorId)
    .then((author) => {
      if (!author) {
        return res.status(404).json({ message: "Author not found!" });
      }
      res.status(200).json({ author: author });
    })
    .catch((err) => console.log(err));
};

exports.createAuthor = (req, res, next) => {
  const {name, bio} = req.body;
  Author.create({
    name: name,
    bio: bio
  })
    .then((result) => {
      console.log("Author created.");
      res
        .status(201)
        .json({ message: "Author created successfully.", author: result });
    })
    .catch((err) => console.log(err));
};

exports.updateAuthor = (req, res, next) => {
  const authorId = req.params.id;
  const {name, bio} = req.body;
  // const updatedBio = req.body?.bio;

  console.log("name", name);
  console.log("bio", bio);

  Author.findByPk(authorId)
    .then((author) => {
      if (!author) {
        return res.status(404).json({ message: "Author not found" });
      }
      author.name = name;
      author.bio = bio;
      return author.save();
    })
    .then((result) => {
      res.status(200).json({ message: "Author updated!", author: result });
    })
    .catch((err) => console.log(err));
};

exports.deleteAuthor = (req, res, next) => {
  const authorId = req.params.authorId;
  Author.findByPk(authorId)
    .then((author) => {
      if (!author) {
        res.status(404).json("Author not found!");
      }
      return Genre.destroy({
        where: {
          id: authorId,
        },
      });
    })
    .then((result) => {
      res.status(200).json({ message: "Genre deleted!" });
    })
    .catch((err) => console.log(err));
};

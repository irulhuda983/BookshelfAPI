const { nanoid } = require('nanoid');
const books = require('./books');
const { addBookValidator, updateBookValidator } = require('./validator');

const getAllBooksHandler = (request, h) => {
  const { name, reading, finished } = request.query;
  let query = books;

  if (reading) {
    query = query.filter((book) => {
      const isReading = reading == 1 ? true : false;
      return book.reading === isReading;
    });
  }

  if (finished) {
    query = query.filter((book) => {
      const isFinished = finished == 1 ? true : false;
      return book.finished === isFinished;
    });
  }

  if (name) {
    query = query.filter((book) => String(book.name).toLowerCase().includes(name.toLowerCase()));
  }

  const response = h.response({
    status: 'success',
    data: {
      books: query.map((book) => ({ id: book.id, name: book.name, publisher: book.publisher })),
    },
  });

  response.code(200);
  return response;
};

const getBookByIdHandler = (request, h) => {
  const { id } = request.params;

  const book = books.find((book) => book.id === id);

  if (book) {
    const response = h.response({
      status: 'success',
      data: { book },
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });

  response.code(404);

  return response;
};

const addBookHandler = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

  const { error, message } = addBookValidator({ name, pageCount, readPage });

  if (error) {
    const response = h.response({
      status: 'fail',
      message: message,
    });

    response.code(400);

    return response;
  }

  const id = nanoid(16);
  const finished = (pageCount === readPage);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt
  };

  books.push(newBook);

  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });

    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal ditambahkan',
  });

  response.code(500);

  return response;
};

const editBookByIdHandler = (request, h) => {
  const { id } = request.params;
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
  const finished = (pageCount === readPage);
  const updatedAt = new Date().toISOString();
  const index = books.findIndex((book) => book.id === id);

  if (index === -1) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });

    response.code(404);

    return response;
  }

  const { error, message } = updateBookValidator({ name, pageCount, readPage });

  if (error) {
    const response = h.response({
      status: 'fail',
      message: message,
    });

    response.code(400);

    return response;
  }

  books[index] = {
    ...books[index],
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    updatedAt
  };

  const response = h.response({
    status: 'success',
    message: 'Buku berhasil diperbarui',
  });
  response.code(200);
  return response;
};

const deleteBookByIdHandler = (request, h) => {
  const { id } = request.params;
  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  getAllBooksHandler,
  getBookByIdHandler,
  addBookHandler,
  editBookByIdHandler,
  deleteBookByIdHandler
};
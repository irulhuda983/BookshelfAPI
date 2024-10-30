const addBookValidator = (data) => {
  const { name, readPage, pageCount } = data;

  if (!name || typeof name !== 'string') {
    return {
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
      error: true,
    };
  }

  if (readPage > pageCount) {
    return {
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
      error: true,
    };
  }

  return {
    message: null,
    error: false,
  };
};

const updateBookValidator = (data) => {
  const { name, readPage, pageCount } = data;

  if (!name || typeof name !== 'string') {
    return {
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
      error: true,
    };
  }

  if (readPage > pageCount) {
    return {
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
      error: true,
    };
  }

  return {
    message: null,
    error: false,
  };
};

module.exports = { addBookValidator, updateBookValidator };
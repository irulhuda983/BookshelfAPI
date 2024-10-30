const fs = require('fs');

const getBooks = () => {
  try {
    const dataPath = './data/books.json';

    if (!fs.existsSync(dataPath)) {
      return [];
    }

    const fileJson = fs.readFileSync(dataPath, 'utf-8');
    return JSON.parse(fileJson);
  } catch (error) {
    console.log(error);
  }
};

const saveDataBookToFile = (data) => {
  try {
    const dataPath = './data/books.json';

    if (!fs.existsSync(dataPath)) {
      fs.writeFileSync(dataPath, '[]');
    }

    const readFile = fs.readFileSync(dataPath, 'utf-8');
    const jsonData = JSON.parse(readFile);
    jsonData.push(data);
    fs.writeFileSync(dataPath, JSON.stringify(jsonData));
    return data;
  } catch (error) {
    console.log(error);
  }
};

const updateDataBookToFile = (index, newData) => {
  try {
    const dataPath = './data/books.json';

    if (!fs.existsSync(dataPath)) {
      fs.writeFileSync(dataPath, '[]');
    }

    const readFile = fs.readFileSync(dataPath, 'utf-8');
    const books = JSON.parse(readFile);
    books[index] = {
      ...books[index],
      ...newData,
    };

    fs.writeFileSync(dataPath, JSON.stringify(books));
    return newData;
  } catch (error) {
    console.log(error);
  }
};

const deleteDataBookToFile = (index) => {
  try {
    const dataPath = './data/books.json';

    if (!fs.existsSync(dataPath)) {
      fs.writeFileSync(dataPath, '[]');
    }

    const readFile = fs.readFileSync(dataPath, 'utf-8');
    const books = JSON.parse(readFile);
    books.splice(index, 1);
    fs.writeFileSync(dataPath, JSON.stringify(books));
    return true;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getBooks, saveDataBookToFile, updateDataBookToFile, deleteDataBookToFile };
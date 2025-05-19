const sortByTitle = (arr) => arr.sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase(), 'ru', { sensitivity: 'base' }));

module.exports = sortByTitle;
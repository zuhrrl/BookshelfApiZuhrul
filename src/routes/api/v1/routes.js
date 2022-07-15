const {
    addBookShelfHandler,
    getBookShelfHandler,
    updateBookShelHandler,
    getBookShelfHandlerById,
    deleteBookShelfByIdHandler,
} = require('../../../controller/api/v1/handler/handler')

const routes = [
    {
        method: 'GET',
        path: '/',
        handler: () => {
            return 'Homepage'
        },
    },
    {
        method: 'POST',
        path: '/books',
        handler: addBookShelfHandler
    },

    {
        method: 'GET',
        path: '/books',
        handler: getBookShelfHandler
    },
    {
        method: 'GET',
        path: '/books/{bookId}',
        handler: getBookShelfHandlerById
    },
    {
        method: 'PUT',
        path: '/books/{bookId}',
        handler: updateBookShelHandler
    },
    {
        method: 'DELETE',
        path: '/books/{bookId}',
        handler: deleteBookShelfByIdHandler
    }
]

module.exports = routes
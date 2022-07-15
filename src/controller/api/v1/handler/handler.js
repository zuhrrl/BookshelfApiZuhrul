const {
    nanoid
} = require('nanoid')
const {
    sendResponse
} = require('../../../../helper/response')
const Books = require('../../../../database/book-database')


const isBookInDatabase = (bookDetail) => {
    const filter = Books.filter((book) => {
        if (book.name == bookDetail.name &&
            book.publisher == bookDetail.publisher) return book
    })
    if (filter.length > 0) return true
    return false

}

const addBookShelfHandler = (request, hapi) => {
    const payload = request.payload
    const id = nanoid(16)
    const createdAt = new Date().toISOString()
    const updatedAt = createdAt
    const finished = payload.pageCount == payload.readPage ? true : false


    if (payload.name == null) {
        const message = {
            'status': 'fail',
            'message': 'Gagal menambahkan buku. Mohon isi nama buku',
        }
        return sendResponse(hapi, message, 400)
    }

    if (payload.readPage > payload.pageCount) {
        const message = {
            'status': 'fail',
            'message': 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        }
        return sendResponse(hapi, message, 400)
    }

    const book = {
        'id': id,
        'name': payload.name,
        'year': payload.year,
        'author': payload.author,
        'summary': payload.summary,
        'publisher': payload.publisher,
        'pageCount': payload.pageCount,
        'readPage': payload.readPage,
        'finished': finished,
        'reading': payload.reading,
        'insertedAt': createdAt,
        'updatedAt': updatedAt
    }

    Books.push(book)
    const message = {
        'status': 'success',
        'message': 'Buku berhasil ditambahkan',
        'data': {
            'bookId': id
        }
    }

    if (!isBookInDatabase(book)) {

        const message = {
            'status': 'error',
            'message': 'Buku gagal ditambahkan'
        }
        return sendResponse(hapi, message, 500)
    }

    return sendResponse(hapi, message, 201)

}


const getBookShelfHandlerById = (request, hapi) => {
    const params = request.params

    if (params.bookId) {
        const bookById = Books.filter((book) => {

            if (book.id == params.bookId) {
                return book
            }
        })


        if (bookById.length > 0) {
            const message = {
                'status': 'success',
                'data': {
                    'book': bookById[0]
                }
            }
            return message
        }

        return sendResponse(hapi, {
            'status': 'fail',
            'message': 'Buku tidak ditemukan'
        }, 404)
    }
}

const getBookShelfHandler = (request, hapi) => {
    const {
        name,
        reading,
        finished
    } = request.query
    let allBook = []

    if (name) {
        Books.forEach(book => {
            const bookName = book.name.toLowerCase()
            if (bookName.includes(name.toLowerCase())) {
                const bookItem = {
                    'id': book.id,
                    'name': book.name,
                    'publisher': book.publisher
                }
                allBook.push(bookItem)
            }
        })

        const message = {
            'status': 'success',
            'data': {
                'books': allBook
            }
        }

        return sendResponse(hapi, message, 200)
    }

    if (finished == 1) {
        Books.forEach(book => {
            const isBookFinished = book.finished ? book.finished : false
            if (isBookFinished) {
                const bookItem = {
                    'id': book.id,
                    'name': book.name,
                    'publisher': book.publisher
                }
                allBook.push(bookItem)
            }
        })

        const message = {
            'status': 'success',
            'data': {
                'books': allBook
            }
        }

        return sendResponse(hapi, message, 200)
    }

    if (finished == 0) {
        Books.forEach(book => {
            const isBookFinished = book.finished ? book.finished : false
            if (!isBookFinished) {
                const bookItem = {
                    'id': book.id,
                    'name': book.name,
                    'publisher': book.publisher
                }
                allBook.push(bookItem)
            }
        })

        const message = {
            'status': 'success',
            'data': {
                'books': allBook
            }
        }

        return sendResponse(hapi, message, 200)
    }

    if (reading == 1) {
        Books.forEach(book => {
            const isReading = book.reading ? book.reading : false
            if (isReading) {
                const bookItem = {
                    'id': book.id,
                    'name': book.name,
                    'publisher': book.publisher
                }
                allBook.push(bookItem)
            }
        })

        const message = {
            'status': 'success',
            'data': {
                'books': allBook
            }
        }

        return sendResponse(hapi, message, 200)
    }

    if (reading == 0) {
        Books.forEach(book => {
            const isReading = book.reading ? book.reading : false
            if (!isReading) {
                const bookItem = {
                    'id': book.id,
                    'name': book.name,
                    'publisher': book.publisher
                }
                allBook.push(bookItem)
            }
        })

        const message = {
            'status': 'success',
            'data': {
                'books': allBook
            }
        }

        return sendResponse(hapi, message, 200)
    }

    Books.forEach(book => {
        const bookItem = {
            'id': book.id,
            'name': book.name,
            'publisher': book.publisher
        }
        allBook.push(bookItem)
    })

    const message = {
        'status': 'success',
        'data': {
            'books': allBook
        }
    }

    return sendResponse(hapi, message, 200)

}

const updateBookShelHandler = (request, hapi) => {
    const payload = request.payload
    const params = request.params


    if (payload.name == undefined) {
        return sendResponse(hapi, {
            'status': 'fail',
            'message': 'Gagal memperbarui buku. Mohon isi nama buku'
        }, 400)
    }

    let bookToUpdate = Books.filter((book) => {
        if (book.id == params.bookId) {
            return book
        }
    })

    if (bookToUpdate.length > 0) {

        if (payload.readPage > payload.pageCount) {
            const message = {
                'status': 'fail',
                'message': 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
            }
            return sendResponse(hapi, message, 400)
        }
        bookToUpdate = bookToUpdate[0]
        bookToUpdate.name = payload.name
        bookToUpdate.year = payload.year
        bookToUpdate.author = payload.author
        bookToUpdate.publisher = payload.publisher
        bookToUpdate.summary = payload.summary
        bookToUpdate.pageCount = payload.pageCount
        bookToUpdate.readPage = payload.readPage
        bookToUpdate.reading = payload.reading


        return sendResponse(hapi, {
            'status': 'success',
            'message': 'Buku berhasil diperbarui'
        }, 200)

    }

    const message = {
        'status': 'fail',
        'message': 'Gagal memperbarui buku. Id tidak ditemukan',
    }
    return sendResponse(hapi, message, 404)
}

const deleteBookShelfByIdHandler = (request, hapi) => {
    const params = request.params

    const bookToDelete = Books.filter((book) => {
        if (book.id == params.bookId) {
            return book
        }
    })

    if (bookToDelete.length > 0) {
        let bookIndex = Books.findIndex((book) => book.id == bookToDelete[0].id)
        // Delete book
        Books.splice(bookIndex, 1)

        return sendResponse(hapi, {
            'status': 'success',
            'message': 'Buku berhasil dihapus'
        }, 200)
    }

    return sendResponse(hapi, {
        'status': 'fail',
        'message': 'Buku gagal dihapus. Id tidak ditemukan'
    }, 404)
}


module.exports = {
    addBookShelfHandler,
    getBookShelfHandler,
    updateBookShelHandler,
    getBookShelfHandlerById,
    deleteBookShelfByIdHandler
}
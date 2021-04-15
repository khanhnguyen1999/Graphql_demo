import { useMutation, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import CardColumns from 'react-bootstrap/CardColumns'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { deleteSingleAuthor } from '../graphql-client/mutations'
import { getAuthors } from '../graphql-client/queries'
import BookDetails from './BookDetails'


const BookList = () => {
    const [bookSelected, setBookSelected] = useState(null)

    const { loading, error, data } = useQuery(getAuthors)
    const [deleteAuthor, dataMutation] = useMutation(deleteSingleAuthor)

    if (loading) return <p>Loading books....</p>
    if (error) return <p>Error loading books!</p>
    const handleDelete = (id) => {
        console.log("id ", id)
        deleteAuthor({
            variables: { id },
            refetchQueries: [{ query: deleteSingleAuthor }]
        })
    }
    console.log("author ", data)
    return (
        <Row>
            <Col xs={8}>
                <CardColumns>
                    {data?.authors.map(book => (
                        <Card
                            border='info'
                            text='info'
                            className='text-center shadow'
                            key={book.id}
                            onClick={setBookSelected.bind(this, book.id)}
                            style={{ cursor: 'pointer' }}
                        >
                            <Button onClick={() => handleDelete(book.id)}>Delete</Button>
                            <Card.Body>{book.name}</Card.Body>
                        </Card>
                    ))}
                </CardColumns>
            </Col>
            <Col>
                <BookDetails bookId={bookSelected} />
            </Col>
        </Row>
    )
}

export default BookList

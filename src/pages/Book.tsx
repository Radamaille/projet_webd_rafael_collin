import {useParams} from 'react-router-dom';
import { useEffect, useState } from 'react';

interface BookDetails {
    title: string;
    covers?: number[];
    description?: string | { value: string };
    subjects?: string[];
}

const Book = () => {
    const {id} = useParams();
    const [book, setBook] = useState<BookDetails | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!id) {
            setError('Book Id is invalid');
            return;
        }

        const fetchBook = async () => {
            setLoading(true);
            setError('');

            try{
                const response = await fetch(`https://openlibrary.org/works/${id}.json`);

                if (!response.ok){
                    setError( 'coulnd not fetch book id' );
                    return;
                }

                const data = await response.json();
                setBook(data);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };
        fetchBook();

    }, [id]);

    if (loading){
        return <p>Loading...</p>;
    }

    if (error){
        return <p>Error: {error}</p>;
    }

    if (!book){
        return null;
    }

    const description = typeof book.description === 'string' ? book.description : book.description?.value;

    return (
        <div>
            <h2>{book.title}</h2>

            {book.covers && book.covers.length > 0 && (
            <img
                src={`https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`}
                alt={`Cover for ${book.title}`}
            />
            )}

            {description && <p>{description}</p>}
            {book.subjects && (
                <div>
                    <h3>Subjects</h3>
                    <ul>
                        {book.subjects.slice(0, 10).map(subject => (
                            <li key={subject}>{subject}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
export default Book;
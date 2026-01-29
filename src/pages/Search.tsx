import {useEffect, useState} from "react";
import { useSearchParams, Link} from "react-router-dom";

interface Book{
    key: string;
    title: string;
    author_name?: string[];
    first_publish_year?: number;
}

const Search = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query') || '';
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!query) return ;
        const fetchBooks = async() => {
            setLoading(true);
            setError('');

            try {
                const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`);

                if (!response.ok){
                    setError('Could not fetch search results.');
                    return;
            }

            const data = await response.json();
            setBooks(data.docs);

        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    }; fetchBooks();

}, [query]);

    if (!query){
        return <p>Please enter a search term.</p>;
    }

    return (
        <div>
            <h2>Search Results for "{query}"</h2>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {!loading && !error && books.length === 0 && <p>No results found.</p>}
            <ul>
                {books.map((book) => (
                    <li key={book.key}>
                        <Link to={`/book/${book.key.replace('/works/', '')}`}>
                            <strong>{book.title}</strong>
                        </Link>
                        {book.author_name && <p>Author: {book.author_name.join(', ')}</p>}
                        {book.first_publish_year && <p>First Published: {book.first_publish_year}</p>}
                    </li>
                ))}
            </ul>

            {!loading && !error && books.length===0 && <p>
                No results found for.
            </p>}
        </div>
    );
};

export default Search;

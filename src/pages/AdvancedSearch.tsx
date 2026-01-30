import { useForm} from "react-hook-form";
import { useState } from "react";
import { Link} from "react-router-dom";

interface FormData {
    title?: string;
    author?: string;
    year?: string;
}

interface Book{
    key: string;
    title: string;
    author_name?: string[];
    first_publish_year?: number;
}

const AdvancedSearch = () => {
    const { register, handleSubmit } = useForm<FormData>();
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const onSubmit = async (data: FormData) => {
        setLoading(true);
        setError('');

        const params = new URLSearchParams();
        if (data.title) params.append('title', data.title);
        if (data.author) params.append('author', data.author);
        if (data.year) params.append('first_publish_year', data.year);

        try {
            const response = await fetch(`https://openlibrary.org/search.json?${params.toString()}`);

            if (!response.ok){
                setError('Could not fetch search results.');
                return;
            }

            const result = await response.json();
            setBooks(result.docs);

        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Advanced Search</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    placeholder="Title"
                    {...register('title')}
                />
                <input
                    type="text"
                    placeholder="Author"
                    {...register('author')}
                />
                <input
                    type="number"
                    placeholder="Publication Year"
                    {...register('year')}
                />
                <button type="submit">Search</button>
            </form>

            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {!loading && !error && books.length === 0 && <p>No results found.</p>}
            <ul>
                {books.map((book) => (
                    <li key={book.key}>
                        <Link to={`/book/${book.key.replace('/works/', '')}`}>
                            {book.title}
                        </Link>
                        {book.author_name && <p>Author: {book.author_name.join(', ')}</p>}
                        {book.first_publish_year && <p>First Published: {book.first_publish_year}</p>}
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default AdvancedSearch;
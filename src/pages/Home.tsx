import {useEffect, useState} from "react";
import { Link } from "react-router-dom";

interface RecentsChanges{
    id: string;
    kind: string;
    timestamp: string;
    comment?: string;
    changes?:{
        key: string;
    } [];
}

const Home = () => {
    const [changes, setChanges] = useState<RecentsChanges[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchRecentsChanges = async () => {
            setLoading(true);
            setError('');

            try {
                const response = await fetch('https://openlibrary.org/recentchanges.json?limit=20');

                if (!response.ok){
                    setError('Could not fetch recent changes.');
                    return;
                }

                const data = await response.json();
                setChanges(data);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };
        fetchRecentsChanges();
    }, []);

    const bookChanges = changes.filter((change) => change.changes?.some((c) => c.key.startsWith('/works/')));

    return (
        <div>
            <h1>Recent Library Updates</h1>

            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {!loading && !error && changes.length === 0 && <p>No recent changes found.</p>}
            <ul>
                {bookChanges.map((change) => {
                    const detailsChange = change.changes!.find(c =>
                        c.key.startsWith('/works/')
                    )!.key;

                    return (
                        <li key={change.id}>
                            <p>
                                <strong>Change type:</strong> {change.kind}
                            </p>

                            {change.comment && <p>{change.comment}</p>}

                            <p>
                                <strong>Date:</strong>{' '}
                                {new Date(change.timestamp).toLocaleString()}
                            </p>

                            <Link to={`/book/${detailsChange.replace('/works/', '')}`}>
                                View book details
                            </Link>
                        </li>
                    );
                })}
            </ul>

            {!loading && bookChanges.length === 0 && (
                <p>No recent book-related updates found.</p>
            )}


        </div>
    );
};

export default Home;
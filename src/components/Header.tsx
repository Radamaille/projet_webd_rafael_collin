
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const [search, setSearch] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!search.trim()) {
            setError('enter a search term please.');
            return;
        }
        setError('');
        navigate(`/search?query=${encodeURIComponent(search.trim())}`);
        setSearch('');
    }
    return (
        <header>
            <h1>SearchBar</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={search}
                    onChange={(e) => { setSearch(e.target.value);
                        if (error) setError('');}}
                    placeholder="Search for books..."
                />
                <button type="submit" disabled={!search.trim()}>Search</button>
            </form>
        </header>
    );
}
export default Header;
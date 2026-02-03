import {render, screen} from '@testing-library/react';
import {MemoryRouter} from "react-router-dom";
import Home from "../pages/Home";

test('renders recent changes list', async () => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            ok: true,
            json: () =>
                Promise.resolve([
                    {
                        id: '1',
                        kind: 'edit-book',
                        timestamp: new Date().toISOString(),
                        comment: 'Test comment',
                        changes: [
                            { key: '/works/OL1W' }
                        ],
                    },
                ]),
        } as Response)
    );

    render(
        <MemoryRouter>
            <Home />
        </MemoryRouter>
    );

    expect(await screen.findByText(/edit-book/i)).toBeInTheDocument();
    expect(await screen.findByText(/view book details/i)).toBeInTheDocument();
});
import {render, screen} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import Search from "../pages/Search";

test("Fetch a message when no query is return", () => {
    render(
        <MemoryRouter>
            <Search/>
        </MemoryRouter>
    );
    expect(screen.getByText(/Please enter a search term/i)).toBeInTheDocument();
});

test('Display search result when query is provided', async() => {
    global.fetch = jest.fn(()=>
        Promise.resolve({
            ok: true,
            json: () =>
                Promise.resolve({
                    docs: [
                        {
                            key: '/works/OL123W',
                            title: 'Test Book',
                            author_name: ['auteur2renom'],
                        },
                    ],
                }),
        } as Response)
    );

    render(
        <MemoryRouter initialEntries={['/search?query=test']}>
            <Search />
        </MemoryRouter>
    );
    expect(await screen.findByText('Test Book')).toBeInTheDocument();
});
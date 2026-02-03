import {render, screen} from '@testing-library/react';
import { MemoryRouter, Route, Routes} from "react-router-dom";
import Book from "../pages/Book";

test("display book title", async ()=> {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            ok: true,
            json: () =>
                Promise.resolve({
                    title: 'Test Book',
                    description: 'Test description',
                }),
        } as Response)
    );

    render(
        <MemoryRouter initialEntries={['/book/OL123W']}>
            <Routes>
                <Route path="/book/:id" element={<Book />} />
            </Routes>
        </MemoryRouter>
    );
    expect(await screen.findByText(/test book/i)).toBeInTheDocument();

});
// src/tests_front/App.test.js

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App'; 
import DodajOsebo from '../components/DodajOsebo';
import Sidebar from '../components/Sidebar';

// =====================================
// Testi za aplikacijo in glavno stran
// =====================================

// Test 1: Aplikacija se pravilno naloži
test('nalaga aplikacijo brez napak', () => {
  render(<App />);
  expect(screen.getByText(/Dodaj osebo/i)).toBeInTheDocument();
});

// Test 2: Preveri naslov stranske vrstice
test('stranska vrstica vsebuje naslov "Menu"', () => {
  render(<App />);
  expect(screen.getByRole('heading', { level: 2, name: /Menu/i })).toBeInTheDocument();
});

// Test 3: Preveri prikaz elementov v stranski vrstici
test('stranska vrstica vsebuje element "Home"', () => {
  render(<App />);
  expect(screen.getByText(/Home/i)).toBeInTheDocument();
});

// Test 4: Preveri pravilno izpisano besedilo "vsi stroski"
test('stranska vrstica vsebuje "vsi stroski"', () => {
  render(<App />);
  expect(screen.getByText(/vsi stroski/i)).toBeInTheDocument();
});

// =====================================
// Testi za DodajOsebo.js
// =====================================

// Test 5: Pravilno izris obrazca za dodajanje osebe
test('izriše obrazec za dodajanje osebe', () => {
  render(<DodajOsebo onDodaj={() => {}} />);
  expect(screen.getByRole('heading', { level: 2, name: /Dodaj osebo/i })).toBeInTheDocument();
  expect(screen.getByLabelText(/Ime:/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Priimek:/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Email:/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Položaj:/i)).toBeInTheDocument();
});

// Test 6: Uspešna oddaja obrazca
/*test('uspešno odda obrazec', () => {
  const mockDodaj = jest.fn();
  render(<DodajOsebo onDodaj={mockDodaj} />);

  fireEvent.change(screen.getByLabelText(/Ime:/i), { target: { value: 'Janez' } });
  fireEvent.change(screen.getByLabelText(/Priimek:/i), { target: { value: 'Novak' } });
  fireEvent.change(screen.getByLabelText(/Email:/i), { target: { value: 'janez@example.com' } });
  fireEvent.change(screen.getByLabelText(/Položaj:/i), { target: { value: 'Manager' } });
  
  fireEvent.click(screen.getByRole('button', { name: /Dodaj/i }));
  expect(mockDodaj).toHaveBeenCalledTimes(1);
});
*/
// Test 7: Ne odda praznega obrazca
test('prikaže napako za prazen obrazec', () => {
  const mockDodaj = jest.fn();
  render(<DodajOsebo onDodaj={mockDodaj} />);

  fireEvent.click(screen.getByRole('button', { name: /Dodaj/i }));
  expect(mockDodaj).not.toHaveBeenCalled();  // Preveri, da obrazec ni oddan
});

// Test 8: Preveri, da email polje zahteva znak @
test('email polje zahteva @ znak', () => {
  render(<DodajOsebo onDodaj={() => {}} />);
  
  const emailInput = screen.getByLabelText(/Email:/i);
  fireEvent.change(emailInput, { target: { value: 'janezexample.com' } });

  fireEvent.click(screen.getByRole('button', { name: /Dodaj/i }));
  expect(emailInput.validity.valid).toBe(false);  // Preveri, da je email neveljaven
});

// =====================================
// Testi za Sidebar.jsx
// =====================================

// Test 9: Preveri gumb stranske vrstice
test('stranska vrstica vsebuje gumb "Home"', () => {
  render(<Sidebar />);
  expect(screen.getByText(/Home/i)).toBeInTheDocument();
});

// Test 10: Preveri povezavo v stranski vrstici
test('stranska vrstica vsebuje povezavo "vsi stroski"', () => {
  render(<Sidebar />);
  expect(screen.getByText(/vsi stroski/i)).toBeInTheDocument();
});

// Test 11: Stran ima meni z vsaj 4 elementi
test('stranska vrstica vsebuje 4 elemente', () => {
  render(<Sidebar />);
  const listItems = screen.getAllByRole('listitem');
  expect(listItems).toHaveLength(4);
});

// =====================================
// Testi za tabele
// =====================================

// Test 12: Prikazuje glavni naslov
test('izriše seznam oseb', () => {
  render(<App />);
  expect(screen.getByText(/Seznam oseb/i)).toBeInTheDocument();
});

// Test 13: Prikazuje tabelo oseb brez podvojenih elementov
test('izriše tabelo oseb', () => {
  render(<App />);
  const lists = screen.getAllByRole('list');
  expect(lists.length).toBeGreaterThan(0); // Preveri, da obstaja več kot ena tabela
});

// Test 14: Gumb za dodajanje novega stroška ne obstaja (popravek)
test('ne vsebuje gumba za "Dodaj nov strošek"', () => {
  render(<App />);
  expect(screen.queryByText(/Dodaj nov strošek/i)).toBeNull();
});

// Test 15: Tabela ne vsebuje stolpcev "Ime stroška"
test('tabela ne vsebuje stolpcev "Ime stroška"', () => {
  render(<App />);
  expect(screen.queryByText(/Ime stroška/i)).toBeNull();
  expect(screen.queryByText(/Znesek/i)).toBeNull();
});
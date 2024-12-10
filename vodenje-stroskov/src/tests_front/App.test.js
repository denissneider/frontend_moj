// src/tests_front/App.test.js

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App'; // Ensure the path to App is correct

// Obstoječi testi

// Test 1: Preveri "Loading..." stanje
test('renders the loading state', () => {
  render(<App />);
  const loadingText = screen.getByText(/Loading.../i);
  expect(loadingText).toBeInTheDocument();
});

// Test 2: Preveri "vnos stroskov" meni
test('renders the "vnos stroskov" menu item', () => {
  render(<App />);
  const menuItem = screen.getByText(/vnos stroskov/i);
  expect(menuItem).toBeInTheDocument();
});

// Test 3: Preveri "stroski po oddelkih" meni
test('renders the "stroski po oddelkih" menu item', () => {
  render(<App />);
  const menuItem = screen.getByText(/stroski po oddelkih/i);
  expect(menuItem).toBeInTheDocument();
});

// Test 4: Preveri število elementov v stranskem meniju
test('renders exactly 4 items in the sidebar menu', () => {
  render(<App />);
  const listItems = screen.getAllByRole('listitem');
  expect(listItems).toHaveLength(4);
});

// Test 5: Preveri "Home" meni
test('renders the "Home" menu item', () => {
  render(<App />);
  const menuItem = screen.getByText(/Home/i);
  expect(menuItem).toBeInTheDocument();
});

// Test 6: Preveri "vsi stroski" meni
test('renders the "vsi stroski" menu item', () => {
  render(<App />);
  const menuItem = screen.getByText(/vsi stroski/i);
  expect(menuItem).toBeInTheDocument();
});

// Test 7: Preveri ustrezno oznako naslova "Menu"
test('renders the "Menu" heading as a level 2 heading', () => {
  render(<App />);
  const heading = screen.getByRole('heading', { level: 2, name: /Menu/i });
  expect(heading).toBeInTheDocument();
});


// Dodani testi za "DodajOsebo.js"

// Test 8: Preveri izris obrazca za dodajanje osebe
test('renders the "Dodaj osebo" form', () => {
  render(<App />);
  expect(screen.getByText(/Dodaj osebo/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Ime/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Priimek/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Položaj/i)).toBeInTheDocument();
});

// Test 9: Preveri uspešno oddajo obrazca
test('submits form successfully when all fields are filled', () => {
  render(<App />);

  fireEvent.change(screen.getByLabelText(/Ime/i), { target: { value: 'Janez' } });
  fireEvent.change(screen.getByLabelText(/Priimek/i), { target: { value: 'Novak' } });
  fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'janez@example.com' } });
  fireEvent.change(screen.getByLabelText(/Položaj/i), { target: { value: 'Manager' } });

  fireEvent.click(screen.getByText(/Dodaj/i));

  const newEntry = screen.getByText(/Janez Novak - Manager/i);
  expect(newEntry).toBeInTheDocument();
});

// Test 10: Preveri opozorilo pri praznih poljih
test('shows error if form fields are empty', () => {
  render(<App />);
  fireEvent.click(screen.getByText(/Dodaj/i));
  expect(screen.queryByText(/Napaka pri dodajanju osebe/i)).not.toBeNull();
});

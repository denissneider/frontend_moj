import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App'; // Ensure the path to App is correct

// Test 1: Check for "Dobrodošli" (might fail)
//test('renders the application without crashing', () => {
//  render(<App />);
//  expect(screen.getByText(/Dobrodošli/i)).toBeInTheDocument();
//});

// Test 2: Ensure the sidebar menu heading "Menu" exists (should pass)
//test('renders the sidebar menu heading', () => {
//  render(<App />);
//  const sidebarHeading = screen.getByText(/Menu/i);
//  expect(sidebarHeading).toBeInTheDocument();
//});

// Test 3: Ensure the "Loading..." text is rendered (should pass)
test('renders the loading state', () => {
  render(<App />);
  const loadingText = screen.getByText(/Loading.../i);
  expect(loadingText).toBeInTheDocument();
});

// Test 4: Ensure the "vnos stroskov" menu item exists (should pass)
test('renders the "vnos stroskov" menu item', () => {
  render(<App />);
  const menuItem = screen.getByText(/vnos stroskov/i);
  expect(menuItem).toBeInTheDocument();
});

// Test 5: Check for "stroski po oddelkih" menu item (should pass)
test('renders the "stroski po oddelkih" menu item', () => {
  render(<App />);
  const menuItem = screen.getByText(/stroski po oddelkih/i);
  expect(menuItem).toBeInTheDocument();
});

// Test 6: Ensure there are exactly 4 list items in the sidebar menu (should pass)
test('renders exactly 4 items in the sidebar menu', () => {
  render(<App />);
  const listItems = screen.getAllByRole('listitem');
  expect(listItems).toHaveLength(4);
});

// Test 7: Ensure "Home" menu item exists (should pass)
test('renders the "Home" menu item', () => {
  render(<App />);
  const menuItem = screen.getByText(/Home/i);
  expect(menuItem).toBeInTheDocument();
});

// Test 8: Check for "vsi stroski" menu item (should pass)
test('renders the "vsi stroski" menu item', () => {
  render(<App />);
  const menuItem = screen.getByText(/vsi stroski/i);
  expect(menuItem).toBeInTheDocument();
});

// Test 9: Ensure the "Menu" heading has correct semantic structure (should pass)
test('renders the "Menu" heading as a level 2 heading', () => {
  render(<App />);
  const heading = screen.getByRole('heading', { level: 2, name: /Menu/i });
  expect(heading).toBeInTheDocument();
});


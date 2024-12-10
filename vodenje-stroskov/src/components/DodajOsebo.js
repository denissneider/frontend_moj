// frontend_moj/src/components/DodajOsebo.js
import React, { useState } from 'react';

function DodajOsebo({ onDodaj }) {
    const [ime, setIme] = useState('');
    const [priimek, setPriimek] = useState('');
    const [email, setEmail] = useState('');
    const [polozaj, setPolozaj] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const novaOseba = { ime, priimek, email, polozaj };

        const response = await fetch('/api/zaposleni', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(novaOseba),
        });

        if (response.ok) {
            const data = await response.json();
            onDodaj(data);
            setIme('');
            setPriimek('');
            setEmail('');
            setPolozaj('');
        } else {
            alert('Napaka pri dodajanju osebe');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Dodaj osebo</h2>
            <label>
                Ime:
                <input type="text" value={ime} onChange={(e) => setIme(e.target.value)} required />
            </label>
            <label>
                Priimek:
                <input type="text" value={priimek} onChange={(e) => setPriimek(e.target.value)} required />
            </label>
            <label>
                Email:
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </label>
            <label>
                Položaj:
                <input type="text" value={polozaj} onChange={(e) => setPolozaj(e.target.value)} required />
            </label>
            <button type="submit">Dodaj</button>
        </form>
    );
}

export default DodajOsebo;

import React, { useState } from 'react';
import './LogForm.css';

export default function LogForm() {
    const [entries, setEntries] = useState([]);
    const [form, setForm] = useState({
        Plant: "",
        Category: "",
        Symptoms: "",
        Body: ""
    });
    const [filters, setFilters] = useState({
        Plant: "",
        Category: "",
        Symptoms: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.Plant || !form.Category || !form.Symptoms || !form.Body) {
            alert("Please fill out all fields");
            return;
        }
        const newEntry = {
            id: Date.now(),
            timestamp: new Date().toLocaleString(),
            ...form
        };
        setEntries([...entries, newEntry]);
        setForm({
            Plant: "",
            Category: "",
            Symptoms: "",
            Body: ""
        });
    };

    // Filter entries based on selected filters
    const filteredEntries = entries.filter((entry) => {
        return (
            (filters.Plant === "" || entry.Plant === filters.Plant) &&
            (filters.Category === "" || entry.Category === filters.Category) &&
            (filters.Symptoms === "" || entry.Symptoms === filters.Symptoms)
        );
    });

    return (
        <div className="log-form-container">
            <div className="header">
                <h1>Plant Diaries</h1>
            </div>

            <div className="new-entry-form">
                <form onSubmit={handleSubmit}>
                    <table>
                        <thead>
                            <tr>
                                <th>Plant</th>
                                <th>Category</th>
                                <th>Symptoms</th>
                                <th>Body</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <select name="Plant" value={form.Plant} onChange={handleChange}>
                                        <option value="">Select Plant</option>
                                        <option value="other">Other</option>
                                        <option value="basil">Basil</option>
                                        <option value="thyme">Thyme</option>
                                        <option value="mint">Mint</option>
                                        <option value="rose">Rose</option>
                                        <option value="aloevera">Aloe Vera</option>
                                        <option value="cactus">Cactus</option>
                                        <option value="snake">Snake Plant</option>
                                        <option value="money">Money Plant</option>
                                        <option value="monstera">Monstera</option>
                                    </select>
                                </td>
                                <td>
                                    <select name="Category" value={form.Category} onChange={handleChange}>
                                        <option value="">Select Category</option>
                                        <option value="other">Other</option>
                                        <option value="flower">Flower</option>
                                        <option value="succulent">Succulent</option>
                                        <option value="herb">Herb</option>
                                        <option value="tropical">Tropical</option>
                                    </select>
                                </td>
                                <td>
                                    <select name="Symptoms" value={form.Symptoms} onChange={handleChange}>
                                        <option value="">Select Symptoms</option>
                                        <option value="other">Other</option>
                                        <option value="wilt">Wilting</option>
                                        <option value="shed">Shedding</option>
                                        <option value="yellow">Yellowing Leaves</option>
                                        <option value="black">Black Spots</option>
                                        <option value="pests">Pests</option>
                                    </select>
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        name="Body"
                                        value={form.Body}
                                        onChange={handleChange}
                                        placeholder="Log your plant's condition here"
                                    />
                                </td>
                                <td>
                                    <button type="submit" className="submit-button">+ NEW ENTRY</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>

            <div className="filters-section">
                <div className="filter-group">
                    <label>Plant</label>
                    <select name="Plant" value={filters.Plant} onChange={handleFilterChange}>
                        <option value="">All Plants</option>
                        <option value="other">Other</option>
                        <option value="basil">Basil</option>
                        <option value="thyme">Thyme</option>
                        <option value="mint">Mint</option>
                        <option value="rose">Rose</option>
                        <option value="aloevera">Aloe Vera</option>
                        <option value="cactus">Cactus</option>
                        <option value="snake">Snake Plant</option>
                        <option value="money">Money Plant</option>
                        <option value="monstera">Monstera</option>
                    </select>
                </div>
                <div className="filter-group">
                    <label>Category</label>
                    <select name="Category" value={filters.Category} onChange={handleFilterChange}>
                        <option value="">All Categories</option>
                        <option value="other">Other</option>
                        <option value="flower">Flower</option>
                        <option value="succulent">Succulent</option>
                        <option value="herb">Herb</option>
                        <option value="tropical">Tropical</option>
                    </select>
                </div>
                <div className="filter-group">
                    <label>Symptoms</label>
                    <select name="Symptoms" value={filters.Symptoms} onChange={handleFilterChange}>
                        <option value="">All Symptoms</option>
                        <option value="other">Other</option>
                        <option value="wilt">Wilting</option>
                        <option value="shed">Shedding</option>
                        <option value="yellow">Yellowing Leaves</option>
                        <option value="black">Black Spots</option>
                        <option value="pests">Pests</option>
                    </select>
                </div>
            </div>

            <table className="entries-table">
                <thead>
                    <tr>
                        <th>Plant</th>
                        <th>Category</th>
                        <th>Symptoms</th>
                        <th>Body</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {filteredEntries.map((entry) => (
                        <tr key={entry.id}>
                            <td>{entry.Plant}</td>
                            <td>{entry.Category}</td>
                            <td>{entry.Symptoms}</td>
                            <td>{entry.Body}</td>
                            <td>
                                <button className="see-more-button">See more from this user</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}


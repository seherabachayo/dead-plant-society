import React, { useState, useEffect } from 'react';
import './LogForm.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function LogForm() {
    const navigate = useNavigate();
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

    // Fetch existing logs when component mounts
    useEffect(() => {
        fetchLogs();
    }, []);

    const fetchLogs = async () => {
        try {
            const response = await axios.get('http://localhost:5050/api/logs');
            setEntries(response.data.data);
        } catch (error) {
            console.error('Error fetching logs:', error);
        }
    };

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.Plant || !form.Category || !form.Symptoms || !form.Body) {
            alert("Please fill out all fields");
            return;
        }

        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            alert('Please log in to create a plant log');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5050/api/logs', {
                ...form,
                userId: user._id,
                username: user.username
            });
            const newEntry = response.data.data;
            setEntries([newEntry, ...entries]);
            setForm({
                Plant: "",
                Category: "",
                Symptoms: "",
                Body: ""
            });
        } catch (error) {
            console.error('Error creating log:', error);
            alert('Failed to create log entry. Please try again.');
        }
    };

    const handleSeeMore = (userId) => {
        navigate(`/my-activity?userId=${userId}`);
    };

    // Filter entries based on selected filters
    const filteredEntries = entries.filter((entry) => {
        return (
            (filters.Plant === "" || entry.plant === filters.Plant.toLowerCase()) &&
            (filters.Category === "" || entry.category === filters.Category.toLowerCase()) &&
            (filters.Symptoms === "" || entry.symptoms === filters.Symptoms.toLowerCase())
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
                        <th>Date</th>
                        <th>User</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {filteredEntries.map((entry) => (
                        <tr key={entry._id}>
                            <td>{entry.plant}</td>
                            <td>{entry.category}</td>
                            <td>{entry.symptoms}</td>
                            <td>{entry.body}</td>
                            <td>{new Date(entry.date).toLocaleDateString()}</td>
                            <td>{entry.username}</td>
                            <td>
                                <button 
                                    className="see-more-button"
                                    onClick={() => handleSeeMore(entry.user)}
                                >
                                    See more from this user
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
} 
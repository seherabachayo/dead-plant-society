import React, { useState } from 'react';
import './CreatePostForm.css';

export default function CreatePostForm() {
    const [postType, setPostType] = useState('post'); // 'post' or 'obituary'
    const [formData, setFormData] = useState({
        title: '',
        body: '',
        dates: '',
        finalMessage: '',
        images: [],
        tags: []
    });

    const availableTags = [
        'For the vibes',
        'Good news',
        'Farewell',
        'Advice',
        'Tips & Tricks'
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setFormData(prev => ({
            ...prev,
            images: [...prev.images, ...files]
        }));
    };

    const handleTagToggle = (tag) => {
        setFormData(prev => {
            const currentTags = prev.tags;
            if (currentTags.includes(tag)) {
                return {
                    ...prev,
                    tags: currentTags.filter(t => t !== tag)
                };
            } else {
                return {
                    ...prev,
                    tags: [...currentTags, tag]
                };
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Handle form submission
        console.log(formData);
    };

    return (
        <div className="create-post-form">
            <div className="post-type-toggle">
                <button 
                    className={postType === 'post' ? 'active' : ''} 
                    onClick={() => setPostType('post')}
                >
                    POST
                </button>
                <button 
                    className={postType === 'obituary' ? 'active' : ''} 
                    onClick={() => setPostType('obituary')}
                >
                    OBITUARY
                </button>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="form-field">
                    <label>Title*:</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                {postType === 'post' ? (
                    <>
                        <div className="form-field">
                            <label>Body*:</label>
                            <textarea
                                name="body"
                                value={formData.body}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-field">
                            <label>Upload Images:</label>
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleImageUpload}
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <div className="form-field">
                            <label>Dates*:</label>
                            <input
                                type="text"
                                name="dates"
                                value={formData.dates}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-field">
                            <label>Final Message:</label>
                            <textarea
                                name="finalMessage"
                                value={formData.finalMessage}
                                onChange={handleInputChange}
                            />
                        </div>
                    </>
                )}

                <div className="tags-section">
                    {availableTags.map(tag => (
                        <button
                            key={tag}
                            type="button"
                            className={formData.tags.includes(tag) ? 'tag-selected' : 'tag'}
                            onClick={() => handleTagToggle(tag)}
                        >
                            {tag}
                        </button>
                    ))}
                </div>

                <button type="submit" className="submit-button">
                    Post
                </button>
            </form>
        </div>
    );
} 
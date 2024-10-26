"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";

type FormData = {
  title: string;
  author: string;
  genre: string;
  year: number;
};

const AddBook: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    author: "",
    genre: "",
    year: 0,
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    console.log("Book added:", formData);
  };
  return (
    <>
      <h1 className="text-center text-4xl font-bold text-gray-800 mb-8">
        Add New Book
      </h1>
      <form
        className="bg-white p-6 rounded-md shadow-md w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Author</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Genre</label>
          <input
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Year</label>
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
        >
          Add Book
        </button>
      </form>
    </>
  );
};

export default AddBook;

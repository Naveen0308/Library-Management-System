import React, { useState } from 'react';
import { Button, Label, TextInput, Textarea, Card, Datepicker } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Addbooks() {
  const navigate = useNavigate();
  const [bookData, setBookData] = useState({
    bookName: '',
    author: '',
    genre: '',
    publisher: '',
    published_year: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (e) => {
    const { value } = e.target;
    setBookData((prevData) => ({
      ...prevData,
      published_year: value,
    }));
  };

  const handleAddBooks = async () => {
    try {
      const { bookName, author, genre, publisher, published_year } = bookData;
  
      const response = await axios.post(`https://library-management-system-fnmi.onrender.com/api/add-book`, {
        bookName,
        author,
        genre,
        publisher,
        published_year,
      });
  
      if (response.status === 201) {
        // Book added successfully, navigate back to the mainindex
        navigate('/home');
      } else {
        // Handle errors
        alert(response.data.error || 'Failed to add center');
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <div>
      <h5 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
        Library Management System
      </h5>
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-half md:max-w-2xl p-8 m-4">
          <h5 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
            Enter Book Details
          </h5>
          <form className="flex flex-col gap-4">
            <div className="max-w-md">
              <div className="mb-2 block">
                <Label htmlFor="BookName" value="Book Name:" />
              </div>
              <TextInput
                id="BookName"
                type="text"
                placeholder="Book Name:"
                required
                name="bookName"
                value={bookData.bookName}
                onChange={handleInputChange}
              />
            </div>
            <div className="max-w-md">
              <div className="mb-2 block">
                <Label htmlFor="Author" value="Author:" />
              </div>
              <TextInput
                id="Author"
                type="text"
                placeholder="Author:"
                required
                name="author"
                value={bookData.author}
                onChange={handleInputChange}
              />
            </div>
            <div className="max-w-md">
              <div className="mb-2 block">
                <Label htmlFor="Genre" value="Genre:" />
              </div>
              <TextInput
                id="Genre"
                placeholder="Genre"
                required
                name="genre"
                value={bookData.genre}
                onChange={handleInputChange}
              />
            </div>
            <div className="max-w-md">
              <div className="mb-2 block">
                <Label htmlFor="Publisher" value="Publisher:" />
              </div>
              <TextInput
                id="Publisher"
                placeholder="Publisher"
                required
                name="publisher"
                value={bookData.publisher}
                onChange={handleInputChange}
              />
            </div>
            <div className="max-w-md">
              <div className="mb-2 block">
                <Label htmlFor="published_year" value="Published_Year:" />
              </div>
              <input type="date" className="border border-gray-300 p-1 rounded-md" value={bookData.published_year} onChange={handleDateChange} />
            </div>
            <Button type="button" onClick={handleAddBooks}>
              Add Book
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}

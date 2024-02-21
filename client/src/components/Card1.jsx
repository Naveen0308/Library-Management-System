
import React, { useEffect, useState, useContext } from 'react';
import UserContext from '../UserContext';
import { Card, Button } from 'flowbite-react';
import { HiOutlineArrowRight } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

import Book1 from '../images/b1.jpg';
import axios from 'axios';

export const Card1 = ({ book, bookId }) => {
  const navigate = useNavigate();
  console.log(book.id);
  const { userId, setUserId } = useContext(UserContext);
  console.log(book.title, book.author, book.genre, book.publisher, book.published_year);

  const handleReadBookClick = () => {
    navigate('/read-book');
  };

  const handleDeleteBook = async () => {
    try {
      const response = await axios.post(`http://localhost:8081/api/deleteBook/${bookId}`);
      console.log(response);
      // Force a complete reload, ignoring the cache
      window.location.reload(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <div className="mt-2 mb-2 ml-10 mr-10">
        <Card className="relative flex h-full flex-row gap-4 p-6">
          <div className="flex flex-row justify-center gap-4">
            <div>
              <img className="w-40 h-40 object-cover" src={Book1} alt="Book" />
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <h5 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Name: {book.title}
                </h5>
                <p className="text-gray-700 dark:text-gray-400 mb-4">
                  Author: {book.author}<br />
                  Genre: {book.genre}<br />
                  Publisher: {book.publisher} <br />
                  Published_Year: {book.published_year} <br />
                </p>
              </div>
            </div>
          </div>

          <div className="absolute right-4 top-4">
            {userId === 0 && (
              <Button color="dark" onClick={handleDeleteBook}>
                Delete Book
              </Button>
            )}
          </div>

          <div className="absolute right-4 bottom-4">
            <Button className="w-md" onClick={handleReadBookClick}>
              Read Book <HiOutlineArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}

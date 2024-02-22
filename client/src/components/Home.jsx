import React, { useEffect, useState, useContext } from 'react';
import UserContext from '../UserContext';
import { Card, Button, Label } from 'flowbite-react';
import { HiOutlineArrowRight } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { Card1 } from './Card1';
import axios from 'axios';

const Home = () => {
  const { userId } = useContext(UserContext);
  const [allBooks, setAllBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchAuthorTerm, setSearchAuthorTerm] = useState('');
  const [searchBookTerm, setSearchBookTerm] = useState('');
  const [searchGenreTerm, setSearchGenreTerm] = useState('');
  const [searchPublisherTerm, setSearchPublisherTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://library-management-system-fnmi.onrender.com//api/all-books');
        setAllBooks(response.data.books);
        setFilteredBooks(response.data.books);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleAddBooks = () => {
    navigate('/addbooks');
  };

  const handleSearch = () => {
    let filteredResults = [...allBooks];
  
    if (searchAuthorTerm) {
      filteredResults = filteredResults.filter(book =>
        book.author && book.author.toLowerCase().includes(searchAuthorTerm.toLowerCase())
      );
    }
  
    if (searchBookTerm) {
      filteredResults = filteredResults.filter(book =>
        book.title && book.title.toLowerCase().includes(searchBookTerm.toLowerCase())
      );
    }
  
    if (searchGenreTerm) {
      filteredResults = filteredResults.filter(book =>
        book.genre && book.genre.toLowerCase().includes(searchGenreTerm.toLowerCase())
      );
    }
  
    if (searchPublisherTerm) {
      filteredResults = filteredResults.filter(book =>
        book.publisher && book.publisher.toLowerCase().includes(searchPublisherTerm.toLowerCase())
      );
    }
  
    setFilteredBooks(filteredResults);
  };
  

  const handleClear = () => {
    setSearchAuthorTerm(''); setSearchBookTerm(''); setSearchGenreTerm(''); setSearchPublisherTerm('');
    setFilteredBooks(allBooks);
  };

  return (
    <div>
      <h5 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
        LIBRARY MANAGEMENT
      </h5>

      <div className='flex flex-row gap-4 items-center'>
        <div>
          <label>Author:</label>
          <input type='search' placeholder='Search by Author Name' value={searchAuthorTerm} onChange={e => setSearchAuthorTerm(e.target.value)} />
        </div>
        <div>
          <label>Book Name:</label>
          <input type='search' placeholder='Search by Book Name' value={searchBookTerm} onChange={e => setSearchBookTerm(e.target.value)} />
        </div>
        <div>
          <label>Genre:</label>
          <input type='search' placeholder='Search by Genre' value={searchGenreTerm} onChange={e => setSearchGenreTerm(e.target.value)} />
        </div>
        <div>
          <label>Publisher:</label>
          <input type='search' placeholder='Search by Publisher' value={searchPublisherTerm} onChange={e => setSearchPublisherTerm(e.target.value)} />
        </div>
        <Button onClick={handleSearch}>Search</Button>
        <Button onClick={handleClear}>Clear</Button>
      </div>

      <div className="ml-auto mt-auto">
        {userId === 0 && (
          <Button color="failure" onClick={handleAddBooks}>
            Add Books +<HiOutlineArrowRight className="ml-2 h-5 w-5" />
          </Button>
        )}
      </div>

      {filteredBooks.length > 0 ? (
          filteredBooks.map((b, ind) => {
          console.log(b); // Add this line for debugging
            return <Card1 book={b} key={ind} bookId={b.id} />;
          })
        ) : (
  <p className="text-center text-gray-700 dark:text-gray-300">
    No results found.
  </p>
)}

    </div>
  );
};

export default Home;

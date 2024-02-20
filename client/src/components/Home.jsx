import React, { useEffect, useState,useContext } from 'react';
import UserContext from '../UserContext';
import { Card, Button } from 'flowbite-react';
import { HiOutlineArrowRight } from 'react-icons/hi';
import { Navigate, useNavigate } from 'react-router-dom';
import Book1 from '../images/b1.jpeg'
import axios from 'axios';

const Home = () => {
  const { userId } = useContext(UserContext);
    const bookId=1;
    const slotsData=1;
    const navigate=useNavigate();
    const handleReadBookClick = () =>{
        navigate('/read-book');
    }
    const handleDeleteCenter=async()=>{
        try{
          const response=await axios.post(`http:localhost:8081/api/deleteCenter/${bookId}`);
          console.log(response);
    // Force a complete reload, ignoring the cache
    window.location.reload(true);
        }catch (error) {
          console.error('Error fetching data:', error);  
        }
      };
      const handleAddBooks=()=>{
        navigate('/addbooks');
      }



  return (
    <div>
      <h5 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
        LIBRARY MANAGEMENT
      </h5>
      <div className='name'>Sort By:</div>
                            <div className='inputs'>
                                <select className='Sort-by'>
                                    <option value="">Sort By</option>
                                    <option value="Author">Author</option>
                                    <option value="Publisher">Publisher</option>
                                    <option value="Published Year">Published Year</option>
                                    <option value="Genre">Genre</option>
                                    <option value="Publisher">Publisher</option>
                              
                                </select>
                            </div>
      <div className="ml-auto mt-auto">
        {userId === 0 ? (
          <Button color="failure" onClick={handleAddBooks}>
            Add Books +<HiOutlineArrowRight className="ml-2 h-5 w-5" />
          </Button>
        ) : null}
      </div>
    <div className="mt-2 mb-2 ml-10 mr-10">
  <Card className="relative flex h-full flex-row gap-4 p-6">
    <div className='flex flex-row justify-center gap-4'>
      <div>
        <img className="w-40 h-40 object-cover" src={Book1} alt="Book" />
      </div>
      <div className="flex flex-col justify-between">
        <div>
          <h5 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Name:
          </h5>
          <p className="text-gray-700 dark:text-gray-400 mb-4">
            Author:<br />
            Genre: <br />
            Publisher: <br />
            Published_Year: <br />
          </p>
        </div>
      </div>
    </div>
    
      <div className="absolute right-4 bottom-4">
        <Button className="w-md">
          Read Book <HiOutlineArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
      {userId === 0 ? (
        <Button color="dark" onClick={handleDeleteCenter}>
          Delete Center
          <svg
            className="-mr-1 ml-2 h-4 w-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
        ):null}

  
  </Card>
</div>




  </div>
  )
}

export default Home
import React from 'react'
import { useState, useContext } from 'react';
import { Button, Card, Label, TextInput, Checkbox } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../UserContext';
export const Login = () => {

    const navigate = useNavigate();
    const {userId, setUserId} = useContext(UserContext);
    //const {emailId,setEmailId}=useContext(UserContext);
    console.log(userId);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
      });
      //const serverurl=process.env.REACT_APP_SERVERURL;
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      };
    
      const handleLoginClick = async () => {
        try {
            const { email, password } = formData;
            const response = await axios.post('https://library-management-system-ako5.onrender.com/api/login', {
                email,
                password,
            });
    
            if (response.status === 200) {
                const data = response.data;
                console.log("logged in user data:", data);
                
                // Update the context with the logged-in user's email
                //setEmailId(data.email);
                setUserId(data.userId);
                navigate('/home');
            } else {
                alert(response.data.error || 'Login failed');
            }
        } catch (error) {
            console.error(error);
        }
    };


    const handleAdminClick = () => {
        navigate('/admin');
      };
    
      const handleSignupClick = () => {
        navigate('/signup');
      };
  return (
    <div>
        <h5 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
        LIBRARY MANAGEMENT
      </h5>
      <div className="flex items-center justify-center min-h-screen">
        <form className="flex max-w-md flex-col gap-4">
          <div className="flex items-center justify-center min-h-screen">
            <Card className="w-full md:max-w-2xl p-8 m-4">
              <h5 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">LOGIN </h5>
              <div className="mb-4">
                <Label htmlFor="email1" value="Your email" />
                <TextInput
                  id="email1"
                  type="email"
                  placeholder="Email"
                  required
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <Label htmlFor="password1" value="Your password" />
                <TextInput
                  id="password1"
                  type="password"
                  placeholder="Password"
                  required
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex items-center gap-2 mb-4">
                <Checkbox id="remember" />
                <Label htmlFor="remember">Remember me</Label>
              </div>
              <div className="flex gap-2">
                <Button type="button" className="px-4" onClick={handleLoginClick}>
                  Login
                </Button>
                <Button type="button" className="px-4" onClick={handleAdminClick}>
                  Admin User
                </Button>
                <Button type="button" className="px-4" onClick={handleSignupClick}>
                  Sign Up
                </Button>
              </div>
            </Card>
          </div>
        </form>
      </div>
    </div>
  )
}

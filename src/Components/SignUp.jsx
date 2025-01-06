import react, { useState } from 'react';
import '../App.css';
import back1 from '../assets/back5.webp'; 
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';

export default function SignUp(){
    //use state logic
    const [addingData,setAddingData]=useState({});
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [error,setError]=useState({
        username:"",
        password:"",
        mobileNo:"",
        email:""
    });

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
      };

    const handleChange = (e)=>{
            const {name,value}=e.target;
            setAddingData((prev)=>({
                ...prev,
                [name]:value
            }));
            console.log("addingData is",addingData);
    };
      const handleFocus = () => {
    setError({
      ...error,
      username: "", 
      password:"",
      email:"",
      mobileNo:"",
    });
  };
  const validateFields = () => {
    console.log("Validating fields...");
    let newErrors = {};
    if (!addingData.username) {
        newErrors.username = "Username is required";
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(addingData?.email)) {
        newErrors.email = "Enter a valid email.";
    }
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(addingData?.password)) {
        newErrors.password = "Password must contain at least 1 uppercase letter, 1 digit, and 1 special character.";
    }
    const mobileNumberRegex = /^[6-9]\d{9}$/;
    if (!mobileNumberRegex.test(addingData?.mobileNo)) {
        newErrors.mobileNo = "Mobile number must be 10 digits.";
    }

    setError(newErrors);
    
    // Return whether the form is valid or not
    return Object.keys(newErrors).length === 0; // If there are no errors, return true (valid form)
};

const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the fields before proceeding
    if (validateFields()) {
        const data = { ...addingData };
        try {
            console.log("Submitting data...");
            const response = await axios.post('/api/signup', data);
            console.log("Response data:", response.data);

            // If the response contains a success message
            if (response?.data?.message) {
                toast.success(response.data.message, {
                    position: "top-center",
                    style: {
                        backgroundColor: "#1B263B", // Dark blue
                        color: "#ffffff",          // White text
                        border: "1px solid #1B263B", // Light blue border
                    },
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true, 
                    progress: undefined,
                });
                setTimeout(() => {
                    navigate('/login'); // Use your desired route here
                }, 3000)
            } else {
                toast.error("Unexpected response format");
            }
        } catch (err) {
            console.error("Error occurred:", err);
            toast.error("Failed to create user. Please try again.");
        }
    } else {
        console.log("Form validation failed. Cannot submit.");
    }
};
    
    return(
        <>
       <div className="main-form">
                    <div className="side-form">
                            <div className="form">
                           <form action="" onSubmit={handleSubmit}>
                                <div className="image">
                                    <img src={back1} alt="" />
                                </div>

                                <div className="fields">

                            <div className="account" >
                            <h2>Sign Up</h2>

                            <p>Already have an account?<a href="/login" >Login</a></p>


                          </div>


                                      <input
                                    type="text"
                                    name="username"
                                    placeholder="Enter your name"
                                    value={addingData.username}
                                    onChange={handleChange}
                                    onFocus={handleFocus} // Call handleFocus on focus event
                                    className="inputs"
                                    style={{
                                        border: error.username ? "1px solid #ff6666" : "1px solid #ccc", // Red underline if error
                                    }}
                                    />
                                    {error.username && (
                                    <p style={{color: "#ff6666",marginRight:"200px",fontSize:"10px" }}>
                                        {error.username}
                                    </p>
                                    )}

                                     <input 
                                     type="text"
                                     name='mobileNo'
                                     placeholder='Enter your mobile no'
                                     value={addingData?.mobileNo}
                                     onChange={handleChange}
                                     onFocus={handleFocus} // Call handleFocus on focus event
                                     className="inputs"
                                    style={{
                                        border: error.mobileNo ? "1px solid #ff6666" : "1px solid #ccc", // Red underline if error
                                    }}                                    />
                                    {error.mobileNo && (
                                    <p style={{ color: "#ff6666",marginRight:"150px",fontSize:"10px" }}>
                                        {error.mobileNo}
                                    </p>
                                    )}
                                    <input 
                                    type="email"
                                    name='email'
                                    placeholder='Enter your email'
                                    value={addingData?.email}
                                    onChange={handleChange}
                                    onFocus={handleFocus} // Call handleFocus on focus event
                                    className="inputs"
                                    style={{
                                        border: error.email ? "1px solid #ff6666" : "1px solid #ccc", // Red underline if error
                                    }}                                    />
                                    {error.email && (
                                    <p style={{ color: "#ff6666",marginRight:"200px",fontSize:"10px" }}>
                                        {error.email}
                                    </p>
                                    )}

         <div style={{ position: "relative", width: "100%" }}>
      <input
        type={showPassword ? "text" : "password"} // Toggle between password and text type
        name="password"
        placeholder="Enter your password"
        value={addingData.password}
        onChange={handleChange}
        onFocus={handleFocus}
        className="inputs"
         style={{border: error.password ? "1px solid red" : "1px solid #ccc", }}                                    />
                                   
      <IconButton
        onClick={handleClickShowPassword}
        edge="end"
        aria-label="toggle password visibility"
        style={{
          position: "absolute",
          right: "10px",
          top: "50%",
          width:"60px",
          height:"10px",
          transform: "translateY(-50%)",
        }}
      >
        {showPassword ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    </div>
 {error.password && (
            <p style={{ color: "#ff6666",marginRight:"90px",fontSize:"10px", }}>
         {error.password}
     </p>
 )}
                              <button type='submit' className='btn'>Sign Up</button>

                                   </div>

                            </form>

                            

                        </div>
                       
                    </div>
                </div>
                <ToastContainer/>

        </>
    )
}
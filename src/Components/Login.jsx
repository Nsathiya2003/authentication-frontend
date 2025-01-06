import react, { useState } from 'react';
import '../App.css';
import axios from 'axios';
import back1 from '../assets/back5.webp';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";


export default function Login(){
    const [addingData,setAddingData]=useState({});
    const [showPassword, setShowPassword] = useState(false);

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
const [error,setError]=useState({
    password:"",
    email:""
});


const handleFocus = () => {
setError({
  ...error,
  password:"",
  email:"",
});
};
const validateFields = ()=>{
   console.log("hiii");
    let newErrors={};

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

if(!emailRegex.test(addingData?.email)){
    console.log("helllll")
newErrors.email="Enter a valid email.";
}
if(!passwordRegex.test(addingData?.password)){
    console.log("helllll")
  newErrors.password="Enter a valid password ex:Example@123.";

}
setError(newErrors);
return Object.keys(newErrors).length === 0; // If there are no errors, return true (valid form)

}

 const handleSubmit = async (e)=>{
    e.preventDefault();

    // Validate the fields before proceeding
    if (validateFields()) {
        const data = { ...addingData };
        try {
            console.log("Submitting data...");
            const response = await axios.post('/api/login', data);
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
             
            } else {
                toast.error("Unexpected response format");
            }
        } catch (err) {
            console.error("Error occurred:", err);
            toast.error("Failed to login user. Please try again.");
        }
    } else {
        console.log("Form validation failed. Cannot submit.");
    }
 }

        return(

            <>
            <ToastContainer/>
                 <div className="main-form">
                    <div className="side-form">
                        <div className="form">
                      
                        <form action="" onSubmit={handleSubmit}>
                                <div className="image">
                                    <img src={back1} alt="" />
                                </div>

                                <div className="fields">

                            <div className="account-login" >
                            <h2>Login</h2>

                            <p>Don't have an account?<a href="/" >Register</a></p>


                          </div>


                                   
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
 <div className="forgot" >
                                        <a href="/forgot">Forgot password</a>
                                    </div>
              <button type='submit' className='btn'>Login</button>

                                   </div>

                            </form>
                          

                        </div>
                        
                    </div>
                </div>
            </>
        )
}
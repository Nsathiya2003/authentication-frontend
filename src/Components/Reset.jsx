import react, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import back1 from '../assets/back5.webp';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Reset(){
    const [addingData,setAddingData]=useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordconfirm, setShowPasswordconfirm] = useState(false);
    const navigate = useNavigate();
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
      };
      const handleClickShowPasswordConfirm = () => {
        setShowPasswordconfirm(!showPasswordconfirm);
      };
      const [error,setError]=useState({
        otp:"",
        newPassword:"",
        confirmPassword:"",
    });
    
    
    const handleFocus = () => {
    setError({
      ...error,
      otp: "", 
      newPassword:"",
      confirmPassword:"",
      
    });
    };
    const validateFields = ()=>{
       console.log("hiii");
        let newErrors={};
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    
    if(!addingData?.otp ||addingData?.otp.length !==5 ){
        newErrors.otp="Enter 5 digits otp";
    }
    if(!passwordRegex.test(addingData?.newPassword)){
        newErrors.newPassword="Enter a valid password ex:Example@123.";
    }
    if(!passwordRegex.test(addingData?.confirmPassword)){
        newErrors.confirmPassword="Enter a valid password ex:Example@123.";
    }
    if(addingData?.newPassword !==addingData?.confirmPassword ){
        newErrors.newPassword="password do not match.";
        newErrors.confirmPassword="password do not match.";

    }
    setError(newErrors);
    return Object.keys(newErrors).length === 0; // If there are no errors, return true (valid form)

    }
    const handleChange = (e)=>{
        const {name,value}=e.target;
        setAddingData((prev)=>({
            ...prev,
            [name]:value
        }));
        console.log("addingData is",addingData);
};

const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the fields before proceeding
    if (validateFields()) {
        const data = { ...addingData };
        try {
            console.log("Submitting data...");
            const response = await axios.post('/api/reset', data);
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
            toast.error("Failed to reset password. Please try again.");
        }
    } else {
        console.log("Form validation failed. Cannot submit.");
    }
};

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

                            <div className="account" >
                            <h2>Reset Password</h2>

                            {/* <p>Already have an account?<a href="/login" >Login</a></p> */}


                          </div>


                          <input 
                                     type="text"
                                     name='otp'
                                     placeholder='Enter your otp'
                                     value={addingData?.otp}
                                     onChange={handleChange}
                                     onFocus={handleFocus}
                                     className='inputs'
                                     style={{
                                        border: error.otp ? "1px solid #ff6666" : "1px solid #ccc", // Red underline if error
                                    }}   
                                    />
                                       {error.otp && (
            <p style={{ color: "#ff6666",marginRight:"220px",fontSize:"10px", }}>
         {error.otp}
     </p>
 )}
                                     <div style={{ position: "relative", width: "100%" }}>
      <input
        type={showPassword ? "text" : "password"} // Toggle between password and text type
        name="newPassword"
        placeholder="Enter your password"
        value={addingData.newPassword}
        onChange={handleChange}
        onFocus={handleFocus}
        className="inputs"
        style={{
            border: error.newPassword ? "1px solid #ff6666" : "1px solid #ccc", // Red underline if error
        }}   
        
      />
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
        {error.newPassword && (
            <p style={{ color: "#ff6666",marginRight:"90px",fontSize:"10px", }}>
         {error.newPassword}
     </p>
 )}
      <div style={{ position: "relative", width: "100%" }}>
      <input
        type={showPasswordconfirm ? "text" : "password"} // Toggle between password and text type
        name="confirmPassword"
        placeholder="Enter your password"
        value={addingData.confirmPassword}
        onChange={handleChange}
        onFocus={handleFocus}
        className="inputs"
         style={{border: error.confirmPassword ? "1px solid red" : "1px solid #ccc", }}                                    />
                                   
      <IconButton
        onClick={handleClickShowPasswordConfirm}
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
        {showPasswordconfirm ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    </div>
 {error.confirmPassword && (
            <p style={{ color: "#ff6666",marginRight:"90px",fontSize:"10px", }}>
         {error.confirmPassword}
     </p>
 )}
                              <button type='submit' className='btn'>Reset Password</button>

                                   </div>

                            </form>

                            

                        </div>
                       
                    </div>
                </div>
            </>
        )
}
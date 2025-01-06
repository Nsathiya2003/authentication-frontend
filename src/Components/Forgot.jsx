import react, { useState } from 'react';
import '../App.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import back1 from '../assets/back5.webp';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Forgot(){
    const navigate = useNavigate();
    const [addingData,setAddingData]=useState({});

const handleChange = (e)=>{
        const {name,value}=e.target;
        setAddingData((prev)=>({
            ...prev,
            [name]:value
        }));
        console.log("addingData is",addingData);
};
const [error,setError]=useState({
    username:"",
    password:"",
    mobileNo:"",
    email:""
});


const handleFocus = () => {
setError({
  ...error,
  username: "", 
  password:"",
  email:"",
  mobileNo:"",
});
};
const validateFields = ()=>{
   console.log("hiii");
    let newErrors={};

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

if(!emailRegex.test(addingData?.email)){
newErrors.email="Enter a valid email.";
}


setError(newErrors);
return Object.keys(newErrors).length === 0; // If there are no errors, return true (valid form)

}

const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the fields before proceeding
    if (validateFields()) {
        const data = { ...addingData };
        try {
            console.log("Submitting data...");
            const response = await axios.post('/api/forgot', data);
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
                    navigate('/reset'); // Use your desired route here
                }, 3000)
            } else {
                toast.error("Unexpected response format");
            }
        } catch (err) {
            console.error("Error occurred:", err);
            toast.error("Failed to send email. Please try again.");
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

                            <div className="account-forgot" >
                            <h2>Forgot Password</h2>

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
                                    
              <button type='submit' className='btn'>Send Email</button>

                                   </div>

                            </form>
                          

                        </div>
                        
                    </div>
                </div>
            </>
        )
}
import React, { useEffect, useState } from 'react';
import VideoChatIcon from '@mui/icons-material/VideoChat';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupsIcon from '@mui/icons-material/Groups';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import app from '../context/firebase'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {getFirestore, collection, getDoc,addDoc,setDoc,doc} from 'firebase/firestore';

const firestore=getFirestore(app);
const auth = getAuth(app);
const Navbar = () => {
    const navigate=useNavigate();
    const [isFilled, setIsFilled] = useState(false);
    const [user, setUser] = useState("");
    const [title, setTitle] = useState("Untitled Spreadsheet");
    const handleIconClick = () => {
        setIsFilled(!isFilled);
    };
    useEffect(() => {  
        onAuthStateChanged(auth,async (user) => {
            if (user) { // user is logged in
              const docRef = doc(firestore, "User", user.email);
              const docSnap = await getDoc(docRef);
              if (docSnap.exists()) {
                const userData = docSnap.data();
                localStorage.setItem('spreadsheetData',userData.data);
                localStorage.setItem('pagename',userData.title);
                setTitle(userData.title);
            } else {
                // No such document
                console.log("No such document!");
            }
              setUser(user);
            } 
          });
    },[]);
    const local=()=>{
        setDoc(doc(firestore, "User", user.email), {
            data: localStorage.getItem('spreadsheetData'),
            title: localStorage.getItem('pagename')
        }).then(() => {
            toast.success('Data Saved to Cloud Storage');
        }).catch((error) => {
            alert('Error Adding Data: ' + error.message);
        });
    }
    localStorage.setItem('pagename',title);
  return (
    <div className="w-[100vw] h-[60px] flex items-center justify-between">
        <div className="w-[25%] h-[75%] flex items-center justify-between px-3">
        <button className="hover:border-transparent bg-white hover:bg-gray-300 w-[14%] size-12
        flex items-center justify-center rounded-full focus:outline-none" onClick={()=>{
            navigate('/');
        }}>
            <InsertDriveFileIcon style={{
                color: '#4c4e52',
                fontSize: '2.0rem'
            }}/>
            </button>
            <input 
                type="text" 
                placeholder={title}
                id="title_name"
                onChange={(e) => setTitle(e.target.value)}
                className="h-[100%] w-[100%] text-[1.0rem] text-center font-bold bg-none border-none focus:outline-none"
            />
            
            <div className="flex space-x-1.5">
            
            <button className="hover:border-transparent bg-white hover:bg-gray-300 size-1
                flex items-center justify-center rounded-full focus:outline-none px-4 py-4">
            <div onClick={handleIconClick}>
            {isFilled ? (
                <StarIcon
                    style={{
                        color: 'blue',
                        fontSize: '1.5rem',
                    }}
                />
            ) : (
                <StarBorderIcon
                    style={{
                        color: '#4c4e52',
                        fontSize: '1.5rem',
                    }}
                />
            )}
        </div>
            </button>
            <button className="hover:border-transparent bg-white hover:bg-gray-300 size-1
            flex items-center justify-center rounded-full focus:outline-none px-4 py-4" onClick={()=>{
                navigate('/sheet');
            }}>
            <DriveFileMoveIcon style={{
                color: '#4c4e52',
                fontSize: '1.5rem'
            }}/>
            </button>
            <button className="hover:border-transparent bg-white hover:bg-gray-300 size-1
            flex items-center justify-center rounded-full focus:outline-none px-4 py-4" onClick={local}>
            <CloudDoneIcon style={{
                color: '#4c4e52',
                fontSize: '1.5rem'
            }}/>
            </button>
            </div>
            
        </div>
        <div className="w-[19%] h-[auto] flex items-center justify-around ">
        <button className="hover:border-transparent bg-white hover:bg-gray-300 size-11  
        flex items-center justify-center rounded-full focus:outline-none " onClick={()=>{
            navigate('/recent');
        }}> 
            <GroupsIcon style={{
                color: '#4c4e52',
                fontSize: '1.8rem'
            }}/>
            </button>
            <button className="hover:border-transparent bg-white hover:bg-gray-300 size-11 mx-1 
            flex items-center justify-center rounded-full focus:outline-none" onClick={()=>{
                navigate('/call');
            }}> 
            <VideoChatIcon style={{
                color: '#4c4e52',
                fontSize: '1.8rem'
            }}/>
            </button>
            <div className="flex space-x-0.5">
                <button className="hover:border-transparent w-[80px] h-[38px] 
                flex items-center justify-center cursor-pointer rounded-full rounded-r-lg bg-sky-100 hover:bg-sky-200 focus:outline-none">
                    <LockOutlinedIcon style={{
                        color: 'black',
                        fontSize: '0.9rem',
                        marginRight: '5px'
                    }}/>
                    Share
                </button>
                <button className="w-[10%px] h-[38px] hover:border-transparent size-1 
                flex items-center justify-center cursor-pointer rounded-full rounded-l-lg bg-sky-100 hover:bg-sky-200 focus:outline-none px-3">
                    <ArrowDropDownIcon style={{
                        color: 'black',
                        fontSize: '0.9rem'
                    }}/>  
                </button>
            </div>
            <div className="cursor-pointer">
            <button className="hover:border-transparent bg-white hover:bg-gray-300 size-11 mx-1 
            flex items-center justify-center rounded-full focus:outline-none" onClick={()=>{
                navigate('/profile');
            }}> 
            <AccountCircleIcon style={{
                color: '#4c4e52',
                fontSize: '2.0rem'
            }}/>
            </button> 
          </div> 
        </div>
    </div>
  );
};

export default Navbar;
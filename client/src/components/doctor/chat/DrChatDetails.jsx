import React from 'react';
import { useLocation } from 'react-router-dom';
import { useState,useEffect,useRef } from 'react';
import DrMessageBox from './DrMessageBox';
import { getUserDetailsWithId } from '../../../API/doctor';
import { getMessagesForDoctors } from '../../../API/doctor';
import { getDoctorDetails } from '../../../API/doctor';
import { sendMessageFromDoctor } from '../../../API/doctor';
import { v4 as uuidv4 } from "uuid";
import moment from 'moment';



const DrChatDetails = ({socket}) => {

    // ----------------------------------------------------------------GETTING STATES AND LOCATION-------------------------------------------------------------------//

    const location = useLocation()
    const userId = location.state
    const[user,setUser] = useState()
    const [doctor,setDoctor] = useState()
    const[messages,setMessages] = useState([])
    const [arrivalMessage,setArrivalMessage] = useState()

    const scrollRef = useRef();


    // ----------------------------------------------------------------USE EFFECT-------------------------------------------------------------------//


    useEffect(()=>{
        getUserDetails(userId)
        getChatDetails()
        gettingDoctorDetails()
    },[])

    // ----------------------------------------------------------------GETTING USER DETAILS-------------------------------------------------------------------//

    const getUserDetails = async(userId) =>{
        const response = await getUserDetailsWithId(userId)
        setUser(response?.data.userDetails)
    }
    
    
    // ----------------------------------------------------------------GETTING CHAT DETAILS-------------------------------------------------------------------//
    const getChatDetails = (async()=>{
        const response = await getMessagesForDoctors(userId)
        setMessages(response?.data)
      })

    // ----------------------------------------------------------------GETTING DOCTOR DETAILS-------------------------------------------------------------------//

    const gettingDoctorDetails = async() =>{
        const response = await getDoctorDetails()
        setDoctor(response.data.doctorDetails)
    }

    const handleNewMessage = async(newMessage) =>{
        socket.current.emit("send-msg", {
            to: userId,
            from: doctor._id,
            message: newMessage,
          });
          const response = await sendMessageFromDoctor(userId,newMessage)
          const msgs = [...messages]
          msgs.push({ fromSelf: true, message: newMessage });
          setMessages(msgs);
    }

    // --------------------------------------------------------------------SOCKET IO---------------------------------------------------------------------

    useEffect(() => {
      let intervalId = setInterval(() => {
        if (socket.current) {
          socket.current.on("msg-recieve", (msg) => {
            setArrivalMessage({ fromSelf: false, message: msg });
          });
        }
      }, 3000);
      return () => clearInterval(intervalId);
    }, []);

    // ----------------------------------------------------------------GETTING DOCTOR DETAILS-------------------------------------------------------------------//

      useEffect(() => {
        arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
      }, [arrivalMessage]);


      useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
      }, [messages])

      
     



    return (
        <div>
 <div>
     
 <div class="flex flex-col items-center justify-items-stretch w-full h-screen bg-gray-100 text-gray-800 ">
{/* <!-- Component Start --> */}
<div class="flex flex-col flex-grow w-full  bg-white shadow-xl rounded-lg overflow-hidden mt-11">
<div class="flex flex-col flex-grow h-0 p-4 overflow-auto">


{
    messages?.map((data)=>
    data.fromSelf ? (

        <div class="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end" ref={scrollRef} key={uuidv4()}>
    <div>
        <div class="bg-cyan-800 text-white p-3 w-full rounded-l-lg rounded-br-lg">
        <p class="text-sm md:text-lg lg:text-xl">{data.message}</p>
        </div>
        <span class="text-xs text-gray-500 leading-none">{moment(data.time).fromNow()}</span>
    </div>
    <img src={doctor?.profilePhoto} class="flex-shrink-0 h-10 w-10 rounded-full object-cover bg-gray-300" />
</div>
    ):(
        <div class="flex w-full mt-2 space-x-3 max-w-xs">
    <img src={user?.profilePhoto} class="flex-shrink-0 h-10 w-10 object-cover rounded-full bg-gray-300" />
    <div>
        <div class="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
        <p class="text-sm md:text-lg lg:text-xl">{data.message}</p>
        </div>
        <span class="text-xs text-gray-500 leading-none">{moment(data.time).fromNow()}</span>
     </div>
   </div>
    ))}



</div>

     {/*Message box  */}
     <DrMessageBox onMessage={handleNewMessage} />
   
</div>
{/* <!-- Component End  --> */}
</div>
        </div>
        </div>
    );
}

export default DrChatDetails;

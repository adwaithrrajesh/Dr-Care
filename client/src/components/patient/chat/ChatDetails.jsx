import React, { useEffect, useState,useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { getDoctorWithId } from '../../../API/user';
import MessageInputBox from './MessageInputBox';
import { getMessagesForUsers } from '../../../API/user';
import { toast } from 'react-hot-toast';
import { sendMessage } from '../../../API/user';
import { getProfileDetails } from '../../../API/user';
import { v4 as uuidv4 } from "uuid";  
import moment from 'moment';




const ChatDetails = ({socket,current}) => {

// ----------------------------------------------------------------SOCKET IO-------------------------------------------------------------------//
const scrollRef = useRef();



// ----------------------------------------------------------------GETTING STATES AND LOCATION-------------------------------------------------------------------//

    const location = useLocation()
    const doctorId = location.state
    const[doctor,setDoctor] = useState()
    const[messages,setMessages] = useState([])
    const[user,setUser] = useState()
    const[arrivalMessage,setArrivalMessage] = useState()



// ---------------------------------------------------------------------GETTING USERS-------------------------------------------------------------------//

useEffect(() => {
  getUserDetails()
}, []);

const getUserDetails = async() =>{
  const response = await getProfileDetails()
  setUser(response.data.userDetails)
}


// ----------------------------------------------------------------GETTING STATES AND LOCATION-------------------------------------------------------------------//

    useEffect(()=>{
        getDoctorDetails(doctorId)
        getChatDetails()
    },[])

    const getDoctorDetails = async (doctorId) =>{
       const response = await getDoctorWithId(doctorId)
       setDoctor(response?.data?.doctor)
    }

    const getChatDetails = (async()=>{
      toast.loading('loading')
      const response = await getMessagesForUsers(doctorId)
      console.log(response.data)
      toast.dismiss()
      setMessages(response?.data)
    })

    // ----------------------------------------------------------------GETTING LIVE MESSAGE FROM OPPOSITE-------------------------------------------------------------------//
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
    

// ----------------------------------------------------------------SETTING UP SOCKET IO------------------------------------------------------------------//

    const handleNewMessage = async(newMessage) => {
      socket.current.emit("send-msg", {
        to: doctorId,
        from: current._id,
        message: newMessage,
      })
      const response = await sendMessage(doctorId,newMessage)
      const msgs = [...messages];
      msgs.push({ fromSelf: true, message: newMessage });
      setMessages(msgs);
    };
    



    useEffect(() => {
      arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage]);



    useEffect(() => {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);



    


    return (
      

            <div class="flex flex-col items-center justify-items-stretch w-full h-screen bg-gray-100 text-gray-800 ">
{/* <!-- Component Start --> */}
<div class="flex flex-col flex-grow w-full  bg-white shadow-xl rounded-lg overflow-hidden mt-11">
    <div class="flex flex-col flex-grow h-0 p-4 overflow-auto">


    {messages?.map((data) => {
        return data.fromSelf ? (
          <div class="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
            <div ref={scrollRef} key={uuidv4()}>
              <div class="bg-cyan-800 text-white p-3 w-full rounded-l-lg rounded-br-lg">
                <p class="text-sm md:text-lg lg:text-xl">{data.message}</p>
              </div>
              <span class="text-xs text-gray-500 leading-none">{moment(data.time).fromNow()}</span>
            </div>
            <img src={user?.profilePhoto} class="flex-shrink-0 h-10 w-10 rounded-full object-cover bg-gray-300" />
          </div>
        ) : (
          <div class="flex w-full mt-2 space-x-3 max-w-xs">
            <img src={doctor?.profilePhoto} class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300" />
            <div>
              <div class="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                <p class="text-sm md:text-lg lg:text-xl">{data.message}</p>
              </div>
              <span class="text-xs text-gray-500 leading-none">{moment(data.time).fromNow()}</span>
            </div>
          </div>
        );
      })}
    </div>
{/* ---------------------------------------------------------------------Message Input box------------------------------------------------------------------------- */}

<MessageInputBox onMessage={handleNewMessage} />

</div>
{/* <!-- Component End  --> */}
</div>

    );
}

export default ChatDetails;

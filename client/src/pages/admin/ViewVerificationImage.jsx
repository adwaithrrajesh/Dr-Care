import React from 'react';
import SideBar from '../../components/admin/SideBar';
import { useSelector } from 'react-redux';
import { useEffect,useState } from 'react';


const ViewVerificationImage = () => {


    const [image,setImage] = useState([])

    // ----------------------------------------------------------------REDUX SELECTOR-------------------------------------------------------------------//

    const selector = useSelector(state=>state.doctorProof)

    useEffect(() => {
      setImage(selector.doctorCertificateDetails)
    }, [selector]);




    return (
        <div>
            <SideBar />
    <div class="p-4 sm:ml-64">

        <div className='justify-center flex mr-14 mt-10'>
            <p className='font-semibold text-4xl'>Id Card</p>
        </div>
        <div className='justify-center flex '>
        <img src={image[0]} 
        className='w-full' alt="" />
        </div>

        <div className='justify-center flex mr-14 mt-14'>
            <p className='font-semibold text-4xl'>Certificate Image</p>
        </div>
        <div className='justify-center flex mr-14'>
        <img src={image[1]}
        className='w-full' alt="" />
        </div>


    </div>
        </div>
    );
}

export default ViewVerificationImage;

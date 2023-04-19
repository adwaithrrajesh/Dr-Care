import React, { createContext, useEffect, useState } from 'react';
import Header from '../../components/patient/Header';
import Search from '../../components/patient/searchbox/DoctorSearch';
import List from '../../components/patient/DoctorCards/List';
import FilterandSort from '../../components/patient/DoctorCards/filter/filter&Sort';
import Footer from '../../components/patient/Footer';
import { useLocation } from 'react-router-dom';
import instance from '../../instance/instance';
import { toast } from 'react-hot-toast';
export const doctorData = createContext()



const Doctors = () => {
    const location = useLocation()
    const [department,setDepartment] = useState()
    const [search,setSearch] = useState()
    const [filter,setFilter] = useState()
    const [sort,setSort] = useState()
    const [fetchedDetails,setFetchedDetails] = useState()

    useEffect(() => {
        toast.loading('processing...')
        setTimeout(() => {
        location.state?.departmentData && setDepartment(location.state.departmentData)
        }, 100)
          instance.get(`/fetchDoctors?search=${search}&department=${department}&filter=${filter}&sort=${sort}`).then((response)=>{
            toast.dismiss()
            setFetchedDetails(response.data.doctorDetails)
        })  
    }, [department,search,filter,sort])

    return (

        <doctorData.Provider value={{setSearch,setFilter,setSort,filter,sort}}>
            <Header />
            <Search />
            <FilterandSort />
            <List data={fetchedDetails}/>
            <Footer />
        </doctorData.Provider> 
       
    );
}

export default Doctors;

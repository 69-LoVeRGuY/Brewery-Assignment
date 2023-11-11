import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import '../index.css';

function Home() {
    const [data, setData] = useState([]);
    const [parameter,setParamter] = useState('');
    const [search,setSearch] = useState('');
    const [avg, setAvg] = useState([]);
    const options = [
        {label: 'Choose', value:''},
        {label: 'City', value:'by_city'},
        {label: 'Type', value:'by_type'},
        {label: 'Name', value: 'by_name'}
    ]
    
    let count = 0;

    const fetchInfo = async() => {
        
        return await axios.get(`https://api.openbrewerydb.org/v1/breweries?${parameter}=${search}`)
            .then((res) => setData(res.data))
            .catch((err) => console.log(err));
    };

    const fetchRating = async(id) => {
        return await axios.get('http://localhost:8081/avgRating',id)
        .then((res) => setAvg(res.data))
        .catch((err) => console.log(err));
    }

    data.map((obj) => {
        fetchRating(obj.id);
    })

    function handleSearch(e){
        setSearch((e.target.value).toLowerCase().replace(" ","_"));
    }

    function handleSelect(e){
        setParamter(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();
        fetchInfo();
    }

    return (
        <>

<div className= "w-screen min-h-screen flex justify-center main">
    <div class="bg-white px-4 sm:px-8 w-[70%] mx-auto rounded-2xl py-16">

        <div class="hero">
            <div class="hero-headline flex flex-col items-center justify-center text-center">
                <h1 class=" font-bold text-3xl text-gray-900 mb-5">Search Brewery</h1>
            </div>

            <div class="box py-6">
                <div class="box-wrapper">

                    <div class=" text-gray-800 rounded flex items-center w-full p-3 shadow-sm border border-gray-200">
                      <button onClick={handleSubmit} class="outline-none focus:outline-none"><svg class=" w-5 text-gray-600 h-5 cursor-pointer" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></button>
                      <input onChange={e => handleSearch(e)} type="search" name="" placeholder="search for brewery" x-model="q" class="w-full pl-4 text-sm outline-none focus:outline-none bg-transparent"/>
                      <div class="select">
                        <select onChange={e => handleSelect(e)}  x-model="image_type" class="text-sm outline-none focus:outline-none bg-transparent">
                            {options.map(option => (
                             <option value={option.value}>{option.label}</option>
                            ))}
                         </select>
                      </div>
                    </div>
                  
                </div>
            </div>
        </div>

        <div className='space-y-4'>
                {data.map((dataObj) => {
                    return(
                        <div className='border-2 p-6 text-lg font-medium text-gray-800 rounded-2xl'>
                                <p>{dataObj.name}</p>
                                <p>{dataObj.address_1}</p>
                                <p>{dataObj.phone}</p>
                                <p><a href={dataObj.website_url} target='blank'>Visit website</a></p>
                                {/* <p>{avg[count++]}</p> */}
                                <p>{dataObj.city},  {dataObj.state}</p>
                                <p><Link to='/info' state={{data: dataObj}}>More Info</Link></p>
                        </div>
                )})}
            </div>

    </div>
</div>
            
        </>
    )
    

}

export default Home
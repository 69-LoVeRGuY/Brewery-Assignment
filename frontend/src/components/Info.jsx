import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import '../index.css';
import ReactStars from "react-rating-stars-component";

function Info(props) {

    const location = useLocation();
    const data = location.state?.data;
    const [reviews,setReviews] = useState([]);
    const[comment,setComment] = useState('');
    const[rating,setRating] = useState('');
    let reviewers = [];
    
    // to load search results
    const loadComments = () => {
        axios.post('http://localhost:8081/info', {id: data.id})
        .then(function (response) {
            if(response.data.length > 0)
                setReviews(response.data);
        })
        .catch(err => console.log(err));
    };

    useEffect(() =>{
        loadComments();
    },[])

    reviews.map((review) => {
        reviewers.push(review.user);
    })
  
    const ratingChanged = (newRating) => {
        setRating(newRating);
      };

    

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!reviewers.includes(localStorage.getItem('user'))){
            axios.post('http://localhost:8081/addinfo',{comment: comment, rating: rating, id: data.id, user: localStorage.getItem('user')})
            .then(function (response){
                if(response.data === "Ok")
                {
                    setComment('');
                    loadComments();
                }

            });
        }
        else
        {
            setComment('');
            alert('You can only post a review once');
        }
    }

  return (
    <>
        <div className='h-screen w-screen flex justify-center items-center'>
            <div className='flex bg-white rounded-2xl p-24 gap-10'>
                <div className='bg-white rounded-2xl space-y-4 text-gray-800 p-6'>
                {Object.keys(data).map((key, index) => {
                    return(
                        <div>
                            <p>{key}: {data[key]}</p>
                        </div>
                    )
                })}
                </div>
                <div class="p-6 h-fit mx-auto items-center justify-center shadow-lg mt-56  mb-4 max-w-lg">
                <ReactStars
                count={5}
                onChange={ratingChanged}
                size={24}
                activeColor="#ffd700"
                />
            <form onSubmit={handleSubmit} class="w-full max-w-xl bg-white rounded-lg px-4 pt-2">
                <div class="flex flex-wrap -mx-3 mb-6">
                    <h2 class="px-4 pt-3 pb-2 text-gray-800 text-lg">Add a new comment</h2>
                    <div class="w-full md:w-full px-3 mb-2 mt-2">
                        <textarea onChange={e => setComment(e.target.value)} value={comment} class="text-gray-800 bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white" name="body" placeholder='Type Your Comment' required></textarea>
                    </div>
                    <div class="w-full md:w-full flex items-start md:w-full px-3">
            <div class="flex items-start w-1/2 text-gray-700 px-2 mr-auto">
               
               
            </div>
            <div class="-mr-1">
               <input type='submit' className={`bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100`} value='Post Comment'/>
            </div>
         </div>
        </div>
      </form>
      <div className='text-gray-800'>
            {reviews.map((review) => {
                return(
                    <div>
                        <ReactStars
                        count={review.rating}
                        size={16}
                        color="#ffd700"
                        edit={false}
                        />
                        <p>{review.user} : {review.comment}</p>
                        <br/>
                    </div>
                )
            })}
        </div>
                </div>
            </div>
        </div>

        
        
    </>
  )
}

export default Info
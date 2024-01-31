import React, {useEffect, useState} from 'react'
import { Link, useLoaderData } from 'react-router-dom'

function Github() {
  const data = useLoaderData()
  // const [data, setData] = useState({}); 
  // useEffect(() => {
  //   fetch(`https://api.github.com/users/ZahinGausee`)
  //   .then(response => response.json())
  //   .then(data => setData(data))
  // }, []);
  
  console.log(data)
  return (
    <div className='bg-slate-600 text-white text-center text-3xl m-5 p-4 rounded-2xl w-fit'>
      <h1>Github Profile: <span className='text-orange-700'>{data.login}</span></h1>
      <div className='flex mt-3 mx-auto text-left align-middle justify-between gap-9 '>
        <img src={data.avatar_url} alt="Profile picture" className='rounded-xl' width={400}/>
        <div>
          <p className='my-6'>{data.bio}</p>
          <p className='my-6'>Here, I've utilized the special router property loader to optimize data fetching from the API call.</p>
          <p className='my-6'>All the data is coming from the Github Api</p>
        </div>
      </div>
      <div>
        <p className='mt-5'><Link to={data.html_url} target='_blank' className='text-orange-700 font-mono text-ellipsis'>Here</Link> is the Link to my github profile</p>
      </div>
    </div>
  )
}

export default Github

export async function githubInfoLoader () {
    const response = await fetch(`https://api.github.com/users/ZahinGausee`)
    return response.json()
}
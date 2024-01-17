import Head from 'next/head'
import React,{ useEffect, useState } from'react'
import Link from 'next/link'
import Image from 'next/image'
import axios from 'axios';
import clsx from 'clsx';

const initialUser = {
  name:"The Octocat",
  login:"octocat",
  blog:"https://github.blog",
  followers:"10693",
  repos:"8",
  following:"9",
  location:"San Francisco",
  twitter:null,
  company:"@github",
  bio:null,
  avatar:"https://avatars.githubusercontent.com/u/583231?v=4"
}

export const metadata = {
  title:"dev-finder"
}

export default function Home() {
  
  const [ isChecked, setIsChecked ] = useState("")
  const [ theme, setTheme] = useState(null);
  const [ userName, setUserName ] = useState("");
  const [userData,setUserData] = useState(initialUser)
  const [date,setDate] = useState("2011 Jan 25")
  const [ message, setMessage ] = useState("")
  
  useEffect(() => {
    const isChecked = JSON.parse(localStorage.getItem('isChecked'));
    setIsChecked(isChecked);
    
    if (isChecked === true) {
      setIsChecked(true);
      setTheme("light");
      document.querySelector('body').classList.add("light")
      document.querySelector('body').classList.remove("dark")
    } else if (isChecked === false || isChecked === null) {
      setIsChecked(false);
      setTheme("dark");
      document.querySelector("body").classList.add("dark");
      document.querySelector("body").classList.remove("light");
    }
  },[isChecked])
  
  const handleTheme = () => {
  setIsChecked(!isChecked)
  localStorage.setItem('isChecked',JSON.stringify(!isChecked))
};

  
  const handleSearch = (e) => {
      e.preventDefault();
      setUserName("")

      if (userName.length <= 0) {
        setMessage("required")
        return
      }

      axios.get(`https://api.github.com/users/${userName}`,{
        username: userName,})
        .then(function (response) {
          setUserData({
            ...initialUser,
            name:response.data.name,
            login:response.data.login,
            repos:response.data.public_repos,
            followers:response.data.followers,
            following:response.data.following,
            blog:response.data.blog,
            location:response.data.location,
            twitter:response.data.twitter_username,
            company:response.data.company,
            bio:response.data.bio,
            avatar:response.data.avatar_url,
          });
          const date = new Date(response.data.created_at);
          setDate(`${date.getFullYear()} ${date.toLocaleString("en", { month: "short" })} ${date.getDate()}` )
        }
        ).catch((error) => {
          console.log(error);
        })
      }


  return (
    <>
      <main>
        <div className="container">
          <div className="d-flex flex-column searchCard">
            <div className="d-flex justify-content-between align-items-center header">
              <h2 className="title text-gray">dev-finder</h2>
              <div className="form-check form-switch">
                <label
                  className="form-check-label text-gray"
                  htmlFor="flexSwitchCheckDefault"
                >
                  {theme}
                </label>
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                  onChange={handleTheme}
                  checked={isChecked?true:false}
                />
              </div>
            </div>

            <div className="d-flex flex-column gap-3">
              <div className="d-flex flex-column">
                <form className="d-flex search w-100" onSubmit={handleSearch}>
                  <svg
                    className="searchIcon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="33"
                    viewBox="0 0 32 33"
                    fill="none"
                  >
                    <path
                      d="M21.8485 23C23.7933 21.0942 25 18.438 25 15.5C25 9.70101 20.299 5 14.5 5C8.70101 5 4 9.70101 4 15.5C4 21.299 8.70101 26 14.5 26C17.361 26 19.9547 24.8558 21.8485 23ZM21.8485 23L27.3485 28.5"
                      stroke="#0668D6"
                      strokeWidth="1.5"
                    />
                  </svg>
                  <input
                    className="searchType"
                    type="text"
                    placeholder="Search GitHub username..."
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                  />
                  <button
                    className="btn btn-primary primary"
                    onClick={handleSearch}
                  >
                    Search
                  </button>
                </form>
                <p className="text-gray mb-0 ms-4">{message}</p>
              </div>
              <div className="d-flex flex-column flex-md-row card">
                <div className="d-flex gap-4 flex-md-column">
                  <Image
                    src={userData.avatar}
                    alt="user"
                    unoptimized
                    width={70}
                    height={70}
                  />
                  <div className="d-md-none d-flex flex-column justify-content-between">
                    <div className="d-flex flex-column">
                      <h1 className="name text-gray">
                        {userData.name?userData.name:"Not Available"}
                      </h1>
                      <p className="id text-primary" href="#">
                        @{userData.login}
                      </p>
                    </div>
                    <h3 className="join text-gray">
                      Joined {date}
                    </h3>
                  </div>
                </div>
                <div className="d-flex flex-column w-100">
                  <div className="d-md-flex d-none flex-row justify-content-between">
                    <div className="d-flex flex-column">
                      <h1 className={clsx("name text-gray",{"opacity-6":userData.name===null})}>
                        {userData.name?userData.name:"NaN"}
                      </h1>
                      <p className="id text-primary" href="#">
                        @{userData.login}
                      </p>
                    </div>
                    <h3 className="join text-gray">
                      Joined {date}
                    </h3>
                  </div>
                  <p className={clsx("text-gray mt-0 mt-md-4",{"opacity-6":userData.bio===null})}>
                    {userData.bio?userData.bio:"Not Available"}
                  </p>

                  <div className="d-flex info justify-content-between">
                    <div className="d-flex flex-column align-items-center align-items-md-start gap-md-2 gap-3">
                      <small className="text-gray opacity-6">Repos</small>
                      <p className="times text-gray mb-0">{userData.repos}</p>
                    </div>
                    <div className="d-flex flex-column align-items-center align-items-md-start gap-md-2 gap-3">
                      <small className="text-gray opacity-6">Followers</small>
                      <p className="times text-gray mb-0">{userData.followers}</p>
                    </div>
                    <div className="d-flex flex-column align-items-center align-items-md-start gap-md-2 gap-3">
                      <small className="text-gray opacity-6">Following</small>
                      <p className="times text-gray mb-0">{userData.following}</p>
                    </div>
                  </div>

                  <div className="d-flex flex-column moreInfo">
                    <div className="d-flex flex-column flex-md-row w-100 gap-md-4 gap-3">
                      <a
                        className={clsx("detail place",{"opacity-6 none":userData.location===null})}
                        href="">
                        {userData.location?userData.location:"Not Available"}
                      </a>
                      <a
                        className={clsx("detail twitter",{"opacity-6 none":userData.twitter===null,"":userData.twitter!==null})}
                        href="">
                        {userData.twitter?userData.twitter:"Not Available"}
                      </a>
                    </div>
                    <div className="d-flex flex-column flex-md-row w-100 gap-md-4 gap-3">
                      <a className={clsx("detail github",{"opacity-6 none":userData.blog === "","":userData.blog !== ""})} href={userData.blog}>
                        {userData.blog?userData.blog:"Not Available"}
                      </a>
                      <a className={clsx("detail company",{"opacity-6 none":userData.company === null,"e":userData.company !== null})} href="">
                        {userData.company?userData.company:"Not Available"}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

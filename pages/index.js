import Head from 'next/head'
import { useEffect, useState, useRef } from'react'
import Link from 'next/link'
import Image from 'next/image'
import axios from 'axios';



export default function Home() {

  const [ isChecked, setIsChecked ] = useState("")
  const [ theme, setTheme] = useState("");
  const themeRef = useRef(null);
  const [ themeName, setThemeName ] = useState("");
  const [ userName, setUserName ] = useState("");
  const [ blog, setBlog ] = useState("https://github.blog");
  const blogRef = useRef(null);
  const [ followers, setFollowers ] = useState("10693");
  const [ repos, setRepos ] = useState("8");
  const [ following, setFollowing ] = useState("9");
  const [ location, setLocation ] = useState("San Francisco");
  const locationRef = useRef(null);
  const [ login, setLogin ] = useState("octocat")
  const [ twitter, setTwitter ] = useState("Not Available")
  const twitterRef = useRef(null);
  const [ company, setCompany ] = useState("@github")
  const companyRef = useRef(null);
  const [ bio, setBio ] = useState("Not Available")
  const bioRef = useRef(null);
  const [ date, setDate ] = useState("25")
  const [ month, setMonth ] = useState("Jan")
  const [ year, setYear ] = useState("2011")
  const [ avatar, setAvatar ] = useState("https://avatars.githubusercontent.com/u/583231?v=4")
  const [ name, setName ] = useState("The Octocat")
  const nameRef = useRef(null);
  const [ message, setMessage ] = useState("")




  const handleTheme = () => {
    setIsChecked(!isChecked)
    localStorage.setItem('isChecked',JSON.stringify(!isChecked))
  };

  useEffect(() => {
    const isChecked = JSON.parse(localStorage.getItem('isChecked'))
    if (isChecked === true || isChecked === null) {
      setIsChecked(true);
      setThemeName("LIGHT");
      setTheme("light");
      document.querySelector('body').classList.add("light")
      document.querySelector('body').classList.remove("dark")
    } else if (isChecked === false) {
      setIsChecked(false);
      setThemeName("DARK");
      setTheme("dark");
      document.querySelector("body").classList.add("dark");
      document.querySelector("body").classList.remove("light");
    }
  });
  
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
          setRepos(response.data.public_repos);
          setFollowers(response.data.followers);
          setFollowing(response.data.following);
          setLogin(response.data.login);

          if (response.data.blog === "") {
            setBlog("Not Available");
            blogRef.current.className = "detail github opacity-6 none";
          } else {
            setBlog(response.data.blog);
            blogRef.current.className = "detail github"
          }

          if (response.data.location === null) {
            setLocation("Not Available");
            locationRef.current.className = "detail place opacity-6 none";
          } else {
            setLocation(response.data.location);
            locationRef.current.className = "detail place"
          }

          if (response.data.twitter_username === null) {
            setTwitter("Not Available");
            twitterRef.current.className = "detail twitter opacity-6 none";
            e.preventDefault()
          } else {
            setTwitter(response.data.twitter_username);
            twitterRef.current.className = "detail twitter"
          }

          if (response.data.company === null) {
            setCompany("Not Available");
            companyRef.current.className = "detail company opacity-6 none"
          } else {
            setCompany(response.data.company);
            companyRef.current.className = "detail company"
          }

          if (response.data.bio === null) {
            setBio("Not Available");
            bioRef.current.className = "text-gray mt-0 mt-md-4 opacity-6"
          } else {
            setBio(response.data.bio);
            bioRef.current.className = "text-gray mt-0 mt-md-4"
          }

          if (response.data.name === null) {
            setName("Not Available");
            nameRef.current.className = "name text-gray opacity-6"
          } else {
            setName(response.data.name);
            nameRef.current.className = "name text-gray"
          }

          setAvatar(response.data.avatar_url);

          if (response.data.created_at !== undefined) {
            const date = new Date(response.data.created_at);
            setDate(date.getDate());
            setMonth(date.toLocaleString("en", { month: "short" }));
            setYear(date.getFullYear());
          }
        })
  };


  return (
    <>
      <Head>
        <title>dev-finder</title>
      </Head>
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
                  {themeName}
                </label>
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                  onChange={handleTheme}
                  checked={isChecked}
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
                    src={avatar}
                    alt="user"
                    unoptimized
                    width={70}
                    height={70}
                  />
                  <div className="d-md-none d-flex flex-column justify-content-between">
                    <div className="d-flex flex-column">
                      <h1 className="name text-gray" ref={nameRef}>
                        {name}
                      </h1>
                      <p className="id text-primary" href="#">
                        @{login}
                      </p>
                    </div>
                    <h3 className="join text-gray">
                      Joined {date} {month} {year}
                    </h3>
                  </div>
                </div>
                <div className="d-flex flex-column w-100">
                  <div className="d-md-flex d-none flex-row justify-content-between">
                    <div className="d-flex flex-column">
                      <h1 className="name text-gray" ref={nameRef}>
                        {name}
                      </h1>
                      <p className="id text-primary" href="#">
                        @{login}
                      </p>
                    </div>
                    <h3 className="join text-gray">
                      Joined {date} {month} {year}
                    </h3>
                  </div>
                  <p className="text-gray mt-0 mt-md-4 opacity-6" ref={bioRef}>
                    {bio}
                  </p>

                  <div className="d-flex info justify-content-between">
                    <div className="d-flex flex-column align-items-center align-items-md-start gap-md-2 gap-3">
                      <small className="text-gray opacity-6">Repos</small>
                      <p className="times text-gray mb-0">{repos}</p>
                    </div>
                    <div className="d-flex flex-column align-items-center align-items-md-start gap-md-2 gap-3">
                      <small className="text-gray opacity-6">Followers</small>
                      <p className="times text-gray mb-0">{followers}</p>
                    </div>
                    <div className="d-flex flex-column align-items-center align-items-md-start gap-md-2 gap-3">
                      <small className="text-gray opacity-6">Following</small>
                      <p className="times text-gray mb-0">{following}</p>
                    </div>
                  </div>

                  <div className="d-flex flex-column moreInfo">
                    <div className="d-flex flex-column flex-md-row w-100 gap-md-4 gap-3">
                      <a
                        className="detail place none"
                        href=""
                        ref={locationRef}
                      >
                        {location}
                      </a>
                      <a
                        className="detail twitter opacity-6 none"
                        href=""
                        ref={twitterRef}
                      >
                        {twitter}
                      </a>
                    </div>
                    <div className="d-flex flex-column flex-md-row w-100 gap-md-4 gap-3">
                      <a className="detail github" href={blog} ref={blogRef}>
                        {blog}
                      </a>
                      <a className="detail company" href="" ref={companyRef}>
                        {company}
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

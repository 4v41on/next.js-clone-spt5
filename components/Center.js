import { ChevronDownIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";
import { shuffle } from "lodash";
import { useRecoilState, useRecoilValue  } from "recoil";
import {playlistIdState, playlistState } from "/atoms/playlistAtom";
import useSpotify from "@/hooks/useSpotify";
import Songs from "./Songs";
import { signOut } from "next-auth/react"

const colors = [
    "from-indigo-400",
    "from-pink-400",
    "from-purple-400",
    "from-green-400",
];

function Center() {
    const {data: session } = useSession();
    const spotifyApi = useSpotify();
    const [color, setColor] = useState(null)
    const  playlistId = useRecoilValue(playlistIdState);
    const [playlist, setPlaylist] = useRecoilState(playlistState)




    useEffect(()=>{
      setColor(shuffle(colors).pop());
    },[playlistId]);


    useEffect(()=>{

    spotifyApi
    .getPlaylist
     (playlistId)
    .then((data) =>{
      setPlaylist(data.body); 
       })
        .catch ((err) => console.log("algo paso xd", err))
      },[spotifyApi, playlistId]);
    console.log(playlist);


  return (
    <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide text-white">
      <header className="absolute top-5 right-8">
        <div
        className=" cursor-pointer flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 rounded-full p-1 pr-2 border  border-green-400 text-white" onClick={() => signOut()}>
             <img className="rounded-full ww-10 h-10" src={session?.user.image}/>
        <h2>{session?.user.name}</h2>
        <ChevronDownIcon className="h-5 w-5 "/>
        </div>
      </header>
      <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color}  h-80 text-white p-8 `}>
        <img 
         className="h-44 w-44 shadow-2xl"
         src={playlist?.images?.[0]?.url}
         alt=""
         >
           </img>

    
           <div>
         <p>PLAYLIST</p>
         <h1 className="text-2xl md:text-3xl xl:text-5xl font bold">{playlist?.name}</h1>
         </div>
      </section>
      <div>
        <Songs />
      </div>
    </div>
  )
}

export default Center

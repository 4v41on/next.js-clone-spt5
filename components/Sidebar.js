import {HomeIcon,SearchIcon, LibraryIcon, PlusCircleIcon,  RssIcon,BeakerIcon, GlobeIcon, rocketlaunchIcon } from "@heroicons/react/outline"
import {HeartIcon,} from "@heroicons/react/solid"
import { signOut, useSession } from "next-auth/react"
import { useEffect, useState } from "react";
import useSpotify from "../hooks/useSpotify";
import { useRecoilState } from "recoil";
import { playlistIdState } from "../atoms/playlistAtom";

function Sidebar() {
   const spotifyApi = useSpotify();
   const {data: session, status } = useSession();
   console.log('👻 session',session)
   const [playlists, setPlaylists] = useState ([]);
   const [playlistId, setPlaylistId]= useRecoilState(playlistIdState);
   
   console.log('u pick id🛰', playlistId)

   useEffect(() => {
      if (spotifyApi.getAccessToken()) {
       spotifyApi.getUserPlaylists().then((data)=>{
         setPlaylists(data.body.items);
       });
        
      }
    }, [session, spotifyApi]);

  return (

    <div className="text-gray-400 p-5 text-xs lg:text-sm border-r border-gray-900 overflow-y-scroll scrollbar-hide h-screen sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex">
    <div className="space-y-4">
    <button className="flex flex-col mb-20 items-center text-center space-x-2 hover:text-white">
    <img
        className="h-20 mb-3 ml-3 rounded-full"
        src="https://media2.giphy.com/media/l2JhnjGtRdRJP0Ooo/giphy.gif?cid=ecf05e47inwu2w2cpafbbzie911ms4193r5nzvwhff3r4ci6&rid=giphy.gif&ct=g"
        alt=""
      />
    
   </button>
   <button className="flex items-center space-x-2 hover:text-white">
     <HomeIcon className="h-5 w-5"/>
      <p>Home</p>
   </button>
   <button className="flex items-center space-x-2 hover:text-white">
     <SearchIcon className="h-5 w-5"/>
      <p>Buscar</p>
   </button>
   <button className="flex items-center space-x-2 hover:text-white text-green-500">
     <BeakerIcon className="h-5 w-5"/>
      <p>Libreria</p>
   </button>
   <button className="flex items-center space-x-2 hover:text-white">
     <PlusCircleIcon className="h-5 w-5"/>
      <p>ADD</p>
   </button>
  
<hr className="border-t-[0.1px] border-gray-900"></hr>

<button className="flex items-center space-x-2 hover:text-white">
     <PlusCircleIcon className="h-5 w-5"/>
      <p>Create the playList</p>
   </button>
   <button className="flex items-center space-x-2 hover:text-white">
     <GlobeIcon className="h-5 w-5"/>
      <p>UR EPISODES</p>
   </button>
   <button className="flex items-center space-x-2 hover:text-white text-blue-500">
     <HeartIcon className="h-5 w-5"/>
      <p>Like songs</p>
   </button>
   <hr className="border-t-[0.1px] border-gray-900"></hr>

{/* Playlist*/}
{playlists.map((playlist)=> (

<p key={playlist.id} 
onClick={() => setPlaylistId( playlist.id )} 
className="cursor-pointer hover:text-white"
>
  {playlist.name}
  </p>
))}





   </div>
    </div>
  )
}

export default Sidebar

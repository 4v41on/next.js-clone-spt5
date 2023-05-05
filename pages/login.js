 import {getProviders, signIn} from "next-auth/react"

export function Login({providers}) {
  return (
    <div className="bg-black flex flex-col items-center min-h-screen w-full justify-center" >
      <img
        className="w-52 mb-5 rounded-full"
        src="https://media2.giphy.com/media/l2JhnjGtRdRJP0Ooo/giphy.gif?cid=ecf05e47inwu2w2cpafbbzie911ms4193r5nzvwhff3r4ci6&rid=giphy.gif&ct=g"
        alt=""
      />

      {Object.values(providers).map((provider)=>(
        <div key={provider.name}>
            <button className="bg-[#18d860] text-white p-5 rounded-full" onClick={()=> signIn(provider.id, {callbackUrl: "/"})} >
                Login with {provider.name}
            </button>
        </div>
      ))}
    </div>
  );
}

export default Login
export async function getServerSideProps(){
    const providers = await getProviders();

    return {
        props:{
providers
        }
    }
}
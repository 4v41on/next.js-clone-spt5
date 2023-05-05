import "../styles/globals.css"
import { SessionProvider } from "next-auth/react"
import { RecoilRoot } from 'recoil';

 
 function App({ Component, pageProps: {session, ...pageProps} } 
  ) {
  return(
    <SessionProvider session={session}> 

    <RecoilRoot>
    <Component {...pageProps} />
    </RecoilRoot>
    
    </SessionProvider>
  );
}

// Agrega el middleware a la configuración de getServerSideProps


export default App 
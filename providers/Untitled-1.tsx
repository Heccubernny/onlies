import { getCurrentUser } from "@/utils/appwrite";
import { createContext, useContext, useEffect, useState } from "react"
import { Models } from "react-native-appwrite";

export const GlobalContext = createContext<GlobalContextProps | undefined>(
  undefined
);
export interface GlobalContextProps{
    loading: boolean,
  loggedInUser: Models.User<Models.Preferences> | null,
  setLoggedInUser: React.Dispatch<React.SetStateAction<Models.User<Models.Preferences> | null>>

}
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  return context;
};

type Props = {
  children: React.ReactNode;
};
const GlobalProvider = ({children}: Props) => {

    // const [ isLogged, setIsLogged ] = useState<boolean>(false);
  // const [ user, setUser ] = useState<Models.User<Models.Preferences> | null>(null);
    const [ loggedInUser, setLoggedInUser ] = useState<Models.User<Models.Preferences> | null>(null); //fix this any
  
    // const [ loading, setLoading ] = useState<boolean>(true);

  //   useEffect(() => {
  //   getCurrentUser()
  //     .then((res) => {
  //       if (res) {
  //         setIsLogged(true);
  //         setUser(res);
          
  //         setLoggedInUser(res);
  //       } else {
  //         setIsLogged(false);
  //         setUser(null);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('Error in useEffect:', error);
  //       setIsLogged(false);
  //       setUser(null);
  //     })
  //     .finally(() => setLoading(false));
  // }, []);


    return (
      <GlobalContext.Provider
        value={{
          loading: false,
          loggedInUser,
          setLoggedInUser
        }}>
            {children}
        </GlobalContext.Provider>
    )
    
} 

export default GlobalProvider;
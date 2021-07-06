import { useState, useCallback, Dispatch, SetStateAction } from "react"

const useInput = <T>( initialData: T ): [T, (e: T) => void, Dispatch<SetStateAction<T>>]  => {
   const [value, setValue] = useState( initialData );
   const handler = useCallback(( e ) => {
      setValue( e.target.value )
   }, []);
   return [value, handler, setValue];
}

export default useInput;
import { useState, useCallback, Dispatch, SetStateAction, ChangeEvent } from "react"

type returnValue<T> = [T, (e: ChangeEvent<HTMLInputElement>) => void, Dispatch<SetStateAction<T>>]

const useInput = <T>( initialData: T ): returnValue<T> => {
   const [value, setValue] = useState( initialData );
   const handler = useCallback(( e: ChangeEvent<HTMLInputElement> ) => {
      const target: HTMLInputElement = e.target as HTMLInputElement;
      setValue((target.value as unknown) as T);
   }, []);
   return [value, handler, setValue];
}

export default useInput;
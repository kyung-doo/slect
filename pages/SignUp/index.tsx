import React, { 
   ChangeEvent, 
   useCallback, 
   useState, 
   VFC, 
   FormEvent 
} from 'react';

import { 
   Link, 
   Redirect 
} from 'react-router-dom';

import { 
   Header, 
   Form, 
   Label,
   Input,
   Button,
   Error,
   Success,
   LinkContainer
} from './styles';

import useInput from '@hooks/useInput';
import axios from 'axios';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';





const SignUp = () => {

   const { data, error, revalidate } = useSWR('/api/users', fetcher);

   const [ email, onChangeEmail ] = useInput('');
   const [ nickname, onChangeNickname ] = useInput('');
   const [ password, , setPassword ] = useInput('');
   const [ passwordCheck, , setPasswordCheck ] = useInput('');
   const [ mismatchError, setMismatchError ] = useState(true);
   const [signUpError, setSignUpError] = useState('');
   const [signUpSuccess, setSignUpSuccess] = useState(false);

   const onChangepassword = useCallback(( e: ChangeEvent<HTMLInputElement> ) => {
      setPassword(e.target.value);
      setMismatchError( e.target.value !== passwordCheck );
   }, [passwordCheck]);

   const onChangePasswordCheck = useCallback(( e: ChangeEvent<HTMLInputElement> ) => {
      setPasswordCheck( e.target.value )
      setMismatchError( e.target.value !== password );
   }, [password]);

   const onSubmit = useCallback( async( e: FormEvent<HTMLFormElement> ) => {
      e.preventDefault();
      if(!mismatchError && nickname && email) {

         // console.log(email, nickname, password, passwordCheck, mismatchError);
         setSignUpError('');
         setSignUpSuccess(false);

         let res;
         try {
            res = await axios.post('/api/users', {
               email: email,
               nickname: nickname,
               password: password
            });
            setSignUpSuccess( true );
         } catch( e ) {
            console.log(e)
            setSignUpError( e.response.data );
         }
      }
   }, [email, nickname, password, passwordCheck, mismatchError, signUpError]);

   if (data === undefined) {
      return <div>?????????...</div>;
   }

   if(data) {
      return <Redirect to="/workspace/channel" />
   }

   return (
      <div id="container">
         <Header>Sleact</Header>
         <Form onSubmit={onSubmit}>

            <Label id="email-label">
               <span>????????? ??????</span>
               <div>
                  <Input type="email" 
                     id="email" name="email" value={email} onChange={onChangeEmail} />
               </div>
            </Label>

            <Label id="nickname-label">
               <span>?????????</span>
               <div>
                  <Input type="text" id="nickname" name="nickname" value={nickname} onChange={onChangeNickname} />
               </div>
            </Label>

            <Label id="password-label">
               <span>????????????</span>
               <div>
                  <Input type="password" id="password" name="password" value={password} onChange={onChangepassword} />
               </div>
            </Label>
            
            <Label id="password-check-label">
               <span>???????????? ??????</span>
               <div>
                  <Input
                  type="password"
                  id="password-check"
                  name="password-check"
                  value={passwordCheck}
                  onChange={onChangePasswordCheck}
                  />
               </div>
               {mismatchError && <Error>??????????????? ???????????? ????????????.</Error>}
               {!nickname && <Error>???????????? ??????????????????.</Error>}
               {signUpError && <Error>{signUpError}</Error>}
               {signUpSuccess && <Success>???????????????????????????! ?????????????????????.</Success>}
            </Label>
            <Button type="submit">????????????</Button>
         </Form>
         <LinkContainer>
            ?????? ???????????????????&nbsp;
            <Link to="/login">????????? ????????????</Link>
         </LinkContainer>
      </div>
   )
}

export default SignUp;
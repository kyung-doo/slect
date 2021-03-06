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
      return <div>로딩중...</div>;
   }

   if(data) {
      return <Redirect to="/workspace/channel" />
   }

   return (
      <div id="container">
         <Header>Sleact</Header>
         <Form onSubmit={onSubmit}>

            <Label id="email-label">
               <span>이메일 주소</span>
               <div>
                  <Input type="email" 
                     id="email" name="email" value={email} onChange={onChangeEmail} />
               </div>
            </Label>

            <Label id="nickname-label">
               <span>닉네임</span>
               <div>
                  <Input type="text" id="nickname" name="nickname" value={nickname} onChange={onChangeNickname} />
               </div>
            </Label>

            <Label id="password-label">
               <span>비밀번호</span>
               <div>
                  <Input type="password" id="password" name="password" value={password} onChange={onChangepassword} />
               </div>
            </Label>
            
            <Label id="password-check-label">
               <span>비밀번호 확인</span>
               <div>
                  <Input
                  type="password"
                  id="password-check"
                  name="password-check"
                  value={passwordCheck}
                  onChange={onChangePasswordCheck}
                  />
               </div>
               {mismatchError && <Error>비밀번호가 일치하지 않습니다.</Error>}
               {!nickname && <Error>닉네임을 입력해주세요.</Error>}
               {signUpError && <Error>{signUpError}</Error>}
               {signUpSuccess && <Success>회원가입되었습니다! 로그인해주세요.</Success>}
            </Label>
            <Button type="submit">회원가입</Button>
         </Form>
         <LinkContainer>
            이미 회원이신가요?&nbsp;
            <Link to="/login">로그인 하러가기</Link>
         </LinkContainer>
      </div>
   )
}

export default SignUp;
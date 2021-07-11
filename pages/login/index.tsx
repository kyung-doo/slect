import React, { 
   FormEvent, 
   useCallback, 
   useState 
} from 'react';

import { 
   Success, 
   Form, 
   Error, 
   Label, 
   Input, 
   LinkContainer, 
   Button, 
   Header 
} from '@pages/SignUp/styles';

import { Link, Redirect } from 'react-router-dom';
import useInput from '@hooks/useInput';
import axios from 'axios';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';



const Login = () => {

   const { data, error, revalidate, mutate } = useSWR('/api/users', fetcher);
   const [ email, onChangeEmail ] = useInput('');
   const [ password, onChangePassword ] = useInput('');
   const [logInError, setLoginError] = useState('');

   const onSubmit = useCallback( async( e: FormEvent<HTMLFormElement> ) => {
      e.preventDefault();
      setLoginError('');
      let res;
      try {
         res = await axios.post('/api/users/login', {
            email: email,
            password: password
         });
         revalidate();
      } catch( e ) {
         setLoginError(e.response?.data);
      }
   }, [email, password]);

   if (data === undefined) {
      return <div>로딩중...</div>;
   }

   if (data) {
      return <Redirect to="/workspace/sleact/channel/일반" />
   }

   return (
      <div id="container">
         <Header>Slect</Header>
         <Form onSubmit={onSubmit}>
            <Label id="email-label">
               <span>이메일 주소</span>
               <div>
                  <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
               </div>
            </Label>
            <Label id="password-label">
               <span>비밀번호</span>
               <div>
                  <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
               </div>
               {logInError && <Error>{logInError}</Error>}
            </Label>
            <Button type="submit">로그인</Button>
         </Form>
         <LinkContainer>
            아직 회원이 아니신가요?&nbsp;
            <Link to="/signup">회원가입 하러가기</Link>
         </LinkContainer>
      </div>
   )
}

export default Login;
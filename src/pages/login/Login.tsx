import UiPageWrapper from '../../ui/UIPageWrapper';
import bgLoginPage from '../../assets/images/bg-illustration.png';
import LoginForm from './components/LoginForm';

const LoginPage = () => {
  return (
    <UiPageWrapper className='w-full h-full flex flex-col justify-center items-center from-uiBlue/5 to-uiBlue/20 bg-gradient-to-b'>
      <LoginForm />
      <img
        src={bgLoginPage}
        className=' h-96 object-contain absolute bottom-0 left-1/2 -translate-x-1/2 '
      />
    </UiPageWrapper>
  );
};

export default LoginPage;

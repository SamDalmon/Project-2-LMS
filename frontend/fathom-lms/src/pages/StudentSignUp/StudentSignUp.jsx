import AuthLayout from '../../layouts/AuthLayout/AuthLayout'
import AuthForm from '../../components/AuthForm'
import SignUpForm from '../../components/SignUpForm'

export default function StudentSignUp () {
  return (
    <>
      <AuthLayout 
        title='Student Sign Up'
        content={
          <>
            <AuthForm/>
            <SignUpForm/>
          </>
        }
        onSubmit={ () => null } //TODO: Create OnSubmit function
      />
    </>
  )
}
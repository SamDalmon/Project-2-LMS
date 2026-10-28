import AuthLayout from '../../layouts/AuthLayout/AuthLayout'
import AuthForm from '../../components/AuthForm'

export default function TeacherSignUp () {
  return (
    <>
      <AuthLayout 
        title='Sign In'
        content={
          <>
            <AuthForm/>
          </>
        }
        onSubmit={ () => null } //TODO: Create OnSubmit function
      />
    </>
  )
}
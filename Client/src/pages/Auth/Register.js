import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import FormText from '../../component/formText';
import Image from '../../images/delivery_girl.svg'


const Register = ()=> {
	const saveParticipants = async(values)=>{
		const date = Date.now()
		const requestOptions = {
		 method: 'POST',
		 headers: { 'Content-Type': 'application/json' },
		 body: JSON.stringify({
			 username: values.username,
				  email: values.email,
				  lotteryNo: values.lotteryNo,
				  password: values.password,
				  created: date,
		 })
	 };
	 const response = await fetch('http://localhost:4000/register', requestOptions);
	 const data = await response.json();
	 console.log(data) 
  }

  const SignupSchema = Yup.object().shape({
		name: Yup.string()
		.required('Required'),
		password: Yup.string()
		.required('Required'),
		email: Yup.string().email('Invalid email').required('Required'),
		phoneNumber: Yup.number()
		.required('Required'),
	});

  return (
      <div className="section_bg">
        <div className="form_section" id="register">
            <div className='info_text'>
                <FormText image={Image}/>
            </div>

            <div className='form_content'>
                <h2 className='pg_title'>Create Your Account</h2>

                <div className="register">
                    <Formik
                        initialValues={{
                            name: '',
                            phoneNumber: '',
                            adddress: '',
                            email: '',
                            password: '',
                            confirmPassword: '',
                        }}
                        validationSchema={SignupSchema}
                        onSubmit={values => {
                            saveParticipants(values)
                            // same shape as initial values
                            // console.log(values);
                        }}
                    >
                    {({ errors, touched, values, handleChange, handleBlur }) => (
                        <Form>
                            <Field name="name" placeholder="Enter Name" value={values.name} onChange={handleChange} onBlur={handleBlur} />
                            {errors.name && touched.name ? (<div className="error">{errors.name}</div>) : null}

                            <Field name="phoneNumber" placeholder="Enter Phone No." value={values.phoneNumber} onChange={handleChange} onBlur={handleBlur} />
                            {errors.phoneNumber && touched.phoneNumber ? (<div className="error">{errors.phoneNumber}</div>) : null}

                            <Field name="adddress" placeholder="Enter Adddress" value={values.adddress} onChange={handleChange} onBlur={handleBlur} />
                            {errors.email && touched.email ? (<div className="error">{errors.email}</div>) : null}

                            <Field name="password" placeholder="Enter Password" value={values.password} onChange={handleChange} onBlur={handleBlur} />
                            {errors.password && touched.password ? <div className="error">{errors.password}</div> : null}

                            <Field name="confirmPassword" placeholder="Confirm Password" value={values.confirmPassword} onChange={handleChange} onBlur={handleBlur} />
                            {errors.confirmPassword && touched.confirmPassword ? <div className="error">{errors.confirmPassword}</div> : null}

                            <button type="submit">Submit</button>
                        </Form>
                    )}
                    </Formik>
                    
                </div>
            </div>
        </div>
      </div>
    )
}

export default Register
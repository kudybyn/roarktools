import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'
import emailjs from '@emailjs/browser'
import Alert from '../common/Alerts'

const RequestForm = () => {
  const { t } = useTranslation()
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const validationSchema = Yup.object({
    requestType: Yup.string().required(t('required.type')),
    name: Yup.string().required(t('required.name')),
    email: Yup.string()
      .email(t('required.emailType'))
      .required(t('required.email')),
    message: Yup.string().required(t('required.message')),
  })

  const onOpenAlert = () => {
    setSnackbarOpen(true)
    setTimeout(() => {
      setSnackbarOpen(false)
    }, 5000)
  }

  return (
    <>
      <Alert
        open={snackbarOpen}
        color='#008000'
        setOpen={setSnackbarOpen}
        textColor={'white'}
        text={t('alert.successAlert')}
      />
      <Formik
        initialValues={{ requestType: '', name: '', email: '', message: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          emailjs
            .send(
              process.env.REACT_APP_EMAILJS_SERVICE_ID,
              process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
              values,
              process.env.REACT_APP_EMAILJS_USER_ID
            )
            .then(
              (result) => {
                onOpenAlert()
                resetForm()
                setTimeout(() => setSubmitting(false), 5000)
              },
              (error) => {
                setTimeout(() => setSubmitting(false), 5000)
              }
            )
        }}
      >
        {({ isSubmitting }) => (
          <Form className='w-full max-w-[700px] px-2 md:px-8'>
            <div className='flex flex-col gap-8'>
              <div className='w-full flex flex-col gap-4 justify-between'>
                <label htmlFor='requestType' className='text-[21px]'>
                  {t('form.requireType')}
                </label>
                <Field
                  type='text'
                  name='requestType'
                  disabled={isSubmitting}
                  className='rounded border-2 p-4 font-semibold'
                />
                <ErrorMessage
                  name='requestType'
                  component='div'
                  style={{ color: 'red' }}
                />
              </div>
              <div className='grid grid-cols-1 gap-8 justify-center w-full md:grid-cols-2'>
                <div className='w-full flex flex-col gap-4 justify-between'>
                  <label htmlFor='name' className='text-[21px]'>
                    {t('form.name')}
                  </label>
                  <Field
                    type='text'
                    name='name'
                    disabled={isSubmitting}
                    className='rounded border-2 p-4 font-semibold'
                  />
                  <ErrorMessage
                    name='name'
                    component='div'
                    style={{ color: 'red' }}
                  />
                </div>

                <div className='w-full flex flex-col gap-4 justify-between'>
                  <label htmlFor='email' className='text-[21px]'>
                    {t('form.email')}
                  </label>
                  <Field
                    type='email'
                    name='email'
                    disabled={isSubmitting}
                    className='rounded border-2 p-4 font-semibold'
                  />
                  <ErrorMessage
                    name='email'
                    component='div'
                    style={{ color: 'red' }}
                  />
                </div>
              </div>
              <div className='w-full flex flex-col gap-4 justify-between'>
                <label htmlFor='message' className='text-[21px]'>
                  {t('form.message')}
                </label>
                <Field
                  as='textarea'
                  name='message'
                  disabled={isSubmitting}
                  className='rounded border-2 h-[150px] p-4 font-semibold resize-none'
                />
                <ErrorMessage
                  name='message'
                  component='div'
                  style={{ color: 'red' }}
                />
              </div>
              <div className='w-full flex justify-center'>
                <button
                  type='submit'
                  className={`bg-${isSubmitting ? '[#464646]' : 'black'} text-${isSubmitting ? 'black' : 'white'}
             rounded-xl px-8 py-4 transition duration-500 hover:scale-105`}
                  disabled={isSubmitting}
                >
                  {t('form.submit')}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default RequestForm

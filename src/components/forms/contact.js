import React from 'react'
import {Formik, Form, Field} from 'formik'
import * as Yup from 'yup'
// import {navigate} from 'gatsby-link'

function ContactForm() {
  return (
    <div>
      <Formik
        initialValues={{
          name: '',
          email: '',
          body: '',
        }}
        onSubmit={() => {}}
        validationSchema={Yup.object().shape({
          name: Yup.string().required(),
          email: Yup.string()
            .email()
            .required(),
          body: Yup.string()
            .min(10)
            .max(1000)
            .required(),
        })}
        render={({values, isSubmitting}) => (
          <Form
            css={{
              display: 'grid',
              gridGap: 20,
            }}
            name="contact"
            method="post"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            data-netlify-recaptcha="true"
          >
            <input type="hidden" name="form-name" value="contact" />
            <div style={{display: 'none'}}>
              <label htmlFor="botField">
                Don’t fill this out if you{"'"}re human:
              </label>
              <input name="bot-field" />
            </div>
            <div>
              <label htmlFor="name">Nombre</label>
              <br />
              <Field name="name" />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <br />
              <Field name="email" />
            </div>
            <div>
              <label htmlFor="body">Mensaje</label>
              <br />
              <Field
                name="body"
                component="textarea"
                style={{width: '100%'}}
                rows="10"
                maxLength="1000"
                minLength="10"
              />
              <small>{values.body.length} / 1000</small>
            </div>
            <div data-netlify-recaptcha="true" />
            <div>
              <button type="submit" disabled={isSubmitting}>
                Send
              </button>
              {isSubmitting ? <span css={{marginLeft: 10}}>...</span> : null}
            </div>
          </Form>
        )}
      />
    </div>
  )
}

export default ContactForm

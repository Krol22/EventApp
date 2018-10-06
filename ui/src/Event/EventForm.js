import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';
import { connect } from 'react-redux';

import * as Yup from 'yup';

import { CustomInput } from '../Form/CustomInput';
import { addEvent } from './EventActions';

const initialEvent = {
    firstName: '',
    lastName: '',
    email: '',
    eventDate: '',
};

const EventFormSchema = Yup.object().shape({
    firstName: Yup.string()
        .required('Required'),
    lastName: Yup.string()
        .required('Required'),
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
    eventDate: Yup.date()
        .required('Required'),
});

export class EventFormCl extends Component {
    onClick(values, {resetForm}) {
        this.props.addEvent(values).then(function() {
            resetForm(initialEvent)
        });
    }

    render() {
        return (
            <Formik
                initialValues={initialEvent}
                validationSchema={EventFormSchema}
                onSubmit={this.onClick.bind(this)}
            >
            {({
                handleSubmit,
            }) => (
                    <Form onSubmit={handleSubmit}>
                        <Field 
                            name="firstName" 
                            label="First name"
                            placeholder="First name"
                            component={CustomInput}
                        />
                        <Field 
                            name="lastName" 
                            label="Last name"
                            placeholder="Last name"
                            component={CustomInput}
                        />
                        <Field 
                            name="email" 
                            label="Email"
                            placeholder="Email"
                            component={CustomInput}
                        />
                        <Field 
                            name="eventDate" 
                            label="EventDate"
                            placeholder="Event date"
                            type="date"
                            component={CustomInput}
                        />
                        <button className="button" type="submit">Add event</button>
                    </Form>
            )}
            </Formik>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    addEvent: (newEvent) => {
        return dispatch(addEvent(newEvent))
    }
});

export const EventForm = connect(() => { return {}; }, mapDispatchToProps)(EventFormCl);
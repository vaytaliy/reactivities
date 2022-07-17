import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

interface Props {
    activity: Activity | undefined;
    closeForm: () => void;
    createOrEditActivity: (activity: Activity) => void;
    submitting: boolean;
}

const ActivityForm = ({ activity, closeForm, createOrEditActivity, submitting }: Props) => {

    const initialState : Activity = activity
        ?? {
            id: '',
            title: '',
            description: '',
            category: '',
            date: '',
            city: '',
            venue: ''
        };

    const [activityDisplay, setActivityDisplay] = useState<Activity>(initialState);

    const handleSubmit = () => {
        createOrEditActivity(activityDisplay); //await?
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setActivityDisplay({ ...activityDisplay, [name]: value });
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input onChange={handleInputChange} value={activityDisplay.title} name='title' placeholder='Title' />
                <Form.TextArea onChange={handleInputChange} value={activityDisplay.description} name='description' placeholder='Description' />
                <Form.Input onChange={handleInputChange} value={activityDisplay.category} name='category' placeholder='Category' />
                <Form.Input type='date' onChange={handleInputChange} value={activityDisplay.date} name='date' placeholder='Date' />
                <Form.Input onChange={handleInputChange} value={activityDisplay.city} name='city' placeholder='City' />
                <Form.Input onChange={handleInputChange} value={activityDisplay.venue} name='venue' placeholder='Venue' />
                <Button loading={submitting} floated='right' positive type='submit' content='Submit' />
                <Button onClick={() => closeForm()} floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
}

export default ActivityForm;
import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

interface Props {
    activity: Activity
    selectActivity: (id : string) => void
    cancelSelectActivity: () => void
    returnUserToPreviousScrollPosition: () => void
    openForm: (id: string) => void
    deleteActivity: (id : string) => void
    submitting: boolean
}

const ActivityDetails = ({ activity, selectActivity, deleteActivity, cancelSelectActivity, returnUserToPreviousScrollPosition, openForm, submitting }: Props) => {
    
    const cancelAndReturnBack = () => {
        returnUserToPreviousScrollPosition()
        cancelSelectActivity()
    }
    
    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
            <Card.Content>
                <Card.Header>{activity.title}</Card.Header>
                <Card.Meta>
                    <span>{activity.date}</span>
                </Card.Meta>
                <Card.Description>
                   {activity.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths='3'>
                    <Button onClick={() => openForm(activity.id)} basic color='blue' content='Edit'/>
                    <Button onClick={() => cancelAndReturnBack()} basic color='grey' content='Cancel'/>
                    <Button name={activity.id} loading={submitting} onClick={() => deleteActivity(activity.id)} basic color='red' content='Delete'></Button>
                </Button.Group>
            </Card.Content>
        </Card>
    )
}

export default ActivityDetails;
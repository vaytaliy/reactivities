import React from 'react';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import ActivityPlaceholder from '../../../app/layout/ActivityPlaceholder';
import { Activity } from '../../../app/models/activity';
interface Props {
    activities: Activity[];
    selectActivity: (id: string) => void;
    handleSetScreenLocation: (position: number) => void;
    loading: boolean;
    inverted: boolean;
}


const ActivityList = ({ activities, selectActivity, handleSetScreenLocation, loading, inverted}: Props) => {

    const handleSelectWithScrollPosition = (id: string) => {

        handleSetScreenLocation(window.scrollY)
        selectActivity(id);
    }

    const displayActivities = () => {
        return (
            <Item.Group divided>
                {activities.map(activity => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => { handleSelectWithScrollPosition(activity.id) }} floated='right' content='View' color='blue' />
                                <Label basic content={activity.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        )
    }

    const displayPlaceholders = () => {

        return (
            <Item.Group divided>
                    <ActivityPlaceholder inverted={inverted}/>
                    <ActivityPlaceholder inverted={inverted}/>
                    <ActivityPlaceholder inverted={inverted}/>
                    <ActivityPlaceholder inverted={inverted}/>
                    <ActivityPlaceholder inverted={inverted}/>
                    <ActivityPlaceholder inverted={inverted}/>
                    <ActivityPlaceholder inverted={inverted}/>
                    <ActivityPlaceholder inverted={inverted}/>
                    <ActivityPlaceholder inverted={inverted}/>
                    <ActivityPlaceholder inverted={inverted}/>
            </Item.Group>
        )
    }

    return (
        <Segment>
            {!loading ? displayActivities() : displayPlaceholders()}
        </Segment>
    )
}

export default ActivityList;
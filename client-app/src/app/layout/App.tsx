import React, { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import Navbar from './Navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { v4 as uuid } from 'uuid';
import agent from '../api/agent';

function App() {

  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Activities.list()
      .then(res => {
        //let activities: Activity[] = [];
        res.forEach(activity => {
          activity.date = activity.date.split('T')[0];
        })
        setActivities(res);
        setLoading(false);
      })
  }, [])

  const handleSelectActivity = (id: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedActivity(activities.find(x => x.id === id));
  }

  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined);
  }

  const handleFormOpen = (id?: string) => {
    console.log('opening form')
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }

  const handleFormClose = () => {
    setEditMode(false);
  }

  const handleCreateOrEditActivity = async (activity: Activity) => {
    setSubmitting(true);
    if (activity.id) {
      await agent.Activities.update(activity)
      setActivities([...activities.filter(x => x.id !== activity.id), activity])
    } else {
      activity.id = uuid();
      await agent.Activities.create(activity)
      setActivities([...activities, activity]);
    }
    setSelectedActivity(activity);
    setEditMode(false);
    setSubmitting(false);

  }

  const handleDeleteActivity = async (id: string) => {
    // activities.splice((activities.map(x => x.id).indexOf(id)), 1)
    setSubmitting(true);
    await agent.Activities.delete(id);
    setActivities([...activities.filter(x => x.id !== id)]);
    setEditMode(false);
    setSelectedActivity(undefined);
    setSubmitting(false);
  }

  return (
    <React.Fragment>
      <Navbar openForm={handleFormOpen} />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEditActivity={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
          loading={loading}
          inverted={false}
          submitting={submitting}
        />
      </Container>
    </React.Fragment>
  );
}

export default App;

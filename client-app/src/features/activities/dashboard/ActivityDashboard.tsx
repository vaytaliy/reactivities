import React, { useState } from 'react';
import { Activity } from '../../../app/models/activity';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import ActivityList from './ActivityList';

interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectActivity: (id: string) => void;
    cancelSelectActivity: () => void;
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
    createOrEditActivity: (activity: Activity) => void;
    deleteActivity: (id : string) => void;
    loading: boolean;
    inverted: boolean;
    submitting: boolean;
}


const ActivityDashboard = ({
    activities,
    selectedActivity,
    selectActivity,
    cancelSelectActivity,
    editMode,
    openForm,
    closeForm,
    createOrEditActivity,
    deleteActivity,
    loading,
    inverted,
    submitting
}: Props) => {

    const [screenLocation, setScreenLocation] = useState<number>(0)

    const returnUserToPreviousScrollPosition = () => {
        const newLoc = screenLocation;
        window.scroll({ top: newLoc, behavior: 'smooth' })
    }

    const handleSetScreenLocation = (position: number) => {
        setScreenLocation(position)
    }

    return (
        <div className='activityColumns'>
            <div>
                <React.Fragment>
                    {selectedActivity && !editMode &&

                        <ActivityDetails
                            activity={selectedActivity}
                            selectActivity={selectActivity}
                            cancelSelectActivity={cancelSelectActivity}
                            returnUserToPreviousScrollPosition={returnUserToPreviousScrollPosition}
                            openForm={openForm}
                            deleteActivity={deleteActivity}
                            submitting={submitting}
                        />
                    }
                    {editMode &&
                        <ActivityForm
                            activity={selectedActivity}
                            closeForm={closeForm}
                            createOrEditActivity={createOrEditActivity}
                            submitting={submitting}
                        />}
                </React.Fragment>

            </div>
            <div>
                <ActivityList
                    activities={activities}
                    selectActivity={selectActivity}
                    handleSetScreenLocation={handleSetScreenLocation}
                    loading={loading}
                    inverted={inverted}
                />
            </div>
        </div>
    )
}

export default ActivityDashboard;
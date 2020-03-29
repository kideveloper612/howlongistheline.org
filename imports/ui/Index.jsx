import React from 'react'
import MainLayout from './MainLayout'
import { withTracker } from 'meteor/react-meteor-data';
import { locations } from '../api/lines.js';
import { Meteor } from 'meteor/meteor';
import { Icon, Button, ListItem, ListTitle, Card } from 'react-onsenui'
import moment from 'moment';

function Index({ locations, history }) {

    function statusToWord(statusCode) {
        switch (statusCode) {
            case "no":
                return <div style={{ color: "green" }}>No Lines!</div>
            case "small":
                return <div style={{ color: "orange" }}>A Wee Wait</div>
            case "long":
                return <div style={{ color: "red" }}>Busy. Stay Home.</div>
        }
    }

    function renderList() {
        return locations.map((location) => {
            return (
                <Card key={location._id} tappable onClick={() => {
                    history.push('/editLine?id=' + location._id)
                }}>
                    <ListTitle>
                        Name: {location.name}
                    </ListTitle>
                    <ListItem>
                        Address: {location.address}
                    </ListItem>
                    <ListItem>
                        Last updated: {moment(location.lastUpdate).fromNow()}
                    </ListItem>
                    <ListItem>
                        Waiting time:&nbsp;{statusToWord(location.status)}
                    </ListItem>
                </Card>)
        })
    }

    return (
        <MainLayout>
            <ListTitle>
                Shops Near You
                </ListTitle>
            {renderList()}
            <Button modifier="large--cta" style={{ position: "fixed", bottom: 0, zIndex: 1000, minHeight: 50 }}
                // type="submit"
                onClick={() => { history.push('/addLine') }}>
                Add a new shop
                    <Icon style={{ marginLeft: 10 }} icon='fa-plus' />
            </Button>
        </MainLayout>
    )
}


export default withTracker(() => {
    Meteor.subscribe('locations');

    return {
        locations: locations.find({}, { sort: { lastUpdate: -1 } }).fetch(),
        //   currentUser: Meteor.user,
    };
})(Index);

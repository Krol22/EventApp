// 1. init test db
// here check if test db is presented
// create if not
// create schema
// add data

import { Event } from '../../model/Event';

export async function addData(){
    const eventsNum = 3;    
    const eventArr = [];

    new Event({firstName: 'test'});

    for(let i = 0; i < eventsNum; i++) {
        eventArr.push(new Event({
            firstName: `firstName_${i}`,
            lastName: `lastName_${i}`,
            email: `email${i}@mail.com`,
            eventDate: `eventDate_${i}`
        }));
    }

    eventArr.forEach(async (event) => {
        await event.save();
    });

    return eventArr;
}

export async function removeData() {
    await Event.deleteMany({}); 
}
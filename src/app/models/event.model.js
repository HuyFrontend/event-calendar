export class EventModel {
    constructor(eventModel = {title: '', id: '', date: '', status: '', hour: '', min: ''}) {
        this.title = eventModel.title;
        this.id = eventModel.id;
        this.date = eventModel.date;
        this.status = eventModel.status;
        this.hour = eventModel.hour;
        this.min = eventModel.min;
    }
}
<template>
<div>
    <div class="row custom-row">
        <div class="col-md-2">
			<b-button v-b-toggle.collapse-2 class="btn-sm" style="margin-left:18px; margin-bottom:10px;"><h5 class="title is-5 text-center">Calendar Options</h5></b-button>
<b-collapse id="collapse-2">
	<div class="cal card text-white bg-primary mb-3 custom-cal-card" style="margin:8px; margin-left:15px;">
		<div class="calendar-controls">
			<div class="box">
				

				<div class="field">
					<label class="label">Period View</label>
					<div class="control">
						<div class="select">
                           <b-form-select v-model="displayPeriodUom" :options="periodUOMoptions" size="sm"></b-form-select> 
						</div>
					</div>
				</div>
				<div class="field">
					<label class="label">Start Day</label>
					<div class="control">
						<div class="select">
							<select class="form-control-sm" v-model="startingDayOfWeek">
								<option v-for="(d, index) in dayNames" :value="index" :key="index">{{ d }}</option>
							</select>
						</div>
					</div>
				</div>
			</div>

			<div class="box">
				<div class="field">
					<label class="label">Title</label>
					<div class="control">
						<input v-model="newEventTitle" class="input form-control form-control-sm" type="text">
					</div>
				</div>

				<div class="field">
					<b-button v-b-toggle.collapse-3 btn-sm style="margin:5px; margin-left:15px; font-size: 11px;">Choose Event Colour 🎨</b-button>
					<b-collapse id="collapse-3">
					<div class="control">
						    <b-form-group>
								<b-form-radio-group
									id="radio-group-1"
									v-model="selectedColour"
									:options="optionsRadio"
									buttons
									stacked
									name="radio-options"
								></b-form-radio-group>
							</b-form-group>
					</div>
					</b-collapse>
				</div>

				<div class="field">
					<label class="label">Start date</label>
					<div class="control">
						<input v-model="newEventStartDate" class="input form-control form-control-sm" type="date">
						<input v-model="newEventStartTime" class="input form-control form-control-sm" type="time">
					</div>
				</div>

				<div class="field">
					<label class="label">End date</label>
					<div class="control">
						<input v-model="newEventEndDate" class="input form-control form-control-sm" type="date">
						<input v-model="newEventEndTime" class="input form-control form-control-sm" type="time">
					</div>
				</div>

				<button class="button is-info btn-outline-secondary btn-sm btn-block btn-add-event" @click="clickTestAddEvent"><strong>➕ Event</strong></button>
				
			</div>
		</div>
	</div>
</b-collapse>
				<modal v-if="showModal" @close="showModal = false">
					<h3 slot="header">Event:</h3>
					<div slot="body" v-if="message" class="notification is-success">{{ message }}
						<p style="font-size: 10px;">{{timeEvent}} </p>
						<div class="text-center" v-if="this.events.findIndex(x => x.id === this.clickedEvent) >= 0">
							<button class="button is-info btn-primary btn-lg btn-block" style="margin-top: 15px;" @click="clickTestDeleteEvent">Delete Event</button>
						</div>     
					</div>
  				</modal>
        </div>
    <div class="col-md-10">
    <div class="cal">
		<div class="calendar-parent">
			<calendar-view
				:events="events"
				:show-date="showDate"
				:time-format-options="{hour: 'numeric', minute:'2-digit'}"
				:enable-drag-drop="true"
				:disable-past="disablePast"
				:disable-future="disableFuture"
				:show-event-times="showEventTimes"
				:display-period-uom="displayPeriodUom"
				:display-period-count="displayPeriodCount"
				:starting-day-of-week="startingDayOfWeek"
				:class="themeClasses"
				:period-changed-callback="periodChanged"
				:current-period-label="useTodayIcons ? 'icons' : ''"
				@drop-on-date="onDrop"
				@click-date="onClickDay"
				@click-event="onClickEvent"				
			>
				<calendar-view-header
					slot="header"
					slot-scope="{ headerProps }"
					:header-props="headerProps"
					@input="setShowDate"
					class="navbar navbar-expand-lg navbar-light bg-light"
				/>
			</calendar-view>
		</div>
    </div>
    </div>
	</div>
</div>
</template>
<script>
import db from '@/firebase/init'
import firebase from 'firebase'
const moment = require('moment')
// Load CSS from the published version
require("vue-simple-calendar/static/css/default.css")
require("vue-simple-calendar/static/css/holidays-us.css")

// Load CSS from the local repo
//require("../../vue-simple-calendar/static/css/default.css")
//require("../../vue-simple-calendar/static/css/holidays-us.css")

import {
	CalendarView,
	CalendarViewHeader,
	CalendarMathMixin,
} from "vue-simple-calendar" // published version
//} from "../../vue-simple-calendar/src/components/bundle.js" // local repo

import Modal from "./Modal.vue"

export default {
	name: "App",
	components: {
		CalendarView,
		CalendarViewHeader,
		Modal
	},
	mixins: [CalendarMathMixin],
	data() {
		return {
			/* Show the current month, and give it some fake events to show */
			selectedColour: "",
			optionsRadio: [
          { text: '▶  Purple', value: 'purple' },
		  { text: '▶  Orange', value: 'orange' },
		  { text: '▶  Red', value: 'red' },
          { text: '▶  Yellow', value: 'yellow' }
		],
			eventLength: 0,
			showModal: false,
			showDate: this.thisMonth(1),
			message: "",
			timeEvent: "",
			startingDayOfWeek: 0,
			disablePast: false,
			disableFuture: false,
			displayPeriodUom: "month",
			displayPeriodCount: 1,
			showEventTimes: true,
			newEventTitle: "",
			newEventStartDate: "",
			newEventStartTime: "",
			newEventEndDate: "",
			newEventEndTime: "",
			useDefaultTheme: true,
			useHolidayTheme: true,
			sDate: "",
			eDate: "",
            periodUOMoptions: [
          { value: 'month', text: 'Month' },
          { value: 'week', text: 'Week' },
          { value: 'year', text: 'Year' }
        ],
      useTodayIcons: false,
	  clickedEvent: "",
			events: [],
		}
	},
	created(){
		//fetch date from firestore
		
		db.collection('events').onSnapshot(snapshot => {
			const testCollection = [];
			snapshot.forEach(doc => {				
				console.log(doc.data())
				let event = doc.data()
				event.id = doc.id
				event.startDate = new Date(event.startDate.seconds * 1000)
				event.endDate = new Date(event.endDate.seconds * 1000)
				testCollection.push(event)
				
				// this.events.push({								
				// startDate: new Date(doc.data().startDate.seconds * 1000),
                // endDate: new Date(doc.data().endDate.seconds * 1000),
                // classes: doc.data().classes,
				// title: doc.data().title,
				// id: doc.data().id
				// })

				//this.eventLength = this.events.length;
			})
		this.events = testCollection;
		console.log(this.events);
		})
		
		//console.log(this.eventsTest);
	},
	computed: {
		userLocale() {
			return this.getDefaultBrowserLocale
		},
		dayNames() {
			return this.getFormattedWeekdayNames(this.userLocale, "long", 0)
		},
		themeClasses() {
			return {
				"theme-default": this.useDefaultTheme,
				"holiday-us-traditional": this.useHolidayTheme,
				"holiday-us-official": this.useHolidayTheme,
			}
		},
	},
	mounted() {
		this.newEventStartDate = this.isoYearMonthDay(this.today())
		this.newEventEndDate = this.isoYearMonthDay(this.today())
	},

	methods: {
		periodChanged(range, eventSource) {
			// Demo does nothing with this information, just including the method to demonstrate how
			// you can listen for changes to the displayed range and react to them (by loading events, etc.)
			console.log(eventSource)
			console.log(range)
		},
		thisMonth(d, h, m) {
			const t = new Date()
			return new Date(t.getFullYear(), t.getMonth(), d, h || 0, m || 0)
		},
		onClickDay(d) {
			this.message = `You clicked: ${d.toLocaleDateString()}`
		},
		onClickEvent(e) {
			this.message = ` ${e.title}`
			this.timeEvent = ` ${moment(e.startDate).format('MMMM Do YYYY, h:mm') +" - "+moment(e.endDate).format('MMMM Do YYYY, h:mm')}`
			this.clickedEvent = `${e.id}`
			this.showModal = true
			console.log(e.id);
			
		},
		setShowDate(d) {
			this.message = `Changing calendar view to ${d.toLocaleDateString()}`
			this.showDate = d
		},
		onDrop(event, date) {
			this.message = `You dropped ${event.id} on ${date.toLocaleDateString()}`
			// Determine the delta between the old start date and the date chosen,
			// and apply that delta to both the start and end date to move the event.
			const eLength = this.dayDiff(event.startDate, date)
			event.originalEvent.startDate = this.addDays(event.startDate, eLength)
			event.originalEvent.endDate = this.addDays(event.endDate, eLength)
		},
		eventStartTimeSetting(){
				this.sDate = new Date(this.newEventStartDate);
				this.eDate = new Date(this.newEventEndDate);

				if(this.eDate < this.sDate)
				{
					this.eDate = this.sDate;
					this.newEventEndDate = this.newEventStartDate;
				}
				var sHours = this.newEventStartTime.split(':')[0]
				var sMinutes = this.newEventStartTime.split(':')[1]

				if(sHours){
					this.sDate.setHours(sHours);
					this.sDate.setMinutes(sMinutes);
				}
				else{
					this.sDate.setHours('0');
					this.sDate.setMinutes('00');
				}

				
				var eHours = this.newEventEndTime.split(':')[0]
				var eMinutes = this.newEventEndTime.split(':')[1]

				if(eHours){
					this.eDate.setHours(eHours);
					this.eDate.setMinutes(eMinutes);
				}
				else{
					this.eDate.setHours('0');
					this.eDate.setMinutes('00');
				}
		},
		clickTestAddEvent() {
            var upperEventTitle = this.newEventTitle.toUpperCase();
			var birthdayCheck = upperEventTitle.includes("BIRTHDAY");
			this.eventStartTimeSetting();


            if(birthdayCheck)
            { 
				
				db.collection('events').add(
					{
						startDate: firebase.firestore.Timestamp.fromDate(this.sDate),
                		endDate: firebase.firestore.Timestamp.fromDate(this.eDate),
                		classes: "birthday",
						title: this.newEventTitle,

					}
				)
				console.log(this.newEventStartTime)
            }
            else{

				if(this.selectedColour)
				{
					var colourSel = this.selectedColour;
					// this.events.push({
					// 	startDate: this.newEventStartDate,
					// 	endDate: this.newEventEndDate,
					// 	classes: colourSel,
					// 	title: this.newEventTitle,
					// 	id:
					// 		"e" +
					// 		Math.random()
					// 			.toString(36)
					// 			.substr(2, 10),
					// })
					db.collection('events').add(
					{
						startDate: firebase.firestore.Timestamp.fromDate(this.sDate),
                		endDate: firebase.firestore.Timestamp.fromDate(this.eDate),
                		classes: colourSel,
						title: this.newEventTitle,
						// id:
						// 	"e" +
						// 	Math.random()
						// 		.toString(36)
						// 		.substr(2, 10),
					}
				)

					this.selectedColour = "";
					
				}
				else
				{

					// 	this.events.push({
					// 	startDate: this.newEventStartDate,
					// 	endDate: this.newEventEndDate,
					// 	title: this.newEventTitle,
					// 	id:
					// 		"e" +
					// 		Math.random()
					// 			.toString(36)
					// 			.substr(2, 10),
					// })

					db.collection('events').add(
					{
						startDate: firebase.firestore.Timestamp.fromDate(this.sDate),
                		endDate: firebase.firestore.Timestamp.fromDate(this.eDate),
						title: this.newEventTitle,
						classes: "blue",
						// 	"e" +
						// 	Math.random()
						// 		.toString(36)
						// 		.substr(2, 10),
					}
				)
				}
            }
			this.newEventTitle = "";
			this.message = "You added an event!"
    },
    clickTestDeleteEvent() {
	  //var indexEv = this.events.findIndex(x => x.id === this.clickedEvent);
	  var indexEv = this.clickedEvent;
      console.log(indexEv)

      if(indexEv){
		  db.collection('events').doc(indexEv).delete()
		  .then(() => {
			  this.events = this.events.filter(event =>{
				  return event.id != indexEv
			  })
		  })
         // this.events.splice(indexEv,1)
          console.log("deleted Event")
      }
      
	  this.message = ""
	  this.showModal = false
		},
	},
}
</script>


<style>
@import url('https://fonts.googleapis.com/css?family=Nunito&display=swap');
/* html,
body {
	height: 100%;
	margin: 0;
	background-color: #f7fcff;
} */

.btn-add-event{
	margin-left: 10px;
	margin-top: 10px;
	width: 80%;

}

#radio-group-1 label{
	font-size: 10px;
	margin-left: 10px;
	text-align:left;
}

.label, .control {
	padding-left: 10px;
}

.cal {
	display: flex;
	flex-direction: row;
	font-family: 'Nunito', sans-serif;
	/* width: 95vw; */
	/* min-width: 30rem; */
	max-width: 100rem;
	min-height: 38rem;
	margin-left: auto;
    margin-right: auto;
    height: 100%;
	/* margin: 0; */
	background-color: #f7fcff;
}

.custom-cal-card{
	min-height: 33rem;
}

.cal input{
	width: 80%;
}

.cal .select{
	width:80%;
}

.calendar-controls {
	margin-right: 1rem;
	min-width: 14rem;
	max-width: 14rem;
}

.calendar-parent {
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	overflow-x: hidden;
	overflow-y: hidden;
	max-height: 80vh;
	background-color: white;
}

/* For long calendars, ensure each week gets sufficient height. The body of the calendar will scroll if needed */
.cv-wrapper.period-month.periodCount-2 .cv-week,
.cv-wrapper.period-month.periodCount-3 .cv-week,
.cv-wrapper.period-year .cv-week {
	min-height: 6rem;
}

/* These styles are optional, to illustrate the flexbility of styling the calendar purely with CSS. */

/* Add some styling for events tagged with the "birthday" class */
.theme-default .cv-event.birthday {
	background-color: #9abd9a;
	border-color: #d7e7d7;
}

.theme-default .cv-event.birthday::before {
	content: "\1F382"; /* Birthday cake */
	margin-right: 0.5em;
}

.theme-default .cv-header button{
	background-color:rgb(51, 51, 51);
	color:azure;
}

.theme-default .cv-header-day{
	background-color: rgb(51, 51, 51);
	color:azure;
}

.theme-default .cv-day.past{	
	background-color: rgba(51, 51, 51, 0.411);
	color:rgba(14, 15, 15, 0.719);
}

.cv-day{
	background-color: rgba(51, 51, 51, 0.192);
	color:rgba(14, 15, 15, 0.719);
	border-color:rgba(255, 255, 255, 0.671);
}

.custom-row{
	margin-right:0;
}

@media only screen and (max-width: 600px) {
  .cal input{
	width: 150%;
}

.cal .select{
	width: 150%;
}
.calendar-parent {
	font-size: 3.5vw;
}

.cv-day-number::before{
	font-size: 2.6vw;
}



}
</style>

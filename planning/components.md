# Scheduler project breakdown

## Components

- [x] Button
- [x] DayListItem
- [x] DayList
- [x] InterviewerListItem
- [x] InterviewerList
- [ ] Appointment
- [x] Appointment/Header
- [x] Appointment/Empty
- [ ] Appointment/Show
- [ ] Appointment/Confirm
- [ ] Appointment/Status
- [ ] Appointment/Error
- [ ] Appointment/Form

### Button

- State: No State
- __Props__: __confirm__ (boolean), __danger__ (boolean), __disabled__ (boolean), __onClick__ (function), __children__ (string)
- Used by: Everyone

### DayListItem

- State: No State
- __Props__: key (number), __name__ (string), __spots__ (boolean), __selected__ (boolean), __handleClick__ (a function that runs setSelectedDay(name))
- Used by: DayList

### DayList

- State: No State
- __Props__: __days__ (array), __value__ (the selectedDay name string),  __handleClick__ (the setSelectedDay function)
- Used by: Application

### InterviewerListItem

- State: No State
- __Props__: key (number), ~~__id__ (number), no longer needed since it's been passed as part the handleClick function~~ __name__ (string), __avatar__ (url string), __selected__ (boolean), __handleClick__ (a function that runs setSelectedInterviewer(id))
- Used by: InterviewerList

### InterviewerList

- State: No State
- __Props__: __interviewers__ (array), __value__ (the selectedInterviewer id number), __handleClick__ (the setSelectedInterviewer function)
- Used by: Application

### Appointment

- State:
- __Props__:
- Used by:

### Appointment/Header

- State: No State
- __Props__: __time__ (string)
- Used by: Appointment

### Appointment/Empty

- State: No State
- __Props__: __handleAdd__ (a function to handle a click on the add button)
- Used by: Appointment

### Appointment/Show

- State: No State
- __Props__: __student__ (String), __interviewer__ (Object), __handleEdit__ (Function), __handleDelete__ (Function)
- Used by: Appointment

### Appointment/Confirm

- State:
- __Props__:
- Used by: Appointment

### Appointment/Status

- State:
- __Props__:
- Used by: Appointment

### Appointment/Error

- State:
- __Props__:
- Used by: Appointment

### Appointment/Form

- State:
- __Props__:
- Used by: Appointment
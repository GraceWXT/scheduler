# Scheduler project breakdown

## Components

- [x] Button
- [x] DayListItem
- [x] DayList
- [x] InterviewerListItem
- [x] InterviewerList
- [x] Appointment
- [x] Appointment/Header
- [x] Appointment/Empty
- [x] Appointment/Show
- [x] Appointment/ConfirmDelete
- [x] Appointment/Status
- [x] Appointment/Error
- [x] Appointment/Form

### Button

- State: No State
- __Props__: __confirm__ (boolean), __danger__ (boolean), __disabled__ (boolean), __handleClick__ (function), __children__ (string)
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
- __Props__: key (number), ~~__id__ (number), no longer needed since it's been passed as part the handleClick function~~ __name__ (string), __avatar__ (url string), __selected__ (boolean), __handleClick__ (a function that runs setInterviewerId(id))
- Used by: InterviewerList

### InterviewerList

- State: No State
- __Props__: __interviewers__ (array), __value__ (the interviewer id number), __handleClick__ (the setInterviewerId function)
- Used by: Application

### Appointment

- State: No State
- __Props__: key (number), __id__ (number), __time__ (string), __interview__ (object: student (string), interviewer (object)),
- Used by: Application

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

### Appointment/ConfirmDelete

- State: No State
- __Props__: __message__ (String), __handleConfirm__ (Function), __handleCancel__ (Function)
- Used by: Appointment

### Appointment/Status

- State: No State
- __Props__: __message__ (String)
- Used by: Appointment

### Appointment/Error

- State: No State
- __Props__: __message__ (String),  __handleClose__ (Function)
- Used by: Appointment

### Appointment/Form

- State: student (name input, string), interviewer (id, number or null)
- __Props__: __student__ (String), __interviewers__ (Array), __interviewer__ (Number), __handleSave__ (Function), __handleCancel__ (Function),
- Used by: Appointment

### Application

- __State__: __days__ (array), __selectedDay__ (name string), __appointements__ (object of objects), __interviewers__ (object of objects)
- Props: 
- Used by: Everyone
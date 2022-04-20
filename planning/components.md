# Scheduler project breakdown

## Components

- [x] Button
- [x] DayListItem
- [x] DayList
- [ ] InterviewerListItem
- [ ] InterviewerList
- [ ] Appointment
- [ ] Appointment/Header
- [ ] Appointment/Empty
- [ ] Appointment/Show
- [ ] Appointment/Confirm
- [ ] Appointment/Status
- [ ] Appointment/Error
- [ ] Appointment/Form

### Button

- State: No State
- Props: confirm (boolean), danger (boolean), disabled (boolean), onClick (function), children (string)
- Used by: Everyone

### DayListItem

- State: No State
- Props: key (number), name (string), spots (boolean), selected (boolean), setDay (function)
- Used by: DayList

### DayList

- State: No State
- Props: days (array), selectedDay (string), setDay (function)
- Used by: Application

### InterviewerListItem

- State: No State
- Props: id (number), name (string), avatar (url string), selected (boolean), setInterviewer (function)
- Used by: InterviewerList

### InterviewerList

- State:
- Props:
- Used by:

### Appointment

- State:
- Props:
- Used by:

### Appointment/Header

- State:
- Props:
- Used by:

### Appointment/Empty

- State:
- Props:
- Used by:

### Appointment/Show

- State:
- Props:
- Used by:

### Appointment/Confirm

- State:
- Props:
- Used by:

### Appointment/Status

- State:
- Props:
- Used by:

### Appointment/Error

- State:
- Props:
- Used by:

### Appointment/Form

- State:
- Props:
- Used by:
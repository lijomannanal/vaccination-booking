export const GET_LOCATION = 'SELECT id from locations WHERE name= ?';

export const INSERT_TIMESLOTS = `INSERT INTO slots(time)
VALUES(?)`;

export const INSERT_APPOINTMENT_DATES = `INSERT INTO appointment_dates(date)
VALUES(?)`;

export const GET_ALL_CENTERS = 'SELECT * from community_centers';

export const CREATE_APPOINTMENT = `INSERT INTO appointments(date, residentId, ccId, slotId, created_at, updated_at)
VALUES(?, ?, ? , ? , ?, ?)`;

export const UPDATE_APPOINTMENT = 'UPDATE appointments SET date = ?, ccId = ?, slotId = ?, updated_at = ? WHERE apptId = ?';

export const ADD_RESIDENT = `INSERT INTO residents( nric, name)
VALUES(?, ?)`;

export const UPDATE_RESIDENT = 'UPDATE residents SET nric = ?, name = ? WHERE residentId= ?';

export const GET_ALL_SHIFTS = 'select * from shifts';


export const GET_AVAILABLE_RESOURCES = `select count(N.nurseId) as resourceCount from nurses as N  INNER
JOIN workday_schedules as WS ON N.nurseId = WS.nurseId 
INNER JOIN shifts AS S ON WS.shiftId = S.shiftId WHERE N.ccId = ? AND S.startTime >= ? AND S.endTime <= ? AND WS.workdayId = ?`;

export const GET_OCCUPIED_SLOTS = `SELECT  S.slotId, S.time, count(A.apptId) as bookedCount from slots AS S LEFT JOIN appointments AS A
ON S.slotId = A.slotId WHERE A.date = ? AND  A.ccId = ? AND S.time between ? AND ? group by S.slotId`;

export const GET_AVAILABLE_SLOTS = 'SELECT S.slotId, S.time from slots as S WHERE S.time between ? AND ? AND S.slotId NOT IN (?)';

export const GET_ALL_SLOTS = 'SELECT S.slotId, S.time from slots as S WHERE S.time between ? AND ?';

export const GET_USER_APPOINTMENT = `SELECT A.*, R.name from appointments AS A
INNER JOIN residents AS R ON A.residentId = R.residentId WHERE nric= ? AND apptId != ?`

export const GET_ALL_APPOINTMENTS = `SELECT A.apptId,A.date, R.name AS residentName, C.name as centerName, S.time AS slot from appointments AS A
INNER JOIN residents AS R ON A.residentId = R.residentId INNER JOIN community_centers AS C ON A.ccId = C.ccId
INNER JOIN slots AS S ON A.slotId = S.slotId ORDER BY apptId desc`;

export const GET_APPOINTMENT_INFO = `SELECT A.apptId, A.ccId as selectedCenter, A.slotId as selectedSlot, S.time as selectedTime, A.date as selectedDate, R.name AS fullname, R.nric, R.residentId from appointments AS A
INNER JOIN residents AS R ON A.residentId = R.residentId INNER JOIN slots as S ON A.slotId = S.slotId WHERE apptId = ?`; 

export const DELETE_RESIDENT = 'DELETE FROM residents where residentId = ?';

export const DELETE_APPOINTMENT = 'DELETE FROM appointments where apptId = ?';
const employeeType = [
  { id: 1, name: 'FullTime', work_begin: '09:00:00', work_end: '17:00:00' },
  { id: 2, name: 'MidTime', work_begin: '12:00:00', work_end: '21:00:00' },
  { id: 3, name: 'HalfTime', work_begin: '20:00:00', work_end: '00:00:00' },
];

const employees = [
  { id: 1, name: 'Alice', type: 2 },
  { id: 2, name: 'Bob', type: 3 },
  { id: 3, name: 'John', type: 2 },
  { id: 4, name: 'Karen', type: 1 },
  { id: 5, name: 'Miles', type: 3 },
  { id: 6, name: 'Henry', type: 1 },
];

const tasks = [
  { id: 1, title: 'task01', duration: 60 },
  { id: 2, title: 'task02', duration: 120 },
  { id: 3, title: 'task03', duration: 180 },
  { id: 4, title: 'task04', duration: 360 },
  { id: 5, title: 'task05', duration: 30 },
  { id: 6, title: 'task06', duration: 220 },
  { id: 7, title: 'task07', duration: 640 },
  { id: 8, title: 'task08', duration: 250 },
  { id: 9, title: 'task09', duration: 119 },
  { id: 10, title: 'task10', duration: 560 },
  { id: 11, title: 'task11', duration: 340 },
  { id: 12, title: 'task12', duration: 45 },
  { id: 13, title: 'task13', duration: 86 },
  { id: 14, title: 'task14', duration: 480 },
  { id: 15, title: 'task15', duration: 900 },
];

/* Count total hours worked in 1 day */
(() => {
  const toSeconds = (hms) => {
    const split = hms.split(':');
    return split[0] * 3600 + split[1] * 60 + split[2] * 1;
  };
  const answer = employees.reduce((acc, { type }) => {
    const { work_begin, work_end } = employeeType.find(({ id }) => id === type);
    const [beginSec, endSec] = [toSeconds(work_begin), toSeconds(work_end)];
    if (endSec - beginSec < 0) return acc + (endSec + 86400 - beginSec);
    return acc + (endSec - beginSec);
  }, 0);
  console.log(answer);
})();

/* Make a function that take as parameters dayTime and return number of employee working */
(() => {
  const toSeconds = (hms) => {
    const split = hms.split(':');
    return split[0] * 3600 + split[1] * 60 + split[2] * 1;
  };
  const howManyEmployeeByTime = (dayTime) => {
    const dayTimeSec = toSeconds(dayTime);
    const filterEmployee = employees.filter(({ type }) => {
      const { work_begin, work_end } = employeeType.find(
        ({ id }) => id === type,
      );
      const [beginSec, endSec] = [toSeconds(work_begin), toSeconds(work_end)];
      if (endSec - beginSec < 0) {
        return beginSec <= dayTimeSec && dayTimeSec <= endSec + 86400;
      }
      return beginSec <= dayTimeSec && dayTimeSec <= endSec;
    });
    return filterEmployee.length;
  };
  console.log(howManyEmployeeByTime('21:00:01'));
})();

/* How many days of work needed to done all tasks */
(() => {
  const taskMinutes = tasks.reduce((acc, { duration }) => acc + duration, 0);
  const toSeconds = (hms) => {
    const split = hms.split(':');
    return split[0] * 3600 + split[1] * 60 + split[2] * 1;
  };
  const result = employees.reduce((acc, { type }) => {
    const { work_begin, work_end } = employeeType.find(({ id }) => id === type);
    let [beginSec, endSec] = [toSeconds(work_begin), toSeconds(work_end)];
    if (beginSec <= 32400 && endSec <= 32400) return acc;
    if (beginSec <= 32400 && endSec <= 86400) {
      endSec = endSec - beginSec < 0 ? 86400 : endSec;
      return acc + (endSec - 32400);
    }
    if (beginSec <= 32400 && endSec > 86400) return acc + (86400 - 32400);
    if (beginSec > 32400 && endSec <= 86400) {
      endSec = endSec - beginSec < 0 ? 86400 : endSec;
      return acc + (endSec - beginSec);
    }
    if (beginSec > 32400 && endSec > 86400) return acc + (86400 - beginSec);
  }, 0);
  const day = (taskMinutes * 60) / result;
  console.log(day);
})();

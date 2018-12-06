const sortedData = document.body.textContent.trim().split('\n').slice(0)
.map(line => {
  const {groups} = line.match(/\[(?<year>\d+)-(?<month>\d+)-(?<day>\d+) (?<hour>\d+):(?<minute>\d+)\] (?:(?:Guard #(?<guard>\d+))|(?:falls a(?<sleep>sleep))|(?:(?<wake>wake)))/);
  const { year, month, day, hour, minute, guard, sleep, wake } = groups;
  // +500 yeras; js date has problems with ancient datetimes it puts you in timezon GMT+0053
  const date = new Date(`${year*1+500}-${month}-${day}T${hour}:${minute}:00.00Z`);
  return { line, date, guard, sleep, wake }
})
.sort((a,b) => a.date - b.date);

// apply guardid
const guardsData = {};
const getGuard = id => (guardsData[id] || ({id, sleeps: [], totalMinutes: 0}));
sortedData.reduce((previousEntry, dataEntry) => {
  let { guard = previousEntry.guard, sleep, wake, date } = dataEntry;
  // lazy append `guard` information (missing in some cases)
  dataEntry.guard = guard;
  if (sleep || wake) {
    const guardData = guardsData[guard] = getGuard(guard);
    // store *.sleeps [from,to,from,to,from,to, ....]
    guardData.sleeps.push(date);
    // total = -timeFromA + timeToA -timeFromB + timeToB
    guardData.totalMinutes += date * (sleep ? -1 : 1) / 60e3;
  }
  return dataEntry;
});
// find sleepiest guard
const sleepiest = Object.values(guardsData).sort((a,b) => b.totalMinutes - a.totalMinutes)[0];
// analyze most likely minute of the guard being asleep
// [from, to, from, to ,from, to, ...]
const sleepMinutesCounter = Array(60).fill(0);
const { sleeps } = sleepiest;
for(let i=0, l=sleeps.length; i<l; i+=2) {
  let [from, to] = sleeps.slice(i,i+2);
  from = from.getMinutes(), to = to.getMinutes();
  // update overall sleepMinutesCounter
  for (let m=from; m<to; m++) ++sleepMinutesCounter[m];
  // extract all the minutes starting `from` until `to`
  // console.log('from', from.getMinutes(), 'to', to.getMinutes(), '=', (to-from)/60e3);
}
// highest count on a partic. minute
const [[minute]] = Object.entries(sleepMinutesCounter).sort((a,b) => b[1] - a[1]);
minute * sleepiest.id; // 38813

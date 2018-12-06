
const sortedData = document.body.textContent.trim().split('\n').slice(0)
.map(line => {
  const {groups} = line.match(/\[(?<year>\d+)-(?<month>\d+)-(?<day>\d+) (?<hour>\d+):(?<minute>\d+)\] (?:(?:Guard #(?<guard>\d+))|(?:falls a(?<sleep>sleep))|(?:(?<wake>wake)))/);
  const { year, month, day, hour, minute, guard, sleep, wake } = groups;
  // +500 yeras; js date has problems with ancient datetimes it puts you in timezon GMT+0053
  const date = new Date(`${year*1+500}-${month}-${day}T${hour}:${minute}:00.00Z`);
  return { line, date, guard, sleep, wake }
})
.sort((a,b) => a.date - b.date);

function updateSleepMinutesCounter(guardData){
  let [from, to] = guardData.sleeps.slice(guardData.sleeps.length-2);
  from = from.getMinutes(), to = to.getMinutes();
  for (let m=from; m<to; m++) ++guardData.sleepMinutesCounter[m];
}

// apply guardid and build data per guard in general
const guardsData = {};
const getGuard = id => (guardsData[id] || ({
  id,
  sleeps: [],
  totalMinutes: 0,
  sleepiest: null,
  sleepMinutesCounter: Array(60).fill(0)
}));
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

    // collect sleepMinute - assume guard slept before being `wake` ;)
    if (wake) updateSleepMinutesCounter(guardData);
  }

  return dataEntry;
});

// calc and apply sleepiest minutes per guard;
const guardDataArray = Object.values(guardsData);
guardDataArray.forEach(guardData => {
  const [[minute, count]] = Object.entries(guardData.sleepMinutesCounter).sort((a,b) => b[1] - a[1]);
  guardData.sleepiest = { minute, count };
});
// select the winner
const [{ id, sleepiest: { minute } }] = guardDataArray.sort((a,b) => b.sleepiest.count - a.sleepiest.count);
minute * id; // 141071

function makePCB(pid, arrivalTime, burst, priority) {
    return {
        pid,
        arrivalTime,
        burst,
        priority
    };
}

// returns true if the two are equal
function equalsTo(firstPCB, secondPCB) {
    return firstPCB.pid === secondPCB.pid &&
        firstPCB.arrivalTime === secondPCB.arrivalTime &&
        firstPCB.burst === secondPCB.burst &&
        firstPCB.priority === secondPCB.priority;
}

function equalsByPID(firstPCB, pid) {
    return firstPCB.pid === pid;
}

module.exports = {
    makePCB,
    equalsTo,
    equalsByPID
};
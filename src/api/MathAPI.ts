/**
 * Work out the percentage of each poll
 */
const pollVotePercent: (voteList: number[]) => {[vote: number]: number} | undefined = (voteList: number[]) => {
    if (!voteList) {
        return undefined
    }
    const counts = {}
    voteList.forEach((vote) => { counts[vote] = (counts[vote] || 0) + 1 })
    const totalVote = voteList.length

    const votePercent = {}
    Object.keys(counts).forEach((vote) => {
        const percent = (counts[vote] * 100 ) / totalVote
        votePercent[vote] = percent.toFixed(1)
    })
    return votePercent
}

export default {
    pollVotePercent
}
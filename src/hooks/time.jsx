function timeSince(dateString) {
  const now = new Date()
  const past = new Date(dateString)
  const diffMs = now - past
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''}`

  const weeks = Math.floor(diffDays / 7)
  if (weeks < 4) return `${weeks} week${weeks > 1 ? 's' : ''}`

  const months = Math.floor(diffDays / 30)
  if (months < 12) return `${months} month${months > 1 ? 's' : ''}`

  const years = Math.floor(diffDays / 365)
  return `${years} year${years > 1 ? 's' : ''}`
}


function ProjectDate({ date }) {
  return <span>{timeSince(date)}</span>
}
export default ProjectDate

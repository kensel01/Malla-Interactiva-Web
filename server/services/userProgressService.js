import { User } from '../models/userModel.js';

async function checkSubjectAvailability(userId) {
  const user = await User.findById(userId).populate({
    path: 'progress.subjectId',
    populate: { path: 'prerequisites' }
  });

  return user.progress.map(subjectProgress => {
    const isAvailable = subjectProgress.subjectId.prerequisites.every(prerequisite =>
      user.progress.some(p => p.subjectId.equals(prerequisite._id) && p.status === 'aprobada')
    );
    return { ...subjectProgress, isAvailable };
  });
}

export default { checkSubjectAvailability };


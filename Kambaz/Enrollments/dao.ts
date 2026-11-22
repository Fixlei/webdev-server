import { v4 as uuidv4 } from "uuid";

export default function enrollmentsDao(db) {
  function findEnrollmentsForUser(userId) {
    return db.enrollments.filter((enrollment) => enrollment.user === userId);
  }

  function enrollUserInCourse(userId, courseId) {
    const existing = db.enrollments.find(
      (enrollment) =>
        enrollment.user === userId && enrollment.course === courseId,
    );
    if (existing) return existing;
    const newEnrollment = {
      _id: uuidv4(),
      user: userId,
      course: courseId,
    };
    db.enrollments = [...db.enrollments, newEnrollment];
    return newEnrollment;
  }

  function unenrolluserFromCourse(userId, courseId) {
    db.enrollments = db.enrollments.filter(
      (enrollment) =>
        !(enrollment.user === userId && enrollment.course === courseId),
    );
  }

  return { findEnrollmentsForUser, enrollUserInCourse, unenrolluserFromCourse };
}

import EnrollmentsDao from "./dao";

export default function EnrollmentRoutes(app, db) {
  const dao = EnrollmentsDao(db);

  const getUserId = (req, res) => {
    const { userId } = req.params;
    if (userId !== "current") return userId;
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return null;
    }
    return currentUser._id;
  };

  const enrollUserInCourse = (req, res) => {
    const userId = getUserId(req, res);
    if (!userId) return;
    const enrollment = dao.enrollUserInCourse(userId, req.params.courseId);
    res.json(enrollment);
  };

  const findEnrollmentsForUser = (req, res) => {
    const userId = getUserId(req, res);
    if (!userId) return;
    const enrollments = dao.findEnrollmentsForUser(userId);
    res.json(enrollments);
  };

  const unenrolluserFromCourse = (req, res) => {
    const userId = getUserId(req, res);
    if (!userId) return;
    dao.unenrolluserFromCourse(userId, req.params.courseId);
    res.sendStatus(200);
  };

  app.get("/api/users/:userId/enrollments", findEnrollmentsForUser);
  app.post("/api/users/:userId/courses/:courseId", enrollUserInCourse);
  app.delete("/api/users/:userId/courses/:courseId", unenrolluserFromCourse);
}

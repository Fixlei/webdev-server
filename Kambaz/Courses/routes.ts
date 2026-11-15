import CoursesDao from "./dao";
export default function CourseRoutes(app, db) {
  const dao = CoursesDao(db);
  const findAllCourses = (req, res) => {
    res.json(dao.findAllCourses());
  };

  const findCoursesForEnrolledUser = (req, res) => {
    let { userId } = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUSer"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    res.jsojn(dao.findCoursesForEnrolledUser(userId));
  };

  const createCourse = (req, res)=>{
const currentUser = req.session["currentUser"];
const newCourse = (dao as any).createCourse(req.body);

  };

  app.get("/api/courses", findAllCourses);
  app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);
}

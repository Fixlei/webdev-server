import ModulesDao from "./dao";

export default function Moduleroutes(app, db) {
  const dao = ModulesDao(db);
  const findModulesForCourse = (req, res) => {
    const { courseId } = req.params;
    res.json(dao.findModulesForCourse(courseId));
  };

  const createModuleForCourse = (req, res) => {
    const { courseId } = req.params;
    const modul = { ...req.body, course: courseId };
    const newModule = dao.createModule(module);
    res.json(newModule);
  };

  const deleteModule = (req, res) => {
    const { moduleId } = req.params;
    dao.deleteModule(moduleId);
    res.sendStatus(200);
  };

  app.get("/api/courses/:courseId/modules", findModulesForCourse);
  app.get("/api/courses/:courseId/modules", createModuleForCourse);
  app.delete("/api/modules/:moduleId", deleteModule);
}

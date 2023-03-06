import express from "express";
import Controller from "../controllers/homeController";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController";
import patientController from "../controllers/patientController";
import specialtyController from "../controllers/specialtyController";
import clinicController from "../controllers/clinicController";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", Controller.getHomePage);
  router.get("/about", Controller.getAboutPage);
  router.get("/crud", Controller.getCRUD);
  router.post("/post-crud", Controller.postCRUD);
  router.get("/get-crud", Controller.displayGetCRUD);
  router.get("/edit-crud", Controller.getEditCRUD);
  router.post("/put-crud", Controller.putCRUD);
  router.get("/delete-crud", Controller.deleteCRUD);

  router.post("/api/login", userController.handleLogin);
  router.get("/api/get-all-user", userController.handleGetAllUsers);
  router.post("/api/create-new-user", userController.handleCreateNewUser);
  router.put("/api/edit-user", userController.handleEditUser);
  router.delete("/api/delete-user", userController.handleDeleteUser);
  router.get("/api/allCodes", userController.getAllCodes);

  router.get("/api/top-doctor-home", doctorController.getTopDoctorHome);
  router.get("/api/get-all-doctors", doctorController.getAllDoctors);
  router.post("/api/save-info-doctors", doctorController.postInfoDoctor);
  router.post("/api/send-remedy", doctorController.sendRemeDy);
  router.get(
    "/api/get-detail-doctor-by-id",
    doctorController.getDetailDoctorById
  );
  router.post("/api/bulk-create-schedule", doctorController.bulkCreateSchedule);
  router.get(
    "/api/get-schedule-doctor-by-date",
    doctorController.getScheduleDoctorByDate
  );
  router.get(
    "/api/get-extra-info-doctor-by-id",
    doctorController.getExtraInfoById
  );
  router.get(
    "/api/get-profile-doctor-by-id",
    doctorController.getProfileDoctorById
  );

  router.get(
    "/api/get-list-patient-for-doctor",
    doctorController.getListPatientForDoctor
  );

  router.post(
    "/api/patient-book-appointment",
    patientController.postPatientBookAppointment
  );
  router.post(
    "/api/verify-book-appointment",
    patientController.postVerifyBookAppointment
  );

  router.post("/api/create-specialty", specialtyController.createSpecialty);
  router.get("/api/get-all-specialty", specialtyController.getAllSpecialty);
  router.get(
    "/api/get-detail-specialty-by-id",
    specialtyController.getDetailSpecialtyByIdCl
  );

  router.post("/api/create-clinic", clinicController.createClinic);
  router.get("/api/get-all-clinic", clinicController.getAllClinic);
  router.get(
    "/api/get-detail-clinic-by-id",
    clinicController.getDetailClinicById
  );
  return app.use("/", router);
};
module.exports = initWebRoutes;

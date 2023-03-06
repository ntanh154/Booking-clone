import db from "../models/index";
require("dotenv").config();
import _, { reject } from "lodash";
import emailService from "./emailService";
import { v4 as uuidv4 } from "uuid";

let buildURLEmail = (doctorId, token) => {
  let result = "";
  result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`;
  return result;
};
let postPatientBookAppointment = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.email ||
        !data.doctorId ||
        !data.timeType ||
        !data.date ||
        !data.fullName ||
        !data.selectGender ||
        !data.address
      ) {
        resolve({
          errCode: -1,
          message: "Missing required parameter!",
        });
      } else {
        let token = uuidv4();
        await emailService.senSimpleEmail({
          receiverEmail: data.email,
          patientName: data.fullName,
          time: data.timeString,
          doctorName: data.doctorName,
          language: data.language,
          redirectLink: buildURLEmail(data.doctorId, token),
        });
        //Upsert patient
        let user = await db.User.findOrCreate({
          where: { email: data.email },
          defaults: {
            email: data.email,
            roleId: "R3",
            gender: data.selectGender,
            address: data.address,
            firstName: data.fullName,
          },
        });
        //Create a booking record
        if (user && user[0]) {
          await db.Booking.findOrCreate({
            where: { patientId: user[0].id },
            defaults: {
              statusId: "S1",
              doctorId: data.doctorId,
              patientId: user[0].id,
              date: data.date,
              timeType: data.timeType,
              token: token,
            },
          });
        }
        resolve({
          errCode: 0,
          message: "ok",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let postVerifyBookAppointment = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.token || !data.doctorId) {
        resolve({
          errCode: -1,
          message: "Missing required parameter!",
        });
      } else {
        let appointment = await db.Booking.findOne({
          where: {
            doctorId: data.doctorId,
            token: data.token,
            statusId: "S1",
          },
          raw: false,
        });
        if (appointment) {
          appointment.statusId = "S2";
          await appointment.save();
          resolve({
            errCode: 0,
            message: "Update the appointment succeed",
          });
        } else {
          resolve({
            errCode: 2,
            message: "Appointment has been activated or does not exist",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  postPatientBookAppointment: postPatientBookAppointment,
  postVerifyBookAppointment: postVerifyBookAppointment,
};

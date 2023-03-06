import db from "../models/index";
require("dotenv").config();
import _, { reject } from "lodash";

let createClinic = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.imageBase64 ||
        !data.descriptionHTML ||
        !data.descriptionMarkdown ||
        !data.address
      ) {
        resolve({
          errCode: -1,
          message: "Missing required parameter!",
        });
      } else {
        await db.Clinic.create({
          name: data.name,
          image: data.imageBase64,
          descriptionHTML: data.descriptionHTML,
          descriptionMarkdown: data.descriptionMarkdown,
          address: data.address,
        });
      }
      resolve({
        errCode: 0,
        message: "ok",
      });
    } catch (error) {
      reject(error);
    }
  });
};
let getAllClinic = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Clinic.findAll({
        raw: true,
      });

      if (data && data.length > 0) {
        data.map((item) => {
          item.image = Buffer.from(item.image, "base64").toString("binary");
          return item;
        });
      }
      resolve({
        errCode: 0,
        message: "ok",
        data: data,
      });
    } catch (error) {
      reject(error);
    }
  });
};
let getDetailClinicById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: -1,
          message: "Missing required parameter!",
        });
      } else {
        let data = await db.Clinic.findOne({
          where: {
            id: id,
          },
          attributes: [
            "descriptionHTML",
            "descriptionMarkdown",
            "address",
            "name",
          ],
          raw: true,
        });

        if (data) {
          //do something
          let doctorClinic = [];

          doctorClinic = await db.DoctorInfo.findAll({
            where: { clinicId: id },
            attributes: ["doctorId", "provinceId"],
          });

          data.doctorClinic = doctorClinic;
        } else {
          data = {};
        }
        resolve({
          errCode: 0,
          message: "ok",
          data: data,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  createClinic: createClinic,
  getAllClinic: getAllClinic,
  getDetailClinicById: getDetailClinicById,
};

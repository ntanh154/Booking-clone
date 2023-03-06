import clinicService from "../services/clinicService";
let createClinic = async (req, res) => {
  try {
    let response = await clinicService.createClinic(req.body);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      message: "Error from the server",
    });
  }
};
let getAllClinic = async (req, res) => {
  try {
    let response = await clinicService.getAllClinic();
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      message: "Error from the server",
    });
  }
};

let getDetailClinicByIdCl = async (req, res) => {
  try {
    let response = await clinicService.getDetailClinicById(req.query.id);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      message: "Error from the server",
    });
  }
};
module.exports = {
  createClinic: createClinic,
  getDetailClinicById: getDetailClinicByIdCl,
  getAllClinic: getAllClinic,
};
